import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useGetMenu from "../../services/customer/useGetMenu";
import { Product } from "../../types";
import Card from "@mui/material/Card"

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

{
  /*0 indicates required element has not been selected*/
}

export default function MenuPage() {

  const [selectedToppings, setselectedToppings] = useState(["","",""]);
  const [selectedFlavors, setselectedFlavors] = useState(["","",""]);
  const [selectedCone, setselectedCone] = useState("");

  {/*Populate topping options*/}
  const renderedToppingsList = toppingsList.map((item) => {
    return (
     
      <Button sx={optionButtonStyle} key={item}
     
      onClick={() => {
        const newToppings = [...selectedToppings];
        const buttonElement = document.getElementById("button0");
        for (let i = 0; i < newToppings.length; i++) {
          if(newToppings[i] == ""){
            newToppings[i] = item;
            setselectedToppings(newToppings);
            console.log(newToppings[i]);
            break;
          }
        }
      }}>
        {item}
        </Button>
    );
  });

      {/*Populate flavor options*/}
      const renderedFlavorList = flavorList.map((item) => {
        return (
          <Button sx={optionButtonStyle} key={item}
         
          onClick={() => {
            const newScoops = [...selectedFlavors];
            const buttonElement = document.getElementById("button0");
            for (let i = 0; i < newScoops.length; i++) {
              if(newScoops[i] == ""){
                newScoops[i] = item;
                setselectedFlavors(newScoops);
                console.log(newScoops[i]);
                break;
              }
            }
          }}>
            {item}
            </Button>
        );
      });
    

  {/*Populate cone options*/}
  const renderedConesList = conesList.map((item) => {
    return (
      <Button sx={optionButtonStyle} key={item}
     
      onClick={() => {
        const buttonElement = document.getElementById("button0");
          setselectedCone(item);
          console.log(item);
      }}>
        {item}
        </Button>
    );
  });

  function showSelectedOptions( list:string[]){
 
    let display = "";
    for(let i = 0; i< list.length; i++){
        if(i == 0){
          display = list[i];


        }
        else{display = display + " " + list[i]}
    }


    if(list[0] == "") display = "None";
    return (
      <p className="pixel-font">
        {display}
      </p>
    );
  };

  const dynamicSelectedToppings = showSelectedOptions(selectedToppings);
  const dynamicSelectedFlavors = showSelectedOptions(selectedFlavors)

  const [menu, setMenu] = useState<Product[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchMenu = async () => {
    const menuInfo = await useGetMenu();
    console.log("MENU INFO");
    console.log(menuInfo);
    if (menuInfo instanceof Error) {
      setError(menuInfo);
    } else {
      setMenu(menuInfo);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return error ? (
    <>
      <h1>ERROR</h1>
    </>
  ) : (
    <>
        <div style ={{display: "flex"}}>
{/*LHS Menu Side*/}
    <div>
      {/*TOPPINGS*/}
<     h1 className="header-font">TOPPINGS</h1>
      {renderedToppingsList}


      {/*FLAVORS*/}
      <h1 className="header-font">FLAVOR</h1>
      {renderedFlavorList}


      {/*CONES*/}
      <h1 className="header-font">CONE</h1>
      {renderedConesList}
     


      {/*CART*/}
      <h1 className="header-font">CART</h1>






      <Button
        variant="contained"
        component={Link}
        to="/app/cart"
        sx={optionButtonStyle}
      >
        View Cart
      </Button>
    </div>


{/*RHS View Order*/}
    <div>
      <Card style= {{


        marginLeft :"100px",
        paddingLeft:"100px",
        paddingRight:"100px"
      }}>
      <div className="centerFormat">
        {/*Display selected toppings*/}
        <div style={{display:"flex"}}>
        <h1 style={{margin:"10px"}} className="header-font">My Toppings</h1>
        <Button sx={optionButtonStyle} style={{height:"40px",margin:"10px"}} onClick={() => {
       
        setselectedToppings(["","",""])


        }}>clear</Button>
        </div>
        <div >{dynamicSelectedToppings}</div>


      {/*Display selected scoops*/}
      <div style={{display:"flex"}}>
      <h1 style={{margin:"5px"}} className="header-font">My Scoops</h1>
      <Button sx={optionButtonStyle} style={{height:"40px",margin:"5px"}} onClick={() => {
        setselectedFlavors(["","",""])
        }}>clear</Button>
      </div>
        <div style={{margin:"0px",border:"0px",padding:"0px"}} >{dynamicSelectedFlavors}</div>


        <h1 style={{margin:"10px"}} className="header-font">Selected Cone</h1>
        <p className="pixel-font">{selectedCone}</p>


      {/*This button will post item to cart database and reset everything locally that has been pressed*/}
      <Button variant="contained" sx={optionButtonStyle} onClick={() => {
      if(selectedFlavors[0] != "" && selectedCone != ""){
       


        {/*-----SEND DATA TO CART HERE AND CLEAR OPTIONS--------*/}


        setselectedToppings(["","",""]);
        setselectedFlavors(["","",""]);
        setselectedCone("");
       
      } else {console.log("Invalid Cone");}
     
      }}>
        Add to Cart
      </Button>
      <br></br>
      </div>
      </Card>
    </div>
    </div>
    </>
  );
}