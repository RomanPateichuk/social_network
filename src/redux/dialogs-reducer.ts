import { v4 as uuid } from 'uuid';
const SEND_MESSAGE = 'SEND-MESSAGE'

type MessageType = {
  id: string
  message: string
}

type DialogType = {
  id: string
  name: string
}

let initialState = {
  messages: [
    { id: "6", message: "Hi" },
    { id: "7", message: "Hello" },
    { id: "8", message: "How are you?" },
  ] as Array<MessageType>,
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
  ] as Array<DialogType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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

type sendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageActionCreatorType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;