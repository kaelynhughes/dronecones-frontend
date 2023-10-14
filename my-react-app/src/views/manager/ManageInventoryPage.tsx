import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ManageInventoryPage() {
  return (
    <>
      <h1>
        Manage Inventory Page, displays remaining stock and inventory cost,
        allows user to bulk restock items, add new items, and change prices
      </h1>
      <Button variant="contained" component={Link} to="/app/manager-quickview">
        Back to Quickview
      </Button>
    </>
  );
}
