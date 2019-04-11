import React, { Component } from 'react'
import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'

import { apiUrl } from '@/http'

import { ChatContext } from '../../Home'

export default class SearchUsers extends Component {

  inputRef = React.createRef()
  timeout = null

  componentDidMount () {
    this.inputRef.current.focus()
  }
  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  state = {
    users: []
  }

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            return (
              <div>
                <input 
                  ref={this.inputRef} 
                  type="text" 
                  placeholder="Search users" 
                  className="text-5xl appearance-none outline-none"
                  onChange={event => { this.debounceSearch(event.target.value, context) }}/>
                  <div className="flex bg-white px-2 pt-5 pb-3">
                  {
                    this.state.users.length ? this.state.users.filter(user => user.username !== context.data.user.username).map(user => {
                      return (
                        <div key={user._id} 
                          className="text-indigo-dark mr-3 mb-3 cursor-pointer flex items-center rounded-full border px-2 py-1"
                          onClick={() => { this.sendChatRequest(user, context) }}>
                          <ChatAvatar circle url={`${apiUrl}/users/${user.username}/${user.avatar}`} size={'small'}></ChatAvatar>
                          <h4>
                            {user.username}
                          </h4>
                        </div>
                      )
                    }) : null
                  }
                  </div>
              </div>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }

  debounceSearch = (username, context) => {
    this.setState({ username })
    clearTimeout(this.timeout)
    if (username.length) {
      this.timeout = setTimeout(() => {
        context.sockets.chat_meta.emit('search-users', { username }, (error, users) => {
          if (!error) {
            this.setState({ users })
          } else {
            this.setState({ users: [] })
          }
        })
      }, 300)
    } else {
      this.setState({ users: [] })
    }
  }

  sendChatRequest = (toUser, context) => {
    context.sockets.chat_meta.emit('chat-request',
      {
        from: { username: context.data.user.username, avatar: context.data.user.avatar },
        to: { username: toUser.username, avatar: toUser.avatar }
      },
      error => {
      if (!error) {
        this.props.close()
      }
    })
  }
}