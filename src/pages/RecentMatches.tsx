import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchButton from "../components/MatchComponents/MatchButton";
import Header from "../components/Header";
import './RecentMatches.css'

interface MatchData {
    _id: string;
    map_name: string;
    match_id: string;
    time_since_played: string;
    attacker_score: number;
    defender_score: number;
}

function RecentMatches() {
    const [matchData, setMatchData] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/recent_matches");
                setMatchData(response.data);
            } catch (error) {
                console.error("Error fetching data. Retrying in 5 seconds...", error);
                setTimeout(fetchData, 5000); // Retry after 5 seconds
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    if (loading) return <p>Loading...</p>;

    return (
        <div id="matchesContainer">  
            {matchData.map((match: MatchData) => (
                <div id="matchesContainerItem">
                <MatchButton matchData={match} />
                </div>
            ))}
        </div>
    );
}

export default RecentMatches;
