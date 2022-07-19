import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import {
  Button,
  Radio,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Spinner } from "./NewQuestions";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  employeePollSelector,
  addAnswerAsync,
} from "../features/employeePoll/employeePollSlice";
import { userSelector } from "../features/userSlice/userSlice";

function checkIfUserHasVotedAlready(question, userID) {
  if (question.optionOne.votes.includes(userID)) return "optionOne";
  if (question.optionTwo.votes.includes(userID)) return "optionTwo";
  return null;
}

const QuestionDetails = ({ isLoading }) => {
  const [value, setValue] = useState("");

  const user = useSelector(userSelector);
  const poll = useSelector(employeePollSelector);

  const dispatch = useDispatch();

  const questionId = useParams();
  const question = { ...poll.questions.byId[questionId.question_id] };

  const navigate = useNavigate();

  const author = user.users.byId[question.author];

  if (!question) {
    return <Typography>Question does not exist.</Typography>;
  }

  const existingValue = checkIfUserHasVotedAlready(question, "mtsamis");
  const currentValue = existingValue || value;

  const handleChange = (event) => {
    if (existingValue) return;

    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const node = event.target.value;
    if (!node.value) {
      return;
    }

    dispatch(
      addAnswerAsync({
        userId: "mtsamis",
        questionId: question.id,
        answer: node.value,
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  // const navigation = window.performance.getEntriesByType("navigation");

  // if (navigation[0].type === "reload") {
  //   navigate("/");
  // }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 650,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={author.avatarURL || ""}
            alt={author.name}
          />
          <p>Poll By: {author.name}</p>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <form onSubmit={handleSubmit}>
              <fieldset style={{ border: 0 }}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Would you rather...</FormLabel>
                  <RadioGroup
                    aria-label="quiz"
                    name="value"
                    value={currentValue}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="optionOne"
                      control={<Radio />}
                      label={question.optionOne.text}
                      disabled={existingValue !== null}
                    />
                    <FormControlLabel
                      value="optionTwo"
                      control={<Radio />}
                      label={question.optionTwo.text}
                      disabled={existingValue !== null}
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {existingValue
                      ? ""
                      : "Stats will appear answer picking an option..."}
                  </FormHelperText>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={existingValue !== null}
                  >
                    Submit
                  </Button>
                </FormControl>
              </fieldset>
            </form>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default QuestionDetails;
