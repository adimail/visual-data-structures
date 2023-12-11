// Edge.tsx
import React from "react";

interface EdgeProps {
  startNode?: { x: number; y: number };
  endNode?: { x: number; y: number };
  weight: number;
}

const Edge: React.FC<EdgeProps> = ({ startNode, endNode, weight }) => {
  if (!startNode || !endNode) {
    return null; // Skip rendering if startNode or endNode is undefined
  }

  const x1 = startNode.x + 25;
  const y1 = startNode.y + 25;
  const x2 = endNode.x + 25;
  const y2 = endNode.y + 25;

  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;

  const angle = Math.atan2(y2 - y1, x2 - x1);

  return (
    <>
      <line stroke="#ccc" strokeWidth="3" x1={x1} x2={x2} y1={y1} y2={y2} />
      <g>
        <rect
          fill="white"
          height="32"
          rx="4"
          ry="4"
          stroke="black"
          strokeWidth="1"
          width="32"
          x={cx - 16}
          y={cy - 16}
        />
        <text
          cursor="pointer"
          dy=".3em"
          fontSize={"1.2em"}
          fontWeight={"600"}
          textAnchor="middle"
          x={cx}
          y={cy}
        >
          {weight}
        </text>
      </g>
      {false && (
        <g
          transform={`translate(${cx}, ${cy}) rotate(${
            angle * (180 / Math.PI)
          })`}
        >
          <rect fill="transparent" height="20" width="20" x="-10" y="-10" />
        </g>
      )}
    </>
  );
};

export default Edge;
