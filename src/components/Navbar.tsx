// components/Navbar.tsx
import { Link } from 'react-router-dom';

interface NavbarProps {
    className?: string; // Prop per le classi CSS opzionali
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
    return (
        <div id="navbar" className={`bg-slate-950 w-full py-4 ${className}`}>
            <div className="lg:container mx-auto flex justify-between items-center h-full">
                <Link className="text-white hover:text-white shadow transition ease-in-out duration-300" to="/">
                    <h1 className="oswald cursor-pointer">GamesTrackers</h1>
                </Link>
                <div className="flex align-middle gap-4 montserrat">
                    <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to="/register">
                        Registrati
                    </Link>
                    <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to="/login">
                        Accedi
                    </Link>
                    <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to="/about">
                        About
                    </Link>

                    <Link className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" to={`/achievements/220/somegame`}>
                        Achieve
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
