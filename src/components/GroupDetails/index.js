import React from 'react'

import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'

import StudentList from './StudentList'

const GroupDetails = (props) => {

  if(props.data !== undefined) {
    const radarChartData = [
      { skill: 'Information Visualization', name: 'infoViz', groupValue: props.data.infoViz, studentValue: undefined },
      { skill: 'Statistics', name: 'statistics', groupValue: props.data.statistics, studentValue: undefined },
      { skill: 'Math', name: 'math', groupValue: props.data.math, studentValue: undefined },
      { skill: 'Arts', name: 'arts', groupValue: props.data.arts, studentValue: undefined },
      { skill: 'Programming', name: 'programming', groupValue: props.data.programming, studentValue: undefined },
      { skill: 'Computer Graphics', name: 'graphicsProgramming', groupValue: props.data.graphicsProgramming, studentValue: undefined },
      { skill: 'Interaction Coding', name: 'interactionProgramming', groupValue: props.data.interactionProgramming, studentValue: undefined },
      { skill: 'Version Control', name: 'git', groupValue: props.data.git, studentValue: undefined },
      { skill: 'UX Evaluation', name: 'uxEvaluation', groupValue: props.data.uxEvaluation, studentValue: undefined },
      { skill: 'Teamwork', name: 'teamwork', groupValue: props.data.teamwork, studentValue: undefined },
    ]

    const selectedStudentRadar = { 
      style: { display: 'none' },
      alias: 'Select a student!'
    }
    if(props.selectedStudentId !== undefined) {
      selectedStudentRadar.style = {}
      const selectedStudent = props.data.students.find(student => student.id === props.selectedStudentId)
      radarChartData.map(skill => skill.studentValue = selectedStudent[skill.name])
      selectedStudentRadar.alias = selectedStudent.alias
      selectedStudentRadar.id = selectedStudent.id
    }

    return (
      <div className="">
        <RadarChart width={450} height={300} data={radarChartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis angle={36} domain={[0, 10]}/>
          <Radar name={`Group ${props.data.groupNumber}`} dataKey="groupValue" stroke={props.color} fill={props.color} fillOpacity={0.5}/>
          <Radar style={selectedStudentRadar.style} name={selectedStudentRadar.alias} dataKey="studentValue" stroke="#f5c6cb" fill="#f5c6cb"fillOpacity={0.5}/>
          <Legend />
          <Tooltip/>
        </RadarChart>
        <StudentList 
          students={props.data.students} 
          onStudentClick={props.onStudentClick}
          selectedStudentId={selectedStudentRadar.id}
        />
      </div>
    )
  }
  else {
    return <div></div>
  }
}

export default GroupDetails