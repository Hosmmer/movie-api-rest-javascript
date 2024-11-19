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
async function dataTrendingMovies() {
    const { data } = await api.get('trending/movie/day');
    return data.results;
}

// Función para obtener géneros de películas
async function dataMovieGenres() {
    const { data } = await api.get('genre/movie/list');
    return data.genres;
}


// Función para obtener películas por categoría
async function dataMoviesByCategory(id) {
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

function getPaginatedMoviesBySearch(query) {
    return async function infiniteScrollHandler() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        // Verifica si el usuario ha llegado al final de la página
        const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;

        // Verifica que aún no se haya alcanzado la última página
        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            console.log(`Cargando página ${page} para la búsqueda: ${query}`);

            try {
                const { data } = await api.get('search/movie', { params: { query, page } });
                const movies = data.results;

                // Renderiza las películas
                createCategory(movies, genericSection, { lazyLoad: true, clean: false });
            } catch (error) {
                console.error('Error al obtener películas:', error);
            }
        }
    };
}




// Función para obtener películas de tendencia
async function TrendingMoviesPage() {
    const { data } = await api.get('trending/movie/day');
    return data.results;
}


//funcion para calcular scroll infinito para mi data
async function getPaginatedTrendingMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page - maxPage;
    console.log(pageIsNotMax);
    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('trending/movie/day', {
            params: {
                page,
            },
        });
        const movies = data.results;

        createCategory(
            movies,
            genericSection,
            { lazyLoad: true, clean: false },
        );
    }

}









// Función para obtener películas de tendencia
async function dataMoviesByDetails(id) {
    try {
        const response = await api.get('movie/' + id); // Asegúrate de que `api` está correctamente configurado
        const movie = response.data; // Los detalles de la película están en `data`
        return movie;  // Devuelve el objeto de la película
    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
        return null;
    }
}


async function dataMoviesRelated(id) {
    try {
        const { data } = await api.get(`movie/${id}/recommendations`);
        const relatedMovies = data.results;
        return relatedMovies || [];  // Ensure an empty array if no results
    } catch (error) {
        console.error('Error fetching related movies:', error);
        return [];  // Return an empty array if there is an error
    }
}
