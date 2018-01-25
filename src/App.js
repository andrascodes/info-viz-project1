import React, { Component } from 'react'
import { mean } from 'mathjs'

import './App.css'
import students from './assets/data.json'

import { GroupTable, GroupDetails, GroupTitle } from './components'

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

    const stateChange = {}
    if(this.state.selectedGroupAId === undefined && this.state.selectedGroupBId === undefined) {
      stateChange.selectedGroupAId = groupNumber
      stateChange.selectedStudentAId = undefined
      stateChange.selectedStudentBId = undefined
    }
    else if(this.state.selectedGroupAId === groupNumber) {
      stateChange.selectedGroupAId = undefined
      stateChange.selectedStudentAId = undefined
    }
    else if(this.state.selectedGroupBId === groupNumber) {
      stateChange.selectedGroupBId = undefined
      stateChange.selectedStudentBId = undefined
    }
    else if(this.state.selectedGroupAId === undefined) {
      stateChange.selectedGroupAId = groupNumber
      stateChange.selectedStudentAId = undefined
    }
    else if(this.state.selectedGroupBId === undefined) {
      stateChange.selectedGroupBId = groupNumber
      stateChange.selectedStudentBId = undefined
    }

    this.setState(state => stateChange)
  }

  handleStudentClick = (selectedGroup) => (studentId) => () => {
    switch (selectedGroup) {
      case 'A':
        this.setState(state => ({
          selectedStudentAId: studentId
        }))
        break;
      case 'B':
        this.setState(state => ({
          selectedStudentBId: studentId
        }))
        break;
      default:
        break;
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

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Student Group Formation Visualization</h1>
        </header>
        <div id="appView" className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3 id="tableTitle">Groups balanced on skill level</h3>
            </div>
          </div>
          <div id="tableView" className="row">
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
          <div id="groupView" className="row">
            <div className="col-md-5">
              <div className="row groupTitle">
                <div className="col-12">
                  <GroupTitle text={this.state.selectedGroupAId}/>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <GroupDetails 
                    data={selectedGroupA} 
                    color="#b8daff"
                    onStudentClick={this.handleStudentClick('A')}
                    selectedStudentId={this.state.selectedStudentAId}
                  />
                </div>
              </div>
            </div>
            <div id="exchangeButtonContainer" className="col-md-2">
              <button type="button" class="btn btn-outline-danger">Exchange students</button>
            </div>
            <div className="col-md-5">
              <div className="row groupTitle">
                <div className="col-12">
                  <GroupTitle text={this.state.selectedGroupBId}/>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <GroupDetails 
                    data={selectedGroupB} 
                    color="#c3e6cb"
                    onStudentClick={this.handleStudentClick('B')}
                    selectedStudentId={this.state.selectedStudentBId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
