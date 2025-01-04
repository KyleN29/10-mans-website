import React from "react";
import StandardLeaderboard from "../components/leaderboards/StandardLeaderboard.tsx";
import TDMLeaderboard from "../components/leaderboards/TDMLeaderboard.tsx";

function App() {
    return (
        <div>
            <StandardLeaderboard />
            <TDMLeaderboard />
        </div>
    );
}

export default App;
