import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

export default store;
