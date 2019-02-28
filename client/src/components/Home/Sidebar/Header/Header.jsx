import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'
import Status from '@/components/shared/AvailabilityIndicator/AvailabilityIndicator'
import StatusChange from './Status/StatusChange'

import { apiUrl } from '@/http'

import { ChatContext } from '../../Home'
import StatusMessageEdit from './StatusMessageEdit';

export default class Header extends Component {

  state = {
    edit: ''
  }

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            const avatarUrl = context.user.avatar ? 
              `${apiUrl}/users/${context.user.username}/${context.user.avatar}` 
              : `${apiUrl}/users/default-avatar.jpeg`
            return (
              <React.Fragment>
                <div className="flex mb-5">
                  <ChatAvatar url={avatarUrl}></ChatAvatar>
                  <div>
                    <h4 className="text-md mb-1 flex items-center"> 
                      <span className="mr-2">{context.user.username}</span>
                      <span onClick={() => { this.setState({ edit: 'status' })}}>
                        <Status status={context.user.status}></Status>
                      </span>
                    </h4>
                    <p 
                      title="Click to change"
                      className="text-sm">
                      <span className="mr-2">{context.user.status_message}</span>
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
                  <div className="flex-grow flex justify-end">
                    <button onClick={this.props.logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} size="lg" style={{ color: '#ffffff' }}>
                      </FontAwesomeIcon>
                    </button>
                  </div>
                </div>
                {
                  this.state.edit === 'status_message' ? 
                    <StatusMessageEdit 
                      status_message={context.user.status_message}
                      cancel={this.cancelEditing}
                      save={status_message => { this.saveStatusMessage(status_message, context) }}>
                    </StatusMessageEdit> : null }
                  {
                    this.state.edit === 'status' ?
                      <StatusChange 
                        status={context.user.status}
                        cancel={this.cancelEditing}
                        save={status => { this.changeStatus(status, context) }}>
                      </StatusChange> : null
                  }
              </React.Fragment>
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
    this.props.socket.emit('status-message-change', { status_message, username: context.user.username }, error => {
      if (!error) {
        this.setState({ edit: '' })
        context.getUserData()
      }
    })
  }

  changeStatus = (status, context) => {
    this.props.socket.emit('status-change', { status, username: context.user.username }, error => {
      if (!error) {
        this.setState({ edit: '' })
        context.getUserData()
      }
    })
  }
}