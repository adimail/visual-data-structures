export const LinkedList = () => {
  return (
    <div>
      <h5>Linked List</h5>
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
          <option value="is">Singly</option>
          <option value="hs">Doubly</option>
          <option value="hs">Circular</option>
        </select>
      </div>

      <div className="input-group w-80">
        <button
          type="button"
          className="w-50 btn btn-secondary"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer to be inserted in the binary tree."
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
          title="Enter an integer to be deleted from the binary tree."
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
        <select
          className="border border-black  form-select"
          id="inputGroupSelect01"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Enter an integer to be inserted BEFORE or AFTER a specific element in the list"
        >
          <option value="is">Insert After</option>
          <option value="hs">Insert Before</option>
        </select>
        <input
          type="number"
          aria-label="node-1"
          className="w-30 form-control border border-dark"
          disabled
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
export default LinkedList;
