import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import authReducer from "./features/auth/authSlice";
import tenantsReducer from "./features/tenants/tenantsSlice";
import billingsReducer from "./features/billings/billingsSlice";
import invoicesReducer from "./features/invoices/invoicesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    tenants: tenantsReducer,
    billings: billingsReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
