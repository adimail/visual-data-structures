import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Tooltip } from "bootstrap";
import React, { useState, useRef } from "react";
import DraggableNode from "./dragablenode";
import Edge from "./edge"; // assuming this is the correct path
import "../assets/styles/canvas.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Edge {
  id: string;
  startNodeId: string;
  endNodeId: string;
  weight: number;
}

const DijkstrasAlgorithmCanvas: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);

  const canvasRef = useRef<SVGSVGElement>(null);

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  const updateNodePosition = (nodeId: string, x: number, y: number) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === nodeId ? { ...node, x, y } : node))
    );
  };

  const handleNodeClick = (nodeId: string, selected: boolean) => {
    if (selected) {
      setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, nodeId]);
    } else {
      setSelectedNodes((prevSelectedNodes) =>
        prevSelectedNodes.filter((id) => id !== nodeId)
      );
    }
  };

  const addNode = (event: React.MouseEvent<SVGSVGElement>) => {
    const newNodeId = String.fromCharCode(
      Math.max(...nodes.map((node) => node.id.charCodeAt(0)), 64) + 1
    );
    const newNode: Node = {
      id: newNodeId,
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteEdge = (edgeId: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
  };

  const addRandomNode = () => {
    const newNodeId = String.fromCharCode(
      Math.max(...nodes.map((node) => node.id.charCodeAt(0)), 64) + 1
    );

    // Generate random coordinates for the new node within the canvas boundaries
    const maxX = canvasRef.current?.clientWidth || 0;
    const maxY = canvasRef.current?.clientHeight || 0;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    const newNode: Node = {
      id: newNodeId,
      x: newX,
      y: newY,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteSelectedNodes = () => {
    setSelectedNodes((prevSelectedNodes) => {
      prevSelectedNodes.forEach((nodeId) => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
        setEdges((prevEdges) =>
          prevEdges.filter(
            (edge) => edge.startNodeId !== nodeId && edge.endNodeId !== nodeId
          )
        );
      });
      return [];
    });
  };

  const deleteGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNodes([]);
  };

  const connectNodes = () => {
    if (selectedNodes.length === 2) {
      const newEdgeId = selectedNodes.join("");
      if (
        !edges.some(
          (edge) =>
            edge.id === newEdgeId ||
            edge.id === newEdgeId.split("").reverse().join("")
        )
      ) {
        const newEdge: Edge = {
          endNodeId: selectedNodes[1],
          id: newEdgeId,
          startNodeId: selectedNodes[0],
          weight: selectedWeight || 1,
        };
        setEdges((prevEdges) => [...prevEdges, newEdge]);
        setSelectedNodes([]);
        setSelectedWeight(null);
      }
    } else {
      console.error("Please select two nodes to connect.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Ctrl key and Enter key are pressed simultaneously
      if (event.ctrlKey && event.key === "Enter") {
        connectNodes();
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleKeyDown);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [connectNodes]);

  return (
    <div className="d-flex col-12">
      <div className="canvas-container col-10">
        <div
          className="d-flex gap-5 justify-content-between"
          style={{ paddingRight: "2rem" }}
        >
          <div className="d-flex flex-row gap-5">
            <p>Number of Nodes: {nodes.length}</p>
            <p>Number of Edges: {edges.length}</p>
            {selectedNodes.length > 0 && (
              <p>Selected Nodes: {selectedNodes.length}</p>
            )}
          </div>
        </div>
        <div className="DroppableArea">
          <svg
            ref={canvasRef}
            className="canvas"
            onClick={(event) => addNode(event)}
          >
            {edges.map((edge) => {
              const startNode = nodes.find(
                (node) => node.id === edge.startNodeId
              );
              const endNode = nodes.find((node) => node.id === edge.endNodeId);

              return (
                <Edge
                  endNode={endNode}
                  key={edge.id}
                  startNode={startNode}
                  weight={edge.weight}
                />
              );
            })}
          </svg>
          {nodes.map((node) => (
            <DraggableNode
              key={node.id}
              nodeId={node.id}
              onClick={(selected) => {
                handleNodeClick(node.id, selected);
              }}
              onDrag={(x, y) => {
                updateNodePosition(node.id, x, y);
              }}
              selected={selectedNodes.includes(node.id)}
              x={node.x}
              y={node.y}
            />
          ))}
        </div>
      </div>

      <div className=" col-2" style={{ maxWidth: "400px", minWidth: "150px" }}>
        <div className="gap-2 d-flex flex-column">
          <button
            className="btn btn-success border border-dark"
            onClick={addRandomNode}
          >
            Add Random node
          </button>
          <hr />
          <button
            className="btn btn-primary border border-dark"
            onClick={connectNodes}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Enter the weight between the edges"
            disabled={!(selectedNodes.length === 2)}
          >
            Connect (ctrl+Enter)
          </button>
          {selectedNodes.length === 2 ? (
            <label>Edge {selectedNodes.join("")}</label>
          ) : (
            <label>No edge detected</label>
          )}

          <div className="input-group w-80">
            <button
              type="button"
              className="w-40 btn btn-primary border border-dark "
              onClick={() => connectNodes()}
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Enter the weight between the edges"
              disabled={!(selectedNodes.length === 2)}
            >
              Connect Edges
            </button>
            <input
              type="number"
              aria-label="node-1"
              placeholder="weight"
              className="w-30 form-control border border-dark"
              value={selectedWeight || ""}
              onChange={(e) => setSelectedWeight(parseInt(e.target.value))}
            />
          </div>
          <hr />
          <button
            className="btn btn-warning border border-dark btn-small"
            onClick={() => deleteEdge(selectedNodes.join(""))}
            disabled={selectedNodes.length !== 2}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title={`Delete selected Edge`}
          >
            Delete Edge {selectedNodes.length === 2 && selectedNodes.join("")}
          </button>

          <button
            className="btn btn-warning border border-dark btn-small"
            onClick={() => deleteSelectedNodes()}
            disabled={selectedNodes.length === 0}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title={`Delete ${selectedNodes.length} ${
              selectedNodes.length > 1 ? "nodes" : "node"
            }`}
          >
            Delete {selectedNodes.length > 0 && selectedNodes.length} Node
            {selectedNodes.length !== 1 && "s"}
          </button>

          <button
            className="btn btn-danger border border-dark"
            onClick={deleteGraph}
          >
            Delete Graph
          </button>

          <hr />

          <button
            className="btn btn-success border border-dark"
            onClick={toggleModal}
          >
            About
          </button>
        </div>
      </div>

      <Modal
        className="modal-xl modal-dialog-scrollable"
        show={showModal}
        onHide={toggleModal}
      >
        <Modal.Header>
          <Modal.Title>Dijkstra's Algorithm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Dijkstra's Algorithm is a graph search algorithm that solves the
            single-source shortest path problem for a graph with non-negative
            edge weights, producing a shortest path tree.
          </p>
          <p>
            The algorithm maintains a set of visited vertices and a set of
            unvisited vertices. It starts at the source vertex and iteratively
            selects the unvisited vertex with the smallest tentative distance
            from the source. It then visits the neighbors of this vertex and
            updates their tentative distances if a shorter path is found. This
            process continues until the destination vertex is reached, or all
            reachable vertices have been visited.
          </p>
          <hr />
          <h5>Dijkstra’s Algorithm Directed and Undirected graphs? </h5>
          <div>
            <p>
              Dijkstra’s algorithm can work on both directed graphs and
              undirected graphs as this algorithm is designed to work on any
              type of graph as long as it meets the requirements of having
              non-negative edge weights and being connected.
            </p>
            <ul>
              <li>
                <p>
                  In a <strong>directed graph,</strong> each edge has a
                  direction, indicating the direction of travel between the
                  vertices connected by the edge. In this case, the algorithm
                  follows the direction of the edges when searching for the
                  shortest path.
                </p>
              </li>
              <li>
                <p>
                  In an <strong>undirected graph,</strong> the edges have no
                  direction, and the algorithm can traverse both forward and
                  backward along the edges when searching for the shortest path.
                </p>
              </li>
            </ul>
            <p>
              There are several ways to Implement Dijkstra’s algorithm, but the
              most common ones are:
            </p>
            <ol>
              <li>Priority Queue (Heap-based Implementation)</li>
              <li>Array-based Implementation</li>
            </ol>
          </div>
          <hr />
          <h5>Algorithm for Dijkstra’s Algorithm</h5>
          <ol>
            <li>
              Mark the source node with a current distance of 0 and the rest
              with infinity.
            </li>
            <li>
              Set the non-visited node with the smallest current distance as the
              current node.
            </li>
            <li>
              For each neighbor, N of the current node:
              <ul>
                <li>
                  Add the current distance of the adjacent node with the weight
                  of the edge connecting 0-1.
                </li>
                <li>
                  If it is smaller than the current distance of Node, set it as
                  the new current distance of N.
                </li>
                <li>Mark the current node 1 as visited.</li>
                <li>Go to step 2 if there are any nodes that are unvisited.</li>
              </ul>
            </li>
          </ol>
          <img
            src="https://ds055uzetaobb.cloudfront.net/image_optimizer/9e7d1e7f0beab28be5095491b4edcb51c22f9a6b.gif"
            alt="Dijkstras Algorithm"
            style={{ display: "block", margin: "auto", width: "60%" }}
          />
          <hr />
          <h5>Complexity Analysis</h5>
          <ul>
            <li>
              <strong>Time complexity:</strong> O((V + E) log V), where V is the
              number of vertices and E is the number of edges.
            </li>
            <li>
              <strong>Auxiliary Space:</strong> O(V), where V is the number of
              vertices and E is the number of edges in the graph.
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DijkstrasAlgorithmCanvas;
