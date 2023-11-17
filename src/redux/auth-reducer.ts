import { authAPI } from "../api/auth-api"
import { ResultCodeForCapcthaEnum, ResultCodesEnum } from '../api/api'
import { securityAPI } from '../api/security-api'
import { FormAction, stopSubmit } from "redux-form"
import { BaseThunkType, InferActionsTypes } from "./store"

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/auth/SET_USER_DATA':
    case 'SN/auth/SET_CAPTHA_URL':
      return {
        ...state,
        ...action.payload
      }

    default: return state
  }
}

export const actions = {
  setAutUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({ type: 'SN/auth/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
  setCaptchaUrl: (captchaUrl: string) =>
    ({ type: 'SN/auth/SET_CAPTHA_URL', payload: { captchaUrl } } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data
    dispatch(actions.setAutUserData(id, email, login, true))
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData())
  } else {
    if (data.resultCode === ResultCodeForCapcthaEnum.CapthaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some error"
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(actions.setAutUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url
  dispatch(actions.setCaptchaUrl(captchaUrl))
}


export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>