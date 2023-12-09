export default class NodeBackEnd {
  colour: string;
  value: number;
  left: NodeBackEnd | null;
  right: NodeBackEnd | null;

  constructor(value: number) {
    this.colour = "lightsalmon";
    this.value = value;
    this.left = null;
    this.right = null;
  }

  visitNode() {
    this.colour = "lightblue";
  }

  leaveNode() {
    this.colour = "lightsalmon";
  }
}
