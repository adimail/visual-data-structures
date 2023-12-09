function AlgorithmNavigation() {
  return (
    <div className="query-component gap-2 d-flex flex-column">
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
      <hr />
      <div className="btn-group-vertical">
        <button className="btn btn-outline-success">Inorder Transversal</button>
        <button className="btn btn-outline-success">
          Pre-Order Transversal
        </button>
        <button className="btn btn-outline-success">
          Post-Order Transversal
        </button>
      </div>
      <hr />
      <button className="btn btn-outline-danger">Restart Tree</button>
      <button className="btn btn-outline-danger">Generate new Tree</button>
    </div>
  );
}

export default AlgorithmNavigation;
