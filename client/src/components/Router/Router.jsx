import React, { PureComponent } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { decodeToken } from './decodeToken'

import AuthRoutes from '../Auth/Auth'
import UnauthRoutes from '../Unauth/Unauth'

export const RouterContext = React.createContext()

export default class ApplicationRouter extends PureComponent {

  state = {
    authenticated: false
  }

  componentWillMount () {
    const decodedToken = decodeToken(localStorage['chat-token'])
    if (decodedToken) {
      this.setState({ authenticated: true })
    }
  }

  renderAuthRoutes = () => {
    this.setState({ authenticated: true })
  }

  renderUnauthRoutes = () => {
    this.setState({ authenticated: false })
  }
  
  render () {
    return (
      <RouterContext.Provider 
        value={{
          router_methods: {
            renderAuthRoutes: this.renderAuthRoutes,
            renderUnauthRoutes: this.renderUnauthRoutes
          }
        }}>
        <Router>
          {
            this.state.authenticated ? 
              <AuthRoutes />
              : 
              <UnauthRoutes />
          }
        </Router>
      </RouterContext.Provider>
    )
  }
}