export function bfs( board, start, finish){
    if(!start || !finish || start === finish){
        return false
    }
    const visitedNodesInOrder = []
    const fringe = [];
    fringe.push(start);

    while(fringe.length>0){

        let currentNode = fringe.shift();
        if(currentNode.isWall) continue;
        if(currentNode.isVisited) continue;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        if(currentNode === finish) return visitedNodesInOrder;
        const unvisitedNeighbors = updateUnvisitedNeighbors(currentNode, board, fringe);
    }

}

export function dfs(board, start, finish) {
    if (!start || !finish || start === finish) {
        return false;
    }
    const visitedNodesInOrder = [];
    const stack = [];
    stack.push(start);
    while (stack.length > 0) {
        const currentNode = stack.pop();
        if (currentNode.isVisited) continue;
        if (currentNode.isWall) continue;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finish) return visitedNodesInOrder;
        const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, board);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
    }
}

function getAllNodes(board){
    const nodes = []
    for(const row of board){
        for(const node of row){
            nodes.push(node)
        }
    }
    return nodes
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node, board, fringe){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, board)
    for(const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
        fringe.push(neighbor);
    }
}

function getUnvisitedNeighbors(node, board){
    const neighbors = []
    const {col, row} = node
    if(row > 0) neighbors.push(board[row - 1][col])
    if(row < board.length - 1) neighbors.push(board[row + 1][col])
    if(col > 0) neighbors.push(board[row][col - 1])
    if(col < board[0].length - 1) neighbors.push(board[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

export function visitedNodesInOrder( finishNode){
    const nodesInShortestPathOrder = []
    let currentNode = finishNode
    while(currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return nodesInShortestPathOrder
}