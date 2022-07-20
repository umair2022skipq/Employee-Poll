import { configureStore } from "@reduxjs/toolkit";
import employeePollReducer from "../features/employeePoll/employeePollSlice";
import userSliceReducer from "../features/userSlice/userSlice";
import authSlice from "../features/authSlice/authSlice";

export default configureStore({
  reducer: {
    poll: employeePollReducer,
    user: userSliceReducer,
    auth: authSlice,
  },
});
