import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Occupancy } from "@/types/tenants/tenantType.ts";

interface Filters {
  occupancy?: Occupancy;
}

interface InitialState {
  currentPage: number;
  limit: number;
  search: string;
  filters: Filters;
}

const initialState: InitialState = {
  currentPage: 1,
  limit: 10,
  search: "",
  filters: {},
};

const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
  },
  selectors: {
    selectCurrentPage: (tenant) => tenant.currentPage,
    selectLimit: (tenant) => tenant.limit,
    selectSearch: (tenant) => tenant.search,
    selectFilters: (tenant) => tenant.filters,
  },
});

export const { setCurrentPage, setSearch, setFilters } = tenantsSlice.actions;
export const { selectCurrentPage, selectLimit, selectSearch, selectFilters } =
  tenantsSlice.selectors;
export default tenantsSlice.reducer;
