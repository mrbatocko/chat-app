import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'
import Status from '@/components/shared/AvailabilityIndicator/AvailabilityIndicator'

import { API_URL } from '@/services/http/config'

import { ChatContext } from '../../Home'

import StatusMessageEdit from './StatusMessageEdit'

export default class Header extends Component {
  state = {
    edit: ''
  }
  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            const avatarUrl = context.data.user.avatar ? 
              `${API_URL}/users/${context.data.user.username}/${context.data.user.avatar}` 
              : `${API_URL}/users/default-avatar.jpeg`
            return (
              <>
                <div className="flex mb-5">
                  <ChatAvatar url={avatarUrl}></ChatAvatar>
                  <div>
                    <h4 className="text-md text-white mb-1 flex items-center"> 
                      <span className="mr-2">{context.data.user.username}</span>
                      <span onClick={() => { this.setState({ edit: 'status' })}}>
                        <Status status={context.data.user.status}></Status>
                      </span>
                    </h4>
                    <p 
                      title="Click to change"
                      className="text-sm">
                      <span className="mr-2">{context.data.user.status_message}</span>
                      <span 
                        className="cursor-pointer"
                        onClick={() => { this.setState({ edit: 'status_message' })}}>
                        <FontAwesomeIcon 
                          icon={faPencilAlt} 
                          style={{ 'color': '#22292f' }}>
                        </FontAwesomeIcon>
                      </span>
                    </p>
                  </div>
                </div>
                {
                  this.state.edit === 'status_message' ? 
                    <StatusMessageEdit 
                      status_message={context.data.user.status_message}
                      cancel={this.cancelEditing}
                      save={status_message => { this.saveStatusMessage(status_message, context) }}>
                    </StatusMessageEdit> : null }
              </>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }
  cancelEditing = () => {
    this.setState({ edit: '' })
  }
  saveStatusMessage = (status_message, context) => {
    context.sockets.chat_meta.emit('status-message-change', { status_message, username: context.data.user.username }, error => {
      if (!error) {
        this.setState({ edit: '' })
        context.getUserData()
      }
    })
  }
}
