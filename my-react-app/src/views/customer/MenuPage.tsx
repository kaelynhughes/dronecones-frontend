import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function MenuPage() {
  return (
    <>
      <h1 className="header-font">TOPPINGS</h1>
      <h1 className="header-font">FLAVOR</h1>
      <h1 className="header-font">CONE</h1>
      <Button variant="contained" component={Link} to="/app/cart">
        View Cart
      </Button>
    </>
  );
}
