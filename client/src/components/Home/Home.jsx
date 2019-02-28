import React, { Component } from 'react'

import Sidebar from './Sidebar/Sidebar'
import Chat from './Chat/Chat'

import { getUserData } from '@/http/endpoints/user'

export const ChatContext = React.createContext()


export default class Home extends Component {

  state = {
    selected_chat: null,
    user: null
  }

  componentDidMount () {
    this.getUserData()
  }

  render () {
    return this.state.user ? (
      <ChatContext.Provider
        value={{
          user: this.state.user,
          getUserData: this.getUserData,
          selectChat: this.selectChat,
          selected_chat: this.state.selected_chat
        }}>
        <div className="h-screen">
          <div className="flex min-h-full">
            <div className="w-1/5">
              <Sidebar logout={this.props.logout} user={this.state.user}></Sidebar>
            </div>
            <main className="flex-grow bg-grey-lightest">
              <Chat selected_chat={this.state.selected_chat}></Chat>
            </main>
          </div>
        </div>
      </ChatContext.Provider>
    ) : null
  }

  getUserData = () => {
    getUserData()
      .then(({ user }) => {
        this.setState({ user })
      })
      .catch(() => {
        this.props.logout()
      })
  }

  selectChat = chat => {
    this.setState({ selected_chat: chat })
  }
}
