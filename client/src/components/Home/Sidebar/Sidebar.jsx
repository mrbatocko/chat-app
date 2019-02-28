import React from 'react'

import Requests from './Requests/Requests'
import DirectChats from './DirectChats/DirectChats'
import Rooms from './Rooms/Rooms'
import Header from './Header/Header'

import { connectToRoom } from '@/sockets'

export default props => {
  const socket = connectToRoom('meta', { query: { username: props.user.username } })
  return (
    <aside className="bg-indigo-dark min-h-full pt-3 px-2 text-grey-light">
      <div className="mb-5">
        <Header { ...props } socket={socket}></Header>
      </div>
      <div className="mb-5">
        <Requests socket={socket}></Requests>
      </div>
      <div className="mb-5">
        <DirectChats socket={socket}></DirectChats>
      </div>
      <div>
        <Rooms></Rooms>
      </div>
    </aside>
  )
}