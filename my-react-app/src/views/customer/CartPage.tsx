import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <>
      <h1>
        Cart Page, displays items in cart and allows user to complete
        transaction
      </h1>
      <Button variant="contained" component={Link} to="/app/confirmation">
        Checkout
      </Button>
    </>
  );
}
