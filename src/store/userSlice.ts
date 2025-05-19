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
      // Clear both storage locations
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      // Clear the axios header
      delete axios.defaults.headers.common["x-auth-token"];
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
