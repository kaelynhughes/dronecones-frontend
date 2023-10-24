import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../types";
import { useStore } from "../store";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const { changeMode } = useStore();

  return (
    <>
      <h1>
        Log In, allows users to enter credentials, links to Customer, Employee
        or Manager flow based on the users credentials
      </h1>
      <Button
        variant="contained"
        onClick={() => {
          login({
            username: "TestConeKitten",
            userType: UserType.CUSTOMER,
            isActive: true,
            id: 0,
          });
          changeMode(UserType.CUSTOMER);
          navigate("/app/menu");
        }}
      >
        Logged In (Customer)
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          login({
            username: "TestDroneDaddy",
            userType: UserType.EMPLOYEE,
            isActive: true,
            id: 1,
          });
          changeMode(UserType.EMPLOYEE);
          navigate("/app/drone-quickview");
        }}
      >
        Logged In (Employee)
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          login({
            username: "TestManagerMommy",
            userType: UserType.MANAGER,
            isActive: true,
            id: 2,
          });
          changeMode(UserType.MANAGER);
          navigate("/app/manager-quickview");
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
