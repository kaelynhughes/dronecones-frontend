import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order } from "../../types";

export default function CustomerHistoryPage() {
  return (
    <>
      <h1>Customer History Page, displays info about past orders</h1>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
    </>
  );
}
