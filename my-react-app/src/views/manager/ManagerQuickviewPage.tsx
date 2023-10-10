import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ManagerQuickviewPage() {
  return (
    <>
      <h1>
        Manager Quickview Page, displays and overview of manager information and
        status.
      </h1>
      <Button variant="contained" component={Link} to="/app/manage-inventory">
        Manage Inventory
      </Button>
      <Button variant="contained" component={Link} to="/app/manage-users">
        Manage Users
      </Button>
      <Button variant="contained" component={Link} to="/app/manager-history">
        Manager History
      </Button>
    </>
  );
}
