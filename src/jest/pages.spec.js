import { render, fireEvent, queryByAttribute } from "@testing-library/react";
import Login from "../pages/login";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import store from "../app/store";
import LeaderBoard from "../pages/LeaderBoard";
import { _getUsers, _getQuestions } from "../data/_DATA";
import { BrowserRouter as Router } from "react-router-dom";

describe("Testing snapshots pages", () => {
  it("should render login", function () {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render leaderboard", function () {
    const { container } = render(
      <Provider store={store}>
        <LeaderBoard />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render layout", function () {
    const { container } = render(
      <Router>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Router>
    );

    expect(container).toMatchSnapshot();
  });

  it("should login", function () {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const username = getById(container, "username");
    const password = getById(container, "password");

    fireEvent.change(username, { target: { value: "sarahedo" } });
    fireEvent.change(password, { target: { value: "password123" } });

    const button = getById(container, ":r5:");
    fireEvent.click(button);
  });
});

describe("Testing users and questions", () => {
  it("fetch users", async () => {
    await expect(_getUsers()).not.toBeUndefined();
  });

  it("fetch questions", async () => {
    await expect(_getQuestions()).not.toBeUndefined();
  });
});
