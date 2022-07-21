import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAnswerAsync,
  addQuestionAsync,
} from "../employeePoll/employeePollSlice";
import { _getUsers } from "../../data/_DATA";

const initialState = {
  users: {
    byId: {},
    allIds: [],
  },
  status: "idle",
};

export const getUsersAsync = createAsyncThunk(
  "user/getUsersAsync",
  async () => await _getUsers()
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users.byId = action.payload;
        state.users.allIds = Object.keys(action.payload);
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addAnswerAsync.fulfilled, (state, action) => ({
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [action.meta.arg.userId]: {
              ...state.users.byId[action.meta.arg.userId],
              answers: {
                ...state.users.byId[action.meta.arg.userId].answers,
                [action.meta.arg.questionId]: action.meta.arg.answer,
              },
            },
          },
        },
      }))
      .addCase(addQuestionAsync.fulfilled, (state, action) => ({
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [action.meta.arg.author]: {
              ...state.users.byId[action.meta.arg.author],
              questions: [
                ...state.users.byId[action.meta.arg.author].questions,
                action.payload.id,
              ],
            },
          },
        },
      }));
  },
});

export const userSelector = (state) => state.user;

export default userSlice.reducer;
