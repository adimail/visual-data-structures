import Card from "./Layout/Card";

const Headline = () => {
  return (
    <Card bottomPadding={2} topPadding={2}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="https://github.com/wolflu05/sorting-visualization"
          style={{ color: "black" }}
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </Card>
  );
};

export default Headline;
