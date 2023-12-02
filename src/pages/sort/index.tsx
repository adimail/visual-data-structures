import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "bootstrap";

export const Sorting = () => {
  return (
    <div>
      <h5>Sorting Algorithmns</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            Path finding algorithms build on top of graph search algorithms and
            explore routes between nodes, starting at one node and traversing
            through relationships until the destination has been reached. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae laudantium
            aut dolore quo doloremque officiis minus temporibus tenetur beatae.
            Mollitia ab at aperiam libero reiciendis impedit modi animi quae
            asperiores provident ex suscipit tempore eos odio eligendi fuga nisi
            exercitationem saepe corporis eveniet, veritatis fugiat sint soluta
            est? Libero ducimus illo quas quae temporibus asperiores atque
            assumenda aliquid molestias cum iste iusto distinctio, quibusdam
            voluptatum dolorum ullam unde corporis blanditiis quisquam vel,
            nostrum perferendis quia fugiat ea. Eos, alias libero.
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
    </div>
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
          <option value="bs">Bubble sort</option>
          <option value="is">Insertion sort</option>
          <option value="hs">Heap sort</option>
          <option value="qs">Quick sort</option>
          <option value="ms">Merge sort</option>
          <option value="rs">Radix sort</option>
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
      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Insert non-negative integers in the range of 1-50. You can also give input numbers seperated by commas, for e.g. 32,68, 11"
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
          className="w-50 btn btn-secondary border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Remove elements from the list. You can also give input numbers seperated by commas, for e.g. 32,68, 11"
        >
          Remove
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
          className="w-50 btn btn-primary border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Generate random numbers in the range of (1-50) for sorting, given the number of numbers by the user"
        >
          Random
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

export default Sorting;
