import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { decodeToken } from './decodeToken'

import AuthRoutes from '../Auth/Auth'
import UnauthRoutes from '../Unauth/Unauth'

export const RouterContext = React.createContext()

export default class ApplicationRouter extends Component {

state = {
  authenticated: false
}

componentWillMount () {
  const decodedToken = decodeToken(localStorage['chat-token'])
  if (decodedToken) {
    this.setState({ authenticated: true })
  }
}

render () {
  return (
    <RouterContext.Provider 
      value={{
        methods: {
          login: this.login,
          logout: this.logout
        }
      }}>
      <Router>
        {
          this.state.authenticated ? 
            <AuthRoutes />
            : 
            <UnauthRoutes login={this.login} />
        }
      </Router>
    </RouterContext.Provider>
  )
}

login = () => {
  this.setState({ authenticated: true })
}
logout = () => {
this.setState({ authenticated: false })
}
}