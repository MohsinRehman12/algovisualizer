export function djikstras( board, start, finish){
    if(!start || !finish || start === finish){
        return false
    }
    const visitedNodesInOrder = []
    start.distance = 0
    const unvisitedNodes = getAllNodes(board);
    while(!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        if(closestNode.isWall) continue
        if(closestNode.distance === Infinity) return visitedNodesInOrder
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)
        if(closestNode === finish) return visitedNodesInOrder
        updateUnvisitedNeighbors(closestNode, board)
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

function updateUnvisitedNeighbors(node, board){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, board)
    for(const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
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