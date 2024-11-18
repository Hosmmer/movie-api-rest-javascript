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

function trendsPage() {
    getMoviesTrendingPage();
    setPageConfig(pageConfigs.trendsPage);

}

function movieDetailsPage() {
    // Obtener el ID de la película desde el hash de la URL (ejemplo: #movie=12345)
    const hash = location.hash;
    const match = hash.match(/#movie=(\d+)/);  // Extraer el ID de la película de la URL

    if (match) {
        const id = match[1];  // El ID de la película está en la segunda parte del match
        getMoviesByDetails(id);  // Llamar a la función para obtener los detalles de la película
    } else {
        console.error('ID de película no encontrado en la URL');
    }

    console.log('Movie Details Page');
    setPageConfig(pageConfigs.movieDetailsPage);  // Configurar la página de detalles
}



