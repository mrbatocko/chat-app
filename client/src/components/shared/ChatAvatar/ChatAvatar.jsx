import React from 'react'

export default props => {
  let sizeClasses = [ 'bg-cover', 'mr-2' ]
  if (props.circle) {
    sizeClasses.push('rounded-full')
  } else {
    sizeClasses.push('rounded')
  }
  switch (props.size) {
    case 'large':
      sizeClasses.push('w-16', 'h-16')
      break
    case 'small':
      sizeClasses.push('w-6', 'h-6')
      break
      case 'medium':
      sizeClasses.push('w-10', 'h-10')
      break
    default:
      sizeClasses.push('w-10', 'h-10')
      break
  }
  return (
    <div style={{ 'backgroundImage': `url(${props.url})` }} className={sizeClasses.join(' ')}>
    </div>
  )
}