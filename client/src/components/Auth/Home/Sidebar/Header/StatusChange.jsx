import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faMehBlank, faGrimace } from '@fortawesome/free-solid-svg-icons'

export default props => {
  return (
    <div className="px-3 pt-3 pb-2 bg-indigo-darker">
      <h4 className="text-center mb-2 uppercase text-sm">Change status</h4>
      <div className="flex mb-3">
        <div className="flex-1 text-center text-green cursor-pointer" 
          onClick={() => { props.save('available') }}>
          <div className="h-2 mb-3">
            {
              props.status === 'available' ? 
                <span className="inline-block h-full w-2 rounded-full bg-indigo-light"></span>
                : null
            }
          </div>
          <div>
            <FontAwesomeIcon icon={faSmile} style={{ 'fontSize': '36px' }}></FontAwesomeIcon>
            <p className="pt-2 text-sm">Available</p>
          </div>
        </div>
        <div className="flex-1 text-center text-orange cursor-pointer" 
          onClick={() => { props.save('away') }}>
          <div className="text-center h-2 mb-3">
            {
              props.status === 'away' ? 
                <span className="inline-block h-full w-2 rounded-full bg-indigo-light"></span>
                : null
            }
          </div>
          <div>
            <FontAwesomeIcon icon={faMehBlank} style={{ 'fontSize': '36px' }}></FontAwesomeIcon>
            <p className="pt-2 text-sm">Away</p>
          </div>
        </div>
        <div className="flex-1 text-center text-red-light cursor-pointer" 
          onClick={() => { props.save('do-not-disturb') }}>
          <div className="text-center h-2 mb-3">
            {
              props.status === 'do-not-disturb' ? 
                <span className="inline-block h-full w-2 rounded-full bg-indigo-light"></span>
                : null
            }
          </div>
          <div>
            <FontAwesomeIcon icon={faGrimace} style={{ 'fontSize': '36px' }}></FontAwesomeIcon>
            <p className="pt-2 text-sm">Don't disturb</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="px-2 py-1 text-sm text-grey" onClick={props.cancel}>Cancel</button>
      </div>
    </div>
  )
}