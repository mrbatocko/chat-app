import React, { Component } from 'react'

import { ChatContext } from '../../Home'

import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'

import { apiUrl } from '@/http'

export default class ChatRequests extends Component {

  state = {
    chat_requests: null
  }

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            const chatRequests = context.user.chats.filter(chat => chat.status === 'pending')
            return chatRequests.length ? (
              <div>
                <p className="uppercase mb-3 text-sm font-mono">
                  Requests
                  <span className="ml-1 inline-block px-1 bg-teal text-indigo-dark rounded-full">{ chatRequests.length }</span>
                </p>
                { this.renderRequestsList(chatRequests, context) }
              </div>
            ) : null
          }
        }
      </ChatContext.Consumer>
    )
  }

  renderRequestsList (chats, context) {
    return chats.map(chat => {
      return (
        <div className="flex mb-3" key={chat.with._id}>
          <ChatAvatar url={`${apiUrl}/users/${chat.with.username}/${chat.with.avatar}`} size={'large'}></ChatAvatar>
          <div>
            <h3 className="mb-2">{chat.with.username}</h3>
            <div className="flex">
              <button 
                className="w-16 text-center bg-teal font-mono text-xs rounded uppercase py-1 mr-2"
                onClick={() => { this.respond(chat.with, 'approved', context) }}>Accept</button>
              <button 
                className="w-16 text-center bg-red-light font-mono text-xs rounded uppercase py-1"
                onClick={() => { this.respond(chat.with, 'denied', context) }}>Deny</button>
            </div>
          </div>
        </div>
      )
    })
  }

  respond = (withUser, action, context) => {
    this.props.socket.emit('chat-request-action', { from: withUser, to: context.user, action }, error => {
      if (!error) {
        context.getUserData()
      }   
    })
  }
}