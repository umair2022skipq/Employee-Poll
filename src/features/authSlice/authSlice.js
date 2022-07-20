import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../data/_DATA";

const initialState = {
  userId: undefined,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_, action) => {
      if (Object.keys(users).includes(action.payload.username)) {
        const user = users[action.payload.username];

        return {
          userId: user.id,
          isAuthenticated: true,
        };
      }
    },
    logout: () => ({
      userId: undefined,
      isAuthenticated: false,
    }),
  },
});

export const { login, logout } = authSlice.actions;

export const authUserSelector = (state) =>
  state.auth.userId ? state.user.users.byId[state.auth.userId] : null;
export const authSelector = (state) => state.auth;

export default authSlice.reducer;
