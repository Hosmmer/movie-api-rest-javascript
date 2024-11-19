// Función principal para obtener las películas y aplicar las funciones
const getTrendingMoviesPreview = async () => {
    const movies = await fetchTrendingMovies();

    const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');

    if (!trendingMoviesPreviewList) {
        return;
    }

    // Crea y agrega los contenedores de películas usando la función reutilizable
    createMovies(movies, trendingMoviesPreviewList, true);

    // Duplicar el contenido para el efecto de desplazamiento continuo
    const movieContainers = [...trendingMoviesPreviewList.children];
    movieContainers.forEach(movieContainer => {
        trendingMoviesPreviewList.appendChild(movieContainer.cloneNode(true));
    });

    // Desplazamiento automático
    const scrollAmount = 158;  // Cantidad de desplazamiento en píxeles
    const scrollSpeed = 4;  // Velocidad de desplazamiento
    let scrollInterval;

    function autoScroll() {
        const maxScrollLeft = trendingMoviesPreviewList.scrollWidth / 2 - trendingMoviesPreviewList.clientWidth;

        // Si llegamos al final, volvemos al inicio
        if (trendingMoviesPreviewList.scrollLeft >= maxScrollLeft) {
            const firstDuplicatedMovie = trendingMoviesPreviewList.children[movieContainers.length];
            firstDuplicatedMovie.style.visibility = 'hidden';  // Ocultar la primera imagen duplicada
            trendingMoviesPreviewList.scrollLeft = 0;

            setTimeout(() => {
                firstDuplicatedMovie.style.visibility = 'visible';  // Mostrarla de nuevo
            }, 2);  // Retraso en milisegundos
        } else {
            trendingMoviesPreviewList.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }

    // Inicia el desplazamiento automático
    scrollInterval = setInterval(autoScroll, scrollSpeed * 2300);

    // Detener el desplazamiento cuando el mouse está sobre el contenedor
    trendingMoviesPreviewList.addEventListener('mouseover', () => {
        clearInterval(scrollInterval);
    });

    // Reiniciar el desplazamiento cuando el mouse sale del contenedor
    trendingMoviesPreviewList.addEventListener('mouseleave', () => {
        scrollInterval = setInterval(autoScroll, scrollSpeed * 1300);
    });
};


const getCategoriesPreview = async () => {
    const categories = await fetchMovieGenres();

    if (!categoriesPreviewList) {
        return;
    }
    // Llamar a la función para listar categorias peliculas

    renderCategories(categories, categoriesPreviewList, true);

};


// Función para obtener las películas por categoría
const getMoviesByCategory = async (id) => {
    try {
        const categoryId = parseInt(id);

        // Obtener películas por categoría
        const movies = await fetchMoviesByCategory(categoryId); // Llamar la API para obtener las películas

        console.log(movies); // Verificar la estructura de los datos

        const genericSection = document.querySelector('#genericList');
        if (!genericSection) {
            console.error('Contenedor no encontrado para mostrar las películas');
            return;
        }

        // Renderizar las películas con lazy loading habilitado
        createCategory(
            movies,
            genericSection,
            {
                lazyLoad: true,
                clean: true
            }
        );
    } catch (error) {
        console.error('Error al obtener películas por categoría:', error);
    }
};


const getMoviesSeachAll = async (query) => {
    try {
        const moviesSearch = await getMoviesBySearch(query);

        // Selecciona el contenedor donde se renderizarán las películas
        const genericSection = document.querySelector('#genericList');
        if (!genericSection) {
            console.error('No se encontró el contenedor "genericList".');
            return;
        }

        // Renderiza las películas con lazy loading
        if (moviesSearch.length > 0) {
            createCategory(
                moviesSearch,
                genericSection,
                {
                    lazyLoad: true,
                    clean: true
                }
            );
        } else {
            console.warn('No se encontraron películas para el término:', query);
            genericSection.innerHTML = `<p>No se encontraron resultados para "${query}".</p>`;
        }
    } catch (error) {
        console.error('Error al obtener películas de búsqueda:', error);
    }
};




const getMoviesTrendingPage = async () => {
    const trendingPageMovies = await TrendingMoviesPage();
    createCategory(trendingPageMovies, genericSection, {
        lazyLoad: true,
        clean: true
    }); // null para no filtrar por categoría

}

const getMoviesByDetails = async (id) => {
    try {
        // Llamar a la función que obtiene los detalles de la película desde la API
        const movie = await fetchGetMoviesByDetails(id);
        const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        headerSection.style.background = ` 
        linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0,0,0,0) 29.17%
        ),
        url(${movieImgUrl})
        
        `;
        // Verifica si se obtuvo la película correctamente
        if (movie && typeof movie === 'object') {
            movieDetailTitle.textContent = movie.title || 'Título no disponible';
            movieDetailDescription.textContent = movie.overview || 'Descripción no disponible';
            movieDetailScore.textContent = `Puntuación: ${movie.vote_average || 'No disponible'}`;
            getRelateMoviesId(id);
            // Llamar a la función para renderizar las categorías
            if (Array.isArray(movie.genres)) {
                renderCategories(movie.genres, movieDetailCategoriesList);
            } else {
                console.warn('Las categorías no están disponibles o no son válidas.');
                movieDetailCategoriesList.innerHTML = '<p>Categorías no disponibles.</p>';
            }
        } else {
            console.error('No se pudo obtener los detalles de la película. Verifica el ID o la API.');
        }
    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
    }
};

const getRelateMoviesId = async (id) => {
    try {
        const movieRelated = await fetchGetMoviesRelated(id);  // Wait for the promise to resolve
        if (Array.isArray(movieRelated)) {
            createMovies(movieRelated, relatedMoviesContainer, true);
        } else {
            console.warn('No related movies found or an error occurred.');
        }
    } catch (error) {
        console.error('Error fetching related movies:', error);
    }
};



// Función para simular el retraso de carga de las películas
function loadTrendingMovies() {
    setTimeout(function () {
        const movieList = document.querySelector('.trendingPreview-movieList');

        // Eliminar los esqueletos de las películas
        const skeletons = movieList.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => skeleton.remove());

        // Crear y agregar el contenido real de las películas (Ejemplo con imágenes)
        for (let i = 0; i < 4; i++) {
            const movie = document.createElement('div');
            movie.classList.add('movie');
            movieList.appendChild(movie);
        }

        // Reemplazar el botón 'Ver más' si es necesario (como ejemplo)
        const trendsBtn = document.querySelector('.trendingPreview-btn');
        if (trendsBtn) {
            trendsBtn.classList.remove('skeleton'); // Eliminar esqueleto del botón
            trendsBtn.textContent = 'Ver más';
        }
    }, 2000); // Simulamos una espera de 2 segundos antes de cargar el contenido real
}

// Llamar a la función para simular la carga de películas
loadTrendingMovies();




