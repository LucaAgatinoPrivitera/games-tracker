import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../views/home' // Assicurati che il percorso sia corretto
// import About from './About'; // Assicurati che il percorso sia corretto
import '../App.css';

function App() {
    return (
        <Router>
            <div>
                <div id='navbar' className="bg-slate-950 w-full py-4">
                    <div className="lg:container mx-auto flex justify-between items-center h-full">
                        <Link className="text-white hover:text-white shadow transition ease-in-out duration-300" to="/">
                            <h1 className="oswald cursor-pointer">GamesTrackers</h1>
                        </Link>
                        <div className="flex align-middle gap-4 gelasio">
                            <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to="/register">Registrati</Link>
                            <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to="/login">Accedi</Link>
                            <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to="/about">About</Link>
                        </div>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/about" element={<About />} /> */}
                    {/* Aggiungi altre rotte qui, se necessario */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
