import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Alert,
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  useTheme,
} from "@mui/material";
import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import "../index.css";
import "../fonts/AerologicaRegular-K7day.ttf";
import { UserType } from "../types";
import { useStore } from "../store";
import React from "react";

// Open to renaming this, this is the parent page for the rest of the app once the user has logged in.
export default function AppPage() {
  const user = useStore((state) => state.user);
  const mode = useStore((state) => state.userMode);
  const appPath = useStore((state) => state.appPath);
  const error = useStore((state) => state.error);
  const navigate = useNavigate();
  const theme = useTheme();

  const { changeMode } = useStore();
  const { changePath } = useStore();
  const { removeError } = useStore();
  const { clearState } = useStore();

  const optionButtonStyle = {
    backgroundColor: `${theme.palette.primary.main}`,
    fontFamily: "pixelfont",
    textShadow: "0 0 10px rgba(0, 153, 255, 0.7)",
    fontSize: "12px",
    color: "#ffff",
    width: "100%",
  };

  const handleNavBar = (event: any, newPath: string) => {
    if (newPath !== null) {
      changePath(newPath);
      navigate(`/${newPath}`);
    }
  };

  const snackbarClose = () => {
    removeError();
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" onClick={snackbarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: `${theme.palette.background.default}`,
            height: "65px",
          }}
        >
          <Container maxWidth={false}>
            <Toolbar sx={{ width: "100%" }} disableGutters>
              <IcecreamOutlinedIcon sx={{ mr: 1, align: "left" }} />

              <div>
                <span
                  className="logo-fontFirst"
                  style={{
                    fontSize: "25px",
                  }}
                >
                  DRONE
                </span>
                <span
                  className="logo-fontSecond"
                  style={{
                    fontSize: "25px",
                  }}
                >
                  CONES
                </span>
              </div>
              <Toolbar sx={{ width: "10%" }} />
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "end",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {(user.user_type === UserType.EMPLOYEE ||
                  user.user_type === UserType.MANAGER) &&
                  mode !== UserType.CUSTOMER && (
                    <Button
                      variant="outlined"
                      style={{
                        color: `${theme.palette.primary.main}`,
                        fontFamily: "pixelfont",
                        fontSize: "13px",
                        width: "120px",
                      }}
                      size="medium"
                      onClick={() => {
                        changeMode(UserType.CUSTOMER);
                        changePath("app/menu");
                        navigate("/app/menu");
                      }}
                    >
                      Want Cones?
                    </Button>
                  )}

                {(user.user_type === UserType.EMPLOYEE ||
                  user.user_type === UserType.MANAGER) &&
                  mode !== UserType.EMPLOYEE && (
                    <Button
                      variant="outlined"
                      style={{
                        color: `${theme.palette.secondary.main}`,
                        fontFamily: "pixelfont",
                        fontSize: "13px",
                        width: "120px",
                      }}
                      size="medium"
                      onClick={() => {
                        changeMode(UserType.EMPLOYEE);
                        changePath("app/drone-quickview");
                        navigate("/app/drone-quickview");
                      }}
                    >
                      Your Drones
                    </Button>
                  )}

                {user.user_type === UserType.MANAGER &&
                  mode !== UserType.MANAGER && (
                    <Button
                      variant="outlined"
                      style={{
                        color: `${theme.palette.secondary.main}`,
                        fontFamily: "pixelfont",
                        fontSize: "13px",
                        width: "120px",
                      }}
                      size="medium"
                      onClick={() => {
                        changeMode(UserType.MANAGER);
                        changePath("app/manager-quickview");
                        navigate("/app/manager-quickview");
                      }}
                    >
                      Manager Mode
                    </Button>
                  )}

                <div
                  style={{
                    height: "30px",
                    marginLeft: "16px",
                    marginRight: "16px",
                  }}
                >
                  <span style={{ fontFamily: "pixelfont", fontSize: "8px" }}>
                    Welcome,
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "pixelfont",
                      fontSize: "11px",
                    }}
                  >
                    {user.username}
                  </p>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    clearState();
                    navigate("/");
                  }}
                  size="small"
                  style={{
                    color: `${theme.palette.primary.main}`,
                    fontFamily: "pixelfont",
                    fontSize: "11px",
                    height: "30px",
                    marginTop: "15px",
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: `${theme.palette.primary.dark}`,
              color: `${theme.palette.divider}`,
              width: "100px",
            },
          }}
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
          variant="permanent"
          anchor="left"
          className="sidebar"
        >
          {(user.user_type === UserType.CUSTOMER ||
            user.user_type === UserType.GUEST ||
            mode === UserType.CUSTOMER) && (
            <Box sx={{ width: "100%", padding: 0 }}>
              <Divider sx={{ height: "65px" }} />
              {/* Here we use a vertical ToggleButtonGroup */}
              <ToggleButtonGroup
                orientation="vertical"
                value={appPath}
                exclusive
                onChange={handleNavBar}
                sx={{ width: "100%", height: "100%" }} // Style to expand to container
              >
                <ToggleButton value="app/menu" sx={optionButtonStyle}>
                  Menu
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton value="app/cart" sx={optionButtonStyle}>
                  Cart
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton
                  value="app/customer-history"
                  sx={optionButtonStyle}
                >
                  History
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
          {(user.user_type === UserType.EMPLOYEE ||
            user.user_type === UserType.MANAGER) &&
            mode === UserType.EMPLOYEE && (
              <Box sx={{ width: "100%", padding: 0 }}>
                <Divider sx={{ height: "65px" }} />
                {/* Here we use a vertical ToggleButtonGroup */}
                <ToggleButtonGroup
                  orientation="vertical"
                  value={appPath}
                  exclusive
                  onChange={handleNavBar}
                  sx={{ width: "100%", height: "100%", optionButtonStyle }} // Style to expand to container
                >
                  <ToggleButton
                    value="app/drone-quickview"
                    sx={optionButtonStyle}
                  >
                    Quick View
                  </ToggleButton>
                  <Divider sx={{ height: "1px" }} />
                  <ToggleButton
                    value="app/manage-drones"
                    sx={optionButtonStyle}
                  >
                    Manage Drones
                  </ToggleButton>
                  <Divider sx={{ height: "1px" }} />
                  <ToggleButton
                    value="app/drone-history"
                    sx={optionButtonStyle}
                  >
                    History
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}
          {user.user_type === UserType.MANAGER && mode === UserType.MANAGER && (
            <Box sx={{ width: "100%", padding: 0 }}>
              <Divider sx={{ height: "65px" }} />
              {/* Here we use a vertical ToggleButtonGroup */}
              <ToggleButtonGroup
                orientation="vertical"
                value={appPath}
                exclusive
                onChange={handleNavBar}
                sx={{ width: "100%", height: "100%", optionButtonStyle }} // Style to expand to container
              >
                <ToggleButton
                  value="app/manager-quickview"
                  sx={optionButtonStyle}
                >
                  Quick View
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton
                  value="app/manage-inventory"
                  sx={optionButtonStyle}
                >
                  Restock
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton value="app/manage-users" sx={optionButtonStyle}>
                  Users
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton
                  value="app/manager-history"
                  sx={optionButtonStyle}
                >
                  History
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: "100px",
            marginTop: "50px",
          }}
        >
          <Outlet />
        </Box>
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
    </>
  );
}
