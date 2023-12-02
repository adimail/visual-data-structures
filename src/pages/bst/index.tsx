export const BinarySearchTree = () => {
  return (
    <div>
      <h5>Binary search tree</h5>
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
export default BinarySearchTree;
