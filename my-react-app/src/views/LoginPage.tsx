import React, {useState} from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate} from "react-router-dom";
import { UserType } from "../types";




export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function logIn() {
    //TODO remove console
    console.log("The password and username are now in the variables and a request is ready to be sent to the api");
    //TODO some logic to detect user via api that uses case statement to push to correct page
    navigate("/app/drone-quickview");
  }


  return (
    <>

<div className="dialogue-container">
        <div className="login">
          <div>Login</div>
          <input type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          <div className="login-controls">
            <Button variant="contained" id="fullbutton" className="loginbutton button" onClick={logIn}>Log in</Button>
          </div>
        </div>
      </div>


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
