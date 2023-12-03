// LinkedList.ts

class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedListClass {
  private head: Node | null;

  constructor() {
    this.head = null;
  }

  insert(data: number): void {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current: Node | null = this.head;
      while (current && current.next) {
        current = current.next;
      }
      if (current) {
        current.next = newNode;
      }
    }

    console.log("Insert: ", data);
  }

  remove(data: number): void {
    if (!this.head) {
      console.log("List is empty. Cannot remove from an empty list.");
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      console.log("Remove: ", data);
      return;
    }

    let current: Node | null = this.head;
    let prev: Node | null = null;

    while (current && current.data !== data) {
      prev = current;
      current = current.next;
    }

    if (!current) {
      console.log("Element not found in the list.");
      return;
    }

    if (prev) {
      prev.next = current.next;
    }

    console.log("Remove: ", data);
  }

  generateRandom(length: number): void {
    for (let i = 0; i < length; i++) {
      const data = Math.floor(Math.random() * 100); // You can adjust the range as needed
      this.insert(data);
    }

    console.log("Generate list of ", length, " nodes");
  }
}
