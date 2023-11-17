import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Product, UserType } from "../../types";
import { useStore } from "../../store";
import { getPriceString } from "../../services/helperFunctions";
import { Box, Grid, Card, Typography, useTheme } from "@mui/material";
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
  let notifyQuantityValue = 30;
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
      } else {

        lowStockItems.push(currentProducts[i]);
      }
    }
  }
  let stockTitle = "Low Stock Items!"
  if(lowStockItems.length === 0){
    stockTitle = "No items need restocking!"
  }
  const renderedLowStockItems = lowStockItems.map((item) => {
    let urgencyColor = "white";
    if(item.stock){
      if(item.stock <= 5){
        urgencyColor = "red";
      } else if(item.stock <= 10){
        urgencyColor = "yellow";
      }
    } else urgencyColor = "red";
    return (
      <p style={{color:urgencyColor}}
        key={item.id}
      >
        {item.name} - {item.stock}
      </p>
    );
  });


  

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
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card sx={textStyle}><div className="centerFormat">Flavor</div></Card>
                </Grid>
                <Grid item xs={4}>
                <Card sx={textStyle}><div className="centerFormat">Topping</div></Card>
                </Grid>
                <Grid item xs={4}>
                <Card sx={textStyle}><div className="centerFormat">Cone</div></Card>
                </Grid>
                <Grid item xs={12}>
                <Card sx={textStyle}><div className="centerFormat">{stockTitle}{renderedLowStockItems}</div></Card>
                </Grid>
              </Grid>

            

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
