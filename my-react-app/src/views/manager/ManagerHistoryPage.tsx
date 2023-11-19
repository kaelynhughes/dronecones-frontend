import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order, UserType } from "../../types";
import { useStore } from "../../store";

export default function ManagerHistoryPage() {
  const user = useStore((state) => state.user);
  return (
    <>
      {user.user_type === UserType.MANAGER && (
        <>
          <h1>
            Manager History Page, allows the manager to view all recent orders
            and their details
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
