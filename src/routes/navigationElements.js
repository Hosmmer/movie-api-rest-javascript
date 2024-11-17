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
        arrowBtn: { inactive: true, classList: 'header-arrow--white' },
        headerTitle: { inactive: false },
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
        arrowBodySearch: { inactive: false },
        headerTitle: { inactive: true },
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
        arrowBtn: { inactive: false, classList: 'header-arrow-body' },
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
        arrowBodySearch: { inactive: false },
        headerTitle: { inactive: false },
        headerCategoryTitle: { inactive: false },
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
        arrowBodySearch: { inactive: false },
        headerTitle: { inactive: false },
        headerCategoryTitle: { inactive: false },
        searchForm: { inactive: true },
        trendingPreviewSection: { inactive: true },
        categoriesPreviewSection: { inactive: false },
        titleCategory: { inactive: true },
        genericSection: { inactive: false },
        movieDetailSection: { inactive: true },
        footerNone: { inactive: false },
        logoHeader: { inactive: true }
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

        el.classList.toggle('inactive', inactive || false);

        if (classList) {
            el.classList.add(classList);
        } else {
            el.classList.remove('header-container--long', 'header-arrow--white'); // Elimina clases si no están definidas
        }

        if (background !== undefined) {
            el.style.background = background;
        }
    });
}