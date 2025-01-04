import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import TDMLeaderboard from "./components/leaderboards/TDMLeaderboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
);
