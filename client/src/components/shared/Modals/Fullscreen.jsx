import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default Child => {
  return props => {
    return (
      <div tabIndex="0" 
        onKeyDown={event => {
          if (event.keyCode === 27) {
            props.close()
          }
        }}
        className="w-screen h-screen fixed pin-t pin-l bg-white opacity-75">
        <div className="absolute pin-r pin-t pr-3 pt-3">
          <div onClick={props.close} className="cursor-pointer">
            <FontAwesomeIcon icon={faTimes} style={{ 'color': '#3d4852', 'fontSize': '36px' }}></FontAwesomeIcon>
          </div>
        </div>
        <div className="absolute" style={{ 'top': '6rem', 'left': '50%', 'transform': 'translateX(-50%)' }}>
          <Child { ...props }></Child>
        </div>
      </div>
    )
  }
}