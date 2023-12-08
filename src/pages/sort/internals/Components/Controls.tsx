import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ExtendedControls from "./ExtendedControls";
import { scaleValue } from "../util/utils";
import { defaultSettings } from "../util/constants";
import { SortItem, TraceEntry, generateRandomNumbers } from "../util/Trace";
import { algorithms } from "../Algorithms";

interface ControlsProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  setNumbers: React.Dispatch<React.SetStateAction<SortItem[]>>;
  numbers: SortItem[];
  trace: TraceEntry[];
  setTrace: React.Dispatch<React.SetStateAction<TraceEntry[]>>;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls = ({
  step,
  setStep,
  setAlgorithm,
  setNumbers,
  trace,
  numbers,
  setShowModal,
}: ControlsProps) => {
  const intervalId = useRef<undefined | number>(undefined);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(defaultSettings.speed);
  const [size, setSize] = useState(defaultSettings.size);
  const [minMax] = useState(defaultSettings.range);

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

    intervalId.current = window.setInterval(
      () => autoIncrement(_speed),
      _speed
    );
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
      <div className="control-panel gap-3 d-flex flex-column">
        <div className="input-group">
          <button
            className="border border-dark btn btn-warning"
            onClick={() => setShowModal(true)}
          >
            Algorithm
          </button>
          <select
            className="border border-black  form-select"
            id="algorithmSelector"
            onChange={(event) => {
              setAlgorithm(event.target.value);
              setStep(0);
            }}
            disabled={isSorting}
          >
            {Object.entries(algorithms).map(([value, { name }], key) => (
              <option
                value={value}
                key={key}
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title={`Total number of comparisms: ${
                  algorithms[value].default([...numbers]).length - 1
                }`}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" onClick={toggleSorting}>
          Toggle start and stop
        </button>
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-danger p-2 flex-fill"
            onClick={() => skip(-32)}
          >
            {"< Backward"}
          </button>
          <button
            className="btn btn-outline-danger p-2 flex-fill"
            onClick={() => skip(32)}
          >
            {"Forward >"}
          </button>
        </div>
      </div>
      <ExtendedControls
        size={size}
        setSize={setSize}
        speed={speed}
        setSpeed={setSpeed}
        isSorting={isSorting}
        generateArray={generateArray}
        restartSorting={restartSorting}
      />
    </>
  );
};

export default Controls;
