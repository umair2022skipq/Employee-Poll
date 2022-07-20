import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Divider } from "@mui/material/";
import { useSelector } from "react-redux";
import { employeePollSelector } from "../features/employeePoll/employeePollSlice";
import { userSelector } from "../features/userSlice/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Question from "./Question";
import { useLocation } from "react-router-dom";
import { authSelector } from "../features/authSlice/authSlice";

export function Spinner() {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
}

const NewQuestions = ({ isLoading }) => {
  const poll = useSelector(employeePollSelector);
  const user = useSelector(userSelector);
  const auth = useSelector(authSelector);
  const { pathname } = useLocation();

  const authUser = auth.userId ? user.users.byId[auth.userId] : null;

  const answeredQuestionIds = Object.keys(authUser.answers);
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
