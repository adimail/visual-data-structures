import { motion } from "framer-motion";
import DijkstrasAlgorithmCanvas from "./components/DijkstrasAlgorithmCanvas.tsx";

export const PathFinder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Pathfinding Algorithms</h5>
      <hr />
      <DijkstrasAlgorithmCanvas />
    </motion.div>
  );
};

export default PathFinder;
