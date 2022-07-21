import { useDispatch, useSelector } from "react-redux";
import {
  employeePollSelector,
  addQuestionAsync,
} from "../features/employeePoll/employeePollSlice";
import { authSelector } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { Alert, LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { userSelector } from "../features/user/userSlice";
import { debounce } from "lodash";

const styles = {
  boxSx: {
    width: 500,
    maxWidth: "100%",
    margin: "15px auto",
  },
  buttonSx: { mt: 1, mr: 1 },
};

const AddQuestion = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [missingFields, setMissingFields] = useState(false);

  const auth = useSelector(authSelector);
  const poll = useSelector(employeePollSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = auth.userId ? user.users.byId[auth.userId] : null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!(optionOne && optionTwo)) {
      setMissingFields(true);
      return;
    }
    setMissingFields(false);

    dispatch(
      addQuestionAsync({
        author: authUser.id,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      })
    ).then(navigate("/"));
  };

  return (
    <>
      <Typography sx={styles.boxSx} variant="h2" component="div" gutterBottom>
        Add Question
      </Typography>
      <Typography
        sx={styles.boxSx}
        variant="body2"
        component="div"
        gutterBottom
      >
        Would You Rather
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box sx={styles.boxSx}>
          <TextField
            fullWidth
            label="Option One"
            name="optionOneText"
            onChange={debounce((e) => setOptionOne(e.target.value))}
          />
        </Box>

        <Box sx={styles.boxSx}>
          <TextField
            fullWidth
            label="Option Two"
            name="optionTwoText"
            onChange={debounce((e) => setOptionTwo(e.target.value))}
          />
        </Box>

        <Box sx={styles.boxSx}>
          {poll.status === "failed" && (
            <Alert severity="error">The question was not created.</Alert>
          )}

          {missingFields && (
            <Alert severity="warning">All fields are required.</Alert>
          )}

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={poll.status === "loading"}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default AddQuestion;
