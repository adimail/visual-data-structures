import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { algorithmDisplayNames } from "./internals/Algorithms/description";
import "./internals/Components/style.css";
import { BsForwardFill } from "react-icons/bs";
import { normalize } from "./internals/util/utils";
import BarChart from "./internals/Components/BarChart";
import Controls from "./internals/Components/Controls";
import { algorithms } from "./internals/Algorithms";
import { defaultSettings } from "./internals/util/constants";
import { TraceEntry, generateRandomNumbers } from "./internals/util/Trace";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Sorting = () => {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [numbers, setNumbers] = useState(
    generateRandomNumbers(defaultSettings.size, defaultSettings.range)
  );
  const [algorithm, setAlgorithm] = useState(defaultSettings.algorithm);
  const [trace, setTrace] = useState<TraceEntry[]>([]);
  const [showModal, setShowModal] = useState(true);

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
  const [showAlgorithmNavigation, setShowAlgorithmNavigation] = useState(true);

  const handleForwardClick = () => {
    setAlgorithm((prevAlgorithm) => {
      const algorithmKeys = Object.keys(algorithms);
      const currentIndex = algorithmKeys.indexOf(prevAlgorithm);
      const nextIndex = (currentIndex + 1) % algorithmKeys.length;
      const nextAlgorithm = algorithmKeys[nextIndex];
      setStep(0);
      return nextAlgorithm;
    });
  };

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
        <div className="d-flex gap-3">
          <h5>{`${currentAlgorithm.displayName}`}</h5>
          <h5>
            <strong>|</strong>
          </h5>
          <h5>{`Time Complexity: ${currentAlgorithm.timeComplexity}`}</h5>
        </div>
      </div>

      {/* Algorithm content */}
      <hr />
      <div className="d-flex col-12">
        <div className={`col-${showAlgorithmNavigation ? "10" : "12"}`}>
          <div>
            <div className="d-flex w-100 justify-content-between">
              <div>
                {"Total number of comparisms: "}
                {step} / {trace?.length - 1}
              </div>
              <button
                className="gap-3 align-items-center d-flex btn"
                onClick={() =>
                  setShowAlgorithmNavigation((prevState) => !prevState)
                }
              >
                {!showAlgorithmNavigation && <FaArrowLeft />}
                {showAlgorithmNavigation && <FaArrowRight />}
              </button>
            </div>
            <BarChart
              trace={trace?.[step]}
              numbers={numbers}
              animation={animation}
            />
            <div
              className="progress bg-secondary mx-5"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
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

        {showAlgorithmNavigation && (
          <div
            className="mw-30 col-2"
            style={{ maxWidth: "400px", minWidth: "150px" }}
          >
            <br />
            <div className="algorithmNavigation">
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
                currentAlgorithm={currentAlgorithm.displayName}
              />

              <button
                className="btn btn-success w-100 mt-5"
                onClick={() => setShowModal(true)}
              >
                About
              </button>
            </div>

            <Modal
              className="modal-xl"
              show={showModal}
              onHide={() => setShowModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>{"Sorting Algorithms"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <i>
                    Note: Use Space key to toggle play and pause, and use Arrow
                    keys to skip steps forward and backwards.
                  </i>
                </p>
                <p>
                  A Sorting Algorithm is used to rearrange a given array or list
                  of elements according to a comparison operator on the
                  elements. The comparison operator is used to decide the new
                  order of elements in the respective data structure.
                </p>
                <img
                  src="https://www.researchgate.net/profile/Paul-Sambo/publication/279464781/figure/tbl1/AS:669518414237712@1536637037508/shows-a-comparison-of-Sorting-Algorithms.png" // Replace with the actual URL to your image
                  alt="Sorting Algorithm Image"
                  style={{ display: "block", margin: "auto", width: "60%" }}
                />
                <div className="d-flex justify-content-between mx-auto">
                  <Modal.Title>{currentAlgorithm.displayName}</Modal.Title>

                  <BsForwardFill
                    className="button"
                    onClick={handleForwardClick}
                  />
                </div>
                <hr />
                <div className="d-flex gap-3 flex-column">
                  <h5>Description</h5>
                  {`${currentAlgorithm.description}`}
                  <hr />
                  <h5>Algorithm</h5>
                  {currentAlgorithm.algorithm}
                </div>
                <hr />
                <h5>
                  Time Complexity of {currentAlgorithm.displayName}:{" "}
                  {currentAlgorithm.timeComplexity}
                </h5>
                <div className="d-flex align-items-center">
                  <div>
                    <ul>
                      {Object.entries(algorithmDisplayNames).map(
                        ([algorithmName, algorithm]) => (
                          <li
                            key={algorithmName}
                            className={
                              algorithm === currentAlgorithm ? "fw-bolder" : ""
                            }
                          >
                            {algorithm.displayName}: {algorithm.timeComplexity}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <img
                    src="https://webrewrite.com/wp-content/uploads/2017/06/Screen-Shot-2017-06-06-at-5.57.57-AM.png" // Replace with the actual URL to your image
                    alt="Sorting Algorithm Image"
                    style={{ display: "block", margin: "auto", width: "60%" }}
                  />
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sorting;
