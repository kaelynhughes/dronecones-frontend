import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function TestPage1() {
  return (
    <>
      <h1>This is the second test page, Test Page 1.</h1>
      <h2>
        This has been a test of our routing. With these features, view
        navigation will be simple and fun.
      </h2>
      <Button variant="text" component={Link} to="/">
        Take Me Back To Page 0
      </Button>
    </>
  );
}
