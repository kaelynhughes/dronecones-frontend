import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function DroneHistoryPage() {
  return (
    <>
      <h1>
        Drone History Page, displays info on recent drone deliveries and income
        from each delivery
      </h1>
      <Button variant="contained" component={Link} to="/app/drone-quickview">
        Back to Quickview
      </Button>
    </>
  );
}
