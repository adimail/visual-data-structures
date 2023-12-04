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
          <p>
            Pathfinding is the process of determining a path between two points
            in a graph or grid. It is a common problem in computer science and
            finds applications in various fields, including robotics, gaming,
            and network routing. Algorithms like Dijkstra's algorithm, A*
            algorithm, and Breadth-First Search (BFS) are commonly used for
            pathfinding, each with its strengths and weaknesses.
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
    </motion.div>
  );
};

export default PathFinder;
