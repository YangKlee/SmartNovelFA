export interface Category {
    categoryId: string;
    name: string;
    description?: string;
    slug: string;
    status: string;
}

export interface CategoryResponse {
    data: Category[];
    currentPage: number;
    totalPages: number;
    totalRecords: number;
}
