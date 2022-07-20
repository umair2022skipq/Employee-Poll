import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./app/store";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsersAsync, userSelector } from "./features/userSlice/userSlice";
import {
  getQuestionsAsync,
  employeePollSelector,
} from "./features/employeePoll/employeePollSlice";

const App = () => {
  const poll = useSelector(employeePollSelector);
  const user = useSelector(userSelector);

  const loadingUserData = user.status === "loading";
  const loadingPollData = poll.status === "loading";
  const loading = loadingUserData || loadingPollData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Provider store={store}>
          <Layout isLoading={loading} />
        </Provider>
      </Router>
    </>
  );
};

export default App;
