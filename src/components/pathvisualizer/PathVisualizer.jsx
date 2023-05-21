import React from 'react'
import { useState, useEffect } from 'react';
import Node from './Node'
import './PathVisualizer.css'
import * as Djikstras from './algorithms/Djikstras'
import * as BFS from './algorithms/BFS'
import * as Astar from './algorithms/Astar'
import * as GreedySearch from './algorithms/GreedySearch'
import { Slider } from '@mui/material';
function PathVisualizer({ propState, updatePropState}) {

    const [nodes, setNodes] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [startIsPressed, setStartIsPressed] = useState(false);
    const [finishIsPressed, setFinishIsPressed] = useState(false);
    const [START_NODE_ROW, setStart] = useState(10);
    const [START_NODE_COL, setStartCol] = useState(15);
    const [FINISH_NODE_ROW, setFinish] = useState(10);
    const [FINISH_NODE_COL, setFinishCol] = useState(35);
    const [isRunning, setIsRunning] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(11);
    const [endIsReachable, setEndIsReachable] = useState(true);
    

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
            isPath: false,
    }
}


    function createGrid() {
        const grid = []
        for (let row = 0; row < 15; row++) {
            const currentRow = []
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow)
        }


        setNodes(grid);
    }

    useEffect(() => {
        createGrid();
    }, [])


    

   
    function DjikstrasVisualizer(){
        resetBoardWithWalls();
        setIsRunning(true);

        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];

        const visitedNodesInOrder = Djikstras.djikstras(nodes, startNode, finishNode);
        animateDjikstras(visitedNodesInOrder);
        console.log("here",nodes);

    }

    
    function AstarVisualizer(){
        resetBoardWithWalls();
        setIsRunning(true);
        const temp = nodes;
        const startNode = temp[START_NODE_ROW][START_NODE_COL];
        const finishNode = temp[FINISH_NODE_ROW][FINISH_NODE_COL];
        setEndIsReachable(true);

        const visitedNodesInOrders = Astar.Astar(temp, startNode, finishNode);

        console.log('visitedNodesInOrder', visitedNodesInOrders);

        animateDjikstras(visitedNodesInOrders);        
        
    }
    

    function BFSVisualizer(){
        resetBoardWithWalls();
        setIsRunning(true);

        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = BFS.bfs(nodes, startNode, finishNode);
        animateBFS(visitedNodesInOrder);
        console.log("here",visitedNodesInOrder);
    }

    function DFSVisualizer(){
        resetBoardWithWalls();
        setIsRunning(true);

        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = BFS.dfs(nodes, startNode, finishNode);
        animateBFS(visitedNodesInOrder);
        console.log("here",visitedNodesInOrder);
    }

    function GreedyBFSVisualizer(){
        resetBoardWithWalls();
        setIsRunning(true);

        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = GreedySearch.GreedyBFS(nodes, startNode, finishNode);
        animateDjikstras(visitedNodesInOrder);
        console.log("here",visitedNodesInOrder);
    }

    function animateBFS(visitedNodesInOrder){
        if(visitedNodesInOrder === undefined){
            setEndIsReachable(false);
            return;
        }
        else{
        for(let i = 0; i < visitedNodesInOrder.length; i++){
            const tempBoard = nodes.slice();
            const node = visitedNodesInOrder[i];
            const newNode = {
                ...node,
                isVisited: true,
            }
            tempBoard[node.row][node.col] = newNode;

            if(i === visitedNodesInOrder.length - 1){
                setTimeout(() => {
                    const nodesInShortestPathOrder = BFS.visitedNodesInOrder(node);                    
                    

                    animateShortestPath(nodesInShortestPathOrder);
                }, animationSpeed * i);
                return;
            }
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-visited'
                setNodes(tempBoard);

            }, animationSpeed * i);
        }

    }


    }

    function animateDjikstras(visitedNodesInOrder){
        if(visitedNodesInOrder === undefined){
            setEndIsReachable(false);
            return;
        }
        else{
        for(let i = 0; i < visitedNodesInOrder.length; i++){
            const tempBoard = nodes.slice();
            const node = visitedNodesInOrder[i];
            const newNode = {
                ...node,
                isVisited: true,
            }
            tempBoard[node.row][node.col] = newNode;

            if(i === visitedNodesInOrder.length - 1){
                setTimeout(() => {
                    const nodesInShortestPathOrder = Djikstras.visitedNodesInOrder(node);                    
                    

                    animateShortestPath(nodesInShortestPathOrder);
                    
                }, animationSpeed * i);
                console.log("here2",nodes);
                return;
            }
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-visited'
                setNodes(tempBoard);

            }, animationSpeed * i);
        }


    }
    }

    function animateShortestPath(nodesInShortestPathOrder){
        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-path'
                if(nodesInShortestPathOrder.length-1 === i){
                    setIsRunning(false);
                }
            }, (animationSpeed*5 * i));
            
        }

        
    }

    function toggleWall(row,col){

        if(row === START_NODE_ROW && col === START_NODE_COL || row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return;
        const tempBoard = nodes.slice();
        const node =  tempBoard[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
            distance: Infinity,
        };
        tempBoard[row][col] = newNode;
        tempBoard[row][col].isWall = !node.isWall;
        tempBoard[row][col].distance = Infinity;

        setNodes(tempBoard);
    }

    function handleMouseDown(row,col){
        if(nodes[row][col].isStart){
            setStartIsPressed(true);
            setMouseIsPressed(true);

        }

        if(nodes[row][col].isFinish){
            setFinishIsPressed(true);
            setMouseIsPressed(true);
        }
        else{
            toggleWall(row,col);
            setMouseIsPressed(true);

        }
    }

    function handleMouseOver(row,col){
        if(!mouseIsPressed) return;
        if(startIsPressed ){

            if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return;
            if(nodes[row][col].isWall) return;
            else{
                moveStart(row,col);
                return;
            }
        }
        if(finishIsPressed){

            if(row === START_NODE_ROW && col === START_NODE_COL) return;
            if(nodes[row][col].isWall) return;
            moveGoal(row,col);
            return;
        }
        else{
            toggleWall(row,col);

        }
    }

    function handleMouseUp(){
        setMouseIsPressed(false);
        setStartIsPressed(false);
        setFinishIsPressed(false);
    }


    function moveStart(row,col){
        const tempBoard = nodes.slice();
        const node =  tempBoard[row][col];
        const newNode = {
            ...node,
            isStart: true,
        };

        const oldStart = tempBoard[START_NODE_ROW][START_NODE_COL];
        const newOldStart = {
            ...oldStart,
            isStart: false,
        }
        tempBoard[row][col] = newNode;
        tempBoard[row][col].isStart = true;
        tempBoard[START_NODE_ROW][START_NODE_COL] = newOldStart;
        tempBoard[START_NODE_ROW][START_NODE_COL].isStart = false;

        setStart(row);
        setStartCol(col);
        
        setNodes(tempBoard);
    }

    function moveGoal(row,col){
        const tempBoard = nodes.slice();
        const node =  tempBoard[row][col];
        const newNode = {
            ...node,
            isFinish: true,
        };

        const oldFinish = tempBoard[FINISH_NODE_ROW][FINISH_NODE_COL];
        const newOldFinish = {
            ...oldFinish,
            isFinish: false,
        }
        tempBoard[row][col] = newNode;
        tempBoard[FINISH_NODE_ROW][FINISH_NODE_COL] = newOldFinish;
        setFinish(row);
        setFinishCol(col);
        
        setNodes(tempBoard);
    }

    function resetBoardWithWalls(){

        setStart(START_NODE_ROW);
        setStartCol(START_NODE_COL);
        setFinish(FINISH_NODE_ROW);
        setFinishCol(FINISH_NODE_COL);
        
        const tempBoard = nodes.slice();
        for(let row = 0; row < tempBoard.length; row++){
            for(let col = 0; col < tempBoard[0].length; col++){
                const node = tempBoard[row][col];
               
                if(node.isPath || node.isVisited){
                    tempBoard[row][col].isVisited = false;
                    tempBoard[row][col].isPath = false;
                    tempBoard[row][col].distance = Infinity;

                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'

                }
                if(node.isWall){
                    tempBoard[row][col].isWall = true;
                    tempBoard[row][col].distance = Infinity;

                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-wall'

                }

                if(node.isStart){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-start'

                }

                if(node.isStart && (node.row !== START_NODE_ROW || node.col !== START_NODE_COL)){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'

                }

                if(node.isFinish){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-finish'

                }

                if(node.isFinish && (node.row !== FINISH_NODE_ROW || node.col !== FINISH_NODE_COL)){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'

                }
                    

                }


                
                
            }



        
        setNodes(tempBoard);

    }

    



    function resetBoard(){

        setStart(START_NODE_ROW);
        setStartCol(START_NODE_COL);
        setFinish(FINISH_NODE_ROW);
        setFinishCol(FINISH_NODE_COL);
        
        const tempBoard2 = nodes.slice();
        for(let row = 0; row < tempBoard2.length; row++){
            for(let col = 0; col < tempBoard2[0].length; col++){
                const node = tempBoard2[row][col];

                if(node.isVisited){
                    tempBoard2[row][col].isVisited = false;
                    tempBoard2[row][col].distance = Infinity;

                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'
                }
                if(node.isPath){
                    tempBoard2[row][col].isPath = false;
                    tempBoard2[row][col].distance = Infinity;

                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'
                }
                if(node.isWall){
                    tempBoard2[row][col].isWall = false;
                    tempBoard2[row][col].distance = Infinity;

                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'
                }
                if(node.isStart){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-start'

                }

                if(node.isStart && (node.row !== START_NODE_ROW || node.col !== START_NODE_COL)){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'

                }

                if(node.isFinish){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-finish'

                }

                if(node.isFinish && (node.row !== FINISH_NODE_ROW || node.col !== FINISH_NODE_COL)){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-unvisited'

                }
                    

                }


                
                
            }



        setEndIsReachable(true);
        setNodes(tempBoard2);

    }

    function handleSliderChangeTime(e){
        setAnimationSpeed(e.target.value);
    }


    useEffect(() => {
        
        if(!endIsReachable){
            setIsRunning(false);

        }
        
    },[endIsReachable])


    function handleOnClick(){

        updatePropState("home");
  
      }



    

  return (
    <>
    <div className="header">
      <h1 className='headerText'>Pathing Visualizer</h1>
      <button onClick={handleOnClick} className='bar-button'  disabled={isRunning}>Back To Home</button>

    </div>
        <div className="buttonBox">

        <button className="bar-button" onClick={DjikstrasVisualizer} disabled={isRunning}>Djikstras</button>
        <button className="bar-button" onClick={BFSVisualizer} disabled={isRunning}>BFS</button>
        <button className="bar-button" onClick={DFSVisualizer} disabled={isRunning}>DFS</button>
        <button className="bar-button" onClick={AstarVisualizer}disabled={isRunning}>A*</button>
        <button className="bar-button" onClick={GreedyBFSVisualizer}disabled={isRunning} >GreedyBFS</button>
        <button className="bar-button" onClick={resetBoard} disabled={isRunning}>Reset</button>
    </div>
    <h2 className='validText'> {endIsReachable ? "" :"The Goal Cant Be Reached"}</h2>
    <div className="nodeContainer">


    {nodes.map((row, rowIndex) => {
        return <div className='nodeRow' key={rowIndex}>
            {row.map((node, nodeIndex) => {
                const {row, col, isFinish, isStart, isWall} = node;

                return(
                    <Node
                      key={nodeIndex}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isPath={false}
                      onMouseDown={(row,col) => handleMouseDown(row,col)}
                      onMouseOver={(row,col) => handleMouseOver(row,col)}
                      onMouseUp={() => handleMouseUp()}
                      id={`node-${row}-${col}`}
                    ></Node>)}
                )
            }
            
            
        </div>
    }
    )}

    </div>

    <h3 className="sliderHeaders"> Animation Speed</h3>

    <Slider
        defaultValue={11}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={5}
        marks
        min={1}
        max={50}
        onChange={handleSliderChangeTime}
        id='sortbutton9'
        disabled={isRunning}
        className='sort-sliders'

        ></Slider>

        

    </>
  )
}

export default PathVisualizer