import React, { Component } from 'react'

import ChatAvatar from '@/components/shared/ChatAvatar/ChatAvatar'
import Status from '@/components/shared/AvailabilityIndicator/AvailabilityIndicator'

import { apiUrl } from '@/http'
import { ChatContext } from '../../Home'

export default class ChatHeader extends Component {
  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
           return context.selected_chat ? (
              <header>
                <div className="flex bg-white px-3 py-2 border-b">
                  <div className="mr-1">
                    <ChatAvatar url={`${apiUrl}/users/${context.selected_chat.with.username}/${context.selected_chat.with.avatar}`} size="large">
                    </ChatAvatar>
                  </div>
                  <div>
                    <h1 className="text-grey-darkest font-thin mb-1 inline-flex items-center">
                      <span className="mr-2">
                        {context.selected_chat.with.username}
                      </span>
                      <Status status={context.selected_chat.with.status}></Status>
                    </h1>
                    <p className="text-grey-dark">{context.selected_chat.with.status_message}</p>
                  </div>
                </div>
              </header>
            ) : <h1 className="text-center pt-5 text-grey font-thin">Pick a chat on the left</h1>
          }
        }
      </ChatContext.Consumer>
    )
  }
}