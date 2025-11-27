import type { Pagination } from "@/types/pagination";

export const buildQueryParams = (pagination: Pagination): string => {
   const params = new URLSearchParams();

   params.append("page", pagination.page.toString());
   params.append("limit", pagination.limit.toString());

   if (pagination.filter) {
      Object.entries(pagination.filter).forEach(([key, value]) => {
         if (value !== undefined && value !== null) {
            params.append(key, String(value));
         }
      });
   }

   return params.toString();
};
