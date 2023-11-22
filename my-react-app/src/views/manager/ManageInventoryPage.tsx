import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Product, UserType, ProductType } from "../../types";
import { useStore } from "../../store";
import {
  Radio,
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
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

  let productID = -1;
  const { editProduct } = useStore();
  const { removeProduct } = useStore();
  const { addProduct } = useStore();
  const { loadProducts } = useStore();
  const { loadedProducts } = useStore();

  let [newProductName, setNewProductName] = useState("");
  let [newProductQuantity, setNewProductQuantity] = useState(0);
  let [newProductPrice, setNewProductPrice] = useState(0);
  let [newProductType, setNewProductType] = useState<ProductType>(
    ProductType.ICECREAM
  );

  let errorState = false;

  const toppingsList = useStore((state) =>
    state.products.filter(
      (product) => product.product_type === ProductType.TOPPING
    )
  );
  const flavorList = useStore((state) =>
    state.products.filter(
      (product) => product.product_type === ProductType.ICECREAM
    )
  );
  const conesList = useStore((state) =>
    state.products.filter(
      (product) => product.product_type === ProductType.CONE
    )
  );

  const products = useStore((state) => state.products);

  const [quantity, setQuantity] = useState(0);

  if (products.length === 0 && !loadedProducts) {
    loadProducts();
  }

  {
    /*Populate topping options*/
  }
  const renderedToppingsList = toppingsList.map((item) => {
    let localQuantity = 0;
    return (
      <Card key={item.id}>
        <div style={{ display: "flex" }}>
          <p className="pixel-font">
            {item.display_name} - {item.stock} Units
          </p>

          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => {
              if (item.id) {
                removeProduct(item.id);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          <TextField
            size="small"
            variant="standard"
            label="Quantity"
            type="number"
            defaultValue="0"
            inputProps={{
              min: "-100",
              max: "100",
              step: "10",
              error: errorState.toString(),
              helpertext: "Invalid.",
            }}
            onChange={(event) => {
              if (
                parseInt(event.target.value) <= 100 &&
                parseInt(event.target.value) >= -100
              ) {
                localQuantity = parseInt(event.target.value);
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
                const updateItem = { ...item };

                if (updateItem.stock) {
                  updateItem.stock = updateItem.stock + localQuantity;
                  if (updateItem.stock < 0) {
                    updateItem.stock = 0;
                  }
                } else {
                  updateItem.stock = localQuantity;
                  if (localQuantity < 0) {
                    updateItem.stock = 0;
                  }
                }

                editProduct(item.id, updateItem);
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
    let localQuantity = 0;
    return (
      <Card key={item.id}>
        <div style={{ display: "flex" }}>
          <p className="pixel-font">
            {item.display_name} - {item.stock} Units
          </p>

          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => {
              if (item.id) {
                removeProduct(item.id);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          <TextField
            size="small"
            variant="standard"
            label="Quantity"
            type="number"
            defaultValue="0"
            inputProps={{
              min: "-100",
              max: "100",
              step: "10",
              error: errorState.toString(),
              helpertext: "Invalid.",
            }}
            onChange={(event) => {
              if (
                parseInt(event.target.value) <= 100 &&
                parseInt(event.target.value) >= -100
              ) {
                localQuantity = parseInt(event.target.value);
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
                const updateItem = { ...item };

                if (updateItem.stock) {
                  updateItem.stock = updateItem.stock + localQuantity;
                  if (updateItem.stock < 0) {
                    updateItem.stock = 0;
                  }
                } else {
                  updateItem.stock = localQuantity;
                  if (localQuantity < 0) {
                    updateItem.stock = 0;
                  }
                }

                editProduct(item.id, updateItem);
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
    let localQuantity = 0;
    return (
      <Card key={item.id}>
        <div style={{ display: "flex" }}>
          <p className="pixel-font">
            {item.display_name} - {item.stock} Units
          </p>

          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => {
              if (item.id) {
                removeProduct(item.id);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          <TextField
            size="small"
            variant="standard"
            label="Quantity"
            type="number"
            defaultValue="0"
            inputProps={{
              min: "-100",
              max: "100",
              step: "10",
              error: errorState.toString(),
              helpertext: "Invalid.",
            }}
            onChange={(event) => {
              if (
                parseInt(event.target.value) <= 100 &&
                parseInt(event.target.value) >= -100
              ) {
                localQuantity = parseInt(event.target.value);
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
                const updateItem = { ...item };

                if (updateItem.stock) {
                  updateItem.stock = updateItem.stock + localQuantity;
                  if (updateItem.stock < 0) {
                    updateItem.stock = 0;
                  }
                } else {
                  updateItem.stock = localQuantity;
                  if (localQuantity < 0) {
                    updateItem.stock = 0;
                  }
                }
                editProduct(item.id, updateItem);
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
      {user.user_type === UserType.MANAGER && (
        <>
          {/*
          Manage Inventory Page, displays remaining stock and inventory cost,
            allows user to bulk restock items, add new items, and change prices
          */}

          <div style={{ display: "flex" }}>
            {/* LHS Display and edit items */}
            <div>
              <h1 className="header-font">Ice Cream</h1>

              {renderedFlavorList}
              <h1 className="header-font">Toppings</h1>
              {renderedToppingsList}
              <h1 className="header-font">Cones</h1>
              {renderedConesList}
            </div>

            {/* Add items */}
            <div>
              <Card
                style={{
                  marginLeft: "100px",
                  paddingLeft: "100px",
                  paddingRight: "100px",
                }}
              >
                <div className="centerFormat">
                  <h1 style={{ margin: "10px" }} className="header-font">
                    Add Product
                  </h1>
                  {/* Product name */}
                  <TextField
                    required
                    id="Outlined-required"
                    label="Product Name"
                    value={newProductName}
                    sx={{ margin: "10px", fontFamily: "pixelfont" }}
                    onChange={(event) => {
                      setNewProductName(event.target.value);
                    }}
                  />
                  {/* Quantity */}
                  <TextField
                    id="Outlined-required"
                    label="Quantity"
                    type="number"
                    value={newProductQuantity}
                    inputProps={{
                      min: "0",
                      max: "100",
                      step: "10",
                      error: errorState.toString(),
                      helpertext: "Invalid.",
                    }}
                    onChange={(event) => {
                      setNewProductQuantity(parseInt(event.target.value));
                    }}
                    sx={{ margin: "10px", fontFamily: "pixelfont" }}
                  />
                  {/* Price */}
                  <TextField
                    id="Outlined-required"
                    label="Pricing"
                    type="number"
                    value={newProductPrice}
                    inputProps={{
                      min: "0",
                      max: "100",
                      step: ".5",
                      error: errorState.toString(),
                      helpertext: "Invalid.",
                    }}
                    onChange={(event) => {
                      setNewProductPrice(parseFloat(event.target.value));
                    }}
                    sx={{ margin: "10px", fontFamily: "pixelfont" }}
                  />
                  {/* Product Type Radio Buttons */}
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Type
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={newProductType}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="flavor"
                        control={<Radio />}
                        label="Flavor"
                        onChange={(event) => {
                          setNewProductType(ProductType.ICECREAM);
                        }}
                      />
                      <FormControlLabel
                        value="topping"
                        control={<Radio />}
                        label="Topping"
                        onChange={(event) => {
                          setNewProductType(ProductType.TOPPING);
                        }}
                      />
                      <FormControlLabel
                        value="cone"
                        control={<Radio />}
                        label="Cone"
                        onChange={(event) => {
                          setNewProductType(ProductType.CONE);
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    onClick={(event) => {
                      if (newProductName != "" && newProductPrice != 0) {
                        addProduct({
                          display_name: newProductName,
                          stock: newProductQuantity,
                          price_per_unit: newProductPrice,
                          product_type: newProductType,
                        });
                        setNewProductName("");
                        setNewProductPrice(0);
                        setNewProductQuantity(0);
                        console.log("Item Added!");
                      } else {
                        console.log("Missing Field...");
                      }
                    }}
                  >
                    Add Item
                  </Button>
                  <br></br>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
