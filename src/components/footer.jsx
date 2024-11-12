import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-netflix-black py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-white font-bold mb-4">IV Labs</h3>
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4">Atajos rápidos</h3>
                    <ul className="space-y-2">
                        <li>
                        <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                            Inicio
                        </Link>
                        </li>
                        <li>
                        <Link to="/peliculas" className="text-gray-400 hover:text-white transition-colors">
                            Películas
                        </Link>
                        </li>
                        <li>
                        <Link to="/trailers" className="text-gray-400 hover:text-white transition-colors">
                            Trailers
                        </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4">Contacto</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>ivlabs@gmail.com</li>
                        <li>+34 4321 1234</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;