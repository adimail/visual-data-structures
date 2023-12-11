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
      <button className="btn btn-success border border-dark">Add node</button>
      <hr />
      <button className="btn btn-primary border border-dark">Connect</button>
      <div className="input-group w-80">
        <button
          type="button"
          className="w-40 btn btn-primary border border-dark "
          // onClick={() => connectNodes()}
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter the weight between the edges"
          disabled
        >
          Connect Edges
        </button>
        <input
          type="number"
          aria-label="node-1"
          placeholder="weight"
          className="w-30 form-control border border-dark"
          // value={selectedWeight || ""}
          // onChange={(e) => setSelectedWeight(parseInt(e.target.value))}
        />
      </div>
      <hr />
      <div className="input-group w-80">
        <button className="btn btn-warning border border-dark">
          Delete Edge
        </button>
        <button className="btn btn-warning border border-dark">
          Delete Node(s)
        </button>
      </div>
      <button className="btn btn-danger border border-dark">
        Delete Graph
      </button>
    </div>
  );
}

export default AlgorithmNavigation;
