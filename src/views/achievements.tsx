import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    hidden: number;
}

const GamesAchievements = () => {
    const { appid, name } = useParams<{ appid: string; name: string }>();
    const [achievements, setAchievements] = useState<AchievementDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Obiettivi di ${name}`;

        const fetchAchievementsForGame = async () => {
            setLoading(true);

            try {
                const apiKey = import.meta.env.VITE_STEAM_API_KEY;
                const steamId = import.meta.env.VITE_STEAM_ID;

                // Prima chiamata per ottenere tutti gli achievement del gioco
                const schemaResponse = await fetch(
                    `/api/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&appid=${appid}&l=italian&format=json`
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

                console.log(achievementsWithStatus);
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
            {/* Freccia per tornare indietro */}
            <div className="flex gap-4">
                <button onClick={() => navigate(-1)} className='mb-4 px-4 py-2 border text-white rounded border-0 back-shadow'>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <h1 className='pb-4 font-bold'>Obiettivi di: {name}</h1>
            </div>

            {loading ? (
                <p>Caricamento...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pt-8'>
                    {achievements.map((achievement) => (
                        <div className='flex flex-col p-8 group' key={achievement.name}>
                            {/* Immagine achievement con altezza e larghezza controllata */}
                            <img
                                src={achievement.achieved === 1 ? achievement.icon : achievement.icongray} // Icona normale se sbloccato, icona grigia se non sbloccato
                                alt={achievement.name}
                                className="mx-auto mb-2 achievement-icon"
                            />

                            {/* Contenitore con flex-grow per garantire altezza uniforme */}
                            <div className='flex flex-col items-center flex-grow'>
                                {/* Titolo con min-height per uniformità tra gli h2 */}
                                <h2 className='w-full text-center font-bold text-2xl mt-3 mb-2 flex-grow min-h-[3rem]'>
                                    {achievement.displayName}
                                </h2>

                                {/* Descrizione o testo nascosto, con altezza minima */}
                                {achievement.hidden === 0 ? (
                                    <p className='w-full text-center flex-grow min-h-[2.5rem] relative transform translate-y-[-40px] opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100'>
                                        {achievement.description}
                                    </p>
                                ) : (
                                    <p className='w-full text-center text-gray-400 flex-grow min-h-[2.5rem] relative transform translate-y-[-40px] opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100'>
                                        Obiettivo nascosto
                                    </p>
                                )}

                                {/* Icona di completamento dell'achievement */}
                                <div className="flex-grow flex items-center justify-center min-h-[3rem]">
                                    {achievement.achieved === 1 ? (
                                        <p className="fa-solid fa-check text-green-500 font-bold text-3xl text-center mt-2 icon-shadow opacity-0 group-hover:opacity-100"></p>
                                    ) : (
                                        <p className="fa-solid fa-xmark text-red-500 font-bold text-3xl text-center mt-2 icon-shadow opacity-0 group-hover:opacity-100"></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GamesAchievements;
