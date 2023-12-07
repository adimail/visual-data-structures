import React, { useCallback, useEffect, useRef, useState } from "react";

import ExtendedControls from "./ExtendedControls";

import { normalize, scaleValue } from "../util/utils";
import { defaultSettings } from "../util/constants";
import { SortItem, TraceEntry, generateRandomNumbers } from "../util/Trace";

interface ControlsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  numbers: SortItem[];
  setNumbers: React.Dispatch<React.SetStateAction<SortItem[]>>;
  trace: TraceEntry[];
  setTrace: React.Dispatch<React.SetStateAction<TraceEntry[]>>;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls = ({
  step,
  setStep,
  algorithm,
  setAlgorithm,
  setNumbers,
  trace,
  animation,
  setAnimation,
}: ControlsProps) => {
  const intervalId = useRef<undefined | number>(undefined);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(defaultSettings.speed);
  const [size, setSize] = useState(defaultSettings.size);
  const [minMax, setMinMax] = useState(defaultSettings.range);

  const skip = useCallback(
    (number: number) => {
      if (!trace) {
        return;
      }

      let _step = step + number;

      if (_step < 0) {
        _step = 0;
      }

      if (_step > trace.length - 1) {
        _step = trace.length - 1;
      }

      setStep(_step);
    },
    [step, setStep, trace]
  );

  const generateArray = useCallback(() => {
    const array = generateRandomNumbers(size, minMax);
    setNumbers(array);
    setStep(0);
  }, [minMax, setNumbers, setStep, size]);

  const autoIncrement = useCallback(
    (_speed: number) => {
      const increase = () =>
        setStep((s) => {
          const _step = s + 1;

          if (0 <= _step && _step < trace.length) {
            return _step;
          } else {
            setIsSorting(false);
            clearInterval(intervalId.current);

            return s;
          }
        });

      increase();

      if (_speed < 40) {
        increase();
      }
    },
    [setStep, trace?.length]
  );

  const startInterval = useCallback(() => {
    clearInterval(intervalId.current);

    const _speed = scaleValue(speed, [0.25, 4], [300, 0]);

    intervalId.current = setInterval(() => autoIncrement(_speed), _speed);
  }, [autoIncrement, speed]);

  const toggleSorting = useCallback(() => {
    setIsSorting(!isSorting);

    if (!isSorting) {
      if (step === trace.length - 1) {
        setStep(0);
      }

      startInterval();
    } else {
      clearInterval(intervalId.current);
    }
  }, [isSorting, step, trace?.length, startInterval, setStep]);

  const restartSorting = useCallback(() => {
    if (isSorting) {
      startInterval();
    }
  }, [isSorting, startInterval]);

  useEffect(() => () => clearInterval(intervalId.current), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37: {
          skip(-1);
          break;
        }
        case 39: {
          skip(+1);
          break;
        }
        case 32: {
          if (trace) {
            toggleSorting();
            event.preventDefault();
          }
          break;
        }
        default: {
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [skip, toggleSorting, trace]);

  return (
    <>
      <div className="control-panel">
        <button onClick={toggleSorting}>Toggle start and stop</button>
        <button onClick={() => skip(-25)}>Backward</button>
        <button onClick={() => skip(25)}>Forward</button>
        <button>Generate random Array</button>
        <input type="radio" />
        <input
          type="range"
          value={normalize(step, 0, trace?.length - 1 || 0)}
        />
        <select
          className="border border-black  form-select"
          id="inputGroupSelect01"
        >
          <option value="hs">Selection sort</option>
          <option value="qs">Quick sort</option>
          <option value="bs">Bubble sort</option>
          <option value="is">Insertion sort</option>
          <option value="ms">Merge sort</option>
        </select>
      </div>
      <ExtendedControls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setStep={setStep}
        size={size}
        setSize={setSize}
        minMax={minMax}
        setMinMax={setMinMax}
        speed={speed}
        setSpeed={setSpeed}
        isSorting={isSorting}
        generateArray={generateArray}
        restartSorting={restartSorting}
        animation={animation}
        setAnimation={setAnimation}
      />
    </>
  );
};

export default Controls;
