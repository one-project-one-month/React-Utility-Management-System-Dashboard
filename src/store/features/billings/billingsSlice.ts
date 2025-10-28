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

const billingsSlice = createSlice({
  name: "billings",
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
    selectCurrentPage: (billing) => billing.currentPage,
    selectLimit: (billing) => billing.limit,
    selectSearch: (billing) => billing.search,
    selectFilters: (billing) => billing.filters,
  },
});

export const { setCurrentPage, setSearch, setFilters } = billingsSlice.actions;
export const { selectCurrentPage, selectLimit, selectSearch, selectFilters } =
  billingsSlice.selectors;
export default billingsSlice.reducer;
