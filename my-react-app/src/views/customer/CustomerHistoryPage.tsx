import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order } from "../../types";
import { useStore } from "../../store";

export default function CustomerHistoryPage() {
  const { loadCustomerHistory, loadedCustomerOrders } = useStore();
  const { orders } = useStore();
  if (!loadedCustomerOrders) {
    loadCustomerHistory();
  }

  return (
    <>
      <h1>Customer History Page, displays info about past orders</h1>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
    </>
  );
}
