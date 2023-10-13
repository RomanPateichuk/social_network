import { v4 as uuid } from 'uuid';
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
  posts: [
    { id: "1", message: "'Hi, how are you", likeCount: "0" },
    { id: "2", message: "'Hi, how are you", likesCount: '23' },
    { id: "3", message: "It's, my first post", likesCount: "0" },
    { id: "4", message: "It's, my first post", likesCount: "0" },
    { id: "5", message: "It's, my first post", likesCount: "0" },
    { id: "6", message: "It's, my first post", likesCount: "0" },
  ],
  newPostText: 'it-kamasutra.com'
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
    default: return state
  }
}


export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) =>
({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
})



export default profileReducer