import React from "react";
import StandardLeaderboard from "../components/LeaderboardComponents/StandardLeaderboard.tsx";
import TDMLeaderboard from "../components/LeaderboardComponents/TDMLeaderboard.tsx";

function App() {
    return (
        <div>
            <StandardLeaderboard />
            <TDMLeaderboard />
        </div>
    );
}

export default App;
