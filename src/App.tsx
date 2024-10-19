// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/ownedGames';
import About from './views/about';
import OwnedGames from './views/ownedGames';
import GameNews from './views/news.tsx';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>

      <Navbar className="" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About className="pt-8" />} />
        <Route path="/mygames" element={<OwnedGames />} />
        {/* Mi permette di utilizzare il prop */}
        <Route path="/news/:appid/:name" element={<GameNews />} />

        {/* Aggiungi altre rotte qui, se necessario */}
      </Routes>
    </Router>
  );
}

export default App;
