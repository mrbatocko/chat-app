import React from 'react'

import Header from './Header/Header'
import Messages from './Messages/Messages'

export default props => {
  return (
    <section className="flex flex-col min-h-full">
      <div>
        <Header { ...props }></Header>
      </div>
      <div className="flex flex-col">
        <Messages { ...props }></Messages>
      </div>
    </section>
  )
}
