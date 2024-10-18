import React, { useState, useEffect } from 'react';

interface Player {
    steamid: string;
    personaname: string;
    avatarfull: string;
    personastate: number;
    // Aggiungi altri campi se necessario
}

interface SteamProfileResponse {
    response: {
        players: Player[];
    };
}

const SteamProfile = () => {
    const [profile, setProfile] = useState<Player | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Inserisci qui la tua API Key e l'ID Steam dell'utente
    const apiKey = '97B3D2854B59E628EE4C2C6D36E60312'; 
    const steamId = '76561198043560118'; 

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`/api/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`);
                console.log("response qui", response);

                if (!response.ok) {
                    throw new Error('Errore nel recuperare i dati');
                }
                const data: SteamProfileResponse = await response.json();
                console.log('data qui', data);
                
                // Assicurati che ci sia almeno un giocatore nella risposta
                if (data.response.players.length > 0) {
                    setProfile(data.response.players[0]);
                } else {
                    setError('Nessun profilo trovato');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Errore sconosciuto');
            }
        };

        fetchProfileData();
    }, [apiKey, steamId]);

    if (error) {
        return <div>Errore: {error}</div>;
    }

    
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg pt-8">
            {profile ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{profile.personaname}</h2>
                    <img
                        className="mx-auto rounded-full"
                        src={profile.avatarfull}
                        alt="Avatar"
                    />
                    <p className="mt-2">
                        Stato: {profile.personastate === 1 ? 'Online' : 'Offline'}
                    </p>
                </div>
            ) : (
                <p>Caricamento dati...</p>
            )}
        </div>
    );
};

export default SteamProfile;