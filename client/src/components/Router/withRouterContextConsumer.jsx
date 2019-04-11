import React from 'react'
import { RouterContext } from './Router'

export default Component => {
  return props => (
    <RouterContext.Consumer>
      {
        context => {
          return <Component { ...props } { ...context } />
        }
      }
    </RouterContext.Consumer>
  )
}