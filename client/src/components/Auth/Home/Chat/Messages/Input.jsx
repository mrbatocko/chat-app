import React, { Component }  from 'react'

import { ChatContext } from '../../Home'

export default class Input extends Component {

  inputRef = React.createRef()

  state = {
    message: ''
  }

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            return (
              <div>
                <form onSubmit={event => { this.sendMessage(event, context) }} autoComplete={'off'}>
                  <input 
                    ref={this.inputRef}
                    id="chat-message-input"
                    type="text" placeholder="Type here" 
                    className="w-full rounded border-2 border-indigo-dark bg-white px-3 py-2" 
                    onChange={this.messageChange} />
                </form>
              </div>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }

  messageChange = event => {
    this.setState({ message: event.target.value })
  }

  sendMessage = (event, context) => {
    event.preventDefault()
    if (this.state.message) {
      let message = { 
        chatId: context.data.active_chat.chat._id, 
        from: context.data.user, 
        to: context.data.active_chat.user, 
        message: this.state.message, 
        sent_on: new Date()
      }
      context.sockets.chat.emit('chat-message', message, (error, sentMessage) => {
        if (!error) {
          context.methods.appendMessage({ message: sentMessage })
          this.setState({ message: '' })
          this.inputRef.current.value = ''
        }
      })
    }
  }
}