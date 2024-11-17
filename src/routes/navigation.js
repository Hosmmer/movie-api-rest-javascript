// Función para configurar los eventos de navegación
function setupNavigationEvents() {
    const buttons = [
        { id: 'homeBtn', hash: '#home' },
        { id: 'trendsPage', hash: '#trends' },
        { id: 'searchFormBtn', hash: '#search=' },
    ];

    buttons.forEach(button => {
        const element = document.getElementById(button.id);
        if (element) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                if (button.id === 'searchFormBtn') {
                    const searchQuery = searchFormInput.value.trim(); // Obtener el valor del input
                    if (searchQuery) {
                        location.hash = '#search=' + encodeURIComponent(searchQuery); // Actualizar el hash con el valor de búsqueda
                    }
                } else {
                    navigateTo(button.hash); // Navegar a la ruta correspondiente
                }
            });
        } else {
            console.error(`No se encontró el elemento '${button.id}'. Verifica el ID o el HTML.`);
        }
    });

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
    // Evita navegar si ya estamos en la misma ruta
    if (location.hash !== hash) {
        history.pushState({ page: hash }, '', hash); // Actualizar el historial y el hash
        handleNavigation(); // Manejar la navegación para renderizar la página adecuada
    } else {
        console.warn(`Ya estás en la ruta ${hash}.`);
    }
}

// Función para manejar la navegación dependiendo del hash en la URL
// Función para manejar la navegación dependiendo del hash en la URL
function handleNavigation() {
    const hash = location.hash || '#home'; // Asegura un valor predeterminado en caso de que no haya hash
    console.log(`Hash actual: ${hash}`);

    switch (true) {
        case hash.startsWith('#category='):
            const categoryId = hash.split('=')[1];
            if (categoryId) {
                console.log('Navegando a una categoría:', categoryId);
                setPageConfig(pageConfigs.categoriesPage); // Configura la página de categorías
                geneMovieTitles(categoryId); // Lógica para mostrar películas por categoría
            } else {
                console.error('ID de categoría no válido.');
                navigateTo('#home');
            }
            break;

        case hash === '#home':
            console.log('Navegando a la página de inicio.');
            setPageConfig(pageConfigs.homePage);
            homePage();
            break;

        case hash.startsWith('#search='):
            const searchQuery = decodeURIComponent(hash.split('=')[1]); // Decodifica el valor del hash
            if (searchQuery) {
                console.log('Navegando a la página de búsqueda con término:', searchQuery);
                setPageConfig(pageConfigs.searchPage); // Configura la página de búsqueda
                searchPage(); // Llama a la función de búsqueda
            } else {
                console.warn('No se proporcionó un término de búsqueda.');
            }
            break;


        case hash === '#movie':
            console.log('Navegando a la página de detalles de película.');
            setPageConfig(pageConfigs.movieDetailsPage);
            movieDetailsPage();
            break;

        default:
            console.warn('Ruta no reconocida. Navegando a la página predeterminada (home).');
            navigateTo('#home'); // Redirigir al home si la ruta no es válida
            break;
    }
}



// Configurar eventos y navegación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setupNavigationEvents(); // Configurar los eventos de navegación
    handleNavigation(); // Manejar la navegación al cargar la página

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', () => {
        console.log('El hash cambió:', location.hash);
        handleNavigation(); // Manejar la navegación en cambios de hash
    });

    // Escuchar cambios en el historial (retroceso o avance)
    window.addEventListener('popstate', () => {
        console.log('Retroceso o avance en el historial detectado.');
        handleNavigation(); // Manejar la navegación en retrocesos o avances
    });
});



// setPageConfig(pageConfigs.searchPage);
//     searchPage();