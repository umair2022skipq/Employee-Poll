import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { AppBar, Drawer } from "../style/styles";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { MainListItems } from "./ListItems";
import NewQuestions from "../pages/NewQuestions";
import LeaderBoard from "../pages/LeaderBoard";
import AddQuestion from "../pages/AddQuestion";
import QuestionDetails from "../pages/QuestionDetails";
import Copyright from "./Copyright";

import { authSelector, logout } from "../features/authSlice/authSlice";
import { userSelector } from "../features/userSlice/userSlice";

const Layout = ({ isLoading }) => {
  const mdTheme = createTheme();

  const auth = useSelector(authSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const authUser = auth.userId ? user.users.byId[auth.userId] : null;

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Employes Poll
            </Typography>
            <IconButton color="inherit"></IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
          </List>
          <Divider sx={{ my: 1 }} />
          <List>
            <ListItem button onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" display="block" gutterBottom>
                    Logout <b>{authUser.name}</b>
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route
                path="/"
                element={<NewQuestions isLoading={isLoading} />}
              />
              <Route
                path="/answered"
                element={<NewQuestions isLoading={isLoading} />}
              />
              <Route path="/add" element={<AddQuestion />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route
                path="/questions/:question_id"
                element={<QuestionDetails isLoading={isLoading} />}
              />
            </Routes>
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
