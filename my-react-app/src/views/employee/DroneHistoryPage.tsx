import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { UserType } from "../../types";

export default function DroneHistoryPage() {
  const user = useStore((state) => state.user);

  return (
    <>
      {(user.userType === UserType.EMPLOYEE ||
        user.userType === UserType.MANAGER) && (
        <>
          <h1>
            Drone History Page, displays info on recent drone deliveries and
            income from each delivery
          </h1>
          <Button
            variant="contained"
            component={Link}
            to="/app/drone-quickview"
          >
            Back to Quickview
          </Button>
        </>
      )}
    </>
  );
}
