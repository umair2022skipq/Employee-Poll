import { List } from "@mui/material";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Avatar } from "@mui/material/";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux/es/exports";
import { leaderSelector } from "../features/user/userSlice";
import { Spinner } from "./NewQuestions";
import { authSelector } from "../features/auth/authSlice";
import { userSelector } from "../features/user/userSlice";

const LeaderBoard = ({ isLoading }) => {
  const leaders = useSelector(leaderSelector);
  const auth = useSelector(authSelector);
  const user = useSelector(userSelector);

  const authUser = auth.userId ? user.users.byId[auth.userId] : null;
  console.log(authUser);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Leaderboard
      </Typography>
      {leaders &&
        leaders.map((user) => (
          <List key={user.id}>
            <ListItem
              style={{
                backgroundColor: user.id === authUser.id ? "#bcffc7" : "",
              }}
            >
              <ListItemAvatar>
                <Avatar src={user.avatarURL || ""} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.name}`}
                secondary={
                  <>
                    {`Current Score: ${
                      user.questions.length + Object.keys(user.answers).length
                    }`}{" "}
                    <br />
                    {`Questions Asked: ${user.questions.length}`} <br />
                    {`Questions Answered: ${Object.keys(user.answers).length}`}
                  </>
                }
              />
            </ListItem>
          </List>
        ))}
    </>
  );
};

export default LeaderBoard;
