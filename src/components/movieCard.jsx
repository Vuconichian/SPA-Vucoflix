import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/pelicula/${movie.id}`} className="group">
            <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4">
                        <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                        <p className="text-gray-300 text-sm">{movie.release_date.split('-')[0]}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;