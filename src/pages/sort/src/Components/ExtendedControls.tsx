import React, { useState, useEffect } from "react";

interface ExtendedControls {
  algorithm: string;
  setAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  minMax: [number, number];
  setMinMax: React.Dispatch<React.SetStateAction<[number, number]>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  isSorting: boolean;
  generateArray: () => void;
  restartSorting: () => void;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls = ({
  algorithm,
  setAlgorithm,
  setStep,
  size,
  setSize,
  minMax,
  setMinMax,
  speed,
  setSpeed,
  isSorting,
  generateArray,
  restartSorting,
  animation,
  setAnimation,
}: ExtendedControls) => {
  const [sizeBuffer, setSizeBuffer] = useState(size);

  useEffect(() => {
    if (sizeBuffer !== size) {
      setSize(sizeBuffer);
      generateArray();
    }
  }, [sizeBuffer, size]);

  return (
    <div>
      <div
        style={{
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <label htmlFor="algorithm-selector">Algorithm</label>
        <select
          value={algorithm}
          onChange={(event) => {
            setAlgorithm(event.target.value);
            setStep(0);
          }}
          disabled={isSorting}
        >
          {Object.entries(algorithm).map(([value, name], key) => (
            <option value={value} key={key}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={generateArray}
          disabled={isSorting}
          style={{ marginLeft: "8px", padding: "8px" }}
        >
          Generate random array
        </button>
      </div>

      <p>Size</p>
      <input
        type="range"
        value={size}
        onChange={(e) => {
          setSizeBuffer(Number(e.target.value));
        }}
        min={2}
        max={100}
        disabled={isSorting}
      />
      <span>{size}</span>

      <p>Range</p>
      <input
        type="range"
        value={minMax[1]}
        onChange={(e) => {
          setMinMax([minMax[0], Number(e.target.value)]);
          generateArray();
        }}
        min={0}
        max={1000}
        disabled={isSorting}
      />
      <span>{minMax[1]}</span>

      <p>Speed</p>
      <input
        type="range"
        value={speed}
        onChange={(e) => {
          setSpeed(Number(e.target.value));
          restartSorting();
        }}
        min={0.25}
        step={0.25}
        max={4}
        disabled={isSorting}
      />
      <span>{speed}</span>

      <p>Animations</p>
      <input
        type="checkbox"
        checked={animation}
        onChange={(e) => setAnimation(e.target.checked)}
        disabled={isSorting}
      />
    </div>
  );
};

export default Controls;
