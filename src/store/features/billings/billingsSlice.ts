import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Pagination } from "@/types/pagination";
import type { BillingStatus } from "@/types/billing/billingTableData";

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

const billingsSlice = createSlice({
   name: "billings",
   initialState,
   reducers: {
      setCurrentPage: (state, action: PayloadAction<number>) => {
         state.pagination.page = action.payload;
      },

      setSearch: (state, action: PayloadAction<string>) => {
         state.search = action.payload;
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
      selectPagination: billing => billing.pagination,
      selectSearch: billing => billing.search,
   },
});

export const { setCurrentPage, setSearch, setFilters } = billingsSlice.actions;
export const { selectSearch, selectPagination } = billingsSlice.selectors;
export default billingsSlice.reducer;
