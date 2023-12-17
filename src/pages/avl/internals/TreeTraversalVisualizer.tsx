import React, { ChangeEvent, FormEvent, useState } from "react";
import "./TreeTraversalVisualizer.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TreeBackEnd from "./TraversalLogic/Tree";
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

    this.setState((prevState) => ({
      tree: newTree,
      nodes: prevState.nodes, // Make sure to preserve other state properties
      treeSize: newTree.size(),
      leafNodes: newTree.countLeafNodes(),
      treeHeight: treeHeight,
    }));
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ lastAddedToTree: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    if (
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
          ? `Tree can hold only ${this.state.maxNodes} nodes. Adjust the MAX_NODES property using the slider on control pannel`
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
            <Modal.Title>AVL Tree</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <h4>
                Has few bugs, will fix soon! Send a PR over github{" "}
                <a href="https://github.com/adimail/visual-data-structures">
                  here
                </a>{" "}
                to help me build a AVL tree
              </h4>
              <br />
              <br />
              <br />
              <br />
              <p>
                An AVL tree is a self-balancing binary search tree where the
                difference between heights of left and right subtrees cannot be
                more than one. This difference is known as a balance factor. In
                the AVL tree,{" "}
                <strong>
                  the values of balance factor could be either -1, 0 or 1.
                </strong>
              </p>
              <p>
                In order to perform this balancing, we perform the following
                rotations on the unbalanced/imbalanced Binary Search Tree to
                make it an AVL tree.
              </p>
              <ol>
                <li>Left Rotation</li>
                <li>Right Rotation</li>
                <li>Left Right Rotation</li>
                <li>Right Left Rotation</li>
              </ol>
            </div>
            <div className="d-flex justify-content-center">
              <img
                src="https://qph.cf2.quoracdn.net/main-qimg-33982a51424452d19d8c7fcecc338266"
                alt=""
              />
            </div>
            <hr />
            <h5>A BST is a data structure composed of nodes.</h5>
            <p>It has the following guarantees:</p>
            <ul>
              <li>Each tree has a root node (at the top)</li>
              <li>The root node has zero, one, or two child nodes</li>
              <li>Each child node has zero, one, or two child nodes</li>
              <li>Each node has up to two children</li>
              <li>
                For each node, its left descendants are less than the current
                node, which is less than the right descendants
              </li>
            </ul>

            <hr />

            <h5>AVL trees have an additional guarantee:</h5>
            <p>
              The difference between the depth of right and left sub-trees
              cannot be more than one. This difference is called the balance
              factor.
            </p>
            <p>
              In order to maintain this guarantee, an implementation of an AVL
              will include an algorithm to rebalance the tree when adding an
              additional element would upset this guarantee.
            </p>

            <p>
              AVL trees have a worst case lookup, insert, and delete time of
              O(log n), where n is the number of nodes in the tree. The worst
              case space complexity is O(n).
            </p>
            <hr />
            <h5>AVL Insertion Process</h5>
            <p>
              Insertion in an AVL tree is similar to insertion in a binary
              search tree. But after inserting and element, you need to fix the
              AVL properties using left or right rotations:
            </p>
            <ul>
              <li>
                If there is an imbalance in the left child's right sub-tree,
                perform a left-right rotation
              </li>
              <li>
                If there is an imbalance in the left child's left sub-tree,
                perform a right rotation
              </li>
              <li>
                If there is an imbalance in the right child's right sub-tree,
                perform a left rotation
              </li>
              <li>
                If there is an imbalance in the right child's left sub-tree,
                perform a right-left rotation
              </li>
            </ul>
            <hr />
            <h5>AVL Tree Rotations</h5>
            <p>
              In AVL trees, after each operation like insertion and deletion,
              the balance factor of every node needs to be checked. If every
              node satisfies the balance factor condition, then the operation
              can be concluded. Otherwise, the tree needs to be rebalanced using
              rotation operations.
            </p>

            <p>
              There are four rotations and they are classified into two types:
            </p>
            <ol>
              <li>
                <strong>Left Rotation (LL Rotation):</strong> In left rotations,
                every node moves one position to the left from the current
                position.
                <img
                  src="https://raw.githubusercontent.com/HebleV/valet_parking/master/images/avl_left_rotation.jpg"
                  alt=""
                />
              </li>
              <li>
                <strong>Right Rotation (RR Rotation): </strong> In right
                rotations, every node moves one position to right from the
                current position.
                <img
                  src="https://raw.githubusercontent.com/HebleV/valet_parking/master/images/avl_right_rotation.jpg"
                  alt=""
                />
              </li>
              <li>
                <strong>Left-Right Rotation (LR Rotation): </strong> Left-right
                rotations are a combination of a single left rotation followed
                by a single right rotation. First, every node moves one position
                to the left, then one position to the right from the current
                position.
              </li>
              <li>
                <strong>Right-Left Rotation (RL Rotation): </strong> Right-left
                rotations are a combination of a single right rotation followed
                by a single left rotation. First, every node moves one position
                to the right then, then one position to the left from the
                current position.
              </li>
            </ol>

            <h5>Properties</h5>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default TreeTraversalVisualizer;
