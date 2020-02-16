export class FilterTypes {
    static TITLE = 'title';
    static PRICE_FROM = 'priceFrom';
    static CATEGORY = 'category';
    static CURRENT_PAGE = 'currentPage';
    static ITEMS_PER_PAGE = 'itemsPerPage';
}

export class ItemsFilters {
    constructor(
        public title = '',
        public priceFrom = 0,
        public category = '',
        public currentPage = 1,
        public itemsPerPage = 5) {
    }
}
