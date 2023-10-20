import { useState } from "react";
import { Fab, Slide } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

export default function ThemeHandler() {
  const [currentTheme, setCurrentTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );

  function toggleTheme() {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  }

  return (
    <Fab
      onClick={toggleTheme}
      color="primary"
      style={{
        overflow: "hidden",
        backgroundColor: currentTheme === "dark" ? "#1a1a1a" : "",
      }}
      className={currentTheme === "light" ? `bg-[#1565c0]` : `bg-[#1a1a1a]`}
    >
      <Slide
        direction={currentTheme === "light" ? "left" : "right"}
        in={currentTheme === "light"}
        style={{ position: "absolute" }}
        timeout={450}
      >
        <LightModeRoundedIcon style={{ color: "yellow" }} />
      </Slide>
      <Slide
        direction={currentTheme === "dark" ? "left" : "right"}
        in={currentTheme === "dark"}
        style={{ position: "absolute" }}
        timeout={450}
      >
        <DarkModeRoundedIcon />
      </Slide>
    </Fab>
  );
}
