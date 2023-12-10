// This file contains the implementation of the Dijkstra's algorithm
import { convertCanvasGraphOutput } from '../utilities/canvas-converter'

// Update the distance vector for each node in the network
export const dijkstraAlgorithm = (graph, startNode) => {
    const convertedGraph = convertCanvasGraphOutput(graph)
    return dijkstra(convertedGraph, startNode)
}

// We calculate which of the node in the remaining graph has the minimum distance to already explored graph
function calculateMinDistance(queue, distances) {
    let min_distance = Infinity
    let min_node = undefined

    // loop over remaining nodes that are not visited
    for (let node of queue) {
        if (distances[node] < min_distance) {
            min_node = node
            min_distance = distances[node]
        }
    }

    return min_node
}

// Function to find graph, the shortest path given a graph and start node and prev array.
// Graph is in form of adjacency list
function dijkstra_path_calculator(startNode, graph, prev) {
    let path = []

    // loop all nodes and trace prev array from dijkstra's algorithm to find the shortest path to all the nodes in
    // the graph
    for (const node in graph) {
        let path_string = ``
        if (node === startNode) {
            path_string = node
        } else {
            let temp_node = node
            path_string = ` ${temp_node} `
            while (startNode !== temp_node) {
                temp_node = prev[temp_node]
                if (temp_node === undefined) {
                    temp_node = startNode
                }
                path_string += ` ${temp_node} `
            }
        }
        path.push(path_string)
    }

    return path
}

// Function to find graph, the shortest path given a graph and start node. Graph is in form of adjacency list
function dijkstra(graph, startNode) {
    let distances = {}
    let visited = {}
    let queue = []
    let prev = {}

    let table = []
    let steps = []

    // init values of table
    for (const node in graph) {
        distances[node] = Infinity
        visited[node] = false
        prev[node] = undefined
        queue.push(node)
    }
    distances[startNode] = 0 // distance to startNode is 0 from startNode

    // loop until all nodes are visited. Till queue is empty
    while (queue.length) {
        // find and remove the node with the smallest distance from the queue
        let currentNode = calculateMinDistance(queue, distances)
        queue.splice(queue.indexOf(currentNode), 1)

        // if visited currentNode then go to next node
        if (visited[currentNode]) continue

        // mark currentNode visited
        visited[currentNode] = true

        let neighbor_text = ``
        // loop over current node's neighbors
        for (let neighbor in graph[currentNode]) {
            // calculate the distance to the neighbor node from the currentNode
            let distance = distances[currentNode] + graph[currentNode][neighbor]

            // if distance is less than the current known distance in the table then update the distance
            if (distance < distances[neighbor]) {
                // auto-generated text to explain what the algorithm is doing for the user
                neighbor_text +=
                    `We find that the distance from ${currentNode} to ${neighbor} is closer than` +
                    ` the value in the table therefore we changed value ${distances[neighbor]} to ${distance}. ` +
                    `Explanation: We do this ` +
                    `by comparing the shortest distance to ${neighbor} in the table compared to the closest distance ` +
                    `to ${neighbor} from ${currentNode} + distance to ${currentNode}.` +
                    `\n\n`

                distances[neighbor] = distance
                prev[neighbor] = currentNode
            }
        }
        table = [Object.keys(distances), Object.values(visited), Object.values(distances), Object.values(prev)]
        let text =
            `Currently we are evaluating node ${currentNode} and we updated the table accordingly. We have ` +
            `visited the neighbours of ${currentNode} which are ${Object.keys(graph[currentNode])}. `

        // check for whether algorithm has changed anything during this step
        if (neighbor_text.length > 0) {
            text = text + `\n\n` + neighbor_text
        } else {
            text =
                text +
                `\n\nWe did not find that the distance from ${currentNode} to its neighbors` +
                ` (${Object.keys(graph[currentNode])}) is closer than the values already in the table therefore we ` +
                `did not change any values in the table`
        }

        // save each step
        steps.push({ table, text })
    }

    // find the shortest path to each other node from a startNode
    const path = dijkstra_path_calculator(startNode, graph, prev)

    return { distances, path, prev, steps }
}
