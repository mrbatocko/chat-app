import React, { Component } from 'react'
import ApplicationRouter from './components/Router/Router'

class App extends Component {

  render() {
    return (
      <ApplicationRouter />
    )
  }

  // logout = () => {
  //   localStorage.removeItem('chat-token')
  //   this.setState({ homePathComponent: Login })
  // }

  // login = token => {
  //   localStorage['chat-token'] = token
  //   this.setState({ homePathComponent: Home })
  // }
}

export default App
