export default class NodeBackEnd {
  colour: string;
  value: number;
  left: NodeBackEnd | null;
  right: NodeBackEnd | null;
  size: number;

  constructor(value: number) {
    this.colour = "lightsalmon";
    this.value = value;
    this.left = null;
    this.right = null;
    this.size = 1;
  }

  visitNode() {
    this.colour = "lightblue";
  }

  leaveNode() {
    this.colour = "lightsalmon";
  }
}
