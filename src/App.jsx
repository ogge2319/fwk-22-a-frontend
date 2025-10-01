import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./templates/Layout/Layout";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
