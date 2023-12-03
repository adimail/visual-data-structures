import { motion } from "framer-motion";

export const ListADT = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>List - Abstract Data Types</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            List ADT represents a collection of elements where the order of
            elements is significant. It supports operations like insertion,
            deletion, and retrieval. Lists can be implemented using arrays or
            linked structures. Common types of lists include arrays, linked
            lists, and doubly linked lists. The choice of list type depends on
            the specific requirements of the application.
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

import { useEffect } from "react";
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
      <div className="input-group">
        <button
          type="button"
          className="btn btn-warning border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Select the type of list ADT you would like to simulate"
        >
          Storage
        </button>
        <select
          className="border border-black  form-select"
          id="inputGroupSelect01"
        >
          <option value="is">Stack</option>
          <option value="hs">Queue</option>
        </select>
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer to be inserted in a list. Do not enter repeated integers."
        >
          Insert
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark"
        />
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer to be deleted from the list."
        >
          Remove
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark"
        />
      </div>
    </div>
  );
}
export default ListADT;
