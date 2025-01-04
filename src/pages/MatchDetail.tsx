import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function MatchDetail() {
  const { id } = useParams();
  const [matchData, setMatchData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/match/" + id);
        setMatchData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div>Match Time: {matchData.metadata.started_at}</div>;
}

export default MatchDetail;
