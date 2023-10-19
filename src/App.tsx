import { useState } from "react";
import "./App.css";
import Menu from "./assets/components/menu/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./assets/components/Home";
import Teste from "./assets/components/Teste";

function App() {
  return (
    <div className="flex flex-row h-screen w-screen text-content bg-bg transition-all duration-500">
      <Menu />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Teste" element={<Teste />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
