import { List } from "@mui/material";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Avatar } from "@mui/material/";
import { _getUsers } from "../data/_DATA";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux/es/exports";
import { leaderSelector } from "../features/userSlice/userSlice";

const LeaderBoard = ({ isLoading }) => {
  const leaders = useSelector(leaderSelector);
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Leaderboard
      </Typography>
      {leaders &&
        leaders.map((user) => (
          <List key={user.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="https://www.w3schools.com/w3images/avatar2.png" />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.name}`}
                secondary={
                  <>
                    {`Current Score: ${
                      user.questions.length + Object.keys(user.answers).length
                    }`}{" "}
                    <br />
                    {`Asked: ${user.questions.length}`} <br />
                    {`Answered: ${Object.keys(user.answers).length}`}
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
