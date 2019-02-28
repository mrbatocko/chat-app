import React, { Component } from 'react'

export default class StatusMessageEdit extends Component {
  inputRef = React.createRef()

  componentDidMount () {
    this.setState({ status_message: this.props.status_message })
    this.inputRef.current.focus()
  }


  state = {
    status_message: ''
  }

  render () {
    return (
      <div className="px-3 pt-3 pb-2 bg-indigo-darker">
        <h4 className="text-center mb-2 uppercase text-sm">New status message</h4>
        <input 
          ref={this.inputRef}
          className="py-1 px-2 font-thin mb-2 w-full border text-grey-dark appearance-none outline-none rounded"
          type="text" value={this.state.status_message} onChange={this.statusMessageChange}/>
          <button className="px-2 py-1 text-sm bg-green text-white rounded" onClick={() => { this.props.save(this.state.status_message) }}>Save</button>
          <button className="px-2 py-1 text-sm text-grey" onClick={this.props.cancel}>Cancel</button>
      </div>
    )
  }

  statusMessageChange = event => {
    this.setState({ status_message: event.target.value })
  }
}