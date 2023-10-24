import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserType } from "../../types";
import { useStore } from "../../store";

export default function ManageInventoryPage() {
  const user = useStore((state) => state.user);

  return (
    <>
      {user.userType === UserType.MANAGER && (
        <>
          <h1>
            Manage Inventory Page, displays remaining stock and inventory cost,
            allows user to bulk restock items, add new items, and change prices
          </h1>
          <Button
            variant="contained"
            component={Link}
            to="/app/manager-quickview"
          >
            Back to Quickview
          </Button>
        </>
      )}
    </>
  );
}
