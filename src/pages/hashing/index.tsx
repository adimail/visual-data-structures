import { motion } from "framer-motion";

export const Hashing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Hashing Algorithm</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            A Binary Search Tree (BST) is a binary tree data structure where
            each node has at most two children, and the left child is smaller,
            and the right child is greater than the node. This structure enables
            efficient search, insertion, and deletion operations. BSTs find
            applications in symbol tables, databases, and compilers due to their
            balanced nature, providing logarithmic time complexity for these
            operations.
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
          Transverse
        </button>
        <select
          className="border border-black  form-select"
          id="inputGroupSelect01"
        >
          <option value="bs">Inorder</option>
          <option value="is">Pre-order</option>
          <option value="hs">Pre-order</option>
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
export default Hashing;
