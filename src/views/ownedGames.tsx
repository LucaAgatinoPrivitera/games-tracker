import React, { useEffect, useState } from 'react';

interface OwnedGame {
  appid: number;
  name: string;
  img_icon_url: string;
  playtime_forever: number;
  rtime_last_played: number;
}

const GameFeed = () => {
  const [games, setGames] = useState<OwnedGame[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 30; // Numero di giochi per pagina

  useEffect(() => {
    const fetchOwnedGames = async () => {
      try {
        const apiKey = '97B3D2854B59E628EE4C2C6D36E60312'; // Sostituisci con la tua chiave API 
        const steamId = '76561198043560118'; // Sostituisci con il tuo SteamID 
        const response = await fetch(`/api/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        const ownedGames: OwnedGame[] = data.response.games;

        // Ordina i giochi per ore giocate
        ownedGames.sort((a, b) => b.playtime_forever - a.playtime_forever);

        // Aggiorna lo stato con i giochi posseduti
        setGames(ownedGames);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Si è verificato un errore sconosciuto');
        }
      }
    };

    fetchOwnedGames();
  }, []);

  const timeSinceLastPlayed = (timestamp: number) => {
    const lastPlayedDate = new Date(timestamp * 1000); // Converti in millisecondi
    const now = new Date();
    const differenceInMillis = now.getTime() - lastPlayedDate.getTime(); // Calcola la differenza in millisecondi

    const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    let timeAgo: string;
    if (differenceInDays > 0) {
      timeAgo = `${differenceInDays} giorni fa`;
    } else if (differenceInHours > 0) {
      timeAgo = `${differenceInHours} ore fa`;
    } else {
      timeAgo = `${differenceInMinutes} minuti fa`;
    }

    // Formatta la data in una stringa leggibile
    const formattedDate = lastPlayedDate.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `${timeAgo} (${formattedDate})`; // Restituisce il messaggio formattato
  };

  if (error) {
    return <div className="lg:container mx-auto">Errore: {error}</div>;
  }

  // Calcola i giochi da mostrare in base alla pagina corrente
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(games.length / gamesPerPage);

  return (
    <div className='lg:container mx-auto'>
      <h1 className='mb-4'>Giochi Posseduti</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.appid} className="flex flex-col p-4 rounded-lg">
            <h2 className="text-lg font-bold flex-grow">{game.name}</h2>
            <img
              src={`https://media.steampowered.com/steam/apps/${game.appid}/header.jpg`}
              alt={game.name}
              className="w-full h-auto rounded"
            />
            <p>Ore giocate: {Math.floor(game.playtime_forever / 60)} ore</p>
            {game.playtime_forever > 0 ? (
              <p>Ultimo avvio: {timeSinceLastPlayed(game.rtime_last_played)}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameFeed;
