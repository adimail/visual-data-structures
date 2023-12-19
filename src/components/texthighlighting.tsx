import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeHighlighter = () => {
  const cppCode = `#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`;

  const pythonCode = `print("Hello, World!")`;

  return (
    <div>
      <SyntaxHighlighter language="cpp" style={atomDark}>
        {cppCode}
      </SyntaxHighlighter>

      <SyntaxHighlighter language="python" style={atomDark}>
        {pythonCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
