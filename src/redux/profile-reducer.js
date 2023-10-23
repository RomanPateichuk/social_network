import { v4 as uuid } from 'uuid';
import { profileAPI } from '../api/api';
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {
  posts: [
    { id: "1", message: "'Hi, how are you", likeCount: "0" },
    { id: "2", message: "'Hi, how are you", likesCount: '23' },
    { id: "3", message: "It's, my first post", likesCount: "0" },
    { id: "4", message: "It's, my first post", likesCount: "0" },
    { id: "5", message: "It's, my first post", likesCount: "0" },
    { id: "6", message: "It's, my first post", likesCount: "0" },
  ],
  newPostText: 'it-kamasutra.com',
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = { id: uuid(), message: state.newPostText, likesCount: '0' }

      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, newPost]
      }
    }
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText
      }
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state, status: action.status
      }
    default: return state
  }
}


export const addPostActionCreator = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const getUserProfile = (userId) => (dispatch) => {
  profileAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data))
  })
}


export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data))
  })
}

export const updateStatus = (status) => (dispatch) => {

  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }

  })
}




export default profileReducer