import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order, UserType } from "../../types";
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

export default function ManagerordersPage() {
  const theme = useTheme();
  const user = useStore((state) => state.user);
  const { users, loadedUsers, loadUsers } = useStore();
  const { banUser } = useStore();
  const { orders } = useStore();
  const { loadedManagerOrders } = useStore();
  const { loadManagerHistory } = useStore();

  if (orders.length === 0 && !loadedManagerOrders) {
    loadManagerHistory();
  }

  if (users.length === 0 && !loadedUsers) {
    loadUsers();
  }

  let renderedorders = orders?.map((order) => {
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
          {/*REPLACE CUSTOMER NAME LATER*/}
          {order.order_time} -{" "}
          {users.filter((user) => user.id === order?.customer_id)[0]
            ?.username || "Guest"}{" "}
          - Order Size: {order.cones.length}
        </AccordionSummary>
        <AccordionDetails sx={{ flexGrow: 1, width: "100%" }}>
          {order.cones.map((cone, index) => (
            <Typography key={index}>{getConeString(cone)}</Typography>
          ))}
          <Typography>{`Total Order Price: ${getPriceString(
            order.total_price
          )}`}</Typography>
          <Typography>{`Employee cut: ${getPriceString(
            order?.employee_cut || 0
          )}`}</Typography>
          {/*BANNING USER WILL TAKE PLACE HERE*/}
          <Button
            style={{
              color: "white",
              background: `${theme.palette.primary.dark}`,
              fontSize: "10px",
              fontFamily: "pixelfont",
            }}
            onClick={() => {
              banUser(order?.customer_id || 0);
            }}
          >
            Ban User
          </Button>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <>
      {user.user_type === UserType.MANAGER && (
        <>
          {/* Manager orders Page, allows the manager to view all recent orders
            and their details */}
          <h1 className="header-font">orders</h1>

          {renderedorders}
        </>
      )}
    </>
  );
}
