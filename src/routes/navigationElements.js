// Configuración de elementos visibles en cada página
const elements = {
    categoriesPreviewList,
    headerSection,
    arrowBtn,
    arrowBodySearch,
    headerTitle,
    titleCategory,
    headerCategoryTitle,
    searchForm,
    trendingPreviewSection,
    categoriesPreviewSection,
    genericSection,
    movieDetailSection,
    footerNone,
    logoHeader
};
// Obje elementos o contenedores visibles en cada router
const pageConfigs = {
    homePage: {
        categoriesPreviewList: { inactive: false },
        headerSection: { background: '' },
        headerTitle: { inactive: true },
        titleCategory: { inactive: false },
        headerCategoryTitle: { inactive: true },
        searchForm: { inactive: false },
        arrowBodySearch: { inactive: true },
        trendingPreviewSection: { inactive: false },
        categoriesPreviewSection: { inactive: false },
        genericSection: { inactive: true },
        movieDetailSection: { inactive: true },
        footerNone: { inactive: false },
        logoHeader: { inactive: false }
    },
    categoriesPage: {
        categoriesPreviewList: { inactive: true },
        headerSection: { background: '' },
        arrowBodySearch: { inactive: false, classList: 'header-arrowContainer--purple' }, headerTitle: { inactive: true },
        headerCategoryTitle: { inactive: false },
        titleCategory: { inactive: true },
        searchForm: { inactive: true },
        trendingPreviewSection: { inactive: true },
        categoriesPreviewSection: { inactive: false },
        genericSection: { inactive: false },
        movieDetailSection: { inactive: true },
        footerNone: { inactive: false },
        logoHeader: { inactive: false }
    },

    movieDetailsPage: {
        categoriesPreviewList: { inactive: true },
        headerSection: { background: '', classList: 'header-container--long' },
        arrowBodySearch: { inactive: false, classList: 'header-arrow--white' },
        headerTitle: { inactive: true },
        headerCategoryTitle: { inactive: false },
        searchForm: { inactive: true },
        trendingPreviewSection: { inactive: true },
        categoriesPreviewSection: { inactive: true },
        genericSection: { inactive: true },
        movieDetailSection: { inactive: false },
        footerNone: { inactive: true },
        logoHeader: { inactive: true }
    },
    searchPage: {
        categoriesPreviewList: { inactive: true },
        headerSection: { background: '' },
        arrowBodySearch: { inactive: false, classList: 'header-arrowContainer--purple' }, headerTitle: { inactive: true },
        headerTitle: { inactive: false },
        headerCategoryTitle: { inactive: true },
        searchForm: { inactive: false },
        trendingPreviewSection: { inactive: true },
        categoriesPreviewSection: { inactive: false },
        titleCategory: { inactive: true },
        genericSection: { inactive: false },
        movieDetailSection: { inactive: true },
        footerNone: { inactive: false },
        logoHeader: { inactive: false }
    },
    trendsPage: {
        categoriesPreviewList: { inactive: true },
        headerSection: { background: '' },
        arrowBodySearch: { inactive: false, classList: 'header-arrowContainer--purple' }, headerTitle: { inactive: true },
        searchForm: { inactive: false },
        trendingPreviewSection: { inactive: true },
        categoriesPreviewSection: { inactive: true },
        genericSection: { inactive: false },
        footerNone: { inactive: false },
        logoHeader: { inactive: false }
    }
};
/**
 * Cambia la visibilidad y clases adicionales de los elementos según la configuración de la página.
 * @param {Object} config - Configuración de visibilidad y clases adicionales de los elementos.
 */
function setPageConfig(config) {
    Object.entries(config).forEach(([element, { inactive, classList, background }]) => {
        const el = elements[element];
        if (!el) return;

        // Manejar visibilidad
        el.classList.toggle('inactive', inactive || false);

        // Eliminar clases anteriores
        const allPossibleClasses = ['header-container--long', 'header-arrow--white', 'header-arrowContainer--purple'];
        allPossibleClasses.forEach(cls => el.classList.remove(cls));

        // Agregar nuevas clases si están definidas
        if (classList) {
            el.classList.add(classList);
        }

        // Actualizar estilos dinámicos
        if (background !== undefined) {
            el.style.background = background;
        }
    });

    // Forzar redibujado del DOM
    document.body.offsetHeight; // Esto asegura que el navegador procese los cambios inmediatamente
}
