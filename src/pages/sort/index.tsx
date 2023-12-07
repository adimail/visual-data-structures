import { Tooltip } from "bootstrap";
import { motion } from "framer-motion";
import React from "react";
import SortingVisualizer from "./src/Pages/SortingVisualizer";
import { useEffect, useState } from "react";

export const Sorting = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Sorting Algorithmns</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10 border-none">
          {/* <BarChart
            trace={trace?.[step]}
            numbers={numbers}
            animation={animation}
          /> */}
          <SortingVisualizer />
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

  return (
    <div className="gap-2 d-flex flex-column">
      <div className="input-group">
        <label
          className="border border-dark btn btn-warning"
          htmlFor="inputGroupSelect01"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Select an sorting algorithm for your visualization"
        >
          Algorithm
        </label>
        <select
          className="border border-black  form-select"
          id="inputGroupSelect01"
        >
          <option value="rs">Selection Sort</option>
          <option value="bs">Bubble sort</option>
          <option value="is">Insertion sort</option>
          <option value="hs">Heap sort</option>
          <option value="qs">Quick sort</option>
          <option value="ms">Merge sort</option>
        </select>
      </div>
      <button
        className="btn btn-success btn-auto-width mx-1"
        type="button"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Click here to sort the graph in ascending order"
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

      <div className="input-group">
        <button
          type="button"
          className="btn btn-primary border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Generate a list of random numbers for sorting"
        >
          Random
        </button>
      </div>
    </div>
  );
}

export default Sorting;
