import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <h1>
        Log In, allows users to enter credentials, links to Customer, Employee
        or Manager flow based on the users credentials
      </h1>
      <Button variant="contained" component={Link} to="/app">
        Logged In
      </Button>
      <Button variant="contained" component={Link} to="/app">
        Sign Up
      </Button>
    </>
  );
}
