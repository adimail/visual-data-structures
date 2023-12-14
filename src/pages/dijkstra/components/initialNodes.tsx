import { Node, Edge } from "./DijkstrasAlgorithmCanvas";

export const initialNodes: Node[] = [
  { id: "S", x: 230, y: 40 },
  { id: "A", x: 36, y: 40 },
  { id: "K", x: 420, y: 100 },
  { id: "s", x: 680, y: 140 },
  { id: "H", x: 460, y: 260 },
  { id: "I", x: 630, y: 280 },
];
export const initialEdges: Edge[] = [
  { id: "SA", startNodeId: "S", endNodeId: "A", weight: 2 },
  { id: "Ks", startNodeId: "K", endNodeId: "s", weight: 2 },
  { id: "HI", startNodeId: "H", endNodeId: "I", weight: 2 },
  { id: "SK", startNodeId: "S", endNodeId: "K", weight: 2 },
  { id: "sI", startNodeId: "s", endNodeId: "I", weight: 2 },
  { id: "KH", startNodeId: "K", endNodeId: "H", weight: 2 },
];
