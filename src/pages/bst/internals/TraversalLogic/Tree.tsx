import NodeBackEnd from "./Node";

class TreeBackEnd {
  head: NodeBackEnd | null;
  order: NodeBackEnd[];

  constructor() {
    this.head = null;
    this.order = [];
  }

  calculateTreeHeight(node: NodeBackEnd | null): number {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.calculateTreeHeight(node.left);
    const rightHeight = this.calculateTreeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  countLeafNodes(): number {
    return this.countLeafNodesHelper(this.head);
  }

  private countLeafNodesHelper(node: NodeBackEnd | null): number {
    if (node === null) {
      return 0;
    }

    if (node.left === null && node.right === null) {
      return 1;
    }

    return (
      this.countLeafNodesHelper(node.left) +
      this.countLeafNodesHelper(node.right)
    );
  }

  insert(value: number): void {
    if (this.head === null) {
      this.head = new NodeBackEnd(value);
      return;
    }

    if (this.contains(value)) {
      console.log(`Node with value ${value} already exists in the tree.`);
      return;
    }

    this.insertHelper(this.head, value);
    this.sizeHelper(this.head);
  }

  contains(value: number, node: NodeBackEnd | null = this.head): boolean {
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    } else if (value < node.value) {
      return this.contains(value, node.left);
    } else {
      return this.contains(value, node.right);
    }
  }

  size(): number {
    return this.sizeHelper(this.head);
  }

  private sizeHelper(node: NodeBackEnd | null): number {
    if (node === null) {
      return 0;
    }

    const size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    node.size = size;

    return size;
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

    this.sizeHelper(this.head);
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

  inOrderTraversal(node: NodeBackEnd | null): void {
    if (node === null) {
      return;
    }
    this.inOrderTraversal(node.left);
    this.order.push(node);
    this.inOrderTraversal(node.right);
  }

  preOrderTraversal(node: NodeBackEnd | null): void {
    if (node === null) {
      return;
    }
    this.order.push(node);
    this.preOrderTraversal(node.left);
    this.preOrderTraversal(node.right);
  }

  postOrderTraversal(node: NodeBackEnd | null): void {
    if (node === null) {
      return;
    }
    this.postOrderTraversal(node.left);
    this.postOrderTraversal(node.right);
    this.order.push(node);
  }

  depthFirstSearch(node: NodeBackEnd | null = this.head): void {
    if (node === null) {
      return;
    }

    this.order.push(node);

    this.depthFirstSearch(node.left);
    this.depthFirstSearch(node.right);
  }

  breadthFirstSearch(startNode: NodeBackEnd | null = this.head): void {
    if (startNode === null) {
      return;
    }

    const queue: NodeBackEnd[] = [startNode];

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      this.order.push(currentNode);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  getTraversalResponse(
    req: "in" | "pre" | "post" | "dfs" | "bfs"
  ): NodeBackEnd[] {
    if (req === "in") {
      this.inOrderTraversal(this.head);
    } else if (req === "pre") {
      this.preOrderTraversal(this.head);
    } else if (req === "post") {
      this.postOrderTraversal(this.head);
    } else if (req === "dfs") {
      this.depthFirstSearch(this.head);
    } else if (req === "bfs") {
      this.breadthFirstSearch(this.head);
    }
    const output = this.order.slice();
    this.order = [];
    return output;
  }
}

export default TreeBackEnd;
