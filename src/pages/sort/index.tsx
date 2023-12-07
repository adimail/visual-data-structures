import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { normalize } from "./src/util/utils";
import BarChart from "./src/Components/BarChart";
import Controls from "./src/Components/Controls";
import { algorithms } from "./src/Algorithms";
import { defaultSettings } from "./src/util/constants";
import { TraceEntry, generateRandomNumbers } from "./src/util/Trace";

export const Sorting = () => {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [numbers, setNumbers] = useState(
    generateRandomNumbers(defaultSettings.size, defaultSettings.range)
  );
  const [algorithm, setAlgorithm] = useState(defaultSettings.algorithm);
  const [trace, setTrace] = useState<TraceEntry[]>([]);

  useEffect(() => {
    if (numbers) {
      const trace = algorithms[algorithm].default([...numbers]);
      setTrace(trace);
    }
  }, [numbers, algorithm, setTrace]);

  useEffect(() => {
    setAnimation(algorithms[algorithm].animateMovements ?? true);
  }, [algorithm]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
    >
      <h5>Sorting Algorithmns</h5>
      <hr />
      <div className="d-flex col-12">
        <div className="col-10 border-none">
          <div>
            {"Total number of comparisms: "}
            {step} / {trace?.length - 1}
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
            <br />
          </div>
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
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Sorting;
