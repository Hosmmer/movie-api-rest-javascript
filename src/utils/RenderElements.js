//Funcion para procesar items las cuales seran renderizados


function processItems(items, container, callback) {
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar los nuevos elementos

    items.forEach(item => {
        const element = callback(item); // Ejecutar el callback para cada elemento
        container.appendChild(element); // Agregar el elemento procesado al contenedor
    });
}


// Función para crear y mostrar las películas
function createMovies(movies, container) {
    container.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos elementos

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
        movieImg.setAttribute('alt', movie.title);

        const playBtn = document.createElement('button');
        playBtn.classList.add('play-btn');
        playBtn.textContent = '🎬';

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(playBtn);
        container.appendChild(movieContainer);
    });
}

// Función para renderizar las categorías en el DOM
function renderCategories(categories, container) {
    processItems(categories, container, category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);

        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);

        // Añadir evento de clic para cambiar la ubicación
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        categoryContainer.appendChild(categoryTitle);
        return categoryContainer;
    });
}




// Función que recibe las películas y las muestra en la interfaz
function createCategory(movies, container, categoryId) {
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos


    movies.forEach(movie => {
        if (movie.genre_ids && movie.genre_ids.includes(categoryId)) {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-container');



            // Verificar si 'poster_path' está presente antes de crear la imagen
            if (movie.poster_path) {
                const movieImg = document.createElement('img');
                movieImg.classList.add('movie-img');
                movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
                movieImg.setAttribute('alt', movie.title);
                movieContainer.appendChild(movieImg);
            } else {
                console.warn('No se encontró poster_path para la película:', movie.title);
            }

            // Asignar el título de la película
            const titleElement = document.createElement('h3');
            titleElement.textContent = movie.title;  // Asignar el título directamente
            movieContainer.appendChild(titleElement);
            container.appendChild(movieContainer);  // Añadir la película al contenedor
        } else {
            console.warn('La película no pertenece a la categoría con ID:', categoryId);
        }
    });

    // Verifica si no hay películas para la categoría
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
function createCategory(movies, container) {
    container.innerHTML = ''; // Limpiar la sección antes de mostrar los resultados

    // Crear una tarjeta para cada película
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;
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



function trendsTitle() {
    titleCategory.innerHTML = "Tendencias🎬";
}
