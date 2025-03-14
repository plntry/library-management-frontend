import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n.ts";
import App from "./App.tsx";
import "./index.css";
import NotificationProvider from "./contexts/NotificationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </StrictMode>
);
