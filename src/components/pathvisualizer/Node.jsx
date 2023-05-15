import React from 'react'
import './Node.css'

const Node = ({nodeIdx, row, col, isFinish, isStart, isWall, id, isPath, onMouseUp, onMouseDown, onMouseOver}) => {
  const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall': isPath ? 'node-path': 'node-unvisited';
  
  return (
    <div className={`nodeBox ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseOver={() => onMouseOver(row, col)}
      onMouseUp={() => onMouseUp()}
      
    id={id}
    ></div>
  )
}

export default Node