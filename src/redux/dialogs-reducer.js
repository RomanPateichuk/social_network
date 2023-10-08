import { v4 as uuid } from 'uuid';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'
const dialogsReducer = (state, action) => {


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