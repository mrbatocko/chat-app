import React from 'react'
import { Route } from 'react-router-dom'
import { API_URL } from '@/services/http/config'

import Login from './Login/Login'
import Register from './Register/Register'

export default () => (
  <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${API_URL}/welcome-bcg.jpg)` }}>
    <div className="bg-indigo-dark min-h-screen text-grey-light min-h-full opacity-75 absolute pin-l pin-t pin-r pin-b">
    </div>
    <div className="relative min-h-screen">
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/" component={Login}></Route>
    </div>
  </div>
)