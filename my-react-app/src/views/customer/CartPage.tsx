import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Order, ProductType } from "../../types";

export default function CartPage() {
  const { checkoutOrder } = useStore();

  const handleTest = () => {
    const order: Order = {
      total_price: 500,
      employee_cut: 100,
      profit: 400,
      order_time: "doesn't matter",
      cones: [
        {
          products: [
            { display_name: "Waffle", product_type: ProductType.CONE, id: 1 },
            {
              display_name: "Vanilla",
              product_type: ProductType.ICECREAM,
              id: 8,
            },
            { display_name: "M&Ms", product_type: ProductType.TOPPING, id: 4 },
          ],
        },
        {
          products: [
            { display_name: "Cake", product_type: ProductType.CONE, id: 1 },
            { display_name: "Mint", product_type: ProductType.ICECREAM, id: 8 },
            { display_name: "Oreos", product_type: ProductType.TOPPING, id: 5 },
          ],
        },
        {
          products: [
            { display_name: "Cake", product_type: ProductType.CONE, id: 1 },
            { display_name: "Mint", product_type: ProductType.ICECREAM, id: 8 },
            { display_name: "Oreos", product_type: ProductType.TOPPING, id: 5 },
          ],
        },
      ],
    };
    checkoutOrder(order);
  };

  return (
    <>
      <h1>
        Cart Page, displays items in cart and allows user to complete
        transaction
      </h1>
      <Button variant="contained" onClick={handleTest}>
        Checkout Test Order
      </Button>
    </>
  );
}
