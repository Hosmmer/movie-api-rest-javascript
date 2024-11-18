//lazy loading - Intersection Observer API JavaScript

const lazeLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const url = img.getAttribute('data-img');
            if (url) {
                img.setAttribute('src', url);
                img.removeAttribute('data-img');
            }
            lazeLoader.unobserve(img);
        }
    });
}, {
    root: null, // Usar el viewport
    rootMargin: '0px', // Espacio adicional alrededor del viewport
    threshold: 0.1 // Cargar imágenes cuando el 10% sea visible
});




//Funcion para procesar items las cuales seran renderizados
function processItems(items, container, callback) {
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar los nuevos elementos

    items.forEach(item => {
        const element = callback(item); // Ejecutar el callback para cada elemento
        container.appendChild(element); // Agregar el elemento procesado al contenedor
    });
}


// Función para crear y mostrar las películas
function createMovies(movies, container, lazyLoad = false) {
    container.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos elementos

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        // Agregar evento de clic a cada película
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;  // Cambia el hash con el ID de la película
            console.log('Película seleccionada:', movie.id);
        });

        const movieImg = document.createElement('img');

        movieImg.classList.add('movie-img');
        movieImg.setAttribute(lazyLoad ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w500/' + movie.poster_path);
        movieImg.setAttribute('alt', movie.title);
        const playBtn = document.createElement('button');
        playBtn.classList.add('play-btn');
        playBtn.textContent = '🎬';


        if (lazyLoad) {
            lazeLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(playBtn);
        container.appendChild(movieContainer);
    });
}

// Función para renderizar las categorías en el DOM
function renderCategories(categories, container) {
    // Limpiar el contenedor antes de agregar nuevos elementos
    container.innerHTML = '';

    // Validar que `categories` sea un array
    if (!Array.isArray(categories) || categories.length === 0) {
        console.warn('No hay categorías disponibles para renderizar.');
        const noCategoriesMsg = document.createElement('p');
        noCategoriesMsg.textContent = 'Categorías no disponibles.';
        container.appendChild(noCategoriesMsg);
        return;
    }

    // Crear elementos para cada categoría
    categories.forEach(category => {
        if (category && category.id && category.name) {
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-container');

            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.setAttribute('id', 'id' + category.id);

            const categoryTitleText = document.createTextNode(category.name);
            categoryTitle.appendChild(categoryTitleText);

            // Evento de clic para cambiar el hash de la URL
            categoryTitle.addEventListener('click', () => {
                location.hash = `#category=${category.id}-${encodeURIComponent(category.name)}`;
            });

            categoryContainer.appendChild(categoryTitle);
            container.appendChild(categoryContainer);
        } else {
            console.warn('Se encontró una categoría inválida:', category);
        }
    });
}

// Función que recibe las películas y las muestra en la interfaz
function createCategory(movies, container, categoryId = null, lazyLoad = true) {
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

    movies.forEach((movie) => {
        // Verifica si hay un categoryId o si debe cargar todas las películas
        if (!categoryId || (movie.genre_ids && movie.genre_ids.includes(categoryId))) {
            console.log('Creando película:', movie.title);
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');

            if (movie.poster_path) {
                const movieImg = document.createElement('img');
                movieImg.classList.add('movie-img');

                const imageUrl = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;

                if (lazyLoad) {
                    console.log('Asignando lazy load a:', movie.title);
                    movieImg.setAttribute('data-img', imageUrl);
                    lazeLoader.observe(movieImg); // Observa la imagen
                } else {
                    movieImg.setAttribute('src', imageUrl);
                }

                movieImg.setAttribute('alt', movie.title);
                movieContainer.appendChild(movieImg);
            } else {
                console.warn('No se encontró poster_path para:', movie.title);
            }

            const titleElement = document.createElement('h3');
            titleElement.textContent = movie.title;
            movieContainer.appendChild(titleElement);

            container.appendChild(movieContainer);
        } else {
            console.warn('Película no pertenece a la categoría con ID:', categoryId);
        }
    });

    if (container.children.length === 0) {
        container.innerHTML = `<p>No se encontraron películas para esta categoría.</p>`;
    }
}



function geneMovieTitles(categoryId) {
    setPageConfig(pageConfigs.categoriesPage); // Configurar la página de categorías
    getMoviesByCategory(categoryId); // Convertir id a número entero

    // Limpiar y obtener solo el texto del género
    let cleanedCategory = cleanCategoryName(categoryId);
    const genre = cleanedCategory.split('-')[1]; // Obtener solo el nombre de la categoría
    headerCategoryTitle.innerHTML = genre;

}

function createCategory(movies, container, lazyLoad = true) {
    container.innerHTML = ''; // Limpiar la sección antes de mostrar los resultados

    // Iterar sobre las películas y crear las tarjetas
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Crear la imagen
        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        //Evento para manejar Errores de mis imagenes
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
                'src',
                'https://martinbrainon.com/inicio/wp-content/uploads/2018/01/lead-nuclear-power-human-error-homer-simpson-1.jpg'
            )
        });
        // Asegurar que la imagen tenga un tamaño auto (manteniendo relación de aspecto)
        movieImg.style.width = '40vw'; // Ajusta el ancho de la imagen al contenedor
        movieImg.style.height = '40vh'; // Mantiene la proporción de la imagen

        // Si lazyLoad es true, utilizar data-img para la carga diferida
        if (lazyLoad) {
            movieImg.setAttribute('data-img', imageUrl);
            // Si se utiliza lazy loading, se observa la imagen
            lazeLoader.observe(movieImg);
        } else {
            movieImg.setAttribute('src', imageUrl);
        }

        // Crear el título y la fecha de lanzamiento
        const titleElement = document.createElement('h3');
        titleElement.textContent = movie.title;

        const releaseDateElement = document.createElement('p');
        releaseDateElement.textContent = movie.release_date;

        // Agregar la imagen, título y fecha al contenedor de la película
        movieCard.appendChild(movieImg);
        movieCard.appendChild(titleElement);
        movieCard.appendChild(releaseDateElement);

        // Agregar la tarjeta de película al contenedor principal
        container.appendChild(movieCard);
    });
}


// Mapeo de categorías con caracteres especiales
const categoriesToReplace = {
    "TV%20Movie": "TV Movie",
    "Science%20Fiction": "Science Fiction",
    // Puedes añadir más categorías si es necesario
};

// Función para limpiar nombres de categorías
function cleanCategoryName(categoryId) {
    let cleanedCategoryName = decodeURIComponent(categoryId); // Decodificar cualquier codificación de URL

    // Reemplazar las categorías específicas si existen
    Object.keys(categoriesToReplace).forEach(category => {
        if (cleanedCategoryName.includes(category)) {
            cleanedCategoryName = cleanedCategoryName.replace(category, categoriesToReplace[category]);
        }
    });

    return cleanedCategoryName;
}


