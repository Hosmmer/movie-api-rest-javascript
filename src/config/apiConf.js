const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});



function likedMoviesList() {
    // Obtener el objeto de películas guardadas en Local Storage
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    return item ? item : {}; // Devuelve un objeto vacío si no hay favoritos
}
function likeMovie(movie) {
    // Obtener las películas favoritas actuales
    const likedMovies = likedMoviesList();

    if (likedMovies[movie.id]) {
        // Eliminar la película de favoritos
        delete likedMovies[movie.id];
    } else {
        // Agregar la película a favoritos
        likedMovies[movie.id] = movie;
    }

    // Guardar el objeto actualizado en Local Storage
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));

    // Llamar a getLikeMovies para actualizar las películas favoritas en la interfaz
    getLikeMovies();
}




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
        const response = await api.get('movie/' + id); // Llamada a la API
        return response.data; // Devolver los datos de la película
    } catch (error) {
        console.error('Error al obtener los detalles de la película desde la API:', error);
        return null;
    }
}
async function dataMoviesRelated(id) {
    try {
        const { data } = await api.get(`movie/${id}/recommendations`); // Llamada a la API
        const relatedMovies = data.results;
        return Array.isArray(relatedMovies) ? relatedMovies : []; // Asegurarse de que sea un array
    } catch (error) {
        console.error('Error al obtener películas relacionadas:', error);
        return []; // Retornar un array vacío en caso de error
    }
}


//Funcion para crear peliculas que me gustan

function getLikeMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    // Crear y agregar las películas al contenedor
    createCategory(moviesArray, LikedMoviesContainerArticle, { lazyload: false, clean: true });
    console.log(moviesArray);
}




