import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "bootstrap";

export function AlgorithmNavigation() {
  const [startnode, setstartnode] = useState("");
  const [endnode, setendnode] = useState("");
  const [IncompleteNodeMessage, setIncompleteNodeMessage] = useState("");

  const handleFindClick = () => {
    if (!startnode || !endnode) {
      setIncompleteNodeMessage("Please fill both values.");
    } else {
      setIncompleteNodeMessage("");
      console.log("Node 1:", startnode);
      console.log("Node 2:", endnode);
    }
  };

  setTimeout(() => {
    setIncompleteNodeMessage("");
  }, 6832);

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

  const [speed, setSpeed] = useState(1);

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseFloat(event.target.value));
  };

  const [selectedOption, setSelectedOption] = useState("vbtn-radio1");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
  };

  return (
    <div className="gap-2 d-flex flex-column">
      <div className="input-group">
        <label
          className="border border-dark btn btn-warning"
          htmlFor="algorithm"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Select the path finding algorithm you would like to simulate"
        >
          Algorithm
        </label>
        <select className="form-select border border-black ">
          <option value="1">Dijkstra</option>
          <option value="2">A*</option>
          <option value="3">BFS</option>
          <option value="4">DFS</option>
        </select>
      </div>
      <button
        className="btn btn-success btn-auto-width mx-1 "
        type="button"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Click here to simulate graph traversal"
      >
        Start
      </button>
      <div>
        <label htmlFor="speedValue" className="form-label">
          Speed: {speed.toFixed(1)}
        </label>
        <input
          type="range"
          className="form-range"
          min="0.5"
          max="10"
          step="0.1"
          id="speed"
          value={speed}
          onChange={handleSpeedChange}
        />
      </div>

      <div className="input-group my-3">
        <button
          className="btn btn-primary btn-auto-width border border-dark"
          type="button"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Select the starting and ending positions (nodes) in the graph and find the shortest path between them"
          onClick={handleFindClick}
        >
          Find
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="border border-black form-control"
          placeholder="Start"
          value={startnode}
          onChange={(e) => setstartnode(e.target.value)}
        />
        <input
          type="number"
          aria-label="node-2"
          className="border border-black form-control"
          placeholder="End"
          value={endnode}
          onChange={(e) => setendnode(e.target.value)}
        />
        {IncompleteNodeMessage && (
          <p className="text-danger">{IncompleteNodeMessage}</p>
        )}
      </div>

      <div
        className="btn-group-vertical"
        role="group"
        aria-label="Vertical radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="vbtn-radio"
          id="insert-node"
          autoComplete="off"
          checked={selectedOption === "insert-node"}
          onChange={handleRadioChange}
        />
        <label
          className="btn btn-outline-primary"
          htmlFor="insert-node"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Insert a node in the graph using mouse click"
        >
          Insert node
        </label>

        <input
          type="radio"
          className="btn-check"
          name="vbtn-radio"
          id="insert-vertex"
          autoComplete="off"
          checked={selectedOption === "insert-vertex"}
          onChange={handleRadioChange}
        />
        <label
          className="btn btn-outline-primary"
          htmlFor="insert-vertex"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Insert a vertex in the graph using mouse click"
        >
          Insert Vertex
        </label>

        <input
          type="radio"
          className="btn-check"
          name="vbtn-radio"
          id="remove-node"
          autoComplete="off"
          checked={selectedOption === "remove-node"}
          onChange={handleRadioChange}
        />
        <label
          className="btn btn-outline-danger"
          htmlFor="remove-node"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Remove a node in the graph using mouse click"
        >
          Remove node
        </label>

        <input
          type="radio"
          className="btn-check"
          name="vbtn-radio"
          id="remove-vertex"
          autoComplete="off"
          checked={selectedOption === "remove-vertex"}
          onChange={handleRadioChange}
        />
        <label
          className="btn btn-outline-danger"
          htmlFor="remove-vertex"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Remove a vertex in the graph using mouse click"
        >
          Remove Vertex
        </label>
      </div>
    </div>
  );
}
