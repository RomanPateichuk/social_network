import { v4 as uuid } from 'uuid';
import { profileAPI } from '../api/api';
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = "DELETE_POST"

let initialState = {
  posts: [
    { id: "1", message: "'Hi, how are you", likeCount: "0" },
    { id: "2", message: "'Hi, how are you", likesCount: '23' },
    { id: "3", message: "It's, my first post", likesCount: "0" },
    { id: "4", message: "It's, my first post", likesCount: "0" },
    { id: "5", message: "It's, my first post", likesCount: "0" },
    { id: "6", message: "It's, my first post", likesCount: "0" },
  ],
  profile: null,
  status: '',
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = { id: uuid(), message: action.post, likesCount: '0' }

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
    default: return state
  }
}


export const addPostActionCreator = (post) => ({ type: ADD_POST, post })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}


export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}




export default profileReducer