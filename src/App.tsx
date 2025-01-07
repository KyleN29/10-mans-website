import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import RecentMatches from "./pages/RecentMatches";
import MatchDetail from "./pages/MatchDetail";
import TDMLeaderboard from "./components/LeaderboardComponents/TDMLeaderboard";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


createRoot(document.getElementById("root")!).render(
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recent_matches" element={<RecentMatches />}></Route>
            <Route path="/matches/:id" element={<MatchDetail />} />
        </Routes>
    </Router>
);
