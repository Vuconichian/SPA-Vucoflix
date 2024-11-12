const API_KEY = '759cd8efe50cfc43465c1967c42854df';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAPI = {
    getNewMovies: () => 
        fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES`)
            .then(res => res.json()),

    getPopularMovies: () => 
        fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`)
            .then(res => res.json()),
    getMovieDetails: (id) => 
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`)
            .then(res => res.json()),

    searchMovies: (query) => 
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`)
            .then(res => res.json()),
};