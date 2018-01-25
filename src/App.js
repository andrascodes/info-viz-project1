import React, { Component } from 'react'
import { mean } from 'mathjs'

import './App.css'
import students from './assets/data.json'

import { GroupTable, GroupDetails, GroupTitle, ExchangeButton } from './components'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      students: students,
      selectedGroupAId: undefined,
      selectedGroupBId: undefined,
      selectedStudentAId: undefined,
      selectedStudentBId: undefined,
      tableSorting: {
        by: 'groupNumber',
        increasing: true,
      },
    }
  }

  handleTableHeaderClick = (sortBy) => () => {
    console.log(sortBy)
    let increasing = undefined
    if(this.state.tableSorting.increasing === true) {
      increasing = false
    }
    else {
      increasing = true
    }
    
    this.setState(state => ({
      tableSorting: {
        by: sortBy,
        increasing, 
      }
    }))
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

  handleExchangeButtonClick = () => {
    // Exchange this.state.selectedStudentAId, this.state.selectedStudentBId
    // get this.state.students, find the two students, change and setState with new array
    // setState of the selectedStudentAId, selectedStudentBId to undefined
    const studentA = this.state.students.find(student => student.id === this.state.selectedStudentAId)
    const studentB = this.state.students.find(student => student.id === this.state.selectedStudentBId)
    const studentAGroup = studentA.groupNumber
    const studentBGroup = studentB.groupNumber
    studentA.groupNumber = studentBGroup
    studentB.groupNumber = studentAGroup
    this.setState(state => ({
      selectedStudentAId: undefined,
      selectedStudentBId: undefined,
      students: this.state.students
    }))
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

    const sort = (array, byVariableName, increasing) => {
      if(increasing === false) {
        return array.sort((a,b) => {
          if(a[byVariableName] < b[byVariableName]) {
            return 1
          }
          if(a[byVariableName] > b[byVariableName]) {
            return -1
          }
          return 0
        })
      }
      else {
        return array.sort((a,b) => {
          if(a[byVariableName] > b[byVariableName]) {
            return 1
          }
          if(a[byVariableName] < b[byVariableName]) {
            return -1
          }
          return 0
        })
      }
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

    const sortedGroupTableDataWithAverageScores = sort(
      groupTableDataWithAverageScores, 
      this.state.tableSorting.by,
      this.state.tableSorting.increasing
    )

    const selectedGroupA = sortedGroupTableDataWithAverageScores.find(
      group => group.groupNumber === this.state.selectedGroupAId
    )
    const selectedGroupB = sortedGroupTableDataWithAverageScores.find(
      group => group.groupNumber === this.state.selectedGroupBId
    )

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Sorting Hat</h1>
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
                data={sortedGroupTableDataWithAverageScores}
                sorting={this.state.tableSorting}
                onTableRowClick={this.handleTableRowClick}
                onTableHeaderClick={this.handleTableHeaderClick}
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
              <ExchangeButton 
                shouldRender={this.state.selectedStudentAId !== undefined && 
                              this.state.selectedStudentBId !== undefined}
                onClick={this.handleExchangeButtonClick}
              />
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
