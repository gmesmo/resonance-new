import { useState, useEffect, useRef } from "react";
import { Fab, Grow } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ThemeHandler } from "../theme/ThemeHandler";
import { ChapterSelector } from "../chapters/Chapters";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <section
      ref={menuRef}
      className={`absolute z-10 transition-all duration-500 flex flex-row justify-center md:w-1/4 
                  w-menu h-menu m-3 p-3 rounded-lg text-white 
                  glass ${isMenuOpen ? `translate-x-0` : `-translate-x-menu`}`}
    >
      <div
        className={`absolute transition-all duration-500 ${
          isMenuOpen ? `right-3` : `md:-right-35% -right-32`
        }`}
      >
        <Fab
          onClick={handleIconClick}
          className="bg-accent text-white hover:bg-white hover:text-accent"
        >
          <Grow in={!isMenuOpen} style={{ position: "absolute" }}>
            <MenuRoundedIcon />
          </Grow>
          <Grow in={isMenuOpen} style={{ position: "absolute" }}>
            <CloseRoundedIcon />
          </Grow>
        </Fab>
      </div>

      <div className="h-10 w-full m-2">
        <h1 className="text-2xl leading-8 text-accent text-center">
          Resonance
        </h1>
        <ChapterSelector menuHandler={handleIconClick} />
      </div>

      <div className="absolute bottom-5 right-5">
        <ThemeHandler />
      </div>
    </section>
  );
}
