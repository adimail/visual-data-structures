import { motion } from "framer-motion";
import TreeTraversalVisualizer from "./internals/TreeTraversalVisualizer";

export const BinarySearchTreePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Binary Search tree</h5>
      <hr />
      <TreeTraversalVisualizer />
    </motion.div>
  );
};

export default BinarySearchTreePage;
