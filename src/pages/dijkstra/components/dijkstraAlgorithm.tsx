import { Graph } from "./DijkstrasAlgorithmCanvas";

function convertCanvasGraphOutput(graph: any): Graph {
  let nodes = graph.nodes;
  let edges = graph.edges;
  let newGraph: Graph = {};

  for (let i = 0; i < nodes.length; i++) {
    const currentNodeId = nodes[i].id;
    newGraph[currentNodeId] = {};
  }

  for (let j = 0; j < edges.length; j++) {
    let currentEdge = edges[j];

    newGraph[currentEdge.startNodeId][currentEdge.endNodeId] =
      currentEdge.weight;
    newGraph[currentEdge.endNodeId][currentEdge.startNodeId] =
      currentEdge.weight;
  }

  return newGraph;
}
export const dijkstraAlgorithm = (graph: any, startNode: string) => {
  const convertedGraph = convertCanvasGraphOutput(graph);
  return dijkstra(convertedGraph, startNode);
};
function calculateMinDistance(
  queue: string[],
  distances: { [key: string]: number }
): string | undefined {
  let min_distance = Infinity;
  let min_node: string | undefined = undefined;

  for (let node of queue) {
    if (distances[node] < min_distance) {
      min_node = node;
      min_distance = distances[node];
    }
  }

  return min_node;
}
function dijkstra_path_calculator(
  startNode: string,
  graph: Graph,
  prev: { [key: string]: string | undefined }
): string[] {
  let path: string[] = [];

  for (const node in graph) {
    let path_string = ``;
    if (node === startNode) {
      path_string = node;
    } else {
      let temp_node = node;
      path_string = ` ${temp_node} `;
      while (startNode !== temp_node) {
        temp_node = prev[temp_node]!;
        if (temp_node === undefined) {
          temp_node = startNode;
        }
        path_string += ` ${temp_node} `;
      }
    }
    path.push(path_string);
  }

  return path;
}
function dijkstra(graph: Graph, startNode: string) {
  let distances: { [key: string]: number } = {};
  let visited: { [key: string]: boolean } = {};
  let queue: string[] = [];
  let prev: { [key: string]: string | undefined } = {};

  let table: any[] = [];
  let steps: { table: any[]; text: string }[] = [];

  for (const node in graph) {
    distances[node] = Infinity;
    visited[node] = false;
    prev[node] = undefined;
    queue.push(node);
  }
  distances[startNode] = 0;

  while (queue.length) {
    let currentNode = calculateMinDistance(queue, distances)!;
    queue.splice(queue.indexOf(currentNode), 1);

    if (visited[currentNode]) continue;

    visited[currentNode] = true;

    let neighbor_text = ``;
    for (let neighbor in graph[currentNode]) {
      let distance = distances[currentNode] + graph[currentNode][neighbor];

      if (distance < distances[neighbor]) {
        neighbor_text +=
          `We find that the distance from ${currentNode} to ${neighbor} is closer than` +
          ` the value in the table therefore we changed value ${distances[neighbor]} to ${distance}. ` +
          `Explanation: We do this ` +
          `by comparing the shortest distance to ${neighbor} in the table compared to the closest distance ` +
          `to ${neighbor} from ${currentNode} + distance to ${currentNode}.` +
          `\n\n`;

        distances[neighbor] = distance;
        prev[neighbor] = currentNode;
      }
    }
    table = [
      Object.keys(distances),
      Object.values(visited),
      Object.values(distances),
      Object.values(prev),
    ];
    let text =
      `Currently, we are evaluating node ${currentNode} and we updated the table accordingly. We have ` +
      `visited the neighbors of ${currentNode} which are ${Object.keys(
        graph[currentNode]
      )}. `;

    if (neighbor_text.length > 0) {
      text = text + `\n\n` + neighbor_text;
    } else {
      text =
        text +
        `\n\nWe did not find that the distance from ${currentNode} to its neighbors` +
        ` (${Object.keys(
          graph[currentNode]
        )}) is closer than the values already in the table, therefore we ` +
        `did not change any values in the table`;
    }

    steps.push({ table, text });
  }

  const path = dijkstra_path_calculator(startNode, graph, prev);

  return { distances, path, prev, steps };
}
