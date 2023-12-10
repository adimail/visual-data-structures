// Converts the graph's output from canvas-graph to the format that the algorithm expects
export function convertCanvasGraphOutput(graph) {
    let nodes = graph.nodes
    let edges = graph.edges
    let newGraph = {}

    for (let i = 0; i < nodes.length; i++) {
        const currentNodeId = nodes[i].id
        newGraph[currentNodeId] = {} // Initialize an empty object for the current node ID
    }

    for (let j = 0; j < edges.length; j++) {
        let currentEdge = edges[j]

        // Set the edge weight for both directions
        newGraph[currentEdge.startNodeId][currentEdge.endNodeId] = currentEdge.weight
        newGraph[currentEdge.endNodeId][currentEdge.startNodeId] = currentEdge.weight
    }

    return newGraph
}
