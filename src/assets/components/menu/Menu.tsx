import { useState } from "react";
import styles from "./Menu.module.css";
import { Fab, Grow } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThemeHandler from "../theme/ThemeHandler";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section
      className={`absolute transition-all duration-500 flex flex-row justify-center md:w-1/4 
                  w-menu h-menu m-3 p-3 rounded-lg text-white  
                  glass ${isMenuOpen ? `translate-x-0` : `-translate-x-menu`}`}
    >
      <div
        className={`absolute transition-all duration-500 ${
          isMenuOpen ? `right-3` : `md:-right-1/3 -right-32`
        }`}
      >
        <Fab onClick={handleIconClick} color="secondary">
          <Grow in={!isMenuOpen} style={{ position: "absolute" }}>
            <MenuRoundedIcon />
          </Grow>
          <Grow in={isMenuOpen} style={{ position: "absolute" }}>
            <CloseRoundedIcon />
          </Grow>
        </Fab>
      </div>

      <div className="h-10 m-2">
        <h1 className="text-2xl leading-8 text-accent">Resonance</h1>
      </div>

      <div className="absolute bottom-5 right-5">
        <ThemeHandler />
      </div>
    </section>
  );
}
