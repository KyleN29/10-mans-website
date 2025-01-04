import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchButton from "../components/MatchComponents/MatchButton";

function RecentMatches() {
  const [matchData, setMatchData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/recent_matches");
        setMatchData(response.data);
      } catch (error) {
        console.error("Error fetching data. Retrying in 5 seconds...", error);
        setTimeout(fetchData, 5000); // Retry after 5 seconds
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {matchData.map((match: any) => (
        <MatchButton matchData={match} />
      ))}
    </div>
  );
}

export default RecentMatches;
