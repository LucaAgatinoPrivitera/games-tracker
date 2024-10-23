import React, { useEffect, useState } from 'react';
// Mi permette di usare le props
import { useNavigate } from 'react-router-dom';

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
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null); // Per l'appid selezionato
  const navigate = useNavigate();

  useEffect(() => {

    // Titolo della pagina
    document.title = 'I miei giochi';

    const fetchOwnedGames = async () => {
      try {
        // Così sono nascoste le key
        const apiKey = import.meta.env.VITE_STEAM_API_KEY;
        const steamId = import.meta.env.VITE_STEAM_ID;


        const response = await fetch(`/api/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`);
        // console.log("api", apiKey);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);


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

  const handleGameClick = (appid: number, name: string) => {
    setSelectedAppId(appid); // Aggiorna lo stato con l'appid selezionato
    navigate(`/news/${appid}/${encodeURIComponent(name)}`);
  };

  return (
    <div className='lg:container mx-auto pt-8'>
      <h1 className='mb-4 font-bold'>Giochi Posseduti</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentGames.map((game) => (
          <div key={game.appid} className="flex flex-col p-4 rounded-lg">
            <h2 className="text-lg font-bold flex-grow">{game.name}</h2>


            <div className="group relative">
              <img
                src={`https://media.steampowered.com/steam/apps/${game.appid}/header.jpg`}
                alt={game.name}
                className="w-full h-auto rounded transition ease-in-out hover:scale-110"
              />

              {/* Container per le icone grazie al group-hover posso cambiare l'opacità delle icone */}
              <div className="opacity-0 absolute inset-0 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-300 bgIcons">
                <a
                  href={`https://store.steampowered.com/app/${game.appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation(); // Previene la propagazione dell'evento
                  }}
                  className="flex items-center justify-center text-4xl iconOnHover text-white bg-black p-2 rounded-full mx-2 hover:text-white hover:scale-150 transition ease-in-out p-12 hover:border iconShadow"
                >
                  <i className="fa-brands fa-steam"></i>
                </a>


                <a
                  onClick={() => handleGameClick(game.appid, game.name)}
                  className="flex
items-center justify-center text-4xl iconOnHover text-white bg-black p-2 rounded-full mx-2 cursor-pointer hover:text-white hover:scale-150 transition ease-in-out p-12 hover:border iconShadow"
                >
                  <i className="fas fa-newspaper"></i> {/* Icona Notizie */}
                </a>

                <a
                  onClick={(e) => {
                    e.stopPropagation(); // Impedisce la propagazione dell'evento click
                    navigate(`/achievements/${game.appid}/${encodeURIComponent(game.name)}`);
                  }}
                  className="flex items-center justify-center text-4xl iconOnHover text-white bg-black p-2 rounded-full mx-2 cursor-pointer hover:text-white hover:scale-150 transition ease-in-out p-12 hover:border iconShadow"
                >
                  <i className="fas fa-trophy"></i> {/* Icona Obiettivi */}
                </a>

              </div>
            </div>


            <p>Ore giocate: {Math.floor(game.playtime_forever / 60)} ore</p>
            {game.playtime_forever > 0 ? (
              <p>Ultimo avvio: {timeSinceLastPlayed(game.rtime_last_played)}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-1 border ${index + 1 === currentPage ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameFeed;