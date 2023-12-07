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
        return "#31EB1E";
      }

      if (state.a) {
        return "#C1604B ";
      } else if (state.b) {
        return "#C1D100";
      } else if (state.c) {
        return "#51D51C";
      } else if (state.d) {
        return "#27D1B0";
      } else if (state.sorted) {
        return "#198754";
      } else {
        return "#568087";
      }
    })(),

    flex: "auto",
    overflow: "hidden",
    lineHeight: "16px",
    marginRight: props.state?.marginLeft ? "15px" : "0",
    marginLeft: props.state?.marginRight ? "15px" : "0",
    border: "1px solid #000",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",

    "@media (max-width: 600px)": {
      borderTopLeftRadius: "2px",
      borderTopRightRadius: "2px",

      "&:hover": {
        transform: "scale(1.5)",
      },
    },
  },
  text: {
    userSelect: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    textAlign: "center" as const,
    width: "100%",
    marginTop: "8px",
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
