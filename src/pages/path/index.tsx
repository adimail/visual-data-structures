import { motion } from "framer-motion";
import DijkstrasAlgorithmCanvas from "./components/DijkstrasAlgorithmCanvas.tsx";
import { Button } from "react-bootstrap";
import { useState } from "react";
import CodeModal from "../../components/COdeModal.tsx";
import { cppFileText, pyFileText } from "./files.tsx";

export const Dijkstra = () => {
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
        <h5>Path Finding Algorithm</h5>
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
      <DijkstrasAlgorithmCanvas />
      <CodeModal
        title="Path Finding Algorithm"
        show={CodeModalShow}
        handleClose={handleModalClose}
        cppFile={cppFileText}
        pyFile={pyFileText}
      />
    </motion.div>
  );
};

export default Dijkstra;
