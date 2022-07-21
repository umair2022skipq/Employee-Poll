import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Avatar } from "@mui/material/";
import { useNavigate, generatePath } from "react-router-dom";

const Question = ({ question }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(generatePath("/questions/:question", { question: question.id }));
  };

  return (
    <>
      <ListItem alignItems="flex-start" button onClick={handleClick}>
        <ListItemAvatar>
          <Avatar src={question.authorObject.avatarURL || ""} />
        </ListItemAvatar>
        <ListItemText
          primary={`Would you rather ${question.optionOne.text} or ${question.optionTwo.text}`}
          secondary={`${question.author} on ${new Date(
            question.timestamp
          ).toDateString()}`}
        />
      </ListItem>
    </>
  );
};

export default Question;
