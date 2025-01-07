import React from "react";
import StandardLeaderboard from "../components/LeaderboardComponents/StandardLeaderboard.tsx";
import TDMLeaderboard from "../components/LeaderboardComponents/TDMLeaderboard.tsx";
import Header from "../components/Header.tsx";

function App() {
    return (
        <div id="container">

            <StandardLeaderboard />
            <TDMLeaderboard />
        </div>
    );
}

export default App;
