import React from 'react'

const GroupTable = props => {

  const headerTitles = [
    { id: 'groupNumber', text: 'Group' },
    { id: 'averageScore', text: 'Avg. score' },
    { id: 'infoViz', text: 'Info. Vis.' },
    { id: 'statistics', text: 'Statistics' },
    { id: 'math', text: 'Math' },
    { id: 'arts', text: 'Arts' },
    { id: 'programming', text: 'Coding' },
    { id: 'graphicsProgramming', text: 'Graphics' },
    { id: 'interactionProgramming', text: 'Interaction' },
    { id: 'git', text: 'Git' },
    { id: 'uxEvaluation', text: 'UX Eval.' },
    { id: 'teamwork', text: 'Teamwork' },
  ]

  return (
    <div className="table-responsive">
      <table className="table-sm table-bordered table-hover">
        <thead>
          <tr>
            {
              headerTitles.map(({ id, text }) => {
                let className = 'sortable'
                if(id === props.sorting.by && props.sorting.increasing === true) {
                  className = 'increasing'
                }
                else if(id === props.sorting.by && props.sorting.increasing === false) {
                  className = 'decreasing'
                }
                return (
                  <th key={id} scope="col" onClick={props.onTableHeaderClick(id)} className={className}>{text}</th>
                )
              })
            }
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
                  <td>{group.statistics}</td>
                  <td>{group.math}</td>
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