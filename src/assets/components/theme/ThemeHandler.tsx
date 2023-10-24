import { useState } from "react";
import { Fab, Slide } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import {
  cookiesCheck,
  findStoredTheme,
  saveTheme,
} from "../localStorage/LocalStorageHandler";

function ThemeHandler() {
  const [currentTheme, setCurrentTheme] = useState(
    findStoredTheme || document.documentElement.getAttribute("data-theme")
  );

  const cookiesEnabled = cookiesCheck();

  function toggleTheme() {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
    if (cookiesEnabled) {
      saveTheme(newTheme);
    }
  }

  return (
    <Fab
      onClick={toggleTheme}
      color="primary"
      style={{
        overflow: "hidden",
        backgroundColor: currentTheme === "dark" ? "#1a1a1a" : "",
      }}
      className={
        currentTheme === "light" || currentTheme === "judy"
          ? `bg-[#1565c0]`
          : `bg-[#1a1a1a]`
      }
    >
      <Slide
        direction={currentTheme === "light" ? "left" : "right"}
        in={currentTheme === "light" || currentTheme === "judy"}
        style={{ position: "absolute" }}
        timeout={450}
      >
        <LightModeRoundedIcon style={{ color: "yellow" }} />
      </Slide>
      <Slide
        direction={currentTheme === "dark" ? "left" : "right"}
        in={currentTheme === "dark" || currentTheme === "hayata"}
        style={{ position: "absolute" }}
        timeout={450}
      >
        <DarkModeRoundedIcon />
      </Slide>
    </Fab>
  );
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Comportamento suave para rolagem animada
  });
}

export { ThemeHandler, scrollToTop };
