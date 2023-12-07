function AlgorithmNavigation() {
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
    </div>
  );
}

export default AlgorithmNavigation;
