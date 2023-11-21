import axios from "axios"
import { UserType } from "../types/types"


export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "a04742fc-b015-48d6-8ae1-43c8264c6140" }
})



export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CapthaIsRequired = 10
}

export enum ResultCodeForCapcthaEnum {
  CapthaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>

}

