import React, { Component } from 'react'
import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'

import { apiUrl } from '@/http'

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
    username: '',
    users: []
  }

  render () {
    return (
      <div>
        <input 
          ref={this.inputRef} 
          type="text" 
          placeholder="Search users" 
          className="text-5xl appearance-none outline-none"
          value={this.state.username} 
          onChange={this.debounceSearch}/>
          <div className="flex bg-white px-2 pt-5 pb-3">
          {
            this.state.users.length ? this.state.users.filter(user => user.username !== this.props.user.username).map(user => {
              return (
                <div key={user._id} 
                  className="text-indigo-dark mr-3 mb-3 cursor-pointer flex items-center rounded-full border px-2 py-1"
                  onClick={() => { this.sendChatRequest(user.username) }}>
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

  debounceSearch = event => {
    const username = event.target.value
    this.setState({ username })
    clearTimeout(this.timeout)
    if (username.length) {
      this.timeout = setTimeout(() => {
        this.props.socket.emit('search-user', this.state.username, (error, users) => {
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

  sendChatRequest = username => {
    this.props.socket.emit('chat-request', { from: this.props.user, to: username }, (error, answer) => {
      console.log(error, answer)
    })
  }
}