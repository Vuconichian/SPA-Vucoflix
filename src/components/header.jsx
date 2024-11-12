import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    };

    return (
        <header className="bg-netflix-black">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-netflix-red text-2xl font-bold" aria-label="Vucoflix Home">
                    Vucoflix
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="text-white hover:text-netflix-red transition-colors">
                            Inicio
                        </Link>
                        <Link to="/peliculas" className="text-white hover:text-netflix-red transition-colors">
                            Películas
                        </Link>
                        <Link to="/trailers" className="text-white hover:text-netflix-red transition-colors">
                            Trailers
                        </Link>
                    </nav>
                </div>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="search"
                        placeholder="Buscar película"
                        className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-netflix-red"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Buscar película"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </form>
            </div>
        </div>
    </header>
    );
};


export default Header;