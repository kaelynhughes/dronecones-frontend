import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const optionButtonStyle = {
  backgroundColor: "DarkViolet",
  fontFamily: "pixelfont",
  textShadow: "0 0 10px rgba(0, 153, 255, 0.7)",
  color: "#ffff",
};

{
  /*These constant variables should be instaciated from the database, for now these will be filled up based from defaults that I will set*/
}

const toppingsList = ["Fudge", "M&Ms", "Oreos"];
const flavorList = ["Strawberry","Vanilla","Chocolate"];
const conesList = ["Cake","Sugar","Waffle"];

const renderedToppingsList = toppingsList.map((item) => {
  return (
    <Button sx={optionButtonStyle} key={item}
    
    onClick={() => {
      const buttonElement = document.getElementById("button0");
      for (let i = 0; i < toppings.length; i++) {
        if(toppings[i] == ""){
          toppings[i] = item;
          console.log(toppings[i]);
          break;
        }
      }
    }}>
      {item}
      </Button>
  );
});

const renderedFlavorList = flavorList.map((item) => {
  return (
    <Button sx={optionButtonStyle} key={item}
    
    onClick={() => {
      const buttonElement = document.getElementById("button0");
      for (let i = 0; i < scoops.length; i++) {
        if(scoops[i] == ""){
          scoops[i] = item;
          console.log(scoops[i]);
          break;
        }
      }
    }}>
      {item}
      </Button>
  );
});

const renderedConesList = conesList.map((item) => {
  return (
    <Button sx={optionButtonStyle} key={item}
    
    onClick={() => {
      const buttonElement = document.getElementById("button0");
        cone = item;
        console.log(item);
    }}>
      {item}
      </Button>
  );
});


{
  /*0 indicates required element has not been selected*/
}
let toppings = ["", "", ""];
let scoops = ["", "", ""];
let cone = "";

{
  /*Resets temporary variables when building a cone*/
}
function resetOptions() {
  toppings = ["", "", ""];
  scoops = ["", "", ""];
  cone = "";
}

export default function MenuPage() {
  return (
    <>
      {/*TOPPINGS*/}
      <h1 className="header-font">TOPPINGS</h1>
      {renderedToppingsList}

      {/*FLAVORS*/}
      <h1 className="header-font">FLAVOR</h1>
      {renderedFlavorList}

      {/*CONES*/}
      <h1 className="header-font">CONE</h1>
      {renderedConesList}
      

      {/*CART*/}
      <h1 className="header-font">CART</h1>

      {/*This button will post item to cart database and reset everything locally that has been pressed*/}
      <Button variant="contained" sx={optionButtonStyle}>
        Add to Cart
      </Button>

      <Button
        variant="contained"
        component={Link}
        to="/app/cart"
        sx={optionButtonStyle}
      >
        View Cart
      </Button>
    </>
  );
}
