import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { ProductType, UserType } from "../types";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useStore();
  const { user } = useStore();
  const { error } = useStore();
  const { changeMode } = useStore();
  const { changePath } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState(UserType.CUSTOMER);

  function signUp() {
    signup(username, password, usertype);
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
  }

  return (
    <>
      <div className="centerFormat">
        <div className="login">
          <div className="centerFormat">
            <h1 className="header-font">Sign Up</h1>
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
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Account Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                value={usertype}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={UserType.CUSTOMER}
                  control={<Radio />}
                  label="Customer"
                  onChange={() => {
                    setUsertype(UserType.CUSTOMER);
                  }}
                />
                <FormControlLabel
                  value={UserType.EMPLOYEE}
                  control={<Radio />}
                  label="Employee"
                  onChange={() => {
                    setUsertype(UserType.EMPLOYEE);
                  }}
                />
                <FormControlLabel
                  value={UserType.MANAGER}
                  control={<Radio />}
                  label="Manager - Remove this one before production!"
                  onChange={() => {
                    setUsertype(UserType.MANAGER);
                  }}
                />
              </RadioGroup>
            </FormControl>
            <br></br>
            <div className="signup-controls">
              <Button
                style={{
                  backgroundColor: "purple",
                  fontFamily: "pixelfont",
                  textShadow: "0 0 5px",
                  boxShadow: "0 0 10px",
                }}
                variant="contained"
                id="fullbutton"
                className=""
                onClick={signUp}
              >
                Create Account
              </Button>
            </div>
            {error != "" && <h3>{error}</h3>}
          </div>
        </div>
      </div>
    </>
  );
}
