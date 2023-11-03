import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTHA_URL = 'SET_CAPTHA_URL'

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      }
    case SET_CAPTHA_URL:
      return {
        ...state,
        captchaUrl: action.url,
      }

    default: return state
  }
}

export const setAutUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })
export const setCaptchaUrl = (url) => ({ type: SET_CAPTHA_URL, url })

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me()
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data
    dispatch(setAutUserData(id, email, login, true))
  }

}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl())
    }
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
    dispatch(stopSubmit('login', { _error: message }))
  }
}

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAutUserData(null, null, null, false))
  }
}

export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url
  dispatch(setCaptchaUrl(captchaUrl))

}


export default authReducer