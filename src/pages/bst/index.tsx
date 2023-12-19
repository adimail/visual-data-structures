import { motion } from "framer-motion";
import { useState } from "react";
import TreeTraversalVisualizer from "./internals/TreeTraversalVisualizer";
import { Button } from "react-bootstrap";
import CodeModal from "../../components/COdeModal";

export const BinarySearchTreePage = () => {
  const [CodeModalShow, setCodeModalShow] = useState(false);

  const handleModalClose = () => setCodeModalShow(false);
  const handleCodeModalShow = () => setCodeModalShow(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <div className="d-flex justify-content-between">
        <h5>Binary Search Tree</h5>
        <Button
          onClick={handleCodeModalShow}
          style={{
            textAlign: "center",
            padding: "0",
            paddingLeft: "10px",
            paddingRight: "10px",
            height: "30px",
            borderRadius: "20px",
            border: "none",
            margin: "0",
          }}
        >
          View code
        </Button>
      </div>
      <hr />
      <CodeModal
        title="Binary Sarch Tree"
        show={CodeModalShow}
        handleClose={handleModalClose}
        filename="bst"
      />
      <TreeTraversalVisualizer />
    </motion.div>
  );
};

export default BinarySearchTreePage;
