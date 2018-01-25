import React from 'react'

const StudentList = (props) => {

  return(
    <table className="table table-bordered studentList">
      <tbody>
        {
          props.students.map(student => {
            let className = ''
            if(props.selectedStudentId === student.id) {
              className = 'table-danger'
            }
            return (
              <tr key={student.id} className={className}>
                <td onClick={props.onStudentClick(student.id)}>{student.alias}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default StudentList