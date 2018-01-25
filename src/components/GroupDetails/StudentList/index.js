import React from 'react'

import ClusterLabel from './ClusterLabel'

const StudentList = (props) => {

  return(
    <table className="table table-bordered studentList">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Interest</th>
        </tr>
      </thead>
      <tbody>
        {
          props.students.map(student => {
            let className = ''
            if(props.selectedStudentId === student.id) {
              className = 'table-danger'
            }
            return (
              <tr key={student.id} className={className} onClick={props.onStudentClick(student.id)}>
                <td>{student.alias}</td>
                <td className="clusterCell">
                  <ClusterLabel label={student.clusterLabel} cluster={student.cluster}/>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default StudentList