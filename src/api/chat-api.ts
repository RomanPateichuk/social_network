import {ChatMessageApiType} from "../pages/Chat/ChatPage";

type MessagesReceivedSubscribeType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscribeType = (status: StatusType) => void

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscribeType[],
  'status-changed': [] as StatusChangedSubscribeType[]
}
let ws: WebSocket | null = null
type  EventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('REFRESH PAGE')
}

const cleanUp = ()=>{
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType)=>{
  subscribers['status-changed'].forEach(s=>s(status))
}

function createChanel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
  start() {
    createChanel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribeType |  StatusChangedSubscribeType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
  },

  sendMessage(message: string) {
    ws?.send(message)
  }


}
export type StatusType = 'pending' | 'ready' | 'error'