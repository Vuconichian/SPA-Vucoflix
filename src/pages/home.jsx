import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/movieCard';
import { tmdbAPI } from '../services/tmdb';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const location = useLocation();

    useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    setIsSearching(!!query);
    setPage(1);
    fetchMovies(query, 1);
    }, [location.search]);

    const fetchMovies = async (query, currentPage) => {
    try {
        let data;
        if (query) {
        data = await tmdbAPI.searchMovies(query, currentPage);
    } else {
        data = await tmdbAPI.getPopularMovies(currentPage);
    }
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 5));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search');
        fetchMovies(query, newPage);
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
        }`}
        >
        {num}
        </button>
    ));
    };

    return (
    <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">
        {isSearching ? 'Resultados de búsqueda' : 'Películas populares'}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
            <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50"
            >
            Anterior
            </button>
            {renderPageNumbers()}
            <button
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-netflix-red text-white rounded disabled:opacity-50"
            >
            Siguiente
            </button>
        </div>
        )}
    </main>
    );
};

export default Home;