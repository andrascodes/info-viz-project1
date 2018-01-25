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
              <tr className={className}>
                <td scope="row" key={student.id} onClick={props.onStudentClick(student.id)}>{student.alias}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default StudentList