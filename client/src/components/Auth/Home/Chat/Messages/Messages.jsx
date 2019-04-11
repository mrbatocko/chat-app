import React, { Component } from 'react'
import withChatContextConsumer from '../../withChatContextConsumer'
import Input from './Input'
import { API_URL } from '@/services/http/config'
import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'

class Messages extends Component {
  messagesDiv = React.createRef()

  componentDidMount () {
    // this.messagesDiv.current.scrollTop = this.messagesDiv.current.scrollHeight
  }

  componentDidUpdate () {
    this.messagesDiv.current.scrollTop = this.messagesDiv.current.scrollHeight
  }

  constructDateString = createdOn => {
    const date = new Date(createdOn)
    const time = `${date.getHours()}:${date.getMinutes()}`
    const pomDate = `${date.toLocaleString('en-us', { month: 'long' })} ${date.getDate()} ${date.getFullYear()}`
    return `${pomDate} at ${time}`
  }

  render () {
    if (this.props.data.active_chat) {
      let innerContent = null
      if (this.props.data.active_chat.chat.messages.length) {
        innerContent = this.props.data.active_chat.chat.messages.map((message, index) => {
          let info = { avatar: '', username: '' }
          if (message.from === this.props.data.user.username) {
            info.username = this.props.data.user.username
            info.avatar = this.props.data.user.avatar
          } else {
            info.username = message.from
            info.avatar = this.props.data.active_chat.user.avatar
          }
          return (
            <div key={index} className="flex mb-5" style={{ 'maxWidth': '70%' }}>
              <div className="mr-1">
                <ChatAvatar url={`${API_URL}/users/${info.username}/${info.avatar}`}></ChatAvatar>
              </div>
              <div>
                <h4 className="mb-1">
                  <span className="mr-2">{message.from}</span>
                  <span className="font-thin text-xs text-grey-darker">{this.constructDateString(message.sent_on)}</span></h4>
                <p className="text-grey-darkest text-md leading-normal">{message.content}</p>
              </div>
            </div>
          )
        })
      } else {
        innerContent = <p>No messages</p>
      }
      return (
        <div className="flex flex-col pb-3" style={{ 'height': 'calc(100vh - 81px)' }}>
          <div className="h-full overflow-auto" ref={this.messagesDiv}>
            {innerContent}
          </div>
          <div>
            <Input></Input>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default withChatContextConsumer(Messages)
