import React, { ChangeEvent, FormEvent } from "react";
import "./TreeTraversalVisualizer.css";
import TreeBackEnd from "./TraversalLogic/Tree";

const ANIMATION_SPEED = 999;

interface NodeProps {
  node?: number;
  colour?: string;
}

function Node(props: NodeProps) {
  const colour = props.colour || "";
  return (
    <button
      className="node circle"
      style={{ background: colour, borderRadius: "50%" }}
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMaxNodesChange = this.handleMaxNodesChange.bind(this);
  }

  removeNode() {
    const valueToRemove = parseInt(this.state.lastAddedToTree);
    if (!isNaN(valueToRemove)) {
      this.state.tree.delete(valueToRemove);
      this.setState({ nodes: this.state.nodes - 1 });
    } else {
      alert("Enter a valid number to remove from the tree!");
    }
  }

  generateTree() {
    let newTree = new TreeBackEnd();
    for (let i = 0; i < this.state.maxNodes; i++) {
      newTree.insert(Math.floor(Math.random() * 100) + 1);
    }
    this.setState({ tree: newTree, nodes: this.state.maxNodes });
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
      this.setState({ nodes: this.state.nodes + 1 });
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

  refreshTree(req: "in" | "pre" | "post") {
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
    this.setState({ tree: new TreeBackEnd(), nodes: 0 });
  }

  sendTraversalRequest(req: "in" | "pre" | "post") {
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
      // Add exactly 3 nodes with random numbers from 0 to 99
      newTree.insert(Math.floor(Math.random() * 100));
    }
    this.setState({ tree: newTree, nodes: 3 });
  }

  componentDidMount() {
    this.mount();
  }

  render() {
    return (
      <div>
        <div className="d-flex col-12">
          <div className="col-10">
            <div className="d-flex gap-5 justify-content-between">
              <div className="d-flex flex-row gap-3">
                <p>{`Size: ${this.state.nodes}`}</p>
                <p>{`${this.state.displayTraversal.toString()}`}</p>
              </div>
              <p>
                Note: The UI for this page is unstable, you may have to minimise
                the screen
              </p>
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
                max={25}
                step={1}
                value={this.state.maxNodes}
                onChange={this.handleMaxNodesChange}
              />
            </div>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={() => this.deleteTree()}
            >
              Delete Tree
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => this.generateTree()}
            >
              Generate new Tree
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TreeTraversalVisualizer;
