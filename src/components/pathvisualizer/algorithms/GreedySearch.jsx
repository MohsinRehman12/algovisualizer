export function GreedyBFS(board, start, finish) {
    if (!start || !finish || start === finish) {
      return false;
    }
    const visitedNodesInOrder = [];
    const fringe = [];
    const closedSet = new Set();
  
    start.distance = 0;
    fringe.push(start);
  
    while (fringe.length > 0) {
      sortNodesByDistance(fringe, finish);
      const closestNode = fringe.shift();
      if (closestNode.isWall || closedSet.has(closestNode)) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finish) return visitedNodesInOrder;
      closedSet.add(closestNode);
      updateNeighborsWithHeuristic(closestNode, board, fringe);
    }
  }
  
  function heuristic(node, finish) {
    const dx = Math.abs(node.col - finish.col);
    const dy = Math.abs(node.row - finish.row);
    return dx + dy;
  }
  
  function getAllNodes(board) {
    const nodes = [];
    for (const row of board) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  function sortNodesByDistance(unvisitedNodes, finish) {
    unvisitedNodes.sort((nodeA, nodeB) => {
      const distanceA = heuristic(nodeA, finish);
      const distanceB = heuristic(nodeB, finish);
      return distanceA - distanceB;
    });
  }
  
  function updateNeighborsWithHeuristic(node, board, fringe) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, board);
    for (const neighbor of unvisitedNeighbors) {
      const tentativeDistance = node.distance + 1;
      if (tentativeDistance < neighbor.distance) {
        neighbor.previousNode = node;
        neighbor.distance = tentativeDistance;
        if (!fringe.includes(neighbor)) {
          fringe.push(neighbor);
        }
      }
    }
  }
  
  function getUnvisitedNeighbors(node, board) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(board[row - 1][col]);
    if (row < board.length - 1) neighbors.push(board[row + 1][col]);
    if (col > 0) neighbors.push(board[row][col - 1]);
    if (col < board[0].length - 1) neighbors.push(board[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
  
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  