import React, { Component } from 'react'

import Sidebar from './Sidebar/Sidebar'
import Chat from './Chat/Chat'

import { getUserData } from '@/http/endpoints/user'
import { connectToNamespace } from '@/sockets'

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
    this.getUserData()
      .then(() => {
        if (this.props.match.params.username) {
          this.getChatData(this.props.match.params.username)
        }
      })
  }

  componentWillReceiveProps (props) {
    if (props.match.params.username !== this.state.active_chat.user.username) {
      this.getChatData(props.match.params.username)
    }
  }

  render () {
    return this.state.user ? (
      <ChatContext.Provider
        value={{
          data: {
            user: this.state.user,
            chat_requests: this.state.chat_requests,
            chats: this.state.chats,
            active_chat: this.state.active_chat
          },
          methods: {
            logout: this.props.logout,
            chatRequestApproved: this.onChatRequestApproved
          },
          sockets: this.state.sockets
        }}>
        <div className="h-screen">
          <div className="flex min-h-full">
            <div className="w-1/5">
              <Sidebar></Sidebar>
            </div>
            <main className="flex-grow bg-grey-lightest">
              <Chat { ...this.props }></Chat>
            </main>
          </div>
        </div>
      </ChatContext.Provider>
    ) : null
  }

  getUserData = () => {
    // Fetch user with ajax, because token can be invalid 
    // and we cannot establish socket connections
    return getUserData()
      .then(data => {
        const chat_meta = connectToNamespace('meta', { query: { username: data.user.username } })
        const chat = connectToNamespace('chat', { query: { username: data.user.username } })
        this.setupSocketEvents(chat_meta, chat)
        this.setState({
          user: data.user,
          chat_requests: data.chat_requests,
          chats: data.chats,
          sockets: { chat_meta, chat }
        })
      })
      .catch(() => {
        this.props.logout()
      })
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
    const chat_requests = [ ...this.state.chat_requests ]
    chat_requests.push(request)
    this.setState({ chat_requests })
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
}
