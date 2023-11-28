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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { signup, user, error, changeMode, changePath, removeError, setError } =
    useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [usertype, setUsertype] = useState(UserType.CUSTOMER);

  function signUp() {
    if (password === password2) {
      signup(username, password, usertype);
    } else {
      setError("Passwords do not match, please try re-typing them.");
    }
  }

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card sx={{ width: "20%" }}>
        <CardContent sx={{ alignContent: "center" }}>
          <Typography
            variant="h4"
            className="header-font"
            fontFamily={"homeheader"}
            align="center"
          >
            Sign Up
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
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            sx={{ input: wordStyle }}
          />
          <FormControl fullWidth>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ ...wordStyle }}
            >
              Account Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={usertype}
              onChange={(e) => setUsertype(e.target.value as UserType)}
            >
              <FormControlLabel
                value={UserType.CUSTOMER}
                control={<Radio />}
                label="Cone Buyer"
                sx={{
                  ...wordStyle,
                }}
              />
              <FormControlLabel
                value={UserType.EMPLOYEE}
                control={<Radio />}
                label="Drone Flyer"
                sx={{
                  ...wordStyle,
                }}
              />
              <FormControlLabel
                value={UserType.MANAGER}
                control={<Radio />}
                label="Manager - REMOVE BEFORE PRODUCTION"
                sx={{
                  ...wordStyle,
                }}
              />
            </RadioGroup>
          </FormControl>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              onClick={signUp}
              sx={{
                ...wordStyle,
              }}
            >
              Create Account
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
