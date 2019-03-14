import React from 'react'

import Requests from './Requests/Requests'
import Chats from './Chats/Chats'
import Header from './Header/Header'

export default () => {
  return (
    <aside className="bg-indigo-dark min-h-full pt-3 px-2 text-grey-light">
      <div className="mb-5">
        <Header></Header>
      </div>
      <div className="mb-5">
        <Requests></Requests>
      </div>
      <div className="mb-5">
        <Chats></Chats>
      </div>
    </aside>
  )
}