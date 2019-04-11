import React, { Component } from 'react'
import { login } from '@/services/http/endpoints/auth'
import { RouterContext } from '../../Router/Router'

export default class Login extends Component {

  state = {
    user: {
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <RouterContext.Consumer>
        {
          context => {
            return (
              <div className="min-h-screen pt-5">
                <div className="mx-auto max-w-md">
                  <h1 className="mb-3">Login</h1>
                  <form onSubmit={event => this.login(event, context)}>
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
        }
      </RouterContext.Consumer>
    )
  }

  onInputChange = (type, event) => {
    let user = { ...this.state.user }
    user[type] = event.target.value
    this.setState({ user })
  }

  login = async (event, context) => {
    event.preventDefault()
    const { token } = await login(this.state.user)
    if (token) {
      localStorage['chat-token'] = token
      context.methods.login()
    }
  }
}
