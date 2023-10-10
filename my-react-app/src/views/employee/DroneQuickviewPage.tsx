import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function DroneQuickviewPage() {
  return (
    <>
      <h1>
        Drone Quickview Page, displays and overview of drone info and status
      </h1>
      <Button variant="contained" component={Link} to="/app/manage-drones">
        Manage Drones
      </Button>
      <Button variant="contained" component={Link} to="/app/drone-history">
        Drone History
      </Button>
    </>
  );
}
