import React from "react";
import Button from "@mui/material/Button";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Toolbar,
} from "@mui/material";
import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import "../index.css";
import "../fonts/AerologicaRegular-K7day.ttf";
import { UserType } from "../data-objects/User";

// Open to renaming this, this is the parent page for the rest of the app once the user has logged in.
export default function AppPage() {
  const location = useLocation();
  const user = location.state?.user || UserType.CUSTOMER;
  const pageType = 0;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IcecreamOutlinedIcon sx={{ mr: 1 }} />
              <span className="logo-name">Drone Cones</span>
              <Button
                variant="outlined"
                component={Link}
                to="/"
                style={{ color: "purple" }}
              >
                Home/Logout
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          PaperProps={{
            sx: { backgroundColor: "purple", color: "pink" },
          }}
          sx={{
            width: 150,
            flexShrink: 0,
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <br />
          {(user.userType === UserType.CUSTOMER ||
            pageType === 0 ||
            pageType === 1) && (
            <Container>
              <Button variant="contained" component={Link} to="/app/menu">
                Menu
              </Button>
              <br />
              <br />
              <Button variant="contained" component={Link} to="/app/cart">
                Cart
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                component={Link}
                to="/app/customer-history"
              >
                History
              </Button>
              <br />
              <br />
            </Container>
          )}
          {user.userType === UserType.EMPLOYEE && (
            <Container>
              <Button
                variant="contained"
                component={Link}
                to="/app/drone-quickview"
              >
                Quick View
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                component={Link}
                to="/app/manage-drones"
              >
                Manage Drones
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                component={Link}
                to="/app/drone-history"
              >
                History
              </Button>
              <br />
              <br />
            </Container>
          )}
          {user.userType === UserType.MANAGER && (
            <Container>
              <Button
                variant="contained"
                component={Link}
                to="/app/manager-quickview"
              >
                Quick View
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                component={Link}
                to="/app/manage-inventory"
              >
                Inventory
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                component={Link}
                to="/app/manage-users"
              >
                Users
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                component={Link}
                to="/app/manager-history"
              >
                History
              </Button>
            </Container>
          )}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
