import React, { Component }  from 'react'

import { ChatContext } from '../../Home'

export default class Input extends Component {
  render () {
    return (
      <ChatContext.Consumer>
        {
          context => {
            const placeholder = context.selected_chat.status === 'pending' ? 'Disabled' : 'Type here'
            const style = context.selected_chat.status === 'pending' ? 
              {
                'opacity': '.3',
                'pointerEvents': 'none'
              }
              : null
            return (
              <div>
                <input id="chat-message-input" type="text" placeholder={placeholder} 
                  className="w-full rounded border-2 border-indigo-dark px-3 py-2" 
                  style={style}/>
              </div>
            )
          }
        }
      </ChatContext.Consumer>
    )
  }
}