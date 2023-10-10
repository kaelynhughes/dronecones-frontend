import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <>
      <h1></h1>
      <Button variant="contained" component={Link} to="/"></Button>
    </>
  );
}
