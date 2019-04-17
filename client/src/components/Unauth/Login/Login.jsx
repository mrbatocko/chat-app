import React, { Component } from 'react'
import { login } from '@/services/http/endpoints/auth'
import { RouterContext } from '../../Router/Router'
import { Link } from 'react-router-dom'

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
              <div className="px-4 py-5 rounded absolute"
                style={{
                  width: '360px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate3d(-50%, -50%, 0)'
                }}>
                <h1 className="mb-6 pb-5 uppercase text-center text-white text-4xl border-b border-white">Welcome</h1>
                <form onSubmit={event => this.login(event, context)}>
                  <div className="mb-5">
                    <label htmlFor="login-username" className="text-xs uppercase font-bold tracking-wide block mb-2 pl-3 text-grey-light">Username</label>
                    <input 
                      className="w-full rounded-full py-3 px-3 bg-white" 
                      type="text" 
                      id="login-username" 
                      placeholder="Username"
                      onChange={event => { this.onInputChange('username', event)}}/>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="login-password" className="text-xs uppercase font-bold tracking-wide block mb-2 pl-3 text-grey-light">Password</label>
                    <input 
                      className="w-full rounded-full py-3 px-3 bg-white" 
                      type="password" 
                      id="login-password" 
                      placeholder="Password"
                      onChange={event => { this.onInputChange('password', event)}}/>
                  </div>
                  <div className="text-center pb-5 mb-5 border-b border-white">
                    <button type="submit" className="bg-grey w-32 py-3 rounded-full bg-teal text-white uppercase font-bold ">Login</button>
                  </div>
                  <p className="text-center text-white">
                    Don't have an account? <Link to="/register" className="text-teal">Register now</Link>
                  </p>
                </form>
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
      context.router_methods.renderAuthRoutes()
    }
  }
}
