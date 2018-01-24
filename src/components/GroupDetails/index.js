import React from 'react'

const GroupDetails = (props) => {
  console.log(props.data)
  if(props.data !== undefined) {
    return (
      <ul>
        {
          props.data.students.map(student => {
            return (
              <li key={student.id}>{student.alias}</li>
            )
          })
        }
      </ul>
    )
  }
  else {
    return <div></div>
  }
}

export default GroupDetails