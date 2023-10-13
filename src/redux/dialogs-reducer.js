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
    case UPDATE_NEW_MESSAGE_BODY: {

      return {
        ...state,
        newMessageBody: action.body
      }
    }
    case SEND_MESSAGE:
      let body = state.newMessageBody
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, { id: uuid(), message: body }]
      }
    default:
      return state
  }
}

export const sendMessageCreator = (text) => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: text })


export default dialogsReducer;