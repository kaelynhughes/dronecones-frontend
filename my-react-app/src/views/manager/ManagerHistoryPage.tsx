import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ManagerHistoryPage() {
  return (
    <>
      <h1>
        Manager History Page, allows the manager to view all recent orders and
        their details
      </h1>
      <Button variant="contained" component={Link} to="/app/manager-quickview">
        Back to Quickview
      </Button>
    </>
  );
}
