import { ReactNode } from "react";

interface CardProps {
  children: ReactNode | ReactNode[];
  bottomPadding?: number;
  topPadding?: number;
}

interface StyleProps {
  bottomPadding: number;
  topPadding: number;
}

const Card = ({ children, bottomPadding = 3, topPadding = 3 }: CardProps) => {
  const cardStyles: StyleProps = {
    bottomPadding,
    topPadding,
  };

  return (
    <div
      style={{
        height: "100%",
        paddingTop: `${topPadding * 8}px`,
        paddingBottom: `${bottomPadding * 8}px`,
        paddingLeft: "24px",
        paddingRight: "24px",
        margin: "8px",
        border: "1px solid #000",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
