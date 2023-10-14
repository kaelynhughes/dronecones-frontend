import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ManageUsersPage() {
  return (
    <>
      <h1>
        Manage Users Page, allows a manager to ban or unban users sorted by
        recent orders
      </h1>
      <Button variant="contained" component={Link} to="/app/manager-quickview">
        Back to Quickview
      </Button>
    </>
  );
}
