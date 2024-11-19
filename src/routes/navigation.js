// Verificar si historyArr ya existe en localStorage
let historyArr = JSON.parse(localStorage.getItem('historyArr')) || [];
let page = 1;
let infiniteScroll;
// Configurar eventos de navegación
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
                        const newHash = '#search=' + encodeURIComponent(searchQuery);
                        navigateTo(newHash, true); // Usa true para agregar al historial
                    }
                } else {
                    navigateTo(button.hash, true); // Usa true para agregar al historial
                }
            });
        } else {
            console.error(`No se encontró el elemento '${button.id}'. Verifica el ID o el HTML.`);
        }
    });

}

// Evento de retroceso en el botón de búsqueda (arrowBodySearchBtn)
const arrowBodySearchBtn = document.querySelector('#arrowBodySearch');
if (arrowBodySearchBtn) {
    arrowBodySearchBtn.addEventListener('click', () => {
        if (!arrowBodySearchBtn.classList.contains('inactive')) {
            const currentHash = location.hash;

            if (currentHash === '#trends') {
                console.warn('Retrocediendo directamente al home desde trends.');
                navigateTo('#home', false); // Forzar la navegación a home sin historial
            } else if (historyArr.length > 1) {
                historyArr.pop(); // Elimina solo el último elemento
                const previousHash = historyArr[historyArr.length - 1] || '#home';
                navigateTo(previousHash, false); // Navegar al hash anterior
                updateHistoryStorage(); // Actualizar en localStorage
            } else {
                console.warn('El historial está vacío. Navegando al home.');
                navigateTo('#home', false); // Navegar al home si no hay más historial
            }
        } else {
            console.warn('El botón de retroceso está inactivo.');
        }
    });
}

// Función para manejar la navegación a una ruta específica
function navigateTo(hash, addToHistory = false) {
    if (location.hash !== hash) {
        if (addToHistory && hash !== '#trends') {
            // Solo agrega al historial si no es la ruta #trends
            history.pushState({ page: hash }, '', hash); // Agrega al historial del navegador
            historyArr.push(hash); // Agrega la ruta al historial personalizado
            updateHistoryStorage(); // Guardar en localStorage
        } else {
            history.replaceState({ page: hash }, '', hash); // Reemplaza el estado actual
        }
        handleNavigation(); // Manejar la navegación para renderizar la página adecuada
    }
}

// Función para manejar la navegación dependiendo del hash en la URL
function handleNavigation() {
    const hash = location.hash || '#home'; // Valor predeterminado
    console.log(`Hash actual: ${hash}`);
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll);
        infiniteScroll = undefined;
    }
    switch (true) {
        case hash.startsWith('#category='):
            const categoryId = hash.split('=')[1];
            if (categoryId) {
                console.log('Navegando a una categoría:', categoryId);
                setPageConfig(pageConfigs.categoriesPage); // Configura la página de categorías
                geneMovieTitles(categoryId); // Lógica para mostrar películas por categoría
            } else {
                console.error('ID de categoría no válido.');
                navigateTo('#home', false); // Redirigir al home si el ID no es válido
            }
            infiniteScroll = getPaginatedTrendingMovies;

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
                searchPage(searchQuery); // Llama a la función de búsqueda
            } else {
                console.warn('No se proporcionó un término de búsqueda.');
            }

            break;

        case hash === '#trends':
            console.log('Navegando a la página de tendencias.');
            setPageConfig(pageConfigs.trendsPage);
            trendsPage();
            break;

        case hash.startsWith('#movie='):
            const movieId = hash.split('=')[1];
            if (movieId) {
                console.log('Navegando a la página de detalles de la película con ID:', movieId);
                setPageConfig(pageConfigs.movieDetailsPage);  // Configurar la página de detalles
                movieDetailsPage(movieId);  // Llamar a la función para cargar detalles de la película con el ID
            } else {
                console.error('ID de película no válido.');
                navigateTo('#home', false); // Redirigir al home si el ID no es válido
            }
            break;

        default:
            console.warn('Ruta no reconocida. Navegando a la página predeterminada (home).');
            navigateTo('#home', false); // Redirigir al home si la ruta no es válida
            break;


    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

// Función para actualizar el historial en localStorage
function updateHistoryStorage() {
    localStorage.setItem('historyArr', JSON.stringify(historyArr));
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
        if (historyArr.length > 0) {
            historyArr.pop(); // Sincronizar eliminando el último elemento
            updateHistoryStorage();
        }
        handleNavigation(); // Manejar la navegación en retrocesos o avances
    });
});
window.addEventListener('scroll', infiniteScroll);