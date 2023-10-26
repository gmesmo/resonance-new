import { useState } from "react";
import { Fab, Slide } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import {
  cookiesCheck,
  getStoredTheme,
  saveTheme,
} from "../localStorage/LocalStorageHandler";

function ThemeHandler() {
  const [currentTheme, setCurrentTheme] = useState(
    getStoredTheme() || document.documentElement.getAttribute("data-theme")
  );

  const isLightTheme = () => {
    if (currentTheme === "light" || currentTheme === "judy") {
      return true;
    } else {
      return false;
    }
  };

  const isDarkTheme = () => {
    if (currentTheme === "dark" || currentTheme === "hayata") {
      return true;
    } else {
      return false;
    }
  };

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
      }}
      className={isLightTheme() ? `bg-[#1565c0]` : `bg-[#1a1a1a]`}
    >
      <Slide
        direction={isLightTheme() ? "left" : "right"}
        in={isLightTheme()}
        style={{ position: "absolute" }}
        timeout={450}
      >
        <LightModeRoundedIcon style={{ color: "yellow" }} />
      </Slide>
      <Slide
        direction={isDarkTheme() ? "left" : "right"}
        in={isDarkTheme()}
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
