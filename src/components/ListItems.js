import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  CreateSharp,
  Leaderboard,
  MarkEmailRead,
  MarkEmailUnread,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export const MainListItems = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <ListItemButton selected={pathname === "/"} onClick={() => navigate("/")}>
        <ListItemIcon>
          <MarkEmailUnread />
        </ListItemIcon>
        <ListItemText primary="Questions" />
      </ListItemButton>
      <ListItemButton
        selected={pathname === "/answered"}
        onClick={() => navigate("/answered")}
      >
        <ListItemIcon>
          <MarkEmailRead />
        </ListItemIcon>
        <ListItemText primary="Answered Questions" />
      </ListItemButton>
      <ListItemButton
        selected={pathname === "/add"}
        onClick={() => navigate("/add")}
      >
        <ListItemIcon>
          <CreateSharp />
        </ListItemIcon>
        <ListItemText primary="Add Questions" />
      </ListItemButton>
      <ListItemButton
        selected={pathname === "/leaderboard"}
        onClick={() => navigate("/leaderboard")}
      >
        <ListItemIcon>
          <Leaderboard />
        </ListItemIcon>
        <ListItemText primary="Leaderboard" />
      </ListItemButton>
    </>
  );
};
