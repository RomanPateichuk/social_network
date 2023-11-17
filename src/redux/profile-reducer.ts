import { profileAPI } from '../api/profile-api';
import { FormAction, stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './store';

let initialState = {
  posts: [
    { id: 1, message: "'Hi, how are you", likeCount: "0" },
    { id: 2, message: "'Hi, how are you", likesCount: '23' },
    { id: 3, message: "It's, my first post", likesCount: "0" },
    { id: 4, message: "It's, my first post", likesCount: "0" },
    { id: 5, message: "It's, my first post", likesCount: "0" },
    { id: 6, message: "It's, my first post", likesCount: "0" },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
}

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

  switch (action.type) {
    case 'SN/PROFILE/ADD-POST': {
      let newPost = { id: Date.now(), message: action.post, likesCount: '0' }

      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case 'SN/PROFILE/SET-USER-PROFILE':
      return {
        ...state, profile: action.profile
      }
    case 'SN/PROFILE/SET_STATUS':
      return {
        ...state, status: action.status
      }
    case 'SN/PROFILE/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.postId)
      }
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }
    default: return state
  }
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(response))
}


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(response))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
      dispatch(actions.setStatus(status))
    }
  } catch (error) {
    //error
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let response = await profileAPI.savePhoto(file)
  if (response.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.photos))
  }
}

export const saveProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  let response = await profileAPI.saveProfile(profileData)
  if (response.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId))
    }
    else {
      throw new Error('userIf can"t be null')
    }
  } else {
    dispatch(stopSubmit('edit-profile', { _error: response.messages[0] }))
    return Promise.reject(response.messages[0])
  }
}

export default profileReducer

export const actions = {
  addPostActionCreator: (post: string) => ({ type: 'SN/PROFILE/ADD-POST', post } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET-USER-PROFILE', profile: profile } as const),
  setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
  deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const),
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
export type initialStateType = typeof initialState