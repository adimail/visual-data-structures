import { motion } from "framer-motion";

export const Dijkstra = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Dijkstra's algorithm</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            Path finding algorithms build on top of graph search algorithms and
            explore routes between nodes, starting at one node and traversing
            through relationships until the destination has been reached. These
            algorithms find the cheapest path in terms of the number of hops or
            weight. Weights can be anything measured, such as time, distance,
            capacity, or cost.
          </p>
          <h2>Work in progress...</h2>
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

import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Tooltip } from "bootstrap";

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

  return (
    <div className="gap-2 d-flex flex-column">
      <div className="input-group ">
        <button
          type="button"
          className="border border-dark btn btn-warning"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Select the Tree Traversal Technique"
        >
          Algorithm
        </button>
        <select
          className="border border-black  form-select"
          id="inputGroupSelect01"
        >
          <option value="bs">Dijkstra's algorithm</option>
          <option value="is">A* Algorithm</option>
          <option value="hs">Depth First Search</option>
          <option value="hs">Breadth First Search</option>
        </select>
      </div>
      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary border border-dark "
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Insert a node to the binary tree"
        >
          Insert
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark "
        />
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary border border-dark "
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Remove a node from the binary tree"
        >
          Remove
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark "
        />
      </div>
      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-primary border border-dark "
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Generate a binary tree consisting of given number of nodes"
        >
          Random
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark "
        />
      </div>
    </div>
  );
}
export default Dijkstra;
