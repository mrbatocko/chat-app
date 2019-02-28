import React, { Component } from 'react'

import { ChatContext } from '../../Home'
import FullscreenModal from '@/components/shared/Modals/Fullscreen'
import SearchUsers from './SearchUsers'

const SearchUsersModal = FullscreenModal(SearchUsers)

export default class DirectChats extends Component {

  state = {
    add_chat_modal: false
  }

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            const chats = context.user.chats.filter(chat => chat.status === 'approved')
            return (
              <div>
                <div className="flex items-center mb-3 pb-2 border-b border-indigo-light">
                  <p className="flex-grow uppercase text-sm font-mono">Chats</p>
                  <button 
                    className="text-xs uppercase bg-indigo-darker text-grey-light px-2 py-1 rounded font-mono"
                    onClick={() => { this.setState({ add_chat_modal: true }) }}>Add chat</button>
                </div>
                { chats.length ? 
                    this.renderChats(chats, context.selectChat) 
                    : <p className="text-sm text-center opacity-50">No chats</p> }
                {
                  this.state.add_chat_modal ? 
                    <SearchUsersModal 
                      user={context.user}
                      close={() => { this.setState({ add_chat_modal: false }) }}
                      socket={this.props.socket}>
                    </SearchUsersModal> : null
                }
              </div>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }

  renderChats (chats, selectChat) {
    return chats.map(chat => {
      return (
        <div className="flex" key={chat.with._id}>
          <h4 onClick={() => { selectChat(chat) }} className="cursor-pointer">{chat.with.username}</h4>
        </div>
      )
    })
  }
}