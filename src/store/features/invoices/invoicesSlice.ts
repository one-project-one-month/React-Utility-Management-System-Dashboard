import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";

interface Filters {
  status?: BillingStatus;
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

const invoicesSlice = createSlice({
  name: "invoices",
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
    selectCurrentPage: (invoice) => invoice.currentPage,
    selectLimit: (invoice) => invoice.limit,
    selectSearch: (invoice) => invoice.search,
    selectFilters: (invoice) => invoice.filters,
  },
});

export const { setCurrentPage, setSearch, setFilters } = invoicesSlice.actions;
export const { selectCurrentPage, selectLimit, selectSearch, selectFilters } =
  invoicesSlice.selectors;
export default invoicesSlice.reducer;
