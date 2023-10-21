import "./App.css";
import Menu from "./assets/components/menu/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./assets/components/Home";
import KeySequenceComponent from "./assets/components/theme/custom/KeySequence";
import LocalStorageHandler from "./assets/components/localStorage/LocalStorageHandler";
import { ChapterDisplay } from "./assets/components/chapters/Chapters";

function App() {
  return (
    <Router>
      <div
        className="flex flex-row align-middle h-screen w-screen 
                  text-content bg-bg transition-all duration-500
                  background"
      >
        <Menu />
        <KeySequenceComponent />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chapter/:id" element={<ChapterDisplay />} />
        </Routes>

        <LocalStorageHandler />
      </div>
    </Router>
  );
}

export default App;
