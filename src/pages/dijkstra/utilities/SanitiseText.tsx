import React, { Fragment } from "react";

// This function is used to sanitize text that is passed to the component
interface SanitizedTextProps {
  text: string;
}

const SanitizedText: React.FC<SanitizedTextProps> = ({ text }) => {
  const content = text.split("\n");

  const len = content.length;
  if (len >= 2 && content[len - 1] === content[len - 2]) {
    content.pop();
  }

  const reactContent = content.map((line, index) => (
    <Fragment key={index}>
      {line}
      {content.length - 1 !== index ? <br /> : null}
    </Fragment>
  ));

  return <div>{reactContent}</div>;
};

export default SanitizedText;
