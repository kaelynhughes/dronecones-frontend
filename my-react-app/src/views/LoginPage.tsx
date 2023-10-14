import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserType } from "../data-objects/User";

export default function LoginPage() {
  return (
    <>
      <h1>
        Log In, allows users to enter credentials, links to Customer, Employee
        or Manager flow based on the users credentials
      </h1>
      <Button
        variant="contained"
        component={Link}
        to="/app/menu"
        state={{
          user: {
            username: "TestConeKitten",
            userType: UserType.CUSTOMER,
            isActive: true,
            id: 0,
          },
        }}
      >
        Logged In (Customer)
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="/app/drone-quickview"
        state={{
          user: {
            username: "TestDroneDaddy",
            userType: UserType.EMPLOYEE,
            isActive: true,
            id: 1,
          },
        }}
      >
        Logged In (Employee)
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="/app/manager-quickview"
        state={{
          user: {
            username: "TestManagerMommy",
            userType: UserType.MANAGER,
            isActive: true,
            id: 2,
          },
        }}
      >
        Logged In (Manager)
      </Button>
      <Button variant="contained" component={Link} to="/app">
        Sign Up
      </Button>
    </>
  );
}
