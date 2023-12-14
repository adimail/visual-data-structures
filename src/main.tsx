import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

const Main: React.FC = () => {
  const [showReloadConfirmation, setShowReloadConfirmation] = useState(false);

  const askForConfirmation = () => {
    return window.confirm("Are you sure you want to reload the page?");
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!askForConfirmation()) {
        event.preventDefault();
      }
    };

    const handleTouchStart = () => {
      if (!askForConfirmation()) {
        setShowReloadConfirmation(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const handleConfirmReload = () => {
    setShowReloadConfirmation(false);
    window.location.href = "https://adimail.github.io/visual-data-structures/";
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
