import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./app";

// styles
import "./index.css";
import { NotificationProvider } from "./common/context/NotificationContext";

import { ToastContainer } from "react-toastify";
// Initialize i18n before any components use useTranslation
import "@common/i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <NotificationProvider>
        <ToastContainer />
        <App />
      </NotificationProvider>
    </Suspense>
  </React.StrictMode>
);
