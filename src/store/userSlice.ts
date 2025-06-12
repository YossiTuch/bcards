import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../types/TUser";
import axios from "axios";

const initialState = {
  user: null as TUser | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: typeof initialState, data: PayloadAction<TUser>) => {
      state.user = data.payload;
    },
    logout: (state: typeof initialState) => {
      state.user = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common["x-auth-token"];
    },
    updateUser: (state: typeof initialState, data: PayloadAction<TUser>) => {
      state.user = data.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
