import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../data/_DATA";

export const getQuestionsAsync = createAsyncThunk(
  "poll/getQuestionsAsync",
  async () => await _getQuestions()
);

export const addQuestionAsync = createAsyncThunk(
  "poll/addQuestionAsync",
  async (args) => await _saveQuestion(args)
);

export const addAnswerAsync = createAsyncThunk(
  "poll/addAnswerAsync",
  async (args) =>
    await _saveQuestionAnswer({
      authedUser: args.userId,
      qid: args.questionId,
      answer: args.answer,
    })
);

const initialState = {
  questions: {
    byId: {},
    allIds: [],
  },
  status: "idle",
};

export const employeePollSlice = createSlice({
  name: "employeePoll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestionsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.questions.byId = action.payload;
        state.questions.allIds = pluckQuestionIds(action.payload);
      })
      .addCase(getQuestionsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addAnswerAsync.fulfilled, (state, action) => {
        return {
          ...state,
          questions: {
            ...state.questions,
            byId: {
              ...state.questions.byId,
              [action.meta.arg.questionId]: {
                ...state.questions.byId[action.meta.arg.questionId],
                [action.meta.arg.answer]: {
                  ...state.questions.byId[action.meta.arg.questionId][
                    action.meta.arg.answer
                  ],
                  votes: [
                    ...state.questions.byId[action.meta.arg.questionId][
                      action.meta.arg.answer
                    ].votes,
                    action.meta.arg.userId,
                  ],
                },
              },
            },
          },
        };
      })
      .addCase(addQuestionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addQuestionAsync.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        questions: {
          ...state.questions,
          byId: {
            ...state.questions.byId,
            [action.payload.id]: {
              ...action.payload,
            },
          },
          allIds: [action.payload.id, ...state.questions.allIds],
        },
      }))
      .addCase(addQuestionAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const pluckQuestionIds = (questionsById) => {
  return Object.keys(questionsById)
    .reduce(
      (questions, questionId) => [...questions, questionsById[questionId]],
      []
    )
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce((allIds, question) => [...allIds, question.id], []);
};

export const employeePollSelector = (state) => state.poll;

export const { add, update } = employeePollSlice.actions;
export default employeePollSlice.reducer;
