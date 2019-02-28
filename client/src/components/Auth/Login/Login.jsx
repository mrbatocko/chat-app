import React, { Component } from 'react'
import { authLogin } from '@/http/endpoints/auth'

export default class Login extends Component {

  state = {
    user: {
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <div className="min-h-screen pt-5">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3">Login</h1>
          <form onSubmit={this.onLogin}>
            <div className="mb-3">
              <label htmlFor="login-username" className="text-sm block mb-1">Username</label>
              <input 
                className="border border-grey w-full" 
                type="text" 
                id="login-username" 
                placeholder="Enter username"
                onChange={event => { this.onInputChange('username', event)}}/>
            </div>
            <div className="mb-3">
              <label htmlFor="login-password" className="text-sm block mb-1">Password</label>
              <input 
                className="border border-grey w-full" 
                type="password" 
                id="login-password" 
                placeholder="Enter password"
                onChange={event => { this.onInputChange('password', event)}}/>
            </div>
            <button type="submit" className="bg-grey">Login</button>
          </form>
        </div>
      </div>
    )
  }

  onInputChange = (type, event) => {
    let user = { ...this.state.user }
    user[type] = event.target.value
    this.setState({ user })
  }

  onLogin = event => {
    event.preventDefault()
    authLogin(this.state.user)
      .then(data => {
        this.props.login(data.token)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
