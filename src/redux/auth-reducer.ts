import { authAPI, ResultCodeForCapctha, ResultCodesEnum, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTHA_URL = 'SET_CAPTHA_URL'

export type InitialStateType = {
  userId: string | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  captchaUrl: string | null,
}

let initialState: InitialStateType = {
  userId: null as string | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
}

// export type InitialStateType = typeof initialState


const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTHA_URL:
      return {
        ...state,
        ...action.payload
      }

    default: return state
  }
}

type SetAuthUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataActionPayloadType
}

export const setAutUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

type setCaptchaUrlActionType = {
  type: typeof SET_CAPTHA_URL
  payload: { captchaUrl: string }
}

export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => ({ type: SET_CAPTHA_URL, payload: { captchaUrl } })

export const getAuthUserData = () => async (dispatch: any) => {
  let meData = await authAPI.me()
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data
    dispatch(setAutUserData(id, email, login, true))
  }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
  let data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData())
  } else {
    if (data.resultCode === ResultCodeForCapctha.CapthaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Some error"
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAutUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
  let response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url
  dispatch(setCaptchaUrl(captchaUrl))

}


export default authReducer