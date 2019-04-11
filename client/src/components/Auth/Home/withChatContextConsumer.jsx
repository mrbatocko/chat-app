import React from 'react'
import { ChatContext } from './Home'

export default Component => {
  return props => (
    <ChatContext.Consumer>
      {
        context => {
          return <Component { ...props } { ...context } />
        }
      }
    </ChatContext.Consumer>
  )
}