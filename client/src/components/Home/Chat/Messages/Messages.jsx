import React, { Component } from 'react'

import { ChatContext } from '../../Home'

import Input from './Input'

export default class Messages extends Component {

  componentDidMount () {}

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            let messages = null
            if (context.data.selected_chat) {
              if (context.data.selected_chat_messages.length) {
                messages = context.data.selected_chat_messages.map((message, index) => {
                  return (
                    <div key={index} className="flex">
                      {/* <div>
                        <ChatAvatar url={`${apiUrl}/users/${message.from.username}/${message.from.avatar}`} size={'small'}></ChatAvatar>
                      </div> */}
                      <div>
                        <h4>{message.from} <span className="font-thin text-grey">{message.sent_on}</span></h4>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  )
                })
              } else {
                messages = <p>No messages</p>
              }
              return (
                <div className="flex flex-col">
                  <div className="overflow-y-auto pb-3">
                    {messages}
                  </div>
                  <div>
                    <Input></Input>
                  </div>
                </div>
              )
            }
          }
        }
      </ChatContext.Consumer>
    )
  }
}