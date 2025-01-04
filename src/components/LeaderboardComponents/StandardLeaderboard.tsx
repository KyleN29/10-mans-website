import React, { useState, useEffect } from "react";
import axios from "axios";
import './StandardLeaderboard.css';

interface RawPlayerData {
    _id: string;
    player_id: string;
    average_combat_score: number;
    kill_death_ratio: number;
    losses: number;
    matches_played: number;
    mmr: number;
    name: string;
    total_combat_score: number;
    total_deaths: number;
    total_kills: number;
    total_rounds_played: number;
    wins: number;
    tdm_mmr: number;
    tdm_wins: number;
    tdm_losses: number;
    tdm_total_kills: number;
    tdm_total_deaths: number;
    tdm_matches_played: number;
    tdm_avg_kills: number;
    tdm_kd_ratio: number;
}

interface ComputedPlayerData {
    _id: string;
    name: string;
    mmr: number;
    wins: number;
    losses: number;
    win_percentage: number;
    avg_acs: number;
    kd_ratio: number;
    rank: number;
}

interface SortConfig<T> {
    key: keyof T;
    direction: "ascending" | "descending";
  }

const StandardLeaderboard = () => {
    const [data, setData] = useState<ComputedPlayerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<SortConfig<ComputedPlayerData>>({ key: "rank", direction: "ascending" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/mmr_data");
                updateData(response.data);
            } catch (error) {
                console.error("Error fetching data. Retrying in 5 seconds...", error);
                setTimeout(fetchData, 5000); // Retry after 5 seconds
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    const updateData = (data: RawPlayerData[]) => {
        let newData: ComputedPlayerData[] = []
        for (let i = 0; i < data.length; i++) {
            const playerData: ComputedPlayerData = {
                "_id": data[i]._id,
                "name": data[i].name,
                "mmr": data[i].mmr,
                "wins": data[i].wins,
                "losses": data[i].losses,
                "win_percentage": data[i].wins / data[i].matches_played,
                "avg_acs": data[i].average_combat_score,
                "kd_ratio": data[i].total_kills / data[i].total_deaths,
                "rank": 0
            }
            newData.push(playerData);
        }

        // Sort by MMR in descending order and assign ranks
        newData.sort((a, b) => b.mmr - a.mmr);
        newData = newData.map((player, index) => ({ ...player, rank: index + 1 }));

        setData(newData);
    }

    const handleSort = (key: keyof ComputedPlayerData) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key: string) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "ascending" ? " ▲" : " ▼";
        }
        return "";
    };

    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
    });

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("rank")}>
                            Rank{getSortArrow("rank")}
                        </th>
                        <th onClick={() => handleSort("name")}>
                            User{getSortArrow("name")}
                        </th>
                        <th onClick={() => handleSort("mmr")}>
                            MMR{getSortArrow("mmr")}
                        </th>
                        <th onClick={() => handleSort("wins")}>
                            Wins{getSortArrow("wins")}
                        </th>
                        <th onClick={() => handleSort("losses")}>
                            Losses{getSortArrow("losses")}
                        </th>
                        <th onClick={() => handleSort("win_percentage")}>
                            Win%{getSortArrow("win_percentage")}
                        </th>
                        <th onClick={() => handleSort("avg_acs")}>
                            Avg ACS{getSortArrow("avg_acs")}
                        </th>
                        <th onClick={() => handleSort("kd_ratio")}>
                            K/D{getSortArrow("kd_ratio")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item._id}>
                            <td>{item.rank}</td>
                            <td>{item.name}</td>
                            <td>{item.mmr}</td>
                            <td>{item.wins}</td>
                            <td>{item.losses}</td>
                            <td>{(item.win_percentage * 100).toFixed(2)}%</td>
                            <td>{(item.avg_acs).toFixed(2)}</td>
                            <td>{(item.kd_ratio).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StandardLeaderboard;
