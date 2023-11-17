import { instance, ResultCodeForCapcthaEnum, ResultCodesEnum } from "./api"
import { ResponseType } from './api'

type MeResponseDataType = {
  data: {
    id: number
    email: string
    login: string
  }
}

type LoginResponseDataType = {
  data: { userId: number }
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then(res => res.data)
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCapcthaEnum>>(`auth/login`, {
      email, password, rememberMe, captcha
    }).then(res => res.data)
  },

  logout() {
    return instance.delete(`auth/login`)
  },
}