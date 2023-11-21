import React, { useState } from "react";
import Button from "@mui/material/Button";

import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../types";
import { useStore } from "../store";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const { user } = useStore();
  const { error } = useStore();
  const { changeMode } = useStore();
  const { changePath } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user?.id) {
    if (user.user_type == UserType.CUSTOMER) {
      changeMode(UserType.CUSTOMER);
      changePath("app/menu");
      navigate("/app/menu");
    } else if (user.user_type == UserType.EMPLOYEE) {
      changeMode(UserType.EMPLOYEE);
      changePath("app/drone-quickview");
      navigate("/app/drone-quickview");
    } else if (user.user_type == UserType.MANAGER) {
      changeMode(UserType.MANAGER);
      changePath("app/manager-quickview");
      navigate("/app/manager-quickview");
    }
  }

  function logIn() {
    login(username, password);
  }

  return (
    <>
      <div className="centerFormat">
        <div className="dialogue-container">
          <div className="login">
            <div className="centerFormat">
              <h1 className="header-font">Log in</h1>
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
                  style={{ margin: "20px", fontFamily: "pixelfont" }}
                  onClick={logIn}
                >
                  Log in
                </Button>
              </div>
              {error != "" && <h3>{error}</h3>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
