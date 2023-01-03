import React from "react";

import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/Home";

import { QueryClient, QueryClientProvider } from "react-query";
import { Navigation } from "./components/Navigation/Navigation";
import { AboutPage } from "./pages/About";

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </QueryClientProvider>
);
