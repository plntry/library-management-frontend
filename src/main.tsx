import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./i18n.ts";
import App from "./App.tsx";
import "./index.css";

import { themeConfig } from "./theming/themeConfig.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
    <App />
    </ConfigProvider>
  </StrictMode>
);
