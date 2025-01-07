import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RecentMatches from "./pages/RecentMatches";
import MatchDetail from "./pages/MatchDetail";
import TDMLeaderboard from "./components/LeaderboardComponents/TDMLeaderboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import StandardLeaderboard from "./components/LeaderboardComponents/StandardLeaderboard";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StandardLeaderboard />} />
        <Route path="/tdm" element={<TDMLeaderboard />} />
        <Route path="/recent_matches" element={<RecentMatches />} />
        <Route path="/matches/:id" element={<MatchDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
