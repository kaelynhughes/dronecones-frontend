import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function TestPage0() {
  return (
    <>
      <h1>This is the first test page, Test Page 0.</h1>
      <Button variant="outlined" component={Link} to="/test1">
        Next Page
      </Button>
    </>
  );
}
