import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
          inputProps={{
            min: "0",
            max: "100",
            step: "1",
            error: errorState,
            helperText: "Invalid.",
          }}
          value={quantity}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 100 &&
              parseInt(event.target.value) >= 0
            ) {
              setQuantity(parseInt(event.target.value));
              errorState = false;
            } else {
              setQuantity(0);
              errorState = true;
            }
          }}
        />      


        </div>
      </Card>
    );
  });

  {
    /*Populate flavor options*/
  }
  const renderedFlavorList = flavorList.map((item) => {
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
          inputProps={{
            min: "0",
            max: "100",
            step: "1",
            error: errorState,
            helperText: "Invalid.",
          }}
          value={quantity}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 100 &&
              parseInt(event.target.value) >= 0
            ) {
              setQuantity(parseInt(event.target.value));
              errorState = false;
            } else {
              setQuantity(0);
              errorState = true;
            }
          }}
        />      
        </div>
      </Card>

    );
  });

  {
    /*Populate cone options*/
  }
  const renderedConesList = conesList.map((item) => {
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
          inputProps={{
            min: "0",
            max: "100",
            step: "1",
            error: errorState,
            helperText: "Invalid.",
          }}
          value={quantity}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 100 &&
              parseInt(event.target.value) >= 0
            ) {
              setQuantity(parseInt(event.target.value));
              errorState = false;
            } else {
              setQuantity(0);
              errorState = true;
            }
          }}
        />         
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
