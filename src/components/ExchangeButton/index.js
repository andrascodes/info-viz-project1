import React from 'react'

const ExchangeButton = (props) => {
  if(props.shouldRender !== false) {
    return (
      <button 
        type="button" 
        className="btn btn-outline-danger"
        onClick={props.onClick}
      >
        Exchange students
      </button>
    )
  }
  else {
    return <div></div>
  }
} 

export default ExchangeButton