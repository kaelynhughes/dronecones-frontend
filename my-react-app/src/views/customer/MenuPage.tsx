import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import getMenu from "../../services/getMenu";
import useCatFact from "../../services/useCatFact";
import { Typography, CircularProgress } from "@mui/material";

const optionButtonStyle = {
  backgroundColor: "purple",
  fontFamily: "pixelfont",
  textShadow: "0 0 10px rgba(0, 153, 255, 0.7)",
  color: "#ffff",
};

{
  /*These constant variables should be instaciated from the database, for now these will be filled up based from defaults that I will set*/
}
const toppingOption_1 = "Fudge";
const toppingOption_2 = "M&Ms";
const toppingOption_3 = "Oreos";

const flavor_1 = "Strawberry";
const flavor_2 = "Vanilla";
const flavor_3 = "Chocolate";

const cone_1 = "Cake";
const cone_2 = "Sugar";
const cone_3 = "Waffle";

{
  /*0 indicates required element has not been selected*/
}
let toppings = ["", "", ""];
let flavor = "";
let cone = "";

{
  /*Resets temporary variables when building a cone*/
}
function resetOptions() {
  toppings = ["", "", ""];
  flavor = "";
  cone = "";
}

export default function MenuPage() {
  const [catFact, setCatFact] = useState<String | null>(null);

  const fetchCatFact = async () => {
    const CatFactMaybe = await useCatFact();
    setCatFact(CatFactMaybe);
  };

  useEffect(() => {
    fetchCatFact();
  }, []);
  return (
    <>
      {/*CAT FACT (FOR TESTING)*/}
      <Typography>{catFact ? catFact : <CircularProgress />}</Typography>
      {/*TOPPINGS*/}
      <h1 className="header-font">TOPPINGS</h1>
      {/*ADD/TAKEOFF option 1 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          if (toppings[0] == "") {
            toppings[0] = toppingOption_1;
          } else {
            toppings[0] = "";
          }
          console.log(toppings[0]);
        }}
      >
        {" "}
        {toppingOption_1}{" "}
      </Button>

      {/*ADD/TAKEOFF option 2 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          if (toppings[1] == "") {
            toppings[1] = toppingOption_2;
          } else {
            toppings[1] = "";
          }
          console.log(toppings[1]);
        }}
      >
        {" "}
        {toppingOption_2}{" "}
      </Button>

      {/*ADD/TAKEOFF option 3 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          if (toppings[2] == "") {
            toppings[2] = toppingOption_3;
          } else {
            toppings[2] = "";
          }
          console.log(toppings[2]);
        }}
      >
        {" "}
        {toppingOption_3}{" "}
      </Button>

      {/*FLAVORS*/}
      <h1 className="header-font">FLAVOR</h1>
      {/*ADD/TAKEOFF option 1 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          flavor = flavor_1;
          console.log(flavor);
        }}
      >
        {" "}
        {flavor_1}{" "}
      </Button>
      {/*ADD/TAKEOFF option 2 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          flavor = flavor_2;
          console.log(flavor);
        }}
      >
        {" "}
        {flavor_2}{" "}
      </Button>

      {/*ADD/TAKEOFF option 2 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          flavor = flavor_3;
          console.log(flavor);
        }}
      >
        {" "}
        {flavor_3}{" "}
      </Button>

      {/*CONES*/}
      <h1 className="header-font">CONE</h1>

      {/*ADD/TAKEOFF option 1 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          cone = cone_1;
          console.log(cone);
        }}
      >
        {" "}
        {cone_1}{" "}
      </Button>

      {/*ADD/TAKEOFF option 2 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          cone = cone_2;
          console.log(cone);
        }}
      >
        {" "}
        {cone_2}{" "}
      </Button>

      {/*ADD/TAKEOFF option 3 BUTTON*/}
      <Button
        variant="contained"
        sx={optionButtonStyle}
        onClick={() => {
          cone = cone_3;
          console.log(cone);
        }}
      >
        {" "}
        {cone_3}{" "}
      </Button>

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
