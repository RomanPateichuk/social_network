import { v4 as uuid } from 'uuid';
import { profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"

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

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = { id: 50, message: action.post, likesCount: '0' }

      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state, status: action.status
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.postId)
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      }
    default: return state
  }
}


type addPostActionActionType = {
  type: typeof ADD_POST
  post: string
}

type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

type setStatusActionType = {
  type: typeof SET_STATUS
  status: string
}

type deletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

type savePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const addPostActionCreator = (post: string): addPostActionActionType => ({ type: ADD_POST, post })
export const setUserProfile = (profile: ProfileType): setUserProfileActionType => ({ type: SET_USER_PROFILE, profile: profile })
export const setStatus = (status: string): setStatusActionType => ({ type: SET_STATUS, status })
export const deletePost = (postId: number): deletePostActionType => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })


export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}


export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    //error
  }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }

}


export const saveProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId
  let response = await profileAPI.saveProfile(profileData)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
    // dispatch(stopSubmit('edit-profile', { "contacts": { "facebook": response.data.messages[0] } }))
  }
}



export default profileReducer