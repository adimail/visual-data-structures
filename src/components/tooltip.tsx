import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip: React.FC<InfoTooltipProps & { placement?: string }> = ({
  text,
  placement = "top",
}) => {
  const targetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (targetRef.current) {
      const tooltip = new Tooltip(targetRef.current, {
        title: text,
        trigger: "manual",
        placement: "top", // Set the placement option
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [text, placement]);

  const handleClick = () => {
    if (targetRef.current) {
      const tooltip = Tooltip.getInstance(targetRef.current);

      if (tooltip) {
        tooltip.show();
        setTimeout(() => {
          tooltip.hide();
        }, 2000); // Adjust the duration as needed
      }
    }
  };

  return (
    <span ref={targetRef} onClick={handleClick} style={{ cursor: "pointer" }}>
      ℹ️
    </span>
  );
};

export { Tooltip, InfoTooltip };
