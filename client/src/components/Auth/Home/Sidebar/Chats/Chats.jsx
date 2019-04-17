import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { ChatContext } from '../../Home'
import FullscreenModal from '@/components/shared/Modals/Fullscreen'
import SearchUsers from './SearchUsers'

const SearchUsersModal = FullscreenModal(SearchUsers)

export default class Chats extends Component {

  state = {
    add_chat_modal: false
  }

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            return (
              <div>
                <div className="flex items-center mb-3 pb-2 border-b border-indigo-light">
                  <p className="flex-grow uppercase text-sm">Chats</p>
                  <button 
                    className="text-xs uppercase bg-indigo-darker text-grey-light px-2 py-1 rounded"
                    onClick={() => { this.setState({ add_chat_modal: true }) }}>Add chat</button>
                </div>
                { context.data.chats.length ? 
                    this.renderChats(context) 
                    : <p className="text-sm text-center opacity-50">No chats</p> }
                {
                  this.state.add_chat_modal ? 
                    <SearchUsersModal 
                      close={() => { this.setState({ add_chat_modal: false }) }}>
                    </SearchUsersModal> : null
                }
              </div>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }

  renderChats (context) {
    return context.data.chats.map(chat => {
      const username = chat.participants.filter(p => p.username !== context.data.user.username)[0].username
      return (
        <Link to={`/${username}`} key={username} className="no-underline text-grey-lighter">
          <div className="flex mb-2">
            <h4 className="cursor-pointer">{username}</h4>
          </div>
        </Link>
      )
    })
  }
}