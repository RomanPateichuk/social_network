import {ChatMessageType} from "../pages/Chat/ChatPage";

type SubscribeType = (messages: ChatMessageType[]) => void

let subscribers = [] as SubscribeType[]
let ws: WebSocket | null = null

const closeHandler = () => {
  setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach(s => s(newMessages))
}

function createChanel() {
  ws?.removeEventListener('close', closeHandler)
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
}


export const chatAPI = {
  start() {
    createChanel()
  },
  stop() {
    subscribers = []
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
  },
  subscribe(callback: SubscribeType) {
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter(s => s !== callback)
    }
  },
  unsubscribe(callback: SubscribeType) {
    subscribers = subscribers.filter(s => s !== callback)
  },

  send(message: string) {
    ws?.send(message)
  }


}