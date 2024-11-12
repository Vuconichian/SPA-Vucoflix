import React, { useState, useEffect } from 'react';
import { tmdbAPI } from '../services/tmdb';

const Trailers = () => {
    const [trailers, setTrailers] = useState([]);
    useEffect(() => {
    const fetchTrailers = async () => {
        try {
        const data = await tmdbAPI.getPopularMovies();
        const moviesWithTrailers = await Promise.all(
            data.results.slice(0, 5).map(async (movie) => {
            const details = await tmdbAPI.getMovieDetails(movie.id);
            return {
                ...movie,
                trailer: details.videos.results.find(video => video.type === 'Trailer')
            };
            })
        );
        setTrailers(moviesWithTrailers.filter(movie => movie.trailer));
        } catch (error) {
        console.error('Error fetching trailers:', error);
        }
    };

    fetchTrailers();
    }, []);

    return (
    <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trailers</h1>
        <div className="space-y-8">
        {trailers.map(movie => (
            <div key={movie.id} className="bg-netflix-black rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4">{movie.title}</h2>
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                ></iframe>
            </div>
            </div>
        ))}
    </div>
    </main>
    );
};

export default Trailers;