import React from 'react'

import Header from './Header/Header'
import Messages from './Messages/Messages'

export default () => {

  return (
    <section className="flex flex-col min-h-full">
      <div>
        <Header></Header>
      </div>
      <div className="flex-grow flex flex-col px-3 pb-3">
        <Messages></Messages>
      </div>
    </section>
  )
}
