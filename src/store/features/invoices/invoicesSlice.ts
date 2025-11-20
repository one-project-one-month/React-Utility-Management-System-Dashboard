import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BillingStatus } from "@/types/billing/billingTableData.ts";
import type { Pagination } from "@/types/pagination.ts";

interface InitialState {
  search: string;
  pagination: Pagination;
}

const initialState: InitialState = {
  search: "",
  pagination: {
    page: 1,
    limit: 10,
    filter: {
      status: undefined,
    },
  },
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.pagination.page = 1;
    },

    setFilters: (state, action: PayloadAction<BillingStatus>) => {
      if (!state.pagination.filter) {
        state.pagination.filter = { status: action.payload };
      } else {
        state.pagination.filter.status = action.payload;
      }
    },
  },
  selectors: {
    selectPagination: (billing) => billing.pagination,
    selectSearch: (billing) => billing.search,
  },
});

export const { setCurrentPage, setSearch, setFilters } = invoicesSlice.actions;
export const { selectSearch, selectPagination } = invoicesSlice.selectors;
export default invoicesSlice.reducer;
