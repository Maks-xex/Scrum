import React from "react";

import { Routes, Route } from "react-router-dom";

import { Navigation } from "./components/Navigation/Navigation";

import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";

export const App: React.FC = () => (
  <>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </>
);
