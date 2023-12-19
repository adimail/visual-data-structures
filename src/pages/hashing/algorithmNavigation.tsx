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

export default AlgorithmNavigation;
