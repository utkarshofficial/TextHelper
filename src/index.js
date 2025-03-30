import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import ProgressBarContextProvider from "./context/ProgressBarContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProgressBarContextProvider>
        <App />
      </ProgressBarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
