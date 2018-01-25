import React from 'react'

const ClusterLabel = props => {
  const clusterClassMap = ['clusterZero', 'clusterOne', 'clusterTwo', 'clusterThree']

  return (
    <div className={`clusterLabel ${clusterClassMap[props.cluster]}`}>
      {props.label}
    </div>
  )
}

export default ClusterLabel