import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Drone, Order, UserType } from "../../types";
import useGetDrones from "../../services/employee/useGetDrones";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  useTheme,
  Box,
} from "@mui/material";
import { getConeString, getPriceString } from "../../services/helperFunctions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGetHistory from "../../services/employee/useGetHistory";

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};

export default function DroneHistoryPage() {
  const theme = useTheme();
  const user = useStore((state) => state.user);
  const drones = useStore((state) => state.drones);
  const orders = useStore((state) => state.orders);

  const { loadDrones } = useStore();
  const { loadHistory } = useStore();

  const [sortedOrders, sortOrders] = useState(orders);

  if (drones.length === 0) {
    loadDrones(useGetDrones());
  }

  if (orders.length === 0) {
    loadHistory(useGetHistory());
    sortOrders(orders);
  }

  const getDroneNames = (order: Order) => {
    const droneIds = order.cones.map((cone) => cone.droneId);
    let names = drones.find((drone) => drone.id === droneIds[0])?.name || "";
    droneIds.shift();
    droneIds.forEach((droneId) => {
      let name = drones.find((drone) => drone.id === droneId)?.name || "";
      if (name !== "" && !names.includes(name)) {
        names = names + " and " + name;
      }
    });

    return names;
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <FormControl style={{ marginRight: "10px" }}>
          <InputLabel sx={wordStyle}>Filter by:</InputLabel>
          <Select
            sx={{
              ...wordStyle,
              width: "250px",
              backgroundColor: `${theme.palette.primary.dark}`,
            }}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: `${theme.palette.primary.dark}`,
                  },
                },
              },
            }}
            label="Filter by:"
            onChange={(event) => {
              sortOrders(
                orders.filter((order) =>
                  getDroneNames(order).includes(`${event.target.value}`)
                )
              );
            }}
          >
            <MenuItem
              sx={{
                ...wordStyle,
                backgroundColor: `${theme.palette.primary.main}`,
              }}
              key={0}
              value={""}
            >
              None
            </MenuItem>
            {drones.map((drone) => (
              <MenuItem
                sx={{
                  ...wordStyle,
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
                key={drone.id}
                value={drone.name}
              >
                {drone.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl>
          <InputLabel sx={wordStyle}># of Cones</InputLabel>
          <Select
            sx={{
              ...wordStyle,
              width: "250px",
              backgroundColor: `${theme.palette.primary.dark}`,
            }}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                    backgroundColor: `${theme.palette.primary.dark}`,
                  },
                },
              },
            }}
            label="# of Cones"
            // onChange={handleConeChange}
          >
            {[...Array()].map((number) => (
              <MenuItem
                sx={{
                  ...wordStyle,
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
                key={number}
                value={number}
              >
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </Box>

      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {sortedOrders.map((order, index) => (
          <Accordion
            sx={{
              width: "1130px",
              "& .MuiTypography-root": wordStyle,
              flexGrow: 1,
            }}
            key={index}
          >
            <AccordionSummary
              sx={{ flexGrow: 1, width: "100%" }}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Typography>{`${getDroneNames(order)} delivered ${
                order.cones.length
              } cone${order.cones.length > 1 ? "s" : ""}. ${new Date(
                order.timestamp
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexGrow: 1, width: "100%" }}>
              {order.cones.map((cone, index) => (
                <Typography key={index}>{getConeString(cone)}</Typography>
              ))}
              <Typography>{`Total Order Price: ${getPriceString(
                order.totalPrice
              )}`}</Typography>
              <Typography>{`Your Earnings: ${getPriceString(
                order?.employeeCut || 0
              )}`}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
