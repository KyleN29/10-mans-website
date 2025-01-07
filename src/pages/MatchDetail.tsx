import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import './MatchDetail.css'

function MatchDetail() {
    const { id } = useParams();
    const [matchData, setMatchData] = useState<any>([]);
    const [playerData, setPlayerData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/match/"+id)
                setMatchData(response.data)
                calculatePlayerData(response.data)
            }
            catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [])
    
    const calculatePlayerData = (matchData: any) => {
        const players = matchData.players;
        const newPlayerData: any = []
        
        for (const player of players) {
            const calculatedPlayerData: any = {}

            calculatedPlayerData.name = player.name + "#" + player.tag
            calculatedPlayerData.team = player.team_id
            calculatedPlayerData.kills = player.stats.kills
            calculatedPlayerData.deaths = player.stats.deaths
            calculatedPlayerData.assists = player.stats.assists
            calculatedPlayerData.acs = (player.stats.score / (matchData.teams[0].rounds.won + matchData.teams[0].rounds.lost)).toFixed(0)
            newPlayerData.push(calculatedPlayerData)
        }
        newPlayerData.sort((a: any, b: any) => b.acs - a.acs)
        setPlayerData(newPlayerData)
    }

    if (loading) return <p>Loading...</p>;
    return (
        
        <div>
            <div id="matchDetailFlexContainer">
                <div id="matchDetailFlexHeader">
                    <div>Player</div>
                    <div>Kills</div>
                    <div>Deaths</div>
                    <div>Assists</div>
                    <div>ACS</div>
                </div>
                {playerData.map((player: any) => (
                    
                <div id="matchDetailFlexPlayer" className={player.team == "Blue" ? "greenBackground" : "redBackground"} key={player.name}>
                    <div>{player.name}</div>
                    <div>{player.kills}</div>
                    <div>{player.deaths}</div>
                    <div>{player.assists}</div>
                    <div>{player.acs}</div>
                </div>
                ))}
                    
                

            </div>
        </div>
    );
}

export default MatchDetail;
