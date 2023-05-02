import { rerenderEntireTree } from '../render.js'
import { v4 as uuid } from 'uuid';
let state = {

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
}

export let addPost = () => {
  let newPost = { id: uuid(), message: state.profilePage.newPostText, likesCount: '0' }
  state.profilePage.posts.push(newPost)
  state.profilePage.newPostText = ''
  rerenderEntireTree(state);
}


export let updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText
  rerenderEntireTree(state);
}

export default state;