import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userinfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      sessionStorage.removeItem("userinfo");
    },
    createDish: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
