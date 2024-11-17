// Función principal para obtener las películas y aplicar las funciones
const getTrendingMoviesPreview = async () => {
    const movies = await fetchTrendingMovies();

    const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');

    if (!trendingMoviesPreviewList) {
        return;
    }

    // Crea y agrega los contenedores de películas usando la función reutilizable
    createMovies(movies, trendingMoviesPreviewList);

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

    renderCategories(categories, categoriesPreviewList);

};


// Función para obtener las películas por categoría
const getMoviesByCategory = async (id) => {
    const categoryId = parseInt(id);

 
    // Obtener películas por categoría
    const movies = await fetchMoviesByCategory(categoryId);  // Llamar la API para obtener las películas

    console.log(movies);  // Verificar la estructura de los datos

    const genericSection = document.querySelector('#genericList');
    if (!genericSection) {
        console.error('Contenedor no encontrado para mostrar las películas');
        return;
    }

    // Llamar a la función de renderizado y pasar el id de categoría
    createCategory(movies, genericSection, categoryId);  // Pasar categoryId correctamente
};