// Función para configurar los eventos de navegación
function setupNavigationEvents() {
    // Botones de navegación
    const buttons = [
        { id: 'homeBtn', hash: '#home' },
        { id: 'trendsPage', hash: '#trends' },
    ];

    buttons.forEach(button => {
        const element = document.getElementById(button.id);
        if (element) {
            element.addEventListener('click', (event) => {
                event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                navigateTo(button.hash); // Navegar a la ruta correspondiente
            });
        } else {
            console.error(`No se encontró el elemento '${button.id}'. Verifica el ID o el HTML.`);
        }
    });

    // Configurar el botón de retroceso
    const arrowBodySearchBtn = document.querySelector('#arrowBodySearch');
    if (arrowBodySearchBtn) {
        arrowBodySearchBtn.addEventListener('click', () => {
            if (!arrowBodySearchBtn.classList.contains('inactive')) {
                history.back(); // Retroceder en el historial
            } else {
                console.warn('El botón de retroceso está inactivo.');
            }
        });
    }
}

// Función para manejar la navegación a una ruta específica
function navigateTo(hash) {
    if (location.hash !== hash) {
        history.pushState({ page: hash }, '', hash); // Actualizar el historial y el hash
    }
    handleNavigation(); // Manejar la navegación para renderizar la página adecuada
}

// Función para manejar la navegación dependiendo del hash en la URL
function handleNavigation() {
    const hash = location.hash || '#home'; // Asegura un valor predeterminado en caso de que no haya hash
    console.log(`Hash actual: ${hash}`);

    switch (true) {
        case hash.startsWith('#category='):
            const categoryId = hash.split('=')[1];
            geneMovieTitles(categoryId);
            // Cargar las películas de la categoría

            break;

        case hash === '#home':
            console.log('Navegando a la página de inicio.');
            setPageConfig(pageConfigs.homePage); // Configurar la página de inicio
            homePage(); // Lógica específica de la página de inicio
            break;


        case hash === '#search':
            console.log('Navegando a la página de búsqueda.');
            setPageConfig(pageConfigs.searchPage); // Configurar la página de búsqueda
            searchPage(); // Lógica específica de la página de búsqueda
            break;

        case hash === '#movie':
            console.log('Navegando a la página de detalles de película.');
            setPageConfig(pageConfigs.movieDetailsPage); // Configurar la página de detalles de película
            movieDetailsPage(); // Lógica específica de la página de detalles de película
            break;

        default:
            console.log('Navegando a la página predeterminada (home).');
            setPageConfig(pageConfigs.homePage); // Configurar la página predeterminada
            homePage(); // Lógica específica de la página de inicio
            break;
    }
}

// Llamada al inicio de la aplicación para configurar la navegación
window.addEventListener('DOMContentLoaded', () => {
    setupNavigationEvents(); // Configurar los eventos de navegación
    handleNavigation(); // Manejar la navegación al cargar la página

    // Escuchar cambios en el historial (retroceso o avance)
    window.addEventListener('popstate', () => {
        console.log('Cambiando estado por retroceso o avance en el historial...');
        handleNavigation(); // Manejar la navegación en retrocesos o avances
    });
});
