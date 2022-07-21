import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./app/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getUsersAsync, userSelector } from "./features/user/userSlice";
import {
  getQuestionsAsync,
  employeePollSelector,
} from "./features/employeePoll/employeePollSlice";
import { authSelector } from "./features/auth/authSlice";
import Login from "./pages/Login";

const App = () => {
  const poll = useSelector(employeePollSelector);
  const user = useSelector(userSelector);
  const auth = useSelector(authSelector);

  const userDataStatus = user.status === "loading";
  const pollDataStatus = poll.status === "loading";
  const loading = userDataStatus || pollDataStatus;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  if (!auth.isAuthenticated) {
    return <Login />;
  }

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
