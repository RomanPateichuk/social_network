import {FormAction, stopSubmit} from "redux-form"
import {BaseThunkType, InferActionsTypes} from "./store"
import {ChatMessageApiType} from "../pages/Chat/ChatPage";
import {chatAPI, StatusType} from "../api/chat-api";
import {Dispatch} from "react";
import {v1} from 'uuid'

type ChatMessageType = ChatMessageApiType & {id: string}

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id: v1()}))].filter((m, index, array)=>index>= array.length -100)
      }
    case 'SN/chat/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status
      }

    default:
      return state
  }
}

export const actions = {
  messagesReceived: (messages: ChatMessageApiType[]) =>
    ({type: 'SN/chat/MESSAGES_RECEIVED', payload: {messages}} as const),

  statusChanged: (status: StatusType) =>
    ({type: 'SN/chat/STATUS_CHANGED', payload: {status}} as const),
}


let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch<any>) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}


export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
}


export default chatReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>