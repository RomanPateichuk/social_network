import { v4 as uuid } from 'uuid';
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

}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, { id: uuid(), message: body }]
      }
    default:
      return state
  }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })



export default dialogsReducer;