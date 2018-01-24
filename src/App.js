import React, { Component } from 'react'
import { mean } from 'mathjs'

import './App.css'
import students from './assets/data.json'

import { GroupTable, GroupDetails } from './components'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      students: students,
      selectedGroupAId: undefined,
      selectedGroupBId: undefined,
      selectedStudentAId: undefined,
      selectedStudentBId: undefined
    }
  }

  handleTableRowClick = (groupNumber) => () => {

    if(this.state.selectedGroupAId === undefined && this.state.selectedGroupBId === undefined) {
      this.setState(state => ({
        selectedGroupAId: groupNumber
      }))
    }
    else if(this.state.selectedGroupAId === groupNumber) {
      this.setState(state => ({
        selectedGroupAId: undefined
      }))
    }
    else if(this.state.selectedGroupBId === groupNumber) {
      this.setState(state => ({
        selectedGroupBId: undefined
      }))
    }
    else if(this.state.selectedGroupAId === undefined) {
      this.setState(state => ({
        selectedGroupAId: groupNumber
      }))
    }
    else if(this.state.selectedGroupBId === undefined) {
      this.setState(state => ({
        selectedGroupBId: groupNumber
      }))
    }

  }

  render() {

    const getMaxSkillValue = (studentsInOneGroup, skillName) => {
      const skillValues = studentsInOneGroup.map(student => student[skillName])
      return skillValues.reduce((acc, curr) => {
        if(acc < curr) {
          acc = curr
        }
        return acc
      }, 0)
    }

    const groupTableData = new Array(10).fill(1).map((value, index) => {
      const groupNumber = index + 1
      const students = this.state.students.filter(student => student.groupNumber === groupNumber)
      return ({
        groupNumber,
        students,
        infoViz: getMaxSkillValue(students, 'infoViz'),
        statistics: getMaxSkillValue(students, 'statistics'),
        math: getMaxSkillValue(students, 'math'),
        arts: getMaxSkillValue(students, 'arts'),
        programming: getMaxSkillValue(students, 'programming'),
        graphicsProgramming: getMaxSkillValue(students, 'graphicsProgramming'),
        interactionProgramming: getMaxSkillValue(students, 'interactionProgramming'),
        git: getMaxSkillValue(students, 'git'),
        uxEvaluation: getMaxSkillValue(students, 'uxEvaluation'),
        teamwork: getMaxSkillValue(students, 'teamwork'),
      })
    })

    const groupTableDataWithAverageScores = groupTableData.map(group => {
      group.averageScore = mean([
        group.infoViz, group.statistics, group.math, group.arts, group.programming, group.graphicsProgramming,
        group.interactionProgramming, group.git, group.uxEvaluation, group.teamwork
      ])
      return group
    })

    const selectedGroupA = groupTableDataWithAverageScores.find(
      group => group.groupNumber === this.state.selectedGroupAId
    )
    const selectedGroupB = groupTableDataWithAverageScores.find(
      group => group.groupNumber === this.state.selectedGroupBId
    )

    // const student = this.state.students[this.state.currentStudentId]
    // const radarChartData = [
    //   { skill: 'Information Visualization', value: student.infoViz },
    //   { skill: 'Statistics', value: student.statistics },
    //   { skill: 'Math', value: student.math },
    //   { skill: 'Arts', value: student.arts },
    //   { skill: 'Programming', value: student.programming },
    //   { skill: 'Computer Graphics', value: student.graphicsProgramming },
    //   { skill: 'Interaction Coding', value: student.interactionProgramming },
    //   { skill: 'Version Control', value: student.git },
    //   { skill: 'UX Evaluation', value: student.uxEvaluation },
    //   { skill: 'Teamwork', value: student.teamwork },
    // ]

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Student Group Formation Visualization</h1>
        </header>
        <div id="appView" className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3 id="groupTitle">Groups balanced on skill level</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <GroupTable 
                data={groupTableDataWithAverageScores}
                onTableRowClick={this.handleTableRowClick}
                primarySelection={this.state.selectedGroupAId}
                secondarySelection={this.state.selectedGroupBId}
                disableRowPointer={(this.state.selectedGroupAId !== undefined) && (this.state.selectedGroupBId !== undefined)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <GroupDetails data={selectedGroupA}/>
            </div>
            <div className="col-6">
              <GroupDetails data={selectedGroupB}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
