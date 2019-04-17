import React, { PureComponent } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Settings from './Settings/Settings'
import Home from '../Auth/Home/Home'

export default class Auth extends PureComponent {
  render () {
    return (
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route path="/" component={Home} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    )
  }
}