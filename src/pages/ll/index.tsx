import { useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import { motion } from "framer-motion";
import { LinkedListClass } from "./LinkedList";

export const LinkedList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Linked List</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            A linked list is a linear data structure where elements are stored
            in nodes, and each node points to the next node in the sequence.
            Unlike arrays, linked lists dynamically allocate memory for
            elements, allowing for efficient insertions and deletions. However,
            random access is less efficient compared to arrays. Types of linked
            lists include singly linked lists and doubly linked lists.
          </p>
          <canvas className="bg-black h-55 w-50"></canvas>
          <p id="linked-list-component"></p>
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
  const [insertValue, setInsertValue] = useState<number | undefined>(undefined);
  const [removeValue, setRemoveValue] = useState<number | undefined>(undefined);
  const [randomValue, setRandomValue] = useState<number | undefined>(undefined);

  const linkedList = new LinkedListClass();

  const handleInsertClick = () => {
    if (insertValue !== undefined) {
      linkedList.insert(insertValue);
      setInsertValue(undefined);
    }
  };

  const handleRemoveClick = () => {
    if (removeValue !== undefined) {
      linkedList.remove(removeValue);
      setRemoveValue(undefined);
    }
  };

  const handleRandomClick = () => {
    if (randomValue !== undefined) {
      linkedList.generateRandom(randomValue);
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
export default LinkedList;
