import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { findStoredTheme } from "./assets/components/localStorage/LocalStorageHandler.tsx";

// Função para verificar e definir o tema com base no sistema do usuário
function setThemeBasedOnSystemPreference() {
  const storedTheme = findStoredTheme();

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (storedTheme) {
    if (storedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } else {
    if (prefersDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
}

// Verifica e define o tema com base no sistema na primeira execução
if (!document.documentElement.hasAttribute("data-theme")) {
  setThemeBasedOnSystemPreference();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
