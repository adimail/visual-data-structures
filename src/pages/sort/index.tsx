import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { algorithmDisplayNames } from "./internals/Algorithms/description";

import { normalize } from "./internals/util/utils";
import BarChart from "./internals/Components/BarChart";
import Controls from "./internals/Components/Controls";
import { algorithms } from "./internals/Algorithms";
import { defaultSettings } from "./internals/util/constants";
import { TraceEntry, generateRandomNumbers } from "./internals/util/Trace";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

export const Sorting = () => {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [numbers, setNumbers] = useState(
    generateRandomNumbers(defaultSettings.size, defaultSettings.range)
  );
  const [algorithm, setAlgorithm] = useState(defaultSettings.algorithm);
  const [trace, setTrace] = useState<TraceEntry[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (numbers) {
      const trace = algorithms[algorithm].default([...numbers]);
      setTrace(trace);
    }
  }, [numbers, algorithm, setTrace]);

  useEffect(() => {
    setAnimation(algorithms[algorithm].animateMovements ?? true);
  }, [algorithm]);

  const currentAlgorithmKey = algorithm;
  const currentAlgorithm = algorithmDisplayNames[currentAlgorithmKey];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3 align">
          <h5>Sorting Algorithms</h5>
        </div>
        <h5>{`Time Complexity: ${currentAlgorithm.timeComplexity}`}</h5>
      </div>

      {/* Algorithm content */}
      <hr />
      <div className="d-flex col-12">
        <div className="col-10 border-none">
          <div>
            <div>
              {"Total number of comparisms: "}
              {step} / {trace?.length - 1}
            </div>
            <BarChart
              trace={trace?.[step]}
              numbers={numbers}
              animation={animation}
            />
            <div
              className="progress bg-secondary mx-5"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar bg-success"
                style={{
                  width: `${normalize(step, 0, trace?.length - 1 || 0)}%`,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {normalize(step, 0, trace?.length - 1 || 0).toFixed(1)}%
              </div>
            </div>
          </div>
          <br />
        </div>
        <div
          className="mw-30 col-2"
          style={{ maxWidth: "400px", minWidth: "150px" }}
        >
          <br />
          <Controls
            step={step}
            setStep={setStep}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            numbers={numbers}
            setNumbers={setNumbers}
            trace={trace}
            setTrace={setTrace}
            animation={animation}
            setAnimation={setAnimation}
            setShowModal={setShowModal}
          />
          <Modal
            className="modal-xl"
            show={showModal}
            onHide={() => setShowModal(false)}
          >
            <Modal.Header>
              <Modal.Title>{currentAlgorithm.displayName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex gap-3 flex-column">
                <h5>Description</h5>
                {`${currentAlgorithm.description}`}
                <hr />
                <h5>Algorithm</h5>
                {currentAlgorithm.algorithm}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default Sorting;
