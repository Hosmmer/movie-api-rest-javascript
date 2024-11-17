const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});


// Función para obtener películas de tendencia
async function fetchTrendingMovies() {
    const { data } = await api.get('trending/movie/day');
    return data.results;
}

// Función para obtener géneros de películas
async function fetchMovieGenres() {
    const { data } = await api.get('genre/movie/list');
    return data.genres;
}


// Función para obtener películas por categoría
async function fetchMoviesByCategory(id) {
    const { data } = await api.get('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    return data.results;
}


async function getMoviesBySearch(query) {
    try {
        const { data } = await api.get('search/movie', { params: { query } });
        console.log('Resultados obtenidos de la API:', data.results);
        return data.results;
    } catch (error) {
        console.error('Error al buscar películas:', error);
        return [];
    }
}

