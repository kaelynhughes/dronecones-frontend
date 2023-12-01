import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order, FullCone } from "../../types";
import { useStore } from "../../store";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import { getConeString, getPriceString } from "../../services/helperFunctions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};

export default function CustomerHistoryPage() {
  const { loadCustomerHistory, loadedCustomerOrders, user } = useStore();
  const { orders } = useStore();
  const theme = useTheme();

  if (!loadedCustomerOrders) {
    loadCustomerHistory();
  }

  function turnConeToString(cone: FullCone): String {
    if (cone) {
      if (cone.products) {
        return getConeString(cone);
      }
    }
    return "Something went wrong with this order...";
  }

  let title = "Order History";
  if (orders.length === 0) {
    title = "Your orders will show up here!";
  }
  let renderedOrders = orders?.map((order) => {
    return (
      <Accordion
        sx={{
          width: "1120px",
          "& .MuiTypography-root": wordStyle,
          flexGrow: 1,
        }}
        key={order.id}
      >
        <AccordionSummary
          sx={{
            flexGrow: 1,
            width: "100%",
            fontFamily: "pixelfont",
            color: "white",
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          {order.order_time} - Order Size : {order.cones.length}
        </AccordionSummary>
        <AccordionDetails sx={{ flexGrow: 1, width: "100%" }}>
          {order.cones.map((cone, index) => (
            <Typography key={index}>{turnConeToString(cone)}</Typography>
          ))}

          <Typography>{`Total Order Price: ${getPriceString(
            order.total_price
          )}`}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <>
      {user.id !== 0 && (
        <>
          <h1 className="header-font">{title}</h1>
          {renderedOrders}
        </>
      )}
    </>
  );
}
