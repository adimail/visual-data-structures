import { ReactNode } from "react";

interface CardProps {
  children: ReactNode | ReactNode[];
  bottomPadding?: number;
  topPadding?: number;
}

const Card = ({ children, bottomPadding = 3, topPadding = 5 }: CardProps) => {
  return (
    <div
      style={{
        height: "100%",
        paddingTop: `${topPadding * 8}px`,
        paddingBottom: `${bottomPadding * 8}px`,
        paddingLeft: "24px",
        paddingRight: "24px",
        margin: "8px",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
