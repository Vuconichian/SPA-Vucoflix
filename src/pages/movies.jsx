import React, { useState, useEffect } from 'react';
import MovieCard from '../components/movieCard';
import { tmdbAPI } from '../services/tmdb';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
    const fetchMovies = async () => {
        try {
        const data = await tmdbAPI.getPopularMovies(page);
        setMovies(data.results);
        } catch (error) {
        console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
    }, [page]);

    return (
        <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Películas</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50"
                >Anterior
            </button>
            <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-4 py-2 bg-netflix-red text-white rounded"
                >Siguiente
            </button>
        </div>
    </main>
);
};

export default Movies;