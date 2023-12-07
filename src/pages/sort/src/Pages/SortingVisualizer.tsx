import { useEffect, useState } from "react";
import BarChart from "../Components/BarChart";
import Controls from "../Components/Controls";
import { algorithms } from "../Algorithms";
import { defaultSettings } from "../util/constants";
import { TraceEntry, generateRandomNumbers } from "../util/Trace";

const App = () => {
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
    <div>
      <BarChart trace={trace?.[step]} numbers={numbers} animation={animation} />

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
  );
};

export default App;
