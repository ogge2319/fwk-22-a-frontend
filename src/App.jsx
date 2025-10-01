import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./templates/Layout/Layout";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { GameProvider } from "./providers/GameProvider";

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Layout>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
