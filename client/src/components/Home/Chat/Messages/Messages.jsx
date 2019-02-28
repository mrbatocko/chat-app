import React, { Component } from 'react'

import { ChatContext } from '../../Home'

import Input from './Input'

// import { socketUrl } from '@/http'
// import io from 'socket.io-client'

export default class Messages extends Component {

  componentDidMount () {}

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            let renderData = null
            if (context.selected_chat) {
              renderData = (
                <div className="flex-grow flex flex-col">
                  <div className="flex-grow">
                  </div>
                  <div>
                    <Input></Input>
                  </div>
                </div>
              )
              // const socket = io(`${socketUrl}/chat`)
              // socket.on('chat-request', data => {
              //   console.log(data)
              // })
            }
            return renderData
          }
        }
      </ChatContext.Consumer>
    )
  }
}