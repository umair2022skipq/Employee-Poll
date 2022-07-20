import { configureStore } from "@reduxjs/toolkit";
import employeePollReducer from "../features/employeePoll/employeePollSlice";
import userSliceReducer from "../features/userSlice/userSlice";
import authSliceReducer from "../features/auth/authSlice";
// import authSlice from "../features/authSlice/authSlice";

export default configureStore({
  reducer: {
    poll: employeePollReducer,
    user: userSliceReducer,
    auth: authSliceReducer,
    // auth: authSlice,
  },
});
