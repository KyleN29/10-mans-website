import { useNavigate } from "react-router-dom";
import './MatchButton.css'

interface MatchData {
    _id: string;
    map_name: string;
    match_id: string;
    time_since_played: string;
    attacker_score: number;
    defender_score: number;
}


const MatchButton = ({ matchData }: { matchData: MatchData }) => {
    const navigate = useNavigate();

    return (
        <button id="matchButton" onClick={() => navigate(`/matches/${matchData.match_id}`)}>
            <div id="matchButtonLeftInfo">
                <div>{matchData.time_since_played}</div>
                <div>{matchData.map_name}</div>
            </div>
            <div id="matchButtonRightInfo">
                {matchData.attacker_score}:{matchData.defender_score}
            </div>
            
        </button>
    );
};

export default MatchButton;
