import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tmdbAPI } from '../services/tmdb';
import { ArrowLeftIcon, FilmIcon } from '@heroicons/react/24/solid';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [trailers, setTrailers] = useState([]);

    useEffect(() => {
    const fetchMovieDetails = async () => {
        try {
        const data = await tmdbAPI.getMovieDetails(id);
        setMovie(data);
        const trailerVideos = data.videos.results.filter(
            video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailers(trailerVideos);
        } catch (error) {
        console.error('Error fetching movie details:', error);
        }
    };

    fetchMovieDetails();
    }, [id]);

    const handleGoBack = () => {
    navigate(-1);
    };

    if (!movie) return <div className="container mx-auto px-4 py-8 text-white">Cargando...</div>;

    return (
    <main className="container mx-auto px-4 py-8">
        <button
        onClick={handleGoBack}
        className="mb-6 flex items-center text-netflix-red hover:text-white transition-colors"
        >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Volver
        </button>
        <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
            />
        </div>
        <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4 text-white">{movie.title}</h1>
            <p className="text-gray-400 mb-4">{movie.tagline}</p>
            <div className="mb-4">
                <span className="text-netflix-red font-semibold">Género: </span>
                <span className="text-white">{movie.genres.map(genre => genre.name).join(', ')}</span>
            </div>
            <div className="mb-4">
                <span className="text-netflix-red font-semibold">Fecha de estreno: </span>
                <span className="text-white">{movie.release_date}</span>
            </div>
            <div className="mb-4">
                <span className="text-netflix-red font-semibold">Duración: </span>
                <span className="text-white">{movie.runtime} minutos</span>
            </div>
            <div className="mb-4">
                <span className="text-netflix-red font-semibold">Calificación: </span>
                <span className="text-white">{movie.vote_average.toFixed(1)} / 10</span>
            </div>
            <p className="text-lg mb-6 text-white">{movie.overview}</p>
            {trailers.length > 0 && (
            <Link
                to={`/trailers/${id}`}
                className="inline-flex items-center px-4 py-2 bg-netflix-red text-white rounded hover:bg-red-700 transition-colors"
            >
                <FilmIcon className="h-5 w-5 mr-2" />
                Ver Trailers ({trailers.length})
            </Link>
        )}
        </div>
    </div>
    </main>
    );
};

export default MovieDetail;