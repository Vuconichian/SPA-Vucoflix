import React, { useState, useEffect } from 'react';
import MovieCard from '../components/movieCard';
import { tmdbAPI } from '../services/tmdb';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5); // Limitamos a 5 páginas

    useEffect(() => {
    const fetchMovies = async () => {
        try {
            const data = await tmdbAPI.getPopularMovies(page);
            setMovies(data.results);
            setTotalPages(Math.min(data.total_pages, 5)); // Aseguramos que no exceda 5 páginas
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
    }, [page]); // Dependencia en 'page' para que se actualice cuando cambie la página

    const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
    };

    const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, Math.min(page - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
        <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
            i === page
                ? 'bg-netflix-red text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {i}
        </button>
        );
    }

    return pageNumbers;
    };

    return (
        <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Películas</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
            {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
        </div>
        <div className="flex justify-center mt-12 space-x-2">
        <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50"
        >
            Anterior
        </button>
        {renderPageNumbers()}
        <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50"
        >
            Siguiente
        </button>
        </div>
    </main>
    );
};

export default Movies;