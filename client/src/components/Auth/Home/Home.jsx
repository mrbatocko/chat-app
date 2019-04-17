import React, { Component } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Chat from './Chat/Chat'

import { getUserData } from '@/services/http/endpoints/user'
import { connectToNamespace } from '@/services/sockets'

import { mutate, subscribe, unsubscribe } from '@/state/user'

export const ChatContext = React.createContext()


export default class Home extends Component {
  state = {
    sockets: {
      chat_meta: null,
      chat: null
    },
    user: null,
    chats: [],
    active_chat: null,
    chat_requests: []
  }
  componentDidMount () {
    subscribe('home', this.onStateChange)
    this.getUserData()
  }
  componentWillUnmount () {
    unsubscribe('home')
  }

  render () {
    const contextObject = {
      data: {
        user: this.state.user,
        chat_requests: this.state.chat_requests,
        chats: this.state.chats,
        active_chat: this.state.active_chat
      },
      methods: {
        chatRequestApproved: this.onChatRequestApproved,
        appendMessage: this.appendMessage
      },
      sockets: this.state.sockets
    }
    return this.state.user ? (
      <ChatContext.Provider value={contextObject}>
        <div className="h-screen">
          <div className="flex min-h-full">
            <div style={{ 'minWidth': '300px' }}>
              <Sidebar />
            </div>
            <main className="flex-grow bg-grey-lightest">
              <Chat />
            </main>
          </div>
        </div>
      </ChatContext.Provider>
    ) : null
  }
  onStateChange = (state) => {
    console.log(state)
  }
  getUserData = async () => {
    const { data } = await getUserData()
    if (data) {
      mutate('SET_USER', data.user)
      const chat_meta = connectToNamespace('meta', { query: { username: data.user.username } })
      const chat = connectToNamespace('chat', { query: { username: data.user.username } })
      this.setupSocketEvents(chat_meta, chat)
      this.setState({
        user: data.user,
        chat_requests: data.chat_requests,
        chats: data.chats,
        sockets: { chat_meta, chat }
      })
    }
  }
  getChatData = username => {
    this.state.sockets.chat_meta.emit('get-chat-data', { username }, (error, active_chat) => {
      if (!error) {
        this.setState({ active_chat })
      }
    })
  }
  setupSocketEvents = (chat_meta, chat) => {
    chat_meta.on('chat-request', this.onChatRequest)
    chat_meta.on('request-approved', this.onChatRequestApproved)
  }
  onChatRequest = request => {
    const { chat_requests } = this.state
    this.setState({ chat_requests: [...chat_requests, request] })
  }
  onChatRequestApproved = (chat, toUsername) => {
    if (toUsername) {
      let index = null
      this.state.chat_requests.forEach((req, i) => {
        if (req.to.username === toUsername) {
          index = i
        }
      })
      let chat_requests = [ ...this.state.chat_requests ]
      chat_requests.splice(index, 1)
      this.setState({ chat_requests })
    }
    const chats = [ ...this.state.chats ]
    chats.push(chat)
    this.setState({ chats })
  }
  appendMessage = ({ message }) => {
    const active_chat = { ...this.state.active_chat }
    active_chat.chat.messages.push(message)
    this.setState({ active_chat })
  }
}
