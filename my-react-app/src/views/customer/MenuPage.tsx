import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function MenuPage() {
  return (
    <>
      <h1>
        Menu Page, displays cone order options and lets user add cones to their
        cart
      </h1>
      <Button variant="contained" component={Link} to="/app/cart">
        View Cart
      </Button>
    </>
  );
}
