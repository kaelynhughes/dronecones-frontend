import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Product, UserType } from "../../types";
import { useStore } from "../../store";
import { getPriceString } from "../../services/helperFunctions";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import useGetHistory from "../../services/manager/useGetHistory";
import useGetInventory from "../../services/manager/useGetInventory";

const textStyle = {
  color: "white",
  fontFamily: "pixelfont",
};

export default function ManagerQuickviewPage() {
  const user = useStore((state) => state.user);
  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products)
  const theme = useTheme();
  let earnings = 0;
  let notifyQuantityValue = 20;
  let lowStockItems: Product[] = [];
  let currentProducts: Product[] = [];

  {/*Loads dummy data*/}
  const { loadHistory } = useStore();
  if (orders.length === 0) {
    loadHistory(useGetHistory());
  }
  const { loadProducts } = useStore();
  if(loadProducts.length === 0){
    console.log("Dummy products loaded");
    loadProducts(useGetInventory());
  }


  orders.forEach((order) => (earnings += order.totalPrice));
  products.forEach((product) => (currentProducts.push(product)));
  console.log()
  for (let i = 0; i < currentProducts.length; i++) {

    if (typeof currentProducts[i].stock !== "undefined") {
      if(currentProducts[i].stock){
        currentProducts[i].stock = currentProducts[i].stock;
        let stock:number | undefined = currentProducts[i].stock;
        if(stock){
          if(stock <= notifyQuantityValue){
            lowStockItems.push(currentProducts[i]);
          }
        }
      }
    }
  }
  console.log(lowStockItems)


  return (
    <>
      {user.userType === UserType.MANAGER && (
        <>
            {/*Manager Quickview Page, displays and overview of manager information
            and status.*/
            }
<Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "center",
            gap: 2,
            padding: 3,
            backgroundColor: `${theme.palette.background.paper}`,
          }}
        >
              <Typography
                sx={textStyle}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Welcome back, {user.username}!
              </Typography>
              <Typography
                sx={textStyle}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Your location has made {getPriceString(earnings)}!
              </Typography>

              <Typography
                sx={textStyle}
                variant="h4"
                component="h2"
                gutterBottom
              >
                Your location has {products.length} items available!
              </Typography>

        </Box>



            {/*Nav buttons*/} 
          <Button
            variant="contained"
            component={Link}
            to="/app/manage-inventory"
          >
            Manage Inventory
          </Button>
          <Button variant="contained" component={Link} to="/app/manage-users">
            Manage Users
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/app/manager-history"
          >
            Manager History
          </Button>
        </>
      )}
    </>
  );
}
