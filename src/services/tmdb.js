const API_KEY = '759cd8efe50cfc43465c1967c42854df';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAPI = {

    getPopularMovies: (page = 1) => 
        fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`)
            .then(res => res.json()),
    getMovieDetails: (id) =>
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=videos`)
            .then(res => res.json()),

    searchMovies: (query, page = 1) =>
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`)
            .then(res => res.json()),
};