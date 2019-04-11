import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import Login from './Login/Login'
import Register from './Register/Register'

export default class Auth extends PureComponent {
  render () {
    return (
      <div>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/" component={Login}></Route>
      </div>
    )
  }
}