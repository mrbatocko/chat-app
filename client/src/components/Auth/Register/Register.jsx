import React, { Component } from 'react'
import { authRegister } from '@/http/endpoints/auth'

export default class Auth extends Component {
  state = {
    showPassword: false,
    user: {
      username: '',
      password: '',
      status_message: '',
      use_default_status_message: true
    }
  }

  render () {
    return (
      <div className="min-h-screen pt-5">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3">Register</h1>
          <form onSubmit={this.onRegister}>
            <div className="mb-3">
              <label htmlFor="register-username" className="text-sm block mb-1">Username</label>
              <input 
                className="border border-grey w-full" 
                type="text" 
                id="register-username" 
                placeholder="Enter username"
                onChange={event => { this.onInputChange('username', event)}}/>
            </div>
            <div className="mb-3">
              <div>
                <label htmlFor="register-password" className="text-sm inline-block mb-1 mr-2">Password</label>
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={this.togglePasswordVisibility}>
                  { !this.state.showPassword ? 'Show' : 'Hide' }
                </button>
                <input 
                className="border border-grey w-full" 
                type={ !this.state.showPassword ? 'password' : 'text' } 
                id="register-password" placeholder="Enter password"
                onChange={event => { this.onInputChange('password', event)}}/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="status_message" className="text-sm block mb-1">Status message</label>
              <input 
                type="text" 
                className="border border-grey w-full" 
                id="status_message"
                placeholder="I'm feeling great"
                onChange={event => { this.onInputChange('status_message', event)}}/>
              <div>
                <label>
                  <input 
                    type="checkbox" 
                    checked={this.state.user.use_default_status_message}
                    onChange={event => { this.onInputChange('use_default_status_message', event)}}/> Use default
                </label>
              </div>
            </div>
            <button type="submit" className="bg-grey">Register</button>
          </form>
        </div>
      </div>
    )
  }
  togglePasswordVisibility = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  onInputChange = (type, event) => {
    let user = { ...this.state.user }
    if (event.target.type === 'checkbox') {
      user[type] = event.target.checked
    } else {
      user[type] = event.target.value
    }
    this.setState({ user })
  }
  onRegister = event => {
    event.preventDefault()
    authRegister(this.state.user)
      .then(() => {
        this.props.history.push('/login')
      })
  }
}
