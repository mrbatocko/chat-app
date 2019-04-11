import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Settings from './Settings/Settings'
import Home from '../Auth/Home/Home'

export default class Auth extends PureComponent {
  render () {
    return (
      <div>
        <Route exact path="/settings" component={Settings} />
        <Route path="/:username?" component={Home} />
        {/* <Route render={
              () => {
                return (
                  <Redirect to="/" />
                )
              }
          } /> */}
      </div>
    )
  }
}