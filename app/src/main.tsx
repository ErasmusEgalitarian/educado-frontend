import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";

// styles
import "./index.css";
import { NotificationProvider } from "./common/context/NotificationContext";

import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <ToastContainer />
      <App />
    </NotificationProvider>
  </React.StrictMode>
);
