import React, {useState} from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate} from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
      //TODO remove console
      console.log("The password and username are now in the variables and a request is ready to be sent to the api");

      //TODO some logic to detect user via api that uses case statement to push to correct page
      navigate("/app/drone-quickview");
    }
  
  return (
    
  
  <>
    <div className="dialogue-container">
        <div className="login">
          <div>Sign Up</div>
          <input type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          <div className="signup-controls">
            <Button variant="contained" id="fullbutton" className="signupbutton button" onClick={signUp}>Sign Up</Button>
          </div>
        </div>
      </div>
    
      <h1>
        Sign Up, allows user to sign up as Customers or Employees, links to Log
        In
      </h1>
      <Button variant="contained" component={Link} to="/login">
        Log In
      </Button>
    </>
  );
}
