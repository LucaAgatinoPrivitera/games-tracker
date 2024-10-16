// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/ownedGames';
import About from './views/about';
import OwnedGames from './views/ownedGames';
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
        {/* Aggiungi altre rotte qui, se necessario */}
      </Routes>
    </Router>
  );
}

export default App;
