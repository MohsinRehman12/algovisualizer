import React from 'react'
import { useState, useEffect } from 'react';
import Node from './Node'
import './PathVisualizer.css'
import * as Djikstras from './algorithms/Djikstras'
import * as BFS from './algorithms/BFS'
import * as Astar from './algorithms/Astar'
import * as GreedySearch from './algorithms/GreedySearch'
function PathVisualizer() {

    const [nodes, setNodes] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [startIsPressed, setStartIsPressed] = useState(false);
    const [finishIsPressed, setFinishIsPressed] = useState(false);
    const [START_NODE_ROW, setStart] = useState(10);
    const [START_NODE_COL, setStartCol] = useState(15);
    const [FINISH_NODE_ROW, setFinish] = useState(10);
    const [FINISH_NODE_COL, setFinishCol] = useState(35);
    

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
        createGrid()
    }, [])

    function DjikstrasVisualizer(){

        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = Djikstras.djikstras(nodes, startNode, finishNode);
        const nodesInShortestPathOrder = Djikstras.visitedNodesInOrder(finishNode);
        animateDjikstras(visitedNodesInOrder);
        console.log("here",nodes);

    }

    function AstarVisualizer(){
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = Astar.Astar(nodes, startNode, finishNode);

        animateDjikstras(visitedNodesInOrder);
    }

    function BFSVisualizer(){

        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = BFS.bfs(nodes, startNode, finishNode);
        animateBFS(visitedNodesInOrder);
        console.log("here",visitedNodesInOrder);
    }

    function DFSVisualizer(){
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = BFS.dfs(nodes, startNode, finishNode);
        animateBFS(visitedNodesInOrder);
        console.log("here",visitedNodesInOrder);
    }

    function GreedyBFSVisualizer(){
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = GreedySearch.GreedyBFS(nodes, startNode, finishNode);
        animateDjikstras(visitedNodesInOrder);
        console.log("here",visitedNodesInOrder);
    }

    function animateBFS(visitedNodesInOrder){
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
                }, 10 * i);
                return;
            }
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-visited'
                setNodes(tempBoard);

            }, 10 * i);
        }

        console.log("here",nodes);

    }

    function animateDjikstras(visitedNodesInOrder){
        console.log("here",visitedNodesInOrder);
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
                    
                }, 10 * i);
                console.log("here2",nodes);
                return;
            }
            
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-visited'
                setNodes(tempBoard);

            }, 10 * i);
        }


    }

    function animateShortestPath(nodesInShortestPathOrder){
        for(let i = 0; i < nodesInShortestPathOrder.length; i++){
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'nodeBox node-path'
            }, 50 * i);
        }
    }

    function toggleWall(row,col){

        if(row === START_NODE_ROW && col === START_NODE_COL || row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return;
        const tempBoard = nodes.slice();
        const node =  tempBoard[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        tempBoard[row][col] = newNode;
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

    function handleMouseEnter(row,col){
        if(!mouseIsPressed) return;
        if(startIsPressed ){

            if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return;
            if(nodes[row][col].isWall) return;

            moveStart(row,col);
            return;
        }
        if(finishIsPressed){
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
        tempBoard[START_NODE_ROW][START_NODE_COL] = newOldStart;
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

    

  return (
    <>
        <button onClick={DjikstrasVisualizer}>Djikstras</button>
        <button onClick={BFSVisualizer}>BFS</button>
        <button onClick={DFSVisualizer}>DFS</button>
        <button onClick={AstarVisualizer}>A*</button>
        <button onClick={GreedyBFSVisualizer}>GreedyBFS</button>

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
                      onMouseEnter={(row,col) => handleMouseEnter(row,col)}
                      onMouseUp={() => handleMouseUp()}
                      id={`node-${row}-${col}`}
                    ></Node>)}
                )
            }
            
            
        </div>
    }
    )}

    </div>

    </>
  )
}

export default PathVisualizer