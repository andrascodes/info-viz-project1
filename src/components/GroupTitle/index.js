import React from 'react'

const GroupTitle = props => {
  if(props.text !== undefined) {
    return (
      <h3>{`Group ${props.text}`}</h3>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

export default GroupTitle