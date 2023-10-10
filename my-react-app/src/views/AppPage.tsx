import React from "react";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";

// Open to renaming this, this is the parent page for the rest of the app once the user has logged in.
export default function AppPage() {
  return (
    <>
      <h1>
        App Page, will display side and top navbars, and is the parent page for
        the rest of the views.
      </h1>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
      <br />
      <br />
      <Button variant="contained" component={Link} to="/app/menu">
        Menu
      </Button>
      <Button variant="contained" component={Link} to="/app/cart">
        Cart
      </Button>
      <Button variant="contained" component={Link} to="/app/customer-history">
        Customer History
      </Button>
      <br />
      <br />
      <Button variant="contained" component={Link} to="/app/drone-quickview">
        Drone Overview
      </Button>
      <Button variant="contained" component={Link} to="/app/manage-drones">
        Manage Drones
      </Button>
      <Button variant="contained" component={Link} to="/app/drone-history">
        Drone History
      </Button>
      <br />
      <br />
      <Button variant="contained" component={Link} to="/app/manager-quickview">
        Manager Overview
      </Button>
      <Button variant="contained" component={Link} to="/app/manage-inventory">
        Manage Inventory
      </Button>
      <Button variant="contained" component={Link} to="/app/manage-users">
        Manage Users
      </Button>
      <Button variant="contained" component={Link} to="/app/manager-history">
        Manager History
      </Button>
      <br />
      <br />
      <div className="view-window">
        <Outlet />
      </div>
    </>
  );
}
