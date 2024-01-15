import React, { useState, useEffect } from "react";
import { Modal, Toast } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import copy from "clipboard-copy";
import { FaCopy } from "react-icons/fa";
import "./toggle.css";

interface CodeModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  cppFile: string;
  pyFile: string;
}

const CodeModal: React.FC<CodeModalProps> = ({
  show,
  title,
  handleClose,
  cppFile,
  pyFile,
}) => {
  const [code, setCode] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("cpp");

  const handleToastClose = () => {
    setShowToast(false);
  };

  const fetchCode = () => {
    try {
      const response = selectedLanguage === "cpp" ? cppFile : pyFile;
      setCode(response);
    } catch (error) {
      console.error(`Error loading ${selectedLanguage} code:`, error);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [selectedLanguage]);

  const handleCopy = () => {
    copy(code);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <>
      <Modal className="modal-lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between align-items-start w-100 align-">
            <Modal.Title>{title} Code</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 align-items-center justify-content-between">
            <div className="mx-3">
              <button
                style={{
                  border:
                    selectedLanguage === "cpp" ? "1px solid grey" : "none",
                  backgroundColor: "white",
                }}
                onClick={() => selectLanguage("cpp")}
              >
                C++
              </button>
              <button
                style={{
                  border:
                    selectedLanguage === "python" ? "1px solid grey" : "none",
                  backgroundColor: "white",
                }}
                onClick={() => selectLanguage("python")}
              >
                Python
              </button>
            </div>
            <div className="m-1">
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
                onClick={handleCopy}
              >
                <FaCopy style={{ marginRight: "5px" }} />
                Copy to Clipboard
              </div>
            </div>
          </div>
          <SyntaxHighlighter
            language={selectedLanguage}
            style={dracula}
            wrapLines={true}
            showLineNumbers={true}
          >
            {code}
          </SyntaxHighlighter>
          <br />
          <p>
            If you wish to contribute to the programs, fork this repository from
            GitHub using{" "}
            <a href="https://github.com/adimail/visual-data-structures">this</a>{" "}
            link. Make your changes and create a pull request.
          </p>
          <h6>Steps to contribute to the project:</h6>
          <ol>
            <li>
              Clone this repository using GitHub Desktop or the CLI with the
              following command:
              <br />
              <code>
                git clone https://github.com/adimail/visual-data-structures.git
              </code>
            </li>
            <li>
              Make the necessary changes to the C++ and Python program files.
            </li>
            <li>Test your changes locally to confirm they work as expected.</li>
            <li>
              Commit your changes with a clear and concise commit message.
              <br />
              <code>git commit -m "Updated cpp file for AVL Tree"</code>
            </li>
            <li>
              Mention your name in a comment inside the file you modified <br />
              <code>// Author: Aditya Godse (https://github.com/adimail)</code>
            </li>
            <li>
              Push your changes to your forked repository.
              <br />
              <code>git push origin main</code>
            </li>
            <li>
              Create a pull request from your forked repository to the original
              repository.
              <br />
            </li>
            <li>
              Code files are located in the directory: <br />
              <code>src\programs</code>
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>

        <Toast
          show={showToast}
          onClose={handleToastClose}
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            margin: "40px",
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Copied!</strong>
          </Toast.Header>
          <Toast.Body>Code copied to clipboard successfully!</Toast.Body>
        </Toast>
      </Modal>
    </>
  );
};

export default CodeModal;
