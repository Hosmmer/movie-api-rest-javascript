//lazy loading - Intersection Observer API JavaScript

const lazeLoader = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const url = img.getAttribute('data-img');
            if (url) {
                img.setAttribute('src', url);
                img.removeAttribute('data-img');
            }
            observer.unobserve(img); // Dejar de observar la imagen una vez cargada
        }
    });
}, {
    root: null,       // Viewport como raíz
    rootMargin: '0px', // Espaciado alrededor del viewport
    threshold: 0.1     // Cargar cuando el 10% sea visible
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
function renderCategories(categories, container, lazyLoad = false) {
    container.innerHTML = '';

    if (!Array.isArray(categories) || categories.length === 0) {
        console.warn('No hay categorías disponibles para renderizar.');
        const noCategoriesMsg = document.createElement('p');
        noCategoriesMsg.textContent = 'Categorías no disponibles.';
        container.appendChild(noCategoriesMsg);
        return;
    }

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);

        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);

        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${encodeURIComponent(category.name)}`;
        });
        if (lazyLoad) {
            lazeLoader.observe(categoryContainer);
        }

        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}


// Función que recibe las películas y las muestra en la interfaz
function createCategory(movies, container, categoryId = null, {
    lazyLoad = false,
    clean = true,
} = {},
) {
    if (clean) {
        container.innerHTML = '';
    }


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

function createCategory(
    movies,
    container,
    {
        lazyLoad = false,
        clean = true,
    } = {}
) {
    if (clean) {
        container.innerHTML = '';
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Crear la imagen
        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('title', movie.title);

        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        // Manejo de errores en la carga de imágenes
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
                'src',
                'https://www.1stopdesign.com/wp-content/uploads/2024/04/1_hFwwQAW45673VGKrMPE2qQ-300x225.png'
            );
        });

        // Aplicar lazy loading
        if (lazyLoad) {
            movieImg.setAttribute('data-img', imageUrl);
            lazeLoader.observe(movieImg); // Observar para lazy loading
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


function titleTendencias() {
    // Limpiar el contenedor antes de agregar contenido
    genericSection.innerHTML = '';

    // Crear y agregar el título dinámico
    const titleElement = document.createElement('h2');
    titleElement.classList.add('generic-title'); // Clase para estilos
    titleElement.textContent = 'Tendencias📽️'; // Título dinámico

    // Agregar estilos en línea para asegurarte de que sea inline-block
    titleElement.style.position = 'absolute';
    titleElement.style.top = '140px';

    titleElement.style.margin = '0 auto'; // Centrar si es necesario
    titleElement.style.padding = '16px 0'; // Espaciado superior e inferior

    // Insertar el título al inicio
    genericSection.appendChild(titleElement);
}