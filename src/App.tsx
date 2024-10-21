// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Achievements from './views/achievements.tsx';

import Home from './views/ownedGames';
import About from './views/about';
import OwnedGames from './views/ownedGames';
import GameNews from './views/news.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar className="" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About className="pt-8" />} />
        <Route path="/mygames" element={<OwnedGames />} />
        <Route path="/news/:appid/:name" element={<GameNews />} />
        <Route path="/achievements/:appid/:name" element={<Achievements />} />
      </Routes>
    </Router>
  );
}

export default App;
