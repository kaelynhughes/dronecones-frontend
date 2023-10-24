import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { UserType } from "../../types";

export default function DroneQuickviewPage() {
  const user = useStore((state) => state.user);

  return (
    <>
      {(user.userType === UserType.EMPLOYEE ||
        user.userType === UserType.MANAGER) && (
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
      )}
    </>
  );
}
