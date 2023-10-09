import { v4 as uuid } from 'uuid';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {


  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body
      return state

    case SEND_MESSAGE:
      let body = state.newMessageBody
      state.newMessageBody = ''
      state.messages.push({ id: uuid(), message: body })
      return state
    default:
      return state
  }
}

export const sendMessageCreator = (text) => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: text })


export default dialogsReducer;