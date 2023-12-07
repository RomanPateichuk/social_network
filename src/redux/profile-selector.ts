import {AppStateType} from "./store";

export const getCurrentUserPhoto = (state: AppStateType)=>{
  return state.profilePage.profile?.photos.large
}