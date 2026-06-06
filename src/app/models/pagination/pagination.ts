export interface Pagination<T> {
    data: T[];
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}