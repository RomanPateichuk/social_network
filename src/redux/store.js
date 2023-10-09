import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

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

      newMessageBody: '',

    },
  },
  _callSubscriber() {
    console.log("state changed!")
  },
  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._callSubscriber(this._state)
  }


}

export default store