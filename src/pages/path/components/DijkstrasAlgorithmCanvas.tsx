import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Tooltip } from "bootstrap";
import React, { useState, useRef, SetStateAction, Dispatch } from "react";
import DraggableNode from "./dragablenode";
import Edge from "./edge";
import "../canvas.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { initialNodes, initialEdges } from "./initialNodes";
import { dijkstraAlgorithm } from "./dijkstraAlgorithm";
import { FaUndo, FaRedoAlt } from "react-icons/fa";

export interface Node {
  id: string;
  x: number;
  y: number;
}

interface DijkstraResult {
  distances: { [key: string]: number };
  path: string[];
  prev: { [key: string]: string | undefined };
  steps: { table: any[]; text: string }[];
}

export interface Edge {
  id: string;
  startNodeId: string;
  endNodeId: string;
  weight: number;
}

export interface Graph {
  [key: string]: { [key: string]: number };
}

const DijkstrasAlgorithmCanvas: React.FC = () => {
  const [selectionBox, setSelectionBox] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dragEnd, setDragEnd] = useState<{ x: number; y: number } | null>(null);

  const [showModal, setShowModal] = useState(true);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [selectedStartNode, setSelectedStartNode] = useState<string>("S");
  const [dijkstraResult, setDijkstraResult] = useState<DijkstraResult>({
    distances: {},
    path: [],
    prev: {},
    steps: [],
  });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);
  const [dijkstraPath, setDijkstraPath] = useState<string[]>([]);
  const [nodeSteps, setNodeSteps] = useState<string[]>([]);
  const [deltaValues, setDeltaValues]: [
    boolean[],
    Dispatch<SetStateAction<boolean[]>>
  ] = useState<boolean[]>([]);
  const [hasFreeNodes, setHasFreeNodes] = useState<boolean>(true);
  const [activeTable, setActiveTable] = useState<
    "currentStep" | "Algorithmstep" | "finalPath"
  >("currentStep");
  const [history, setHistory] = useState<
    {
      nodes: Node[];
      edges: Edge[];
    }[]
  >([]);
  const [redoHistory, setRedoHistory] = useState<
    {
      nodes: Node[];
      edges: Edge[];
    }[]
  >([]);

  const undo = () => {
    if (history.length > 1) {
      const previousState = history[1];
      setRedoHistory((prevRedoHistory) => [
        {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges)),
        },
        ...prevRedoHistory,
      ]);
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setHistory((prevHistory) => prevHistory.slice(1));
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[0];
      setHistory((prevHistory) => [
        {
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(edges)),
        },
        ...prevHistory,
      ]);
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setRedoHistory((prevRedoHistory) => prevRedoHistory.slice(1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  const addToHistory = () => {
    setHistory((prevHistory) => [
      {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
      },
      ...prevHistory,
    ]);
    setRedoHistory([]); // Clear redo history when a new action is performed
  };

  const updateFreeNodesStatus = () => {
    const connectedNodes = new Set<string>();

    edges.forEach((edge) => {
      connectedNodes.add(edge.startNodeId);
      connectedNodes.add(edge.endNodeId);
    });

    const freeNodesExist = nodes.some((node) => !connectedNodes.has(node.id));

    setHasFreeNodes(freeNodesExist);
  };

  useEffect(() => {
    updateFreeNodesStatus();
  }, [nodes, edges]);

  const findEdgeById = (edgeId: string): Edge | undefined => {
    return edges.find(
      (edge) =>
        edge.id === edgeId || edge.id === edgeId.split("").reverse().join("")
    );
  };

  const selectEdge = (edgeId: string) => {
    const edge = findEdgeById(edgeId);

    if (edge && !selectedEdgeIds.includes(edge.id)) {
      setSelectedEdgeIds([...selectedEdgeIds, edge.id]);
    }
  };

  const deselectEdge = (edgeId: string) => {
    const edge = findEdgeById(edgeId);

    if (edge) {
      const updatedSelectedEdgeIds = selectedEdgeIds.filter(
        (id) => id !== edge.id
      );
      setSelectedEdgeIds(updatedSelectedEdgeIds);
    }
  };

  const graphEditingMode = () => {
    return Object.keys(dijkstraResult).length === 0;
  };

  useEffect(() => {
    if (!graphEditingMode() && edges.length > 0) {
      edges.forEach((edge) => {
        if (edge.id) {
          deselectEdge(edge.id);
        }
      });
    }
  }, [currentStep, edges]);

  const convertNodesAndEdgesToGraph = (): Graph => {
    const graph: Graph = {};

    nodes.forEach((node) => {
      graph[node.id] = {};
    });

    edges.forEach((edge) => {
      graph[edge.startNodeId][edge.endNodeId] = edge.weight;
      graph[edge.endNodeId][edge.startNodeId] = edge.weight;
    });

    return graph;
  };

  const calculateResult = () => {
    const currentGraph = convertNodesAndEdgesToGraph();
    const result = dijkstraAlgorithm(currentGraph, selectedStartNode || "");
    setDijkstraResult(result);
    setCurrentStep(0);
  };

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedStartNode("S");
  }, []);

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

  const moveSelectedNodes = (xOffset: number, yOffset: number) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        selectedNodes.includes(node.id)
          ? { ...node, x: node.x + xOffset, y: node.y + yOffset }
          : node
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Delete":
          deleteSelectedNodes();
          addToHistory();
          break;
        case "ArrowUp":
          moveSelectedNodes(0, -3);
          addToHistory();
          break;
        case "ArrowDown":
          moveSelectedNodes(0, 3);
          addToHistory();
          break;
        case "ArrowLeft":
          moveSelectedNodes(-3, 0);
          addToHistory();
          break;
        case "ArrowRight":
          moveSelectedNodes(3, 0);
          addToHistory();
          break;
        default:
          break;
      }

      if (event.ctrlKey) {
        // Handle Ctrl key separately
        switch (event.key) {
          case "ArrowUp":
            moveSelectedNodes(0, -5 * 5);
            addToHistory();
            break;
          case "ArrowDown":
            moveSelectedNodes(0, 5 * 5);
            addToHistory();
            break;
          case "ArrowLeft":
            moveSelectedNodes(-5 * 5, 0);
            addToHistory();
            break;
          case "ArrowRight":
            moveSelectedNodes(5 * 5, 0);
            addToHistory();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveSelectedNodes, selectedNodes]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        addToHistory();
        deleteSelectedNodes();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [deleteSelectedNodes]);

  const handleNodeClick = (
    nodeId: string,
    selected: boolean,
    ctrlKey: boolean
  ) => {
    if (ctrlKey) {
      // If Ctrl key is pressed, select/deselect only the clicked node
      if (selected) {
        setSelectedNodes([nodeId]);
      } else {
        setSelectedNodes([]);
      }
    } else {
      // If Ctrl key is not pressed, handle node selection as before
      if (selected) {
        setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, nodeId]);
      } else {
        setSelectedNodes((prevSelectedNodes) =>
          prevSelectedNodes.filter((id) => id !== nodeId)
        );
      }
    }
  };

  const addNode = (event: React.MouseEvent<SVGSVGElement>) => {
    const ctrlKey = event.ctrlKey || event.metaKey;

    const newNodeId = String.fromCharCode(
      Math.max(...nodes.map((node) => node.id.charCodeAt(0)), 64) + 1
    );
    const newNode: Node = {
      id: newNodeId,
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };

    addToHistory();
    setNodes((prevNodes) => [...prevNodes, newNode]);

    handleNodeClick(newNodeId, false, ctrlKey);
  };

  const deleteEdge = (edgeId: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
    addToHistory();
  };

  const addRandomNode = () => {
    const newNodeId = String.fromCharCode(
      Math.max(...nodes.map((node) => node.id.charCodeAt(0)), 64) + 1
    );

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
    addToHistory();
  };

  const deleteGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNodes([]);
    addToHistory();
  };

  const connectNodes = () => {
    if (selectedNodes.length === 2) {
      const newEdgeId = selectedNodes.join("");
      const reversedEdgeId = newEdgeId.split("").reverse().join("");

      const existingEdge = edges.find(
        (edge) => edge.id === newEdgeId || edge.id === reversedEdgeId
      );

      if (existingEdge) {
        // If the edge already exists, update its weight
        const updatedEdges = edges.map((edge) =>
          edge.id === existingEdge.id
            ? { ...edge, weight: selectedWeight || 1 }
            : edge
        );
        setEdges(updatedEdges);
      } else {
        // If the edge doesn't exist, create a new one
        const newEdge: Edge = {
          endNodeId: selectedNodes[1],
          id: newEdgeId,
          startNodeId: selectedNodes[0],
          weight: selectedWeight || 1,
        };
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }

      setSelectedNodes([]);
      setSelectedWeight(null);
      addToHistory();
    } else {
      console.error("Please select two nodes to connect.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the Ctrl key and Enter key are pressed simultaneously
      if (event.ctrlKey && event.key === "Enter") {
        connectNodes();
        addToHistory();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [connectNodes]);

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    setDragStart({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
    setDragEnd(null);
    setSelectionBox({
      startX: event.nativeEvent.offsetX,
      startY: event.nativeEvent.offsetY,
      endX: event.nativeEvent.offsetX,
      endY: event.nativeEvent.offsetY,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (dragStart) {
      setDragEnd({
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      });

      // Update the selection box
      setSelectionBox({
        startX: dragStart.x,
        startY: dragStart.y,
        endX: event.nativeEvent.offsetX,
        endY: event.nativeEvent.offsetY,
      });
    }
  };

  const handleMouseUp = () => {
    if (dragStart && dragEnd) {
      const selectedNodes = nodes.filter((node) =>
        isNodeInDragRegion(node, dragStart, dragEnd)
      );
      setSelectedNodes(selectedNodes.map((node) => node.id));
    }

    setDragStart(null);
    setDragEnd(null);
    setSelectionBox(null); // Reset selection box when mouse is released
  };

  const isNodeInDragRegion = (
    node: Node,
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    return (
      node.x >= Math.min(start.x, end.x) &&
      node.x <= Math.max(start.x, end.x) &&
      node.y >= Math.min(start.y, end.y) &&
      node.y <= Math.max(start.y, end.y)
    );
  };

  const generateDeltaValues = (
    table: any[],
    action: "backward" | "forward"
  ) => {
    const newDeltaValues = table[1];
    const currentSteps = nodeSteps;

    if (action === "backward") {
      setSelectedNodes([nodeSteps[currentStep - 1]]);
      setDeltaValues(newDeltaValues);
    } else {
      if (nodeSteps.length !== nodes.length) {
        if (deltaValues.length === 0) {
          for (let i = 0; i < newDeltaValues.length; i++) {
            if (newDeltaValues[i] === true) {
              const letter = table[0][i] as string;
              setSelectedNodes([letter]);
              currentSteps.push(letter);
              setNodeSteps(currentSteps);
              break;
            }
          }
        } else {
          const intersection = newDeltaValues.findIndex(
            (element: any[], index: number) => element !== newDeltaValues[index]
          );
          const letter = table[0][intersection];
          setSelectedNodes([letter]);
          currentSteps.push(letter);
          setNodeSteps(currentSteps);
        }
        setDeltaValues(newDeltaValues);
      } else {
        setSelectedNodes([nodeSteps[currentStep + 1]]);
      }
    }
  };

  return (
    <div className="d-flex col-12">
      <div className="canvas-container col-10">
        <div
          className="d-flex gap-5 justify-content-between"
          style={{ paddingRight: "2rem" }}
        >
          <div className="d-flex gap-5">
            <div className="d-flex flex-row gap-5">
              <p>Number of Nodes: {nodes.length}</p>
              <p>Number of Edges: {edges.length}</p>
              {selectedNodes.length > 0 && (
                <>
                  <p>Selected Nodes: {selectedNodes.length}</p>
                  <p>{selectedNodes.toString()}</p>
                </>
              )}
            </div>
          </div>
          <div className="d-flex gap-5" style={{ transform: "scale(0.9)" }}>
            <div className="d-flex gap-4">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div
                  className="legend-button"
                  style={{
                    height: "1.6rem",
                    width: "1.6rem",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                ></div>
                <label>Idle Node</label>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div
                  className="legend-button"
                  style={{
                    height: "1.6rem",
                    width: "1.6rem",
                    backgroundColor: "lightblue",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                ></div>
                <label>Selected Node</label>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div
                  className="legend-button"
                  style={{
                    height: "1.6rem",
                    width: "1.6rem",
                    backgroundColor: "orange",
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                ></div>
                <label>Starting Node</label>
              </div>
            </div>
            <div
              className="d-flex gap-3 px-3"
              style={{ borderLeft: "1px solid black" }}
            >
              <div
                onClick={undo}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <div
                  className=" undo-button"
                  style={{
                    height: "1.6rem",
                    width: "1.6rem",
                    backgroundColor: "white",
                  }}
                >
                  <FaUndo />
                </div>
                <label>Undo</label>
              </div>
              <div
                onClick={redo}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <div
                  className=" undo-button"
                  style={{
                    height: "1.6rem",
                    width: "1.6rem",
                    backgroundColor: "white",
                  }}
                >
                  <FaRedoAlt />
                </div>
                <label>Redo</label>
              </div>
            </div>
          </div>
        </div>
        <div className="DroppableArea">
          <svg
            ref={canvasRef}
            className="canvas"
            onClick={(event) => addNode(event)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {selectionBox && (
              <rect
                x={Math.min(selectionBox.startX, selectionBox.endX)}
                y={Math.min(selectionBox.startY, selectionBox.endY)}
                width={Math.abs(selectionBox.endX - selectionBox.startX)}
                height={Math.abs(selectionBox.endY - selectionBox.startY)}
                fill="rgba(173, 216, 230, 0.5)" // Light blue transparent color
              />
            )}

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
              onClick={(selected, ctrlKey) => {
                handleNodeClick(node.id, selected, ctrlKey);
              }}
              onDrag={(x, y) => {
                updateNodePosition(node.id, x, y);
              }}
              selected={selectedNodes.includes(node.id)}
              startingNode={selectedStartNode === node.id}
              x={node.x}
              y={node.y}
            />
          ))}

          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column gap-0">
              <i>Use arrow keys to move selected nodes</i>
              <i>
                press <code>del</code> to delete selected nodes
              </i>
            </div>
            <div className="d-flex flex-column gap-0">
              <i>Use desktop for best experience</i>
              <i>minimise the window whenever necessary</i>
            </div>
          </div>
        </div>
      </div>

      <div className=" col-2" style={{ maxWidth: "400px", minWidth: "150px" }}>
        <div className="gap-2 d-flex flex-column">
          {!isAlgorithmRunning ? (
            <button
              className="btn btn-outline-success border border-dark btn-lg"
              disabled={hasFreeNodes}
              onClick={() => {
                if (nodes.length > 2) {
                  setIsAlgorithmRunning((prev) => !prev);
                  if (isAlgorithmRunning) {
                    calculateResult();
                  } else {
                    const result = dijkstraAlgorithm(
                      { edges, nodes },
                      selectedStartNode
                    );
                    const steps = result.steps;
                    const path = result.path;

                    setDijkstraResult(steps);
                    setDijkstraPath(path);

                    generateDeltaValues(steps[0].table, "forward");
                  }
                }
              }}
            >
              Calculate Result
            </button>
          ) : (
            <div className="btn-group">
              <button
                className="btn btn-outline-danger border border-dark btn-lg"
                onClick={() => {
                  setIsAlgorithmRunning((prev) => !prev);
                  setDijkstraResult({
                    distances: {},
                    path: [],
                    prev: {},
                    steps: [],
                  });
                  setDijkstraPath([]);
                  setCurrentStep(0);
                  setSelectedEdgeIds([]);
                  setSelectedNodes([]);
                  setEdges(initialEdges);
                  setNodes(initialNodes);
                  setNodeSteps([]);
                  setDeltaValues([]);
                  setSelectedStartNode("S");
                  setHistory([]);
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-outline-primary border border-dark btn-lg"
                onClick={() => {
                  setIsAlgorithmRunning((prev) => !prev);
                }}
              >
                Edit Graph
              </button>
            </div>
          )}

          <hr />

          {!graphEditingMode() && isAlgorithmRunning ? (
            <div className="d-flex flex-column gap-4">
              <div className="btn-group-vertical">
                <button
                  className={`btn btn-outline-success ${
                    activeTable === "currentStep" ? "active" : ""
                  }`}
                  onClick={() => setActiveTable("currentStep")}
                >
                  Current Step
                </button>
                <button
                  className={`btn btn-outline-success ${
                    activeTable === "Algorithmstep" ? "active" : ""
                  }`}
                  onClick={() => setActiveTable("Algorithmstep")}
                >
                  Algorithm Step
                </button>
                <button
                  className={`btn btn-outline-success ${
                    activeTable === "finalPath" ? "active" : ""
                  }`}
                  onClick={() => setActiveTable("finalPath")}
                >
                  Final Path
                </button>
              </div>

              <div className="button-container">
                <button
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
                    generateDeltaValues(
                      dijkstraResult[currentStep - 1].table,
                      "backward"
                    );
                  }}
                >
                  <FaArrowLeft />
                </button>
                <label>
                  {currentStep + 1} / {dijkstraResult.length}
                </label>
                <button
                  disabled={currentStep === dijkstraResult.length - 1}
                  onClick={() => {
                    setCurrentStep((prevStep) =>
                      Math.min(prevStep + 1, dijkstraResult.length - 1)
                    );
                    generateDeltaValues(
                      dijkstraResult[currentStep + 1].table,
                      "forward"
                    );
                  }}
                >
                  <FaArrowRight />
                </button>
              </div>

              <div>
                {activeTable === "currentStep" && (
                  <div>
                    <table className={"table"}>
                      <thead>
                        <tr>
                          <th>Node</th>
                          <th>Visited?</th>
                          <th>Distance</th>
                          <th>Previous</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dijkstraResult[currentStep].table[0].map(
                          (_: any, index: number) => {
                            if (dijkstraResult[currentStep].table[3][index]) {
                              selectEdge(
                                dijkstraResult[currentStep].table[0][index] +
                                  dijkstraResult[currentStep].table[3][index]
                              );
                            }

                            return (
                              <tr key={index}>
                                <td
                                  className={
                                    dijkstraResult[currentStep].table[1][
                                      index
                                    ] && "bg-success text-white"
                                  }
                                >
                                  {dijkstraResult[currentStep].table[0][index]}
                                </td>
                                <td
                                  className={
                                    dijkstraResult[currentStep].table[1][
                                      index
                                    ] && "bg-success text-white"
                                  }
                                >
                                  {dijkstraResult[currentStep].table[1][index]
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td
                                  className={
                                    dijkstraResult[currentStep].table[1][
                                      index
                                    ] && "bg-success text-white"
                                  }
                                >
                                  {dijkstraResult[currentStep].table[2][index]}
                                </td>
                                <td
                                  className={
                                    dijkstraResult[currentStep].table[1][
                                      index
                                    ] && "bg-success text-white"
                                  }
                                >
                                  {dijkstraResult[currentStep].table[3][
                                    index
                                  ] ?? "none"}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTable === "finalPath" && (
                  <>
                    <table className={"table"}>
                      <thead>
                        <tr>
                          <th>Node</th>
                          <th>Final Path</th>
                          <th>Distance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dijkstraResult[currentStep].table[0].map(
                          (_, index: number) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {dijkstraResult[currentStep].table[0][index]}
                                </td>
                                <td>
                                  {dijkstraPath[index]
                                    .split("")
                                    .reverse()
                                    .join("")}
                                </td>
                                <td>
                                  {dijkstraResult[currentStep].table[2][index]}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                {activeTable === "Algorithmstep" && (
                  <div>
                    <p>{dijkstraResult[currentStep].text}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="gap-2 d-flex flex-column">
              <div className="select">
                <label>Select Starting Node:</label>
                <div className="select">
                  <select
                    id="starting-node"
                    onChange={(e) => setSelectedStartNode(e.target.value)}
                    required={true}
                    value={selectedStartNode || "A"}
                    className="form-select"
                  >
                    <option disabled value="">
                      Select starting node
                    </option>
                    {nodes.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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
                  {edges.some(
                    (edge) =>
                      edge.id === selectedNodes.join("") ||
                      edge.id ===
                        selectedNodes.join("").split("").reverse().join("")
                  )
                    ? "Update Weight"
                    : "Connect Nodes"}
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
                disabled={
                  !edges.some(
                    (edge) =>
                      edge.id === selectedNodes.join("") ||
                      edge.id ===
                        selectedNodes.join("").split("").reverse().join("")
                  )
                }
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title={`Delete selected Edge`}
              >
                Delete Edge{" "}
                {edges.some(
                  (edge) =>
                    edge.id === selectedNodes.join("") ||
                    edge.id ===
                      selectedNodes.join("").split("").reverse().join("")
                ) && selectedNodes.join("")}
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

              <button
                className="btn btn-outline-danger border border-dark"
                onClick={() => {
                  setDijkstraResult({
                    distances: {},
                    path: [],
                    prev: {},
                    steps: [],
                  });
                  setDijkstraPath([]);
                  setCurrentStep(0);
                  setSelectedEdgeIds([]);
                  setSelectedNodes([]);
                  setEdges(initialEdges);
                  setNodes(initialNodes);
                  setNodeSteps([]);
                  setDeltaValues([]);
                  setHistory([]);
                }}
              >
                Reset Graph
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        className="modal-xl modal-dialog-scrollable"
        show={showModal}
        onHide={toggleModal}
      >
        <Modal.Header closeButton>
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
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*3aibaGt1-zimnwreliwX0A.gif"
            alt="Dijkstras Algorithm"
            style={{ display: "block", margin: "auto", width: "60%" }}
          />
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
