import React, { useState, useEffect } from 'react';
import MovieCard from '../components/movieCard';
import { tmdbAPI } from '../services/tmdb';

const Home = () => {
const [newMovies, setNewMovies] = useState([]);
const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
    const fetchMovies = async () => {
        try {
            const newMoviesData = await tmdbAPI.getNewMovies();
            const popularMoviesData = await tmdbAPI.getPopularMovies();
            setNewMovies(newMoviesData.results.slice(0, 4));
            setPopularMovies(popularMoviesData.results.slice(0, 8));
        } catch (error) {
        console.error('Error fetching movies:', error);
        }
    };

    fetchMovies();
    }, []);

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Lo nuevo en Vucoflix</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Las más populares</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    </main>
);
};

export default Home;