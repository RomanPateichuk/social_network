import axios from "axios"
import { ProfileType } from "../types/types"


const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "a04742fc-b015-48d6-8ae1-43c8264c6140" }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`)
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  },
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CapthaIsRequired = 10
}

export enum ResultCodeForCapctha {
  CapthaIsRequired = 10
}


type MeResponseType = {
  data: { id: number, email: string, login: string }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: { userId: number }
  resultCode: ResultCodesEnum | ResultCodeForCapctha
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<LoginResponseType>(`auth/login`, {
      email, password, rememberMe, captcha
    }).then(res => res.data)
  },

  logout() {
    return instance.delete(`auth/login`)
  },
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId)
  },

  getStatus(userId: number) {
    return instance.get('profile/status/' + userId)
  },

  updateStatus(status: string) {
    return instance.put('profile/status/', { status: status })
  },

  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  saveProfile(profileData: ProfileType) {
    return instance.put('profile/', { ...profileData })
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}

