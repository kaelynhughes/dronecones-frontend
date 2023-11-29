import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { Order, ProductType } from "../../types";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Divider,
  IconButton,
} from "@mui/material";
import {
  getCartString,
  getConePrice,
  getPriceString,
} from "../../services/helperFunctions";

const textStyle = {
  color: "white",
  fontFamily: "pixelfont",
};

export default function CartPage() {
  const { checkoutOrder, cart, completedOrder, clearCart, removeConeFromCart } =
    useStore();
  const navigate = useNavigate();
  const { changePath } = useStore();

  const handleCheckout = () => {
    let total_price = 0;
    cart.forEach((cone) => (total_price += getConePrice(cone)));
    let employee_cut = Math.trunc(total_price / 10);
    let profit = total_price - employee_cut;
    checkoutOrder({
      total_price: total_price,
      employee_cut: employee_cut,
      profit: profit,
      cones: cart,
    });
  };

  if (completedOrder) {
    changePath("app/confirmation");
    navigate(`/app/confirmation`);
  }

  return (
    <Container>
      <Card sx={{ width: "75%", margin: "auto" }}>
        <CardContent sx={{ justifyContent: "start" }}>
          <div className="centerFormat">
            <h1
              style={{ margin: "5px", justifySelf: "center" }}
              className="header-font"
            >
              Cart
            </h1>
          </div>
          {cart?.length === 0 && (
            <h1
              style={{ margin: "5px", justifySelf: "center" }}
              className="pixel-font"
            >
              No Cones have been sent to the cart yet, please visit the Menu
              Page!
            </h1>
          )}
          {cart.map((cone, index) => (
            <>
              <div key={index} style={{ ...textStyle, whiteSpace: "pre-line" }}>
                {"\n"}
              </div>
              <Divider></Divider>
              <div style={{ ...textStyle, whiteSpace: "pre-line" }}>
                {"\n" + getCartString(cone) + "\n"}{" "}
                {getPriceString(getConePrice(cone))}{" "}
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    removeConeFromCart(cone);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </>
          ))}
          <Divider></Divider>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="large"
            color="primary"
            variant="outlined"
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
