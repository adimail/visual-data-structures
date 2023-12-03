import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "bootstrap";

export const PathFinder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Path Finder</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            Pathfinding is the process of determining a path between two points
            in a graph or grid. It is a common problem in computer science and
            finds applications in various fields, including robotics, gaming,
            and network routing. Algorithms like Dijkstra's algorithm, A*
            algorithm, and Breadth-First Search (BFS) are commonly used for
            pathfinding, each with its strengths and weaknesses.
          </p>
          <canvas className="bg-black h-55 w-50"></canvas>
        </div>
        <div
          className="mw-30 col-2"
          style={{ maxWidth: "400px", minWidth: "150px" }}
        >
          <AlgorithmNavigation />
        </div>
      </div>
    </motion.div>
  );
};

function AlgorithmNavigation() {
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
        >
          Find
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="border border-black form-control"
          placeholder="Start"
        />
        <input
          type="number"
          aria-label="node-2"
          className="border border-black form-control"
          placeholder="End"
        />
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
          className="btn btn-outline-info"
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
          className="btn btn-outline-info"
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

export default PathFinder;
