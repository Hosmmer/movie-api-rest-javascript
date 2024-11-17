function homePage() {
    console.log('Home Page');
    setPageConfig(pageConfigs.homePage);
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('Navigating to Categories Page');

    const [_, categoryData] = location.hash.split('=');
    if (!categoryData) return; // Si no hay datos de categoría, no hacer nada


    const [categoryId] = categoryData.split('-');

    if (!categoryId) return; // Asegúrate de que ambos valores existan

    console.log('conolaamondaaaaaaaaaaaaa', categoryId);


    getMoviesByCategory(categoryId);  // Llama a la función para obtener las películas por categoría
}


// Función principal para la página de búsqueda

function searchPage() {
    const [_, query] = location.hash.split('='); // Obtén el término de búsqueda desde el hash
    if (query) {
        console.log('Buscando películas con el término:', query);
        getMoviesSeachAll(query); // Llama a la función para manejar la búsqueda y renderizado
    } else {
        console.warn('El término de búsqueda está vacío.');
        const genericSection = document.querySelector('#genericList');
        if (genericSection) {
            genericSection.innerHTML = '<p>Por favor ingresa un término de búsqueda.</p>';
        }
    }
}


function movieDetailsPage() {
    console.log('Movie Details Page');
    setPageConfig(pageConfigs.movieDetailsPage);
}



