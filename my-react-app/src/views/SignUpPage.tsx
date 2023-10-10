import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <>
      <h1>
        Sign Up, allows user to sign up as Customers or Employees, links to Log
        In
      </h1>
      <Button variant="contained" component={Link} to="/login">
        Log In
      </Button>
    </>
  );
}
