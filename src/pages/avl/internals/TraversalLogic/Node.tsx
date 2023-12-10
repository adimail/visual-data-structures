export default class NodeBackEnd {
  colour: string;
  value: number;
  left: NodeBackEnd | null;
  right: NodeBackEnd | null;
  size: number;
  height: number; // New property for AVL tree
  balanceFactor: number; // New property for AVL tree

  constructor(value: number) {
    this.colour = "lightsalmon";
    this.value = value;
    this.left = null;
    this.right = null;
    this.size = 1;
    this.height = 1; // Initialize height to 1 for a new node
    this.balanceFactor = 0; // Initialize balance factor to 0
  }

  visitNode() {
    this.colour = "lightblue";
  }

  leaveNode() {
    this.colour = "lightsalmon";
  }
}
