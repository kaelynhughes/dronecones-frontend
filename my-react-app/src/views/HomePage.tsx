import React from "react";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";



export default function HomePage() {
  return (
    <>
      {/*Logo*/}

      <div className="centerFormat">
        <h1 className= "logo-fontFirst" style= {{
            padding: "1px",
            border: "1px",
            margin: "0px",
        }}>DRONE</h1>
        <h1 className= "logo-fontSecond" style= {{
            padding: "1px",
            border: "1px",
            margin: "0px",
        }}>CONES</h1>

<br></br>

{/* sign in*/}
      <h1 className="header-font">

        Welcome to the future!!
      </h1>


      <Button style={{
          backgroundColor: "purple",
          fontFamily:"pixelfont"

        }} variant="contained" component={Link} to="/login">
        Log In!
      </Button>


{/*Sign up*/}
      <p className="header-font">
        New to Drone Cones? Sign up here!
        </p>

      <Button style={{
          backgroundColor: "purple",
          fontFamily:"pixelfont"
          
        }}  variant="contained" component={Link} to="/signup">
        Sign Up
      </Button>
      </div>

{/*Introduction*/}

<h1 className="header-font">Who are we?</h1>

<p className = "pixel-font">We are Drone Cones! We're taking the joy of ice cream to new heights - quite literally! 
  We are a small, innovative startup company dedicated to revolutionizing your ice cream cravings 
  with our cutting-edge ice cream delivery service via drones. Gone are the days of impatiently waiting 
  for your favorite frozen treats. With Drone Cones, we bring the ice cream parlor straight to your doorstep, 
  soaring through the skies for a uniquely delightful delivery experience.</p>

  <h1 className="header-font">Our Mission</h1>
<h1 className = "pixel-font">Our mission is simple: to make every moment sweeter. Whether you're celebrating a special occasion, 
  indulging in a late-night craving, or simply treating yourself, Drone Cones is here to elevate your 
  ice cream experience. Our drones are not only fast and efficient but also eco-friendly, ensuring your 
  treats arrive with a minimal carbon footprint.</h1>






      <div>


      </div>
      

      <h1>Home Page, displays company info and links to Login and Signup</h1>
      <Button variant="contained" component={Link} to="/login">
        Log In
      </Button>
      <br></br>
      <Button variant="contained" component={Link} to="/signup">
        Sign Up
      </Button>
    </>
  );
}
