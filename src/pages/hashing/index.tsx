import { motion } from "framer-motion";
import { useState } from "react";
import CodeModal from "../../components/COdeModal";
import AlgorithmNavigation from "./algorithmNavigation";
import { Button } from "react-bootstrap";

export const Hashing = () => {
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
        <h5>Hashing Algorithm</h5>
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
      <div className="d-flex col-12">
        <div className="col-10">
          <p>
            Hashing is a technique that is used to quickly identify a specific
            value within a given array. It works by creating a unique hash code
            for each element in the array and then stores the hash code in lieu
            of the actual element. This allows for very fast data access as the
            index value behaves as a key for the data value.
          </p>
          <h2>Under Development...</h2>
        </div>
        <div
          className="mw-30 col-2"
          style={{ maxWidth: "400px", minWidth: "150px" }}
        >
          <AlgorithmNavigation />
        </div>
      </div>

      <CodeModal
        title="Hashing Algorithm"
        show={CodeModalShow}
        handleClose={handleModalClose}
        filename="hash"
      />
    </motion.div>
  );
};

export default Hashing;
