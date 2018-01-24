import React from 'react'

const GroupTable = props => {
  return (
    <div className="table-responsive">
      <table className="table-sm table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Avg. score</th>
            <th scope="col">Info. Vis.</th>
            <th scope="col">Statistics</th>
            <th scope="col">Math</th>
            <th scope="col">Arts</th>
            <th scope="col">Coding</th>
            <th scope="col">Graphics</th>
            <th scope="col">Interaction</th>
            <th scope="col">Git</th>
            <th scope="col">UX Eval.</th>
            <th scope="col">Teamwork</th>
          </tr>
        </thead>
        <tbody>
          {
            props.data.map(group => {
              let selectedRowClass = ''
              if(group.groupNumber === props.primarySelection) {
                selectedRowClass = 'table-primary'
              }
              else if(group.groupNumber === props.secondarySelection) {
                selectedRowClass = 'table-success'
              }
              else if(props.disableRowPointer) {
                selectedRowClass = 'table-disabled'
              }

              return (
                <tr key={group.groupNumber} 
                    onClick={props.onTableRowClick(group.groupNumber)} 
                    className={selectedRowClass}
                >
                  <th scope="row">{group.groupNumber}</th>
                  <td>{group.averageScore}</td>
                  <td>{group.infoViz}</td>
                  <td>{group.math}</td>
                  <td>{group.statistics}</td>
                  <td>{group.arts}</td>
                  <td>{group.programming}</td>
                  <td>{group.graphicsProgramming}</td>
                  <td>{group.interactionProgramming}</td>
                  <td>{group.git}</td>
                  <td>{group.uxEvaluation}</td>
                  <td>{group.teamwork}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default GroupTable