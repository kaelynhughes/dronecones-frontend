import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useStore } from "../store";
import { UserType } from "../types";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Alert,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { login, user, error, changeMode, changePath, removeError } =
    useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigateToPath = (path: string) => {
    changeMode(user.user_type);
    changePath(path);
    navigate(path);
  };

  if (user?.id) {
    if (user.user_type === UserType.CUSTOMER) {
      navigateToPath("/app/menu");
    } else if (user.user_type === UserType.EMPLOYEE) {
      navigateToPath("/app/drone-quickview");
    } else if (user.user_type === UserType.MANAGER) {
      navigateToPath("/app/manager-quickview");
    }
  }

  const snackbarClose = () => {
    removeError();
  };

  function logIn() {
    login(username, password);
  }

  function logInGuest() {
    navigateToPath("/app/menu");
  }

  function signUp() {
    navigateToPath("/signup");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="98vh"
      width="98vh"
    >
      <Card sx={{ width: "40%" }}>
        <CardContent sx={{ alignContent: "center" }}>
          <Typography
            variant="h4"
            className="header-font"
            fontFamily={"homeheader"}
            align="center"
          >
            Log in
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ input: wordStyle }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ input: wordStyle }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              style={{ margin: "10px 0" }}
              onClick={logIn}
              sx={{ ...wordStyle, width: "140px" }}
            >
              Log in
            </Button>
            <Button
              variant="text"
              onClick={signUp}
              size="small"
              sx={{ margin: "0px", padding: "0px" }}
            >
              No account? Create one here!
            </Button>
            <Button
              variant="text"
              onClick={logInGuest}
              size="small"
              sx={{ margin: "0px", padding: "0px" }}
            >
              or Continue as a Guest -{">"}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={error != ""}
        autoHideDuration={5000}
        onClose={snackbarClose}
      >
        <Alert
          severity="error"
          sx={{
            width: "100%",
            backgroundColor: `${theme.palette.secondary.light}`,
            fontFamily: "pixelfont",
            fontSize: "10px",
            color: "#ffff",
            "& .MuiAlert-message": { alignSelf: "center", width: "inherit" },
          }}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                sx={{ color: "white" }}
                onClick={snackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
