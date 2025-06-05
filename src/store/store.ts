import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import searchSlice from "./searchSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: { userSlice, searchSlice, modalSlice },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

const RootReducer = combineReducers({ userSlice, searchSlice, modalSlice });
export type TRootState = ReturnType<typeof RootReducer>;
