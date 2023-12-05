import { motion } from "framer-motion";
import { InfoTooltip } from "../../components/tooltip";

export const ListADT = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>List - Abstract Data Types</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10"></div>
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
      <div className="d-flex">
        <div className="input-group">
          <button
            type="button"
            className="btn btn-warning border border-dark"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Select the type of list ADT you would like to simulate"
          >
            Storage
          </button>
          <select
            className="border border-black  form-select"
            id="inputGroupSelect01"
            disabled
          >
            <option value="is">Stack</option>
            <option value="hs">Queue</option>
          </select>
        </div>
        <InfoTooltip text="Select the storage type you would like to simulate " />
      </div>
    </div>
  );
}
export default ListADT;
