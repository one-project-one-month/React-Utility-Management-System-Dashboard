export interface Pagination {
   page: number;
   limit: number;
   filter?: Record<string, number | string>;
}
