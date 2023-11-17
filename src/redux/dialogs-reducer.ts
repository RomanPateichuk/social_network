import { InferActionsTypes } from "./store"

let initialState = {
  messages: [
    { id: 6, message: "Hi" },
    { id: 7, message: "Hello" },
    { id: 8, message: "How are you?" },
  ] as Array<MessageType>,
  dialogs: [
    {
      id: 1,
      name: 'Roman'
    },
    {
      id: 2,
      name: 'Sveta'
    },
    {
      id: 3,
      name: 'Andrey'
    },
    {
      id: 4,
      name: 'Seny'
    },
    {
      id: 5,
      name: 'Sacha'
    }
  ] as Array<DialogType>,
}

export const actions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({ type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody } as const)
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {
    case 'SN/DIALOGS/SEND-MESSAGE':
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, { id: Date.now(), message: body }]
      }
    default:
      return state
  }
}

export default dialogsReducer;

type MessageType = {
  id: number
  message: string
}

type DialogType = {
  id: number
  name: string
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>