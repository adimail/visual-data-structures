import React, { useState, useEffect } from "react";

interface ExtendedControls {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  isSorting: boolean;
  generateArray: () => void;
  restartSorting: () => void;
}

const Controls = ({
  size,
  setSize,
  speed,
  setSpeed,
  isSorting,
  generateArray,
  restartSorting,
}: ExtendedControls) => {
  const [sizeBuffer, setSizeBuffer] = useState(size);

  useEffect(() => {
    if (sizeBuffer !== size) {
      setSize(sizeBuffer);
      generateArray();
    }
  }, [sizeBuffer, size]);

  return (
    <div className="d-flex flex-column">
      <div>
        <button
          className="btn btn-secondary w-100 mt-3"
          onClick={generateArray}
          disabled={isSorting}
        >
          Generate random array
        </button>
      </div>

      <div className="d-flex flex-column">
        <p>Size</p>
        <input
          type="range"
          value={size}
          onChange={(e) => {
            setSizeBuffer(Number(e.target.value));
          }}
          min={11}
          max={111}
          disabled={isSorting}
        />
        <span>{size}</span>
      </div>

      <div className="d-flex flex-column">
        <p>Speed</p>
        <input
          type="range"
          value={speed}
          onChange={(e) => {
            setSpeed(Number(e.target.value));
            restartSorting();
          }}
          min={1}
          step={0.1}
          max={11}
          disabled={isSorting}
        />
        <span>{speed}</span>
      </div>
    </div>
  );
};

export default Controls;
