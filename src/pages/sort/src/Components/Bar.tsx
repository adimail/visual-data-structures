import React, { ForwardRefExoticComponent } from "react";

export interface BarState {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  marginLeft: boolean;
  marginRight: boolean;
  sorted: boolean;
}

interface BarProps {
  value: number;
  state: BarState;
  max: number;
  showNumber: boolean;
  component?:
    | React.ElementType<React.HTMLAttributes<HTMLElement>>
    | ForwardRefExoticComponent<any>;
  extraProps?: object;
}

interface StyleProps {
  value: number;
  state: BarState;
  max: number;
}

const useStyles = (props: StyleProps) => ({
  bar: {
    height: `${(props.value / props.max) * 100}%`,
    backgroundColor: (() => {
      const { state } = props;

      if (!state) {
        return "#000"; // Replace with your default color
      }

      if (state.a) {
        return "#AAA"; // Replace with your color for state.a
      } else if (state.b) {
        return "#BBB"; // Replace with your color for state.b
      } else if (state.c) {
        return "#CCC"; // Replace with your color for state.c
      } else if (state.d) {
        return "#DDD"; // Replace with your color for state.d
      } else if (state.sorted) {
        return "#EEE"; // Replace with your color for sorted state
      } else {
        return "#000"; // Replace with your default color
      }
    })(),

    flex: "auto",
    overflow: "hidden",
    lineHeight: "16px",
    marginRight: props.state?.marginLeft ? "15px" : "0",
    marginLeft: props.state?.marginRight ? "15px" : "0",

    transition: "transform 125ms ease-in-out",
    transformOrigin: "bottom center",
    "&:hover": {
      transform: "scale(1.1)",
    },

    border: "1px solid #000",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",

    "@media (max-width: 600px)": {
      borderTopLeftRadius: "2px",
      borderTopRightRadius: "2px",

      "&:hover": {
        transform: "scale(1.03)",
      },
    },
  },
  text: {
    userSelect: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textAlign: "center" as const,
    width: "100%",
    marginTop: "8px", // Replace with your desired margin
  } as React.CSSProperties,
});

const Bar = ({
  value,
  state,
  max,
  showNumber,
  component: Component = "div",
  extraProps,
}: BarProps) => {
  const styles = useStyles({ value, state, max });

  return (
    <Component style={styles.bar} {...extraProps}>
      {showNumber && <div style={styles.text}>{value}</div>}
    </Component>
  );
};

export default Bar;
