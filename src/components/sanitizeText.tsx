import { Fragment, FC } from "react";

interface SanitizedTextProps {
  text: string;
}

const SanitizedText: FC<SanitizedTextProps> = ({ text }) => {
  const content: string[] = text.split("\n");

  const len: number = content.length;
  if (len >= 2 && content[len - 1] === content[len - 2]) {
    content.pop();
  }

  const reactContent = content.map((line: string, index: number) => (
    <Fragment key={index}>
      {line}
      {content.length - 1 !== index ? <br /> : null}
    </Fragment>
  ));

  return <div>{reactContent}</div>;
};

export default SanitizedText;
