import React, { Component } from 'react'
import withChatContextConsumer from '../../withChatContextConsumer'

import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'

import { API_URL } from '@/services/http/config'

class ChatRequests extends Component {

  state = {
    chat_requests: null
  }

  render () {
    return this.props.data.chat_requests.length ? (
      <div>
        <p className="uppercase mb-3 text-sm font-mono">
          Requests
          <span className="ml-1 inline-block px-1 bg-teal text-indigo-dark rounded-full">
            {this.props.data.chat_requests.length}
          </span>
        </p>
        { this.renderRequestsList() }
      </div>
    ) : null
  }

  renderRequestsList () {
    return this.props.data.chat_requests.map(req => {
      return (
        <div className="flex mb-3" key={req._id}>
          <ChatAvatar url={`${API_URL}/users/${req.from.username}/${req.from.avatar}`} size={'large'}></ChatAvatar>
          <div>
            <h3 className="mb-2">{req.from.username}</h3>
            <div className="flex">
              <button 
                className="w-16 text-center bg-teal font-mono text-xs rounded uppercase py-1 mr-2"
                onClick={() => { this.respond(req, 'approve') }}>Accept</button>
              <button 
                className="w-16 text-center bg-red-light font-mono text-xs rounded uppercase py-1"
                onClick={() => { this.respond(req, 'denied') }}>Deny</button>
            </div>
          </div>
        </div>
      )
    })
  }

  respond = (requestData, action) => {
    this.props.sockets.chat_meta.emit('chat-request-action', { requestData, action }, (error, chat) => {
      if (!error && chat) {
        this.props.methods.chatRequestApproved(chat, requestData.to.username)
      }   
    })
  }
}

export default withChatContextConsumer(ChatRequests)