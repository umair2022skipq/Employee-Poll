import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { fetchLogin } from "./authApi";
import { users } from "../../data/_DATA";

// export const loginAsync = createAsyncThunk(
//   "auth/fetchLogin",
//   async (username, password) => {
//     const res = await fetchLogin(username, password);
//     // The value we return becomes the `fulfilled` action payload
//     return res.data;
//   }
// );

const initialState = {
  isAuthenticated: false,
  userId: "",
  status: "idle",
};

export const authSlice = createSlice({
  //   name: "auth",
  //   initialState,
  //   reducers: {
  //     login: (state, action) => ({
  //       ...state,
  //       isAuthenticated: true,
  //       userId: action.payload.id,
  //     }),
  //     logout: (state) => ({
  //       ...state,
  //       userId: undefined,
  //       isAuthenticated: false,
  //     }),
  //   },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(loginAsync.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(loginAsync.fulfilled, (state, action) => {
  //         console.log(current(state));
  //         state.status = "idle";
  //         state.isAuthenticated = true;
  //         state.userId = action.payload.id;
  //       })
  //       .addCase(loginAsync.rejected, (state) => {
  //         state.status = "failed";
  //       });
  //   },
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

export const { logout, login } = authSlice.actions;

export const authSelector = (state) => state.auth;
export const authUserSelector = (state) =>
  state.auth.userId ? state.user.users.byId[state.auth.userId] : null;

export default authSlice.reducer;
