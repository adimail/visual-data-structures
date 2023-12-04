import { useEffect, useState } from "react";
import { Tooltip } from "bootstrap";

export function AlgorithmNavigation() {
  const [insertValue, setInsertValue] = useState<number | undefined>(undefined);
  const [removeValue, setRemoveValue] = useState<number | undefined>(undefined);
  const [randomValue, setRandomValue] = useState<number | undefined>(undefined);

  const handleInsertClick = () => {
    if (insertValue !== undefined) {
      setInsertValue(undefined);
    }
  };

  const handleRemoveClick = () => {
    if (removeValue !== undefined) {
      setRemoveValue(undefined);
    }
  };

  const handleRandomClick = () => {
    if (randomValue !== undefined) {
      setRandomValue(undefined);
    }
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

  return (
    <div className="gap-2 d-flex flex-column">
      <div className="input-group">
        <button
          type="button"
          className="btn btn-warning border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Select the type of linked list you would like to construct"
        >
          Type
        </button>
        <select
          className="border border-black form-select"
          id="inputGroupSelect01"
        >
          <option value="singly-ll">Singly</option>
          <option value="doubly-ll">Doubly</option>
          <option value="circular-ll">Circular</option>
        </select>
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer to be inserted at the tail of linked list."
          onClick={handleInsertClick}
        >
          Insert
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark"
          value={insertValue || ""}
          onChange={(e) => setInsertValue(Number(e.target.value))}
        />
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer to be deleted from the linked list."
          onClick={handleRemoveClick}
        >
          Remove
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark"
          value={removeValue || ""}
          onChange={(e) => setRemoveValue(Number(e.target.value))}
        />
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-primary border border-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Generate a binary tree consisting of given number of nodes"
          onClick={handleRandomClick}
        >
          Random
        </button>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark"
          value={randomValue || ""}
          onChange={(e) => setRandomValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
