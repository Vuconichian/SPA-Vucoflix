import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/movieCard';
import { tmdbAPI } from '../services/tmdb';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5); // Limitado a 5 páginas

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await tmdbAPI.getPopularMovies(page);
                setMovies(data.results);
                setTotalPages(Math.min(data.total_pages, 5));
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };
    fetchMovies();
    }, [page]);

    const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
    };

    const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
        <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 mx-1 rounded ${
                num === page
                ? 'bg-netflix-red text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>
            {num}
        </button>
    ));
    };

    return (
        <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Películas</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
        {movies.map(movie => (
            <Link 
                key={movie.id} 
                to={`/pelicula/${movie.id}`} 
                state={{ fromPage: page }}>
                <MovieCard movie={movie} />
            </Link>
        ))}
        </div>
        <div className="flex justify-center mt-12 space-x-2">
            <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50">
            Anterior
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50">
                Siguiente
            </button>
        </div>
    </main>
    );
};

export default Movies;