import NodeBackEnd from "./Node";

class TreeBackEnd {
  head: NodeBackEnd | null;
  order: NodeBackEnd[];

  constructor() {
    this.head = null;
    this.order = [];
  }

  insert(value: number): void {
    if (this.head === null) {
      this.head = new NodeBackEnd(value);
      return;
    }
    this.insertHelper(this.head, value);
  }

  delete(value: number): void {
    if (this.head === null) {
      return;
    }

    let parentNode: NodeBackEnd | null = null;
    let currentNode: NodeBackEnd | null = this.head;

    while (currentNode !== null && currentNode.value !== value) {
      parentNode = currentNode;

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode === null) {
      return;
    }

    if (currentNode.left === null && currentNode.right === null) {
      if (parentNode === null) {
        this.head = null;
      } else if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    } else if (currentNode.left !== null && currentNode.right !== null) {
      const successor = this.findMin(currentNode.right);
      this.delete(successor.value);
      currentNode.value = successor.value;
    } else {
      // Node has one child
      const childNode = currentNode.left ?? currentNode.right;

      if (parentNode === null) {
        // Deleting the root node
        this.head = childNode;
      } else if (parentNode.left === currentNode) {
        parentNode.left = childNode;
      } else {
        parentNode.right = childNode;
      }
    }
  }

  private findMin(node: NodeBackEnd): NodeBackEnd {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  private insertHelper(node: NodeBackEnd, value: number): void {
    if (value > node.value) {
      if (node.right === null) {
        node.right = new NodeBackEnd(value);
        return;
      } else {
        this.insertHelper(node.right, value);
      }
    } else {
      if (node.left === null) {
        node.left = new NodeBackEnd(value);
        return;
      } else {
        this.insertHelper(node.left, value);
      }
    }
  }

  private inOrderTraversal(node: NodeBackEnd | null): void {
    if (node === null) {
      return;
    }
    this.inOrderTraversal(node.left);
    this.order.push(node);
    this.inOrderTraversal(node.right);
  }

  private preOrderTraversal(node: NodeBackEnd | null): void {
    if (node === null) {
      return;
    }
    this.order.push(node);
    this.preOrderTraversal(node.left);
    this.preOrderTraversal(node.right);
  }

  private postOrderTraversal(node: NodeBackEnd | null): void {
    if (node === null) {
      return;
    }
    this.postOrderTraversal(node.left);
    this.postOrderTraversal(node.right);
    this.order.push(node);
  }

  getTraversalResponse(req: "in" | "pre" | "post"): NodeBackEnd[] {
    if (req === "in") {
      this.inOrderTraversal(this.head);
    } else if (req === "pre") {
      this.preOrderTraversal(this.head);
    } else if (req === "post") {
      this.postOrderTraversal(this.head);
    }
    const output = this.order.slice();
    this.order = [];
    return output;
  }
}

export default TreeBackEnd;
