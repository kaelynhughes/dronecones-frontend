import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ManageDronesPage() {
  return (
    <>
      <h1>
        Manage Drones Page, allows detailed info on each drone, with a button to
        add drones that opens a dialog for drone info input
      </h1>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
    </>
  );
}
