import React from 'react'

export default props => {
  let classes = [ 'w-3', 'h-3', 'rounded-full', 'cursor-pointer' ]
  switch (props.status) {
    case 'available':
      classes.push('bg-green')
      break
    case 'away':
      classes.push('bg-orange')
      break
    case 'do-not-disturb':
      classes.push('bg-red')
      break
    default:
      classes.push('bg-green')
      break
  }
  return (
    <div className={classes.join(' ')} title="Click to change">
    </div>
  )
}