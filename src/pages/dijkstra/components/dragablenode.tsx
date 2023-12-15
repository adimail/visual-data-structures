import React, { useRef, useEffect, useState } from "react";
import "../canvas.css";

interface DraggableNodeProps {
  nodeId: string;
  x: number;
  y: number;
  onDrag: (x: number, y: number) => void;
  selected: boolean;
  onClick: (selected: boolean, ctrlKey: boolean) => void;
  disableDragging?: boolean;
  startingNode: boolean;
  visited: boolean;
}

const DraggableNode: React.FC<DraggableNodeProps> = ({
  nodeId,
  x,
  y,
  onDrag,
  selected,
  onClick,
  disableDragging = false,
  startingNode,
  visited,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) return;

    const handleDragStart = (e: DragEvent) => {
      e.dataTransfer!.setDragImage(new Image(), 0, 0);
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - node.getBoundingClientRect().left,
        y: e.clientY - node.getBoundingClientRect().top,
      });
    };

    const handleDrag = (e: DragEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onDrag(newX, newY);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    node.addEventListener("dragstart", handleDragStart);
    node.addEventListener("drag", handleDrag);
    node.addEventListener("dragend", handleDragEnd);

    return () => {
      node.removeEventListener("dragstart", handleDragStart);
      node.removeEventListener("drag", handleDrag);
      node.removeEventListener("dragend", handleDragEnd);
    };
  }, [onDrag, isDragging, dragOffset]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the Ctrl key is pressed
    const ctrlKey = event.ctrlKey || event.metaKey;

    // Call the parent component's onClick function with selected and ctrlKey
    onClick(!selected, ctrlKey);

    // Prevent the default behavior of the click event
    event.preventDefault();
  };

  return (
    <div
      className={`DraggableNode ${startingNode ? "starting-node" : ""}`}
      onClick={handleClick}
      ref={nodeRef}
      style={{
        backgroundColor: startingNode
          ? "orange"
          : visited
          ? "#25d282"
          : selected
          ? "lightblue"
          : "#fff",
        left: x,
        top: y,
        position: "absolute",
        cursor: disableDragging ? "default" : "grab",
      }}
      draggable={!disableDragging}
    >
      <span>{nodeId}</span>
    </div>
  );
};

export default DraggableNode;
