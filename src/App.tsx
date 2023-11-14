import Menu from "./components/menu/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import KeySequenceComponent from "./components/theme/custom/KeySequence";
import { LocalStorageHandler } from "./components/localStorage/LocalStorageHandler";
import { ChapterCreator, ChapterDisplay } from "./components/chapters/Chapters";
import { ChapterProvider } from "./components/chapters/context/context";

function App() {
  return (
    <Router>
      <ChapterProvider>
        <div
          className="flex flex-row align-middle h-screen w-screen 
                  text-content bg-bg transition-all duration-500
                  background"
        >
          <Menu />
          <KeySequenceComponent />

          <Routes>
            <Route
              path="/chapter/:chapterId/page/:pageId"
              element={<ChapterDisplay />}
            />
            <Route path="/chapter/:chapterId" element={<ChapterDisplay />} />
            <Route path="/" element={<Home />} />
            <Route path="/creator" element={<ChapterCreator />} />
          </Routes>

          <LocalStorageHandler />
        </div>
      </ChapterProvider>
    </Router>
  );
}

export default App;
