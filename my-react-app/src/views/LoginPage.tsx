import React, { useState } from "react";
import Button from "@mui/material/Button";

import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../types";
import { useStore } from "../store";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const { changeMode } = useStore();
  const { changePath } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function logIn() {
    //TODO remove console
    console.log(
      "The password and username are now in the variables and a request is ready to be sent to the api"
    );
    //TODO some logic to detect user via api that uses case statement to push to correct page
    navigate("/app/drone-quickview");
  }

  return (
    <>
      <div className="dialogue-container">
        <div className="login">
          <div>Login</div>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="login-controls">
            <Button
              variant="contained"
              id="fullbutton"
              className="loginbutton button"
              onClick={logIn}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>

      <h1>
        Log In, allows users to enter credentials, links to Customer, Employee
        or Manager flow based on the users credentials
      </h1>
      <Button
        variant="contained"
        onClick={() => {
          login({
            username: "TestConer",
            userType: UserType.CUSTOMER,
            isActive: true,
            id: 0,
          });
          changeMode(UserType.CUSTOMER);
          changePath("app/menu");
          navigate("/app/menu");
        }}
      >
        Logged In (Customer)
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          login({
            username: "TestDroner",
            userType: UserType.EMPLOYEE,
            isActive: true,
            id: 1,
          });
          changeMode(UserType.EMPLOYEE);
          changePath("app/drone-quickview");
          navigate("/app/drone-quickview");
        }}
      >
        Logged In (Employee)
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          login({
            username: "TestOwner",
            userType: UserType.MANAGER,
            isActive: true,
            id: 2,
          });
          changeMode(UserType.MANAGER);
          changePath("app/manager-quickview");
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
