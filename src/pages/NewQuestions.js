import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Divider } from "@mui/material/";
import { useSelector } from "react-redux";
import { employeePollSelector } from "../features/employeePoll/employeePollSlice";
import { userSelector } from "../features/userSlice/userSlice";
// import { _getQuestions, _getUsers } from "../data/_DATA";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Question from "./Question";
import { useLocation } from "react-router-dom";

export function Spinner() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
}

const mtsamis = {
  id: "mtsamis",
  password: "xyz123",
  name: "Mike Tsamis",
  avatarURL: "https://www.w3schools.com/w3images/avatar2.png",
  answers: {
    xj352vofupe1dqz9emx13r: "optionOne",
    vthrdm985a262al8qx3do: "optionTwo",
    "6ni6ok3ym7mf1p33lnez": "optionOne",
  },
  questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
};

const NewQuestions = ({ isLoading }) => {
  const poll = useSelector(employeePollSelector);
  const user = useSelector(userSelector);
  const { pathname } = useLocation();

  const answeredQuestionIds = Object.keys(mtsamis.answers);
  const newQuestionIds = poll.questions.allIds.filter((id) => {
    if (pathname === "/") {
      return !answeredQuestionIds.includes(id);
    } else {
      return answeredQuestionIds.includes(id);
    }
  });

  const newQuestionsWithAuthors = newQuestionIds.map((id) => {
    const question = poll.questions.byId[id];

    return {
      ...question,
      authorObject: user.users.byId[question.author],
    };
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <List>
        {newQuestionsWithAuthors.length ? (
          newQuestionsWithAuthors.map((question) => (
            <div key={question.id}>
              <Question question={question} />
              <Divider />
            </div>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="There are no questions here..." />
          </ListItem>
        )}
      </List>
    </>
  );
};

export default NewQuestions;
