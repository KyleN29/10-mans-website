import { useNavigate } from "react-router-dom";

interface MatchData {
  _id: string;
  map_name: string;
  match_id: string;
}

const MatchButton = ({ matchData }: { matchData: MatchData }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/matches/${matchData.match_id}`)}>
      {matchData.map_name}
    </button>
  );
};

export default MatchButton;
