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


function movieDetailsPage() {
    console.log('Movie Details Page');
    setPageConfig(pageConfigs.movieDetailsPage);
}



// Función principal para la página de búsqueda

function searchPage(searchQuery) {

    const searchFormInput = document.querySelector('#searchForm input');
    if (searchFormInput) {
        searchFormInput.value = searchQuery;  // Mostrar el término en el input si está en la URL
    }

    // Llamar a la función para obtener películas con el término
    getMoviesSearchByCategory(searchQuery); // Asegúrate de que esta función renderice las películas correctamente
}


