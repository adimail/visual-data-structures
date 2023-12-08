import { motion } from "framer-motion";
import { AlgorithmNavigation } from "./AlgorithmNavigation";

export const PathFinder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Path Finder</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10">
          <div>
            <svg
              className="bg-dark h-100 w-100"
              id="shortestPathSvg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="gedge"></g>
              <g id="gvertex"></g>
            </svg>
          </div>
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

export default PathFinder;
