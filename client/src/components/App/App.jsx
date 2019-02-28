import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'

import Home from '../Home/Home'
import Settings from '../Settings/Settings'

import { decodeToken } from '@/utils/jwt'

class App extends Component {

  constructor (props) {
    super(props)
    let stateObject = {
      homePathComponent: Login
    }
    const decodedToken = decodeToken(localStorage['chat-token'])
    if (localStorage['chat-token'] && localStorage['chat-token'].length && decodedToken) {
      stateObject.homePathComponent = Home
    }
    this.state = stateObject
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/"
            render={
              props => {
                return (
                  <this.state.homePathComponent
                    { ...props } 
                    logout={this.logout} 
                    login={this.login}>
                  </this.state.homePathComponent>
                )}} />
            <Route render={
              () => {
                return (
                  <Redirect to="/"></Redirect>
                )
              }
            } />
        </Switch>
      </Router>
    )
  }

  logout = () => {
    localStorage.removeItem('chat-token')
    this.setState({ homePathComponent: Login })
  }

  login = token => {
    localStorage['chat-token'] = token
    this.setState({ homePathComponent: Home })
  }
}

export default App
