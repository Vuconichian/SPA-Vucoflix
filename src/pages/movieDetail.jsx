import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbAPI } from '../services/tmdb';

const MovieDetail = () => {
const { id } = useParams();
const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
            const data = await tmdbAPI.getMovieDetails(id);
            setMovie(data);
            } catch (error) {
        console.error('Error fetching movie details:', error);
        }
    };

    fetchMovieDetails();
    }, [id]);

    if (!movie) return <div className="container mx-auto px-4 py-8">Cargando...</div>;

    return (
    <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
            />
            </div>
            <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                <p className="text-gray-400 mb-4">{movie.tagline}</p>
                <div className="mb-4">
                    <span className="text-netflix-red font-semibold">Género: </span>
                    {movie.genres.map(genre => genre.name).join(', ')}
                </div>
                <div className="mb-4">
                    <span className="text-netflix-red font-semibold">Fecha de estreno: </span>
                    {movie.release_date}
                </div>
                <div className="mb-4">
                    <span className="text-netflix-red font-semibold">Duración: </span>
                    {movie.runtime} minutos
                </div>
                <div className="mb-4">
                    <span className="text-netflix-red font-semibold">Calificación: </span>
                    {movie.vote_average.toFixed(1)} / 10
                </div>
                <p className="text-lg mb-4">{movie.overview}</p>
            </div>
        </div>
    </main>
);
};

export default MovieDetail;