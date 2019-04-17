import React, { PureComponent } from 'react'
import Requests from './Requests/Requests'
import Chats from './Chats/Chats'
import Header from './Header/Header'
import withChatContextConsumer from '../withChatContextConsumer'
import withRouterContextCosumer from '../../../Router/withRouterContextConsumer'
import { withRouter } from 'react-router-dom'

class Sidebar extends PureComponent {
  render () {
    return (
      <aside className="bg-indigo-dark min-h-full pt-3 px-2 text-grey-light relative">
        <div className="mb-5">
          <Header></Header>
        </div>
        <div className="mb-5">
          <Requests></Requests>
        </div>
        <div className="mb-5">
          <Chats></Chats>
        </div>
        <div className="absolute pin-b pin-r pin-l bg-indigo">
          <button onClick={this.logout} className="w-full py-3 text-white font-thin border-t border-indigo-light uppercase">
            Sign out
          </button>
        </div>
      </aside>
    )
  }
  logout = () => {
    this.props.history.replace('/')
    localStorage.clear()
    this.props.router_methods.renderUnauthRoutes()
  }
}

export default withRouter(
  withRouterContextCosumer(
    withChatContextConsumer(Sidebar)
  )
)
