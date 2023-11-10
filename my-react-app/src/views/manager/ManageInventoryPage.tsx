import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Product, UserType,ProductType } from "../../types";
import { useStore } from "../../store";
import useGetInventory from "../../services/manager/useGetInventory";
import {
  TextField,
  Box,
  Card,
  AppBar,
  Toolbar,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  IconButton,
  useTheme,
  Tooltip,
  Hidden,
} from "@mui/material";

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};


export default function ManageInventoryPage() {
  const user = useStore((state) => state.user);

  const { editProduct } = useStore();
  const { removeProduct } = useStore();
  

  const [inventory, setInventory] = useState<Product[] | null>();

  const fetchInventory = async () => {
    const fetchedInventory = await useGetInventory();
    setInventory(fetchedInventory);
  };
  let errorState = false;

  const toppingsList = useStore((state) =>
  state.products.filter((product) => product.type === ProductType.TOPPING)
);
const flavorList = useStore((state) =>
  state.products.filter((product) => product.type === ProductType.ICECREAM)
);
const conesList = useStore((state) =>
  state.products.filter((product) => product.type === ProductType.CONE)
);

const products = useStore((state) => state.products);
const { loadProducts } = useStore();

const [quantity, setQuantity] = useState(0);

if (products.length === 0) {
  loadProducts(useGetInventory());
}
  

  useEffect(() => {
    fetchInventory;
  }, []);




  {
    /*Populate topping options*/
  }
  const renderedToppingsList = toppingsList.map((item) => {
    let localQuanitity = 69;
    return (
      <Card key={item.id}>
        <div style={{ display: "flex" }} >
      <p className="pixel-font">{item.name} - {item.stock} Units</p>

      <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => {
                    if (item.id) {
                      removeProduct(item);
                    }
          }}  
      >
      <DeleteIcon />
      </IconButton>
      <TextField size="small" variant="standard"
          
          label="Quantity"
          type="number"
          defaultValue="0"
          inputProps={{
            min: "-100",
            max: "100",
            step: "10",
            error: errorState,
            helperText: "Invalid.",
          }}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 100 &&
              parseInt(event.target.value) >= 0
            ) {
              localQuanitity = parseInt(event.target.value);
              console.log(localQuanitity);
              errorState = false;
            } else {
              setQuantity(0);
              errorState = true;
            }
          }}
        />      

        <IconButton
          aria-label="add"
          color="secondary"
          onClick={() => {
                    if (item.id) {
                      const updateItem = {...item};
                      
                      if(updateItem.stock){
                        updateItem.stock = updateItem.stock  +  localQuanitity;
                        console.log(updateItem.stock);
                        if(updateItem.stock < 0){
                          updateItem.stock = 0;
                        }
                        
                      } else{
                        updateItem.stock = localQuanitity;
                        if(localQuanitity < 0){
                          updateItem.stock = 0
                        }
                      }
                      
                      editProduct(item.id,updateItem);
                      console.log("YAY");
                    }
          }}  
      >
      <AddIcon />
      </IconButton>    
        </div>
      </Card>
    );
  });

  {
    /*Populate flavor options*/
  }
  const renderedFlavorList = flavorList.map((item) => {
    let localQuanitity = 0;
    return (
      <Card key={item.id}>
        <div style={{ display: "flex" }} >
      <p className="pixel-font">{item.name} - {item.stock} Units</p>

      <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => {
                    if (item.id) {
                      removeProduct(item);
                    }
          }}  
      >
      <DeleteIcon />
      </IconButton>
      <TextField size="small" variant="standard"
          
          label="Quantity"
          type="number"
          defaultValue="0"
          inputProps={{
            min: "-100",
            max: "100",
            step: "10",
            error: errorState,
            helperText: "Invalid.",
          }}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 100 &&
              parseInt(event.target.value) >= -100
            ) {
              localQuanitity = parseInt(event.target.value);
              console.log(localQuanitity);
              errorState = false;
            } else {
              errorState = true;
            }
          }}
        />  

      <IconButton
          aria-label="add"
          color="secondary"
          onClick={() => {
                    if (item.id) {
                      const updateItem = {...item};
                      
                      if(updateItem.stock){
                        updateItem.stock = updateItem.stock  +  localQuanitity;
                        console.log(updateItem.stock);
                        if(updateItem.stock < 0){
                          updateItem.stock = 0;
                        }
                        
                      } else{
                        updateItem.stock = localQuanitity;
                        if(localQuanitity < 0){
                          updateItem.stock = 0
                        }
                      }
                      
                      editProduct(item.id,updateItem);
                      console.log("YAY");
                    }
          }}  
      >
      <AddIcon />
      </IconButton>    
        </div>
      </Card>

    );
  });

  {
    /*Populate cone options*/
  }
  const renderedConesList = conesList.map((item) => {
    let localQuanitity = 0;
    return (
      <Card key={item.id}>
        <div style={{ display: "flex" }} >
      <p className="pixel-font">{item.name} - {item.stock} Units</p>

      <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => {
                    if (item.id) {
                      removeProduct(item);
                    }
          }}  
      >
      <DeleteIcon />
      </IconButton>
      <TextField size="small" variant="standard"
          
          label="Quantity"
          type="number"
          defaultValue="0"
          inputProps={{
            min: "-100",
            max: "100",
            step: "10",
            error: errorState,
            helperText: "Invalid.",
          }}
          //value={defaultValue}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 100 &&
              parseInt(event.target.value) >= 0
            ) {
              localQuanitity = parseInt(event.target.value);
              console.log(localQuanitity);
              errorState = false;
            } else {
              setQuantity(0);
              errorState = true;
            }
          }}
        />  

              <IconButton
          aria-label="add"
          color="secondary"
          onClick={() => {
                    if (item.id) {
                      const updateItem = {...item};
                      
                      if(updateItem.stock){
                        updateItem.stock = updateItem.stock  +  localQuanitity;
                        console.log(updateItem.stock);
                        if(updateItem.stock < 0){
                          updateItem.stock = 0;
                        }
                        
                      } else{
                        updateItem.stock = localQuanitity;
                        if(localQuanitity < 0){
                          updateItem.stock = 0
                        }
                      }
                      
                      editProduct(item.id,updateItem);
                      console.log("YAY");
                    }
          }}  
      >
      <AddIcon />
      </IconButton>        
        </div>
      </Card>
    );
  });
  const [error, setError] = useState<Error | null>(null);

  return error ? (
    <>
      <h1>ERROR</h1>
    </>
  ) : (
    <>
      {user.userType === UserType.MANAGER && (
        <>
          {/*
          Manage Inventory Page, displays remaining stock and inventory cost,
            allows user to bulk restock items, add new items, and change prices
          */}
            
          <div style={{ display: "flex" }}>
          <h1 className="header-font">Ice Cream</h1>
          <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => {
                    products
          }}  
      >
      <DeleteIcon />
      </IconButton>
          </div>
          
          {renderedFlavorList}
          <h1 className="header-font">Toppings</h1>
          {renderedToppingsList}
          <h1 className="header-font">Cones</h1>
          {renderedConesList}
          
          <Button
            variant="contained"
            component={Link}
            to="/app/manager-quickview"
          >
            Back to Quickview
          </Button>
        </>
      )}
    </>
  );
}
