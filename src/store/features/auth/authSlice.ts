import type { User } from "@/types/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { redirect } from "react-router";
import { removeCookie } from "react-use-cookie";

type InitialState = {
  accessToken: string | null;
  user: User | null;
};

const initialState: InitialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      removeCookie("token");
      removeCookie("user");
      redirect("/login");
    },
  },
});

export const { setAccessToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
