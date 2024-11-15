import React, { useState, useEffect } from 'react';
import { tmdbAPI } from '../services/tmdb';

const TRAILERS_PER_PAGE = 6;

const Trailers = () => {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
    const fetchTrailers = async () => {
        try {
            setLoading(true);
            const data = await tmdbAPI.getPopularMovies(page);
            const moviesWithTrailers = await Promise.all(
                data.results.map(async (movie) => {
                    const details = await tmdbAPI.getMovieDetails(movie.id);
                    const trailer = details.videos.results.find(
                        (video) => video.type === 'Trailer' && video.site === 'YouTube'
                    );
                    return trailer ? { ...movie, trailer } : null;
                })
            );
        const filteredTrailers = moviesWithTrailers.filter(Boolean);
        setTrailers(filteredTrailers);
        setTotalPages(Math.ceil(filteredTrailers.length / TRAILERS_PER_PAGE));
    } catch (error) {
        console.error('Error fetching trailers:', error);
        setError('Hubo un problema al cargar los trailers. Por favor, intenta de nuevo más tarde.');
    } finally {
        setLoading(false);
    }
    };

    fetchTrailers();
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
        }`}
        >
        {num}
        </button>
    ));
    };

    if (loading) {
    return (
        <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-8">Trailers</h1>
        <p>Cargando trailers...</p>
        </div>
    );
    }

    if (error) {
    return (
        <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-8">Trailers</h1>
        <p className="text-red-500">{error}</p>
        </div>
    );
    }


    return (
        <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Trailers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trailers.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                ></iframe>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm">{movie.release_date.split('-')[0]}</p>
            </div>
            </div>
        ))}
        </div>
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
    </main>
    );
};

export default Trailers