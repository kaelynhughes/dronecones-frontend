import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../../types";
import { useStore } from "../../store";

export default function ManageDronesPage() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {(user.userType === UserType.EMPLOYEE ||
        user.userType === UserType.MANAGER) && (
        <>
          <h1>
            Manage Drones Page, allows detailed info on each drone, with a
            button to add drones that opens a dialog for drone info input
          </h1>
          <Button
            variant="contained"
            onClick={() => navigate("/app/drone-quickview")}
          >
            Back to Quickview
          </Button>
        </>
      )}
    </>
  );
}
