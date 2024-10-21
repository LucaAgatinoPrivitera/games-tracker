import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface OwnedAchievements {
    appid: number;
    name: string;
    img_icon_url: string;
    achieved: number;
    unlocktime: number;
}

const GamesAchievements = () => {
    const { appid, name } = useParams<{ appid: string; name: string }>();
    const [achievements, setAchievements] = useState<OwnedAchievements[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = `Achievements for ${name}`;

        const fetchAchievementsForGame = async () => {
            setLoading(true);

            try {
                const apiKey = import.meta.env.VITE_STEAM_API_KEY;
                const steamId = import.meta.env.VITE_STEAM_ID;

                const response = await fetch(
                    `/api/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${apiKey}&steamid=${steamId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                if (data.playerstats && data.playerstats.achievements) {
                    setAchievements(data.playerstats.achievements);
                } else {
                    setError("Nessun achievement trovato per questo gioco.");
                }

                setError(null);
            } catch (error) {
                setError((error as Error).message || 'Errore durante il recupero degli achievements');
                setAchievements([]);
            } finally {
                setLoading(false);
            }
        };

        if (appid) {
            fetchAchievementsForGame();
        } else {
            setError('AppID non valido.');
        }
    }, [appid, name]);

    return (
        <div>
            {loading ? (
                <p>Caricamento...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {achievements.map((achievement) => (
                        <div key={achievement.name}>
                            <img
                                src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appid}/${achievement.img_icon_url}`}
                                alt={achievement.name}
                            />
                            <p>{achievement.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GamesAchievements;
