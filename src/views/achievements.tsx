import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface OwnedAchievements {
    appid: number;
    name: string;
    achieved: number; // Questo indica se l'utente ha sbloccato l'achievement
    unlocktime: number;
}

interface AchievementDetail {
    name: string;
    displayName: string;
    icon: string;
    icongray: string;
    achieved: number;
    description: string;
}

const GamesAchievements = () => {
    const { appid, name } = useParams<{ appid: string; name: string }>();
    const [achievements, setAchievements] = useState<AchievementDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = `Obiettivi di ${name}`;

        const fetchAchievementsForGame = async () => {
            setLoading(true);

            try {
                const apiKey = import.meta.env.VITE_STEAM_API_KEY;
                const steamId = import.meta.env.VITE_STEAM_ID;

                // Prima chiamata per ottenere tutti gli achievement del gioco
                const schemaResponse = await fetch(
                    `/api/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appid=${appid}&l=english&format=json`
                );
                const schemaData = await schemaResponse.json();
                const allAchievements: AchievementDetail[] = schemaData.game?.availableGameStats?.achievements || [];



                // Seconda chiamata per ottenere gli obiettivi sbloccati
                const response = await fetch(
                    `/api/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${apiKey}&steamid=${steamId}`
                );
                const data = await response.json();
                const userAchievements: OwnedAchievements[] = data.playerstats?.achievements || [];

                // Mappare i dati: unisci gli achievement ottenuti con quelli disponibili
                const achievementsWithStatus = allAchievements.map((achievement) => {
                    const userAchievement = userAchievements.find((a) => a.name === achievement.name);
                    return {
                        ...achievement,
                        achieved: userAchievement ? userAchievement.achieved : 0, // Imposta lo stato dell'achievement
                    };
                });

                console.log(achievementsWithStatus)





                setAchievements(achievementsWithStatus);
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
        <div className='lg:container mx-auto pt-8'>
            {loading ? (
                <p>Caricamento...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8'>
                    {achievements.map((achievement) => (
                        <div className='flex flex-col p-8' key={achievement.name}>
                            <img
                                src={achievement.achieved === 1 ? achievement.icon : achievement.icongray} // Icona normale se sbloccato, icona grigia se non sbloccato
                                alt={achievement.name}
                            />

                            <div className='flex flex-col items-center'>
                                <p className='w-full text-center font-bold h-12'>{achievement.displayName}</p> {/* Altezza fissa per il testo */}
                                {achievement.achieved === 1 ? (
                                    <p className="w-full fa-solid fa-check text-green-500 font-bold text-3xl text-center"></p>
                                ) : (
                                    <p className="w-full fa-solid fa-xmark text-red-500 font-bold text-3xl text-center"></p>
                                )}
                            </div>


                            {/* <p className='text-center pt-2 pb-4'>{achievement.description}</p> disattivato perché la richiesta non fornisce tutte le descrizioni */}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GamesAchievements;
