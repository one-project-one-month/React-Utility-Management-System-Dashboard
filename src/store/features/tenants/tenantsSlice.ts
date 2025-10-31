import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Pagination } from "@/types/pagination.ts";

// interface Filters {
//   occupancy?: Occupancy;
// }

interface InitialState {
  search: string;
  pagination: Pagination;
}

const initialState: InitialState = {
  search: "",
  pagination: {
    page: 1,
    limit: 10,
  },
};

const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    // setFilters: (state, action: PayloadAction<>) => {
    //   state.pagination.filter = action.payload;
    // },
  },
  selectors: {
    selectPagination: (tenant) => tenant.pagination,
    selectSearch: (tenant) => tenant.search,
    // selectFilters: (tenant) => tenant.filters,
  },
});

export const { setCurrentPage, setSearch } = tenantsSlice.actions;
export const { selectPagination, selectSearch } = tenantsSlice.selectors;
export default tenantsSlice.reducer;
