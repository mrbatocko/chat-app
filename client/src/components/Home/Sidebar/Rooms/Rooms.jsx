import React, { Component } from 'react'

import { ChatContext } from '../../Home'

export default class DirectChats extends Component {

  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            return (
              <div>
                <div className="flex mb-3 pb-2 border-b border-indigo-light items-center">
                  <p className="flex-grow uppercase text-sm font-mono">Rooms</p>
                  <button 
                    className="text-xs uppercase bg-indigo-darker text-grey-light px-2 py-1 rounded font-mono">add room</button>
                </div>
                { context.user.rooms ? 
                    this.renderRequestsList(context.user.rooms, context.selectChat) 
                    : <p className="text-sm text-center opacity-50">No rooms</p> }
              </div>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }

  renderRequestsList (chats, selectChat) {
    return chats.map(chat => {
      return (
        <div></div>
      )
    })
  }
}