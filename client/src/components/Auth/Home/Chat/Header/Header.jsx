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
            if (context.data.active_chat) {
              return (
                <header>
                  <div className="flex bg-white px-3 py-2 border-b">
                    <div className="mr-1">
                      <ChatAvatar url={`${apiUrl}/users/${context.data.active_chat.user.username}/${context.data.active_chat.user.avatar}`} size="large">
                      </ChatAvatar>
                    </div>
                    <div>
                      <h2 className="text-grey-darkest font-thin mb-1 inline-flex items-center">
                        <span className="mr-2">
                          {context.data.active_chat.user.username}
                        </span>
                        <Status status={context.data.active_chat.user.status}></Status>
                      </h2>
                      <p className="text-grey-dark">{context.data.active_chat.user.status_message}</p>
                    </div>
                  </div>
                </header>
              )
            } else {
              return <h1 className="text-center pt-5 text-grey font-thin">Pick a chat on the left</h1>
            }
          }
        }
      </ChatContext.Consumer>
    )
  }
}