import React, { ChangeEvent, FormEvent, useState } from "react";
import "./TreeTraversalVisualizer.css";
import TreeBackEnd from "./TraversalLogic/Tree";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const ANIMATION_SPEED = 999;

interface NodeProps {
  node?: number;
  colour?: string;
}

function Node(props: NodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const colour = props.colour || "";
  const scale = isHovered ? 1.15 : 1;

  return (
    <button
      className={`node circle ${isHovered ? "hovered" : ""}`}
      style={{
        background: colour,
        borderRadius: "50%",
        transform: `scale(${scale})`,
        transition: "transform 0.3s ease", // Add a smooth transition for scaling
        cursor: "default", // Prevent cursor style change on hover
        overflow: "hidden", // Add overflow hidden
        zIndex: 1, // Set a higher z-index to keep the button on top
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.node}
    </button>
  );
}

interface TreeTraversalVisualizerState {
  tree: TreeBackEnd;
  lastAddedToTree: string;
  displayTraversal: number[];
  nodes: number;
  maxNodes: number;
  treeSize: number;
  leafNodes: number;
  treeHeight: number;
  searchValue: string;
  arrayInput: string;
  showModal: boolean;
  inOrderTraversal: number[];
  preOrderTraversal: number[];
  postOrderTraversal: number[];
  showcontrols: boolean;
}

class TreeTraversalVisualizer extends React.Component<
  {},
  TreeTraversalVisualizerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tree: new TreeBackEnd(),
      lastAddedToTree: "",
      displayTraversal: [],
      nodes: 0,
      maxNodes: 15,
      treeSize: 0,
      leafNodes: 1,
      searchValue: "",
      arrayInput: "",
      treeHeight: 1,
      showModal: true,
      inOrderTraversal: [],
      preOrderTraversal: [],
      postOrderTraversal: [],
      showcontrols: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMaxNodesChange = this.handleMaxNodesChange.bind(this);
  }

  handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: event.target.value });
  }

  handleChangeArray(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ arrayInput: event.target.value });
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  removeNode() {
    const valueToRemove = parseInt(this.state.lastAddedToTree);
    if (!isNaN(valueToRemove) && this.state.tree.contains(valueToRemove)) {
      this.state.tree.delete(valueToRemove);
      this.setState({
        nodes: this.state.nodes - 1,
        treeSize: this.state.treeSize - 1,
        treeHeight: this.state.tree.calculateTreeHeight(this.state.tree.head),
        leafNodes: this.state.tree.countLeafNodes(),
      });
    } else {
      alert("Enter a valid number to remove from the tree!");
    }
  }

  generateTree() {
    let newTree = new TreeBackEnd();
    for (let i = 0; i < this.state.maxNodes - 3; i++) {
      newTree.insert(Math.floor(Math.random() * 100) + 1);
    }
    const treeHeight = newTree.calculateTreeHeight(newTree.head);
    this.setState({
      tree: newTree,
      nodes: this.state.tree.size(),
      treeSize: newTree.size(),
      leafNodes: newTree.countLeafNodes(),
      treeHeight: treeHeight,
    });
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ lastAddedToTree: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    if (this.state.arrayInput) {
      // Split the array input string into an array of values
      const values = this.state.arrayInput
        .split(",")
        .map((value) => parseInt(value.trim()));

      // Check if the values are valid numbers
      if (values.every((value) => !isNaN(value))) {
        // Insert each value into the tree
        values.forEach((value) => {
          if (this.state.nodes < this.state.maxNodes) {
            this.state.tree.insert(value);
            this.setState({
              leafNodes: this.state.tree.countLeafNodes(),
              treeSize: this.state.tree.size(),
              treeHeight: this.state.tree.calculateTreeHeight(
                this.state.tree.head
              ),
            });
          }
        });
      } else {
        alert(
          "Invalid values in the array. Please enter valid numbers separated by commas."
        );
      }
    } else if (
      parseInt(this.state.lastAddedToTree) &&
      this.state.nodes < this.state.maxNodes
    ) {
      this.state.tree.insert(parseInt(this.state.lastAddedToTree));
      this.setState({
        leafNodes: this.state.tree.countLeafNodes(),
        treeSize: this.state.tree.size(),
        treeHeight: this.state.tree.calculateTreeHeight(this.state.tree.head),
      });
    } else {
      let message =
        this.state.nodes === this.state.maxNodes
          ? `Tree can hold only ${this.state.maxNodes} nodes. Adjust the MAX_NODES property using the slider on control panel`
          : "Enter a number, please!";
      alert(message);
    }
    event.preventDefault();
  }

  handleMaxNodesChange(event: ChangeEvent<HTMLInputElement>) {
    const newMaxNodes = parseInt(event.target.value);
    this.setState({ maxNodes: newMaxNodes });
  }

  refreshTree(req: "in" | "pre" | "post" | "dfs" | "bfs") {
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    let animation = this.state.tree.getTraversalResponse(req);
    for (let i = 0; i < animation.length; i++) {
      animation[i].leaveNode();
    }
    this.setState({ displayTraversal: [] });
  }

  deleteTree() {
    this.refreshTree("post");
    this.setState({
      tree: new TreeBackEnd(),
      treeSize: 0,
      leafNodes: 0,
      treeHeight: 0,
    });
  }

  sendTraversalRequest(req: "in" | "pre" | "post" | "dfs" | "bfs") {
    if (this.state.tree.head == null) {
      alert("You have an empty tree, add some elements!");
      return;
    }
    this.refreshTree(req);
    let animation = this.state.tree.getTraversalResponse(req);
    for (let i = 0; i < animation.length; i++) {
      setTimeout(() => {
        animation[i].visitNode();
        const temp = this.state.displayTraversal
          .slice()
          .concat([animation[i].value]);
        this.setState({ displayTraversal: temp });
      }, i * ANIMATION_SPEED);
    }
    setTimeout(() => {
      this.refreshTree(req);
    }, (animation.length + 10) * ANIMATION_SPEED);
  }

  renderTreeRecursive(node: any) {
    if (node == null || (node.right == null && node.left == null)) {
      return;
    }
    return (
      <ul>
        {node.left && (
          <li key={node.left.value}>
            <Node node={node.left.value} colour={node.left.colour}></Node>
            {this.renderTreeRecursive(node.left)}
          </li>
        )}
        {!node.left && node.right && (
          <li key="emptyLeftNode">
            <Node></Node>
          </li>
        )}
        {node.right && (
          <li key={node.right.value}>
            <Node node={node.right.value} colour={node.right.colour}></Node>
            {this.renderTreeRecursive(node.right)}
          </li>
        )}
        {!node.right && node.left && (
          <li key="emptyRightNode">
            <Node></Node>
          </li>
        )}
      </ul>
    );
  }

  mount() {
    let newTree = new TreeBackEnd();
    for (let i = 0; i < 3; i++) {
      newTree.insert(Math.floor(Math.random() * 100));
    }
    const treeHeight = newTree.calculateTreeHeight(newTree.head);
    this.setState({
      tree: newTree,
      nodes: 3,
      treeSize: newTree.size(),
      leafNodes: newTree.countLeafNodes(),
      treeHeight: treeHeight,
    });
  }

  componentDidMount() {
    this.mount();
  }

  render() {
    return (
      <div>
        <div className="d-flex col-12">
          <div className={`col-${this.state.showcontrols ? "10" : "12"}`}>
            <div
              className="d-flex gap-5 justify-content-between"
              style={{ paddingRight: "2rem" }}
            >
              <div className="d-flex flex-row gap-3">
                <p>{`Size: ${this.state.treeSize}`}</p>
                <p>{`Leaf Nodes: ${this.state.leafNodes}`}</p>
                <p>{`Tree Height: ${this.state.treeHeight}`}</p>{" "}
                <p>{`${this.state.displayTraversal.toString()}`}</p>
              </div>
              <i>
                Note: The UI for this page is unstable, you may have to minimise
                the screen at times
              </i>

              <button
                className="gap-3 align-items-center d-flex btn"
                style={{ height: "fit-content" }}
                onClick={() =>
                  this.setState((prevState) => ({
                    showcontrols: !prevState.showcontrols,
                  }))
                }
              >
                {!this.state.showcontrols && <FaArrowLeft />}
                {this.state.showcontrols && <FaArrowRight />}
              </button>
            </div>

            <div className="d-flex align-items=center justify-content-center">
              {this.state.tree.head && (
                <div className="tree">
                  <ul>
                    <li key={this.state.tree.head.value}>
                      <Node
                        node={this.state.tree.head.value}
                        colour={this.state.tree.head.colour}
                      ></Node>
                      {this.renderTreeRecursive(this.state.tree.head)}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {this.state.showcontrols && (
            <div className="query-component gap-2 d-flex flex-column col-2">
              <div className="input-group w-80">
                <button
                  type="button"
                  className="w-50 btn btn-secondary border border-dark "
                  onClick={this.handleSubmit}
                >
                  Insert Array
                </button>
                <input
                  className="w-30 form-control border border-dark "
                  type="text"
                  placeholder="Integers separated by comma"
                  value={this.state.arrayInput}
                  onChange={(e) => this.handleChangeArray(e)}
                />
              </div>

              <div className="input-group w-80">
                <button
                  type="button"
                  className="w-50 btn btn-secondary border border-dark "
                  onClick={this.handleSubmit}
                >
                  Insert
                </button>
                <input
                  className="w-30 form-control border border-dark "
                  type="number"
                  placeholder="Integer"
                  value={this.state.lastAddedToTree}
                  onChange={this.handleChange}
                />
              </div>

              <div className="input-group w-80">
                <button
                  type="button"
                  className="w-50 btn btn-secondary border border-dark "
                  onClick={() => this.removeNode()}
                >
                  Remove
                </button>
                <input
                  className="w-30 form-control border border-dark "
                  type="number"
                  placeholder="Integer"
                  value={this.state.lastAddedToTree}
                  onChange={this.handleChange}
                />
              </div>
              <hr />
              <div className="btn-group-vertical">
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.sendTraversalRequest("in")}
                >
                  Inorder Transversal
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.sendTraversalRequest("pre")}
                >
                  Pre-Order Transversal
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.sendTraversalRequest("post")}
                >
                  Post-Order Transversal
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.sendTraversalRequest("dfs")}
                >
                  Depth First Search
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.sendTraversalRequest("bfs")}
                >
                  Breadth First Search
                </button>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <p>Max Nodes: {this.state.maxNodes}</p>
                </div>
                <input
                  className={`form-range ${
                    this.state.maxNodes > 17 ? "slider-red" : ""
                  }`}
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={this.state.maxNodes}
                  onChange={this.handleMaxNodesChange}
                />
              </div>
              <hr />
              <button
                className="btn btn-success"
                onClick={() => this.generateTree()}
              >
                Generate new Tree
              </button>
              <button className="btn btn-success" onClick={this.toggleModal}>
                About
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => this.deleteTree()}
              >
                Delete Tree
              </button>
            </div>
          )}
        </div>
        <Modal
          className="modal-xl modal-dialog-scrollable"
          show={this.state.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Binary Search Tree</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <p>
                The binary search tree also follows the properties of the binary
                search. In binary search, all the elements in an array must be
                in sorted order. We calculate the middle element in the binary
                search in which the left part of the middle element contains the
                value lesser than the middle value, and the right part of the
                middle element contains the values greater than the middle
                value. In Binary Search Tree, the middle element becomes the
                root node, the right part becomes the right subtree, and the
                left part becomes the left subtree. Therefore, we can say that
                the binary search tree is a combination of a binary tree and
                binary search.
              </p>
              Binary Search Tree is a node-based binary tree data structure
              which has the following properties:
              <ol>
                <li>
                  The left subtree of a node contains only nodes with keys
                  lesser than the nodes key.
                </li>
                <li>
                  The right subtree of a node contains only nodes with keys
                  greater than the nodes key.
                </li>
                <li>
                  The left and right subtree each must also be a binary search
                  tree.
                </li>
              </ol>
            </div>
            <hr />
            <h5>This Tree</h5>
            <div className="d-flex">
              <div className="container d-flex gap-4">
                <div>
                  <h6>{`Number of nodes:`}</h6>
                  <h6>{`Leaf Nodes:`}</h6>
                  <h6>{`Tree Height:`}</h6>{" "}
                </div>
                <div>
                  <h6>{this.state.treeSize}</h6>
                  <h6>{this.state.leafNodes}</h6>
                  <h6>{this.state.treeHeight}</h6>{" "}
                </div>
              </div>

              <div className="container d-flex gap-4">
                <div>
                  <h6>{`Inorder Traversal:`}</h6>
                  <h6>{`Pre-order Traversal:`}</h6>
                  <h6>{`Post-order Traversal:`}</h6>{" "}
                </div>
                <div>
                  <h6>{"Left -> Root -> Right"}</h6>
                  <h6>{"Root -> Left -> Right"}</h6>
                  <h6>{"Left -> Right -> Root"}</h6>
                </div>
              </div>
            </div>
            <hr />
            <h5>Properties of binary search tree</h5>
            <div>
              <ul>
                <li>
                  The maximum number of nodes at level ‘n’ of a binary tree is 2{" "}
                  <sup>n</sup>
                </li>
                <li>
                  The Maximum number of nodes in a binary tree of height ‘h’ is
                  2 <sup>h</sup> – 1:
                </li>
                <li>
                  In a Binary Tree with N nodes, the minimum possible height or
                  the minimum number of levels is Log2(N+1):
                </li>
                <li>
                  A Binary Tree with L leaves has at least | Log2L |+ 1 levels
                </li>
                <li>
                  In a non-empty binary tree, if n is the total number of nodes
                  and e is the total number of edges, then e = n-1
                </li>
              </ul>
              <p>
                Each node of a Binary Search Tree (BST) stores a piece of data.
                Part of that data is the key by which the BST is organized. Each
                node in the BST has below it a left subtree and a right subtree.
                <br />
                <ul>
                  <li>
                    The topmost node is called the <strong>root</strong>
                  </li>
                  <li>
                    node with no subtrees is called a <strong>leaf</strong>
                  </li>
                  <li>
                    For a node, x, with key, k, every key in x's left subtree is
                    less than or equal to k, and every key in x's right subtree
                    is greater than or equal to k.
                  </li>
                </ul>
                Note that the definition permits duplicate keys. Some BSTs don't
                permit duplicate keys. Whether to permit duplicate keys depends
                upon the application that uses the BST.
              </p>
              <img
                src="https://www.mit.edu/~6.005/sp11/psets/ps2/Figure%201.png" // Replace with the actual URL to your image
                alt="Sorting Algorithm Image"
                style={{ display: "block", margin: "auto", width: "60%" }}
              />
            </div>
            <hr />
            <h5>Implementing a BST</h5>
            <p>
              <ul>
                <li>
                  The navigation can be done recursively roughly as:
                  <ol>
                    <li>if this node is NULL then return false</li>
                    <li>
                      else if this node's key matches the search key then copy
                      the item at this node and return true
                    </li>
                    <li>
                      else if this node's key is less than the search key then
                      recursively search the right subtree
                    </li>
                    <li>else recursively search the left subtree</li>
                  </ol>
                </li>
                <li>
                  Insertion <br />
                  Insert can uses a very similar navigation through the tree as
                  search. However, for variety we can see how insert can be
                  implemented iteratively:
                  <ol>
                    <li>
                      special case if the tree is empty --- allocate a leaf node
                      and make root point to it
                    </li>
                    <li>otherwise, make a pointer, t, to the root</li>
                    <li>
                      While t is not NULL and the key of t is not a match with
                      the insert key
                      <ol>
                        <li>
                          if t's key is less than the insert key then let t
                          point to its right child
                        </li>
                        <li>
                          if t's key is greater than the insert key then let t
                          point to its left child
                        </li>
                      </ol>
                    </li>
                    <li>
                      if a match was not found than allocate a new leaf for the
                      insertion.
                    </li>
                  </ol>
                </li>
                <li>
                  Deletion <br />
                  There are three cases we need to consider for deletion:
                  <ol>
                    <li>Deleting a leaf --- simply remove it:</li>
                    <li>
                      Deleting a node with one child --- remove it and move its
                      child (the subtree rooted at its child) up
                    </li>
                    <li>
                      Deleting a node with two children --- swap with the
                      smallest keyed-child in its right subtree, then remove
                    </li>
                  </ol>
                </li>
              </ul>
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default TreeTraversalVisualizer;
