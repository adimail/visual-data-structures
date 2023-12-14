import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ReloadConfirmationModal from "./components/ReloadConfirmationModal.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

const Main: React.FC = () => {
  const [showReloadConfirmation, setShowReloadConfirmation] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "r") {
        setShowReloadConfirmation(true);
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleCloseReloadConfirmation = () => {
    setShowReloadConfirmation(false);
  };

  const handleConfirmReload = () => {
    window.location.reload();
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <ReloadConfirmationModal
          show={showReloadConfirmation}
          onClose={handleCloseReloadConfirmation}
          onConfirm={handleConfirmReload}
        />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
