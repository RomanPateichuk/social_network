import { v4 as uuid } from 'uuid';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'


let store = {
  _state: {

    profilePage: {
      posts: [
        { id: "1", message: "'Hi, how are you", likeCount: "0" },
        { id: "2", message: "'Hi, how are you", likesCount: '23' },
        { id: "3", message: "It's, my first post", likesCount: "0" },
        { id: "4", message: "It's, my first post", likesCount: "0" },
        { id: "5", message: "It's, my first post", likesCount: "0" },
        { id: "6", message: "It's, my first post", likesCount: "0" },
      ],
      newPostText: 'it-kamasutra.com'
    },

    dialogsPage: {
      messages: [
        { id: "6", message: "Hi" },
        { id: "7", message: "Hello" },
        { id: "8", message: "How are you?" },
      ],
      dialogs: [
        {
          id: "1",
          name: 'Roman'
        },
        {
          id: "2",
          name: 'Sveta'
        },
        {
          id: "3",
          name: 'Andrey'
        },
        {
          id: "4",
          name: 'Seny'
        },
        {
          id: "5",
          name: 'Sacha'
        }
      ],
    },
  },
  _callSubscriber() {
    console.log("state changed!");
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost = { id: uuid(), message: this._state.profilePage.newPostText, likesCount: '0' }
      this._state.profilePage.posts.push(newPost)
      this._state.profilePage.newPostText = ''
      this._callSubscriber(this._state);
    }
    else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText
      this._callSubscriber(this._state);
    }
  }

}


export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) =>
({
  type: UPDATE_NEW_POST_TEXT,
  newText: text
})


export default store;