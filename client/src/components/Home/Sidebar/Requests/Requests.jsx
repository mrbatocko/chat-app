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
            return context.data.chat_requests.length ? (
              <div>
                <p className="uppercase mb-3 text-sm font-mono">
                  Requests
                  <span className="ml-1 inline-block px-1 bg-teal text-indigo-dark rounded-full">
                    {context.data.chat_requests.length}
                  </span>
                </p>
                { this.renderRequestsList(context) }
              </div>
            ) : null
          }
        }
      </ChatContext.Consumer>
    )
  }

  renderRequestsList (context) {
    return context.data.chat_requests.map(req => {
      return (
        <div className="flex mb-3" key={req._id}>
          <ChatAvatar url={`${apiUrl}/users/${req.from.username}/${req.from.avatar}`} size={'large'}></ChatAvatar>
          <div>
            <h3 className="mb-2">{req.from.username}</h3>
            <div className="flex">
              <button 
                className="w-16 text-center bg-teal font-mono text-xs rounded uppercase py-1 mr-2"
                onClick={() => { this.respond(req, 'approve', context) }}>Accept</button>
              <button 
                className="w-16 text-center bg-red-light font-mono text-xs rounded uppercase py-1"
                onClick={() => { this.respond(req, 'denied', context) }}>Deny</button>
            </div>
          </div>
        </div>
      )
    })
  }

  respond = (requestData, action, context) => {
    context.sockets.chat_meta.emit('chat-request-action', { requestData, action }, (error, chat) => {
      if (!error && chat) {
        context.methods.chatRequestApproved(chat, requestData.to.username)
      }   
    })
  }
}