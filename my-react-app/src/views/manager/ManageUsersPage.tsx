import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { UserType } from "../../types";

export default function ManageUsersPage() {
  const user = useStore((state) => state.user);

  return (
    <>
      {user.user_type === UserType.MANAGER && (
        <>
          <h1>
            Manage Users Page, allows a manager to ban or unban users sorted by
            recent orders
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
