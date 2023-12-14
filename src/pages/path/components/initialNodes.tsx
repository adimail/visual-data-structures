import { Node, Edge } from "./DijkstrasAlgorithmCanvas";

export const initialNodes: Node[] = [
  { id: "A", x: 68, y: 68 },
  { id: "S", x: 239, y: 24 },
  { id: "N", x: 97, y: 340 },
  { id: "C", x: 543, y: 122 },
  { id: "O", x: 546, y: 205 },
  { id: "F", x: 539, y: 289 },
  { id: "a", x: 1000, y: 52 },
  { id: "H", x: 963, y: 429 },
];

export const initialEdges: Edge[] = [
  { id: "SC", startNodeId: "S", endNodeId: "C", weight: 4 },
  { id: "Ca", startNodeId: "C", endNodeId: "a", weight: 6 },
  { id: "CO", startNodeId: "C", endNodeId: "O", weight: 1 },
  { id: "FO", startNodeId: "F", endNodeId: "O", weight: 1 },
  { id: "AS", startNodeId: "A", endNodeId: "S", weight: 2 },
  { id: "AN", startNodeId: "A", endNodeId: "N", weight: 3 },
  { id: "NF", startNodeId: "N", endNodeId: "F", weight: 7 },
  { id: "aH", startNodeId: "a", endNodeId: "H", weight: 9 },
  { id: "HF", startNodeId: "H", endNodeId: "F", weight: 6 },
];
