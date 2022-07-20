import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../data/_DATA";

const initialState = {
  userId: undefined,
  isAuthenticated: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (Object.keys(users).includes(action.payload.username)) {
        const user = users[action.payload.username];

        return {
          userId: user.id,
          isAuthenticated: true,
        };
      }

      return { ...state, error: true };
    },
    logout: () => ({
      userId: undefined,
      isAuthenticated: false,
    }),
  },
});

export const { login, logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;
