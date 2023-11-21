import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Drone, Order, UserType } from "../../types";
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
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { getConeString, getPriceString } from "../../services/helperFunctions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const { loadedEmployeeOrders } = useStore();
  const { loadedDrones } = useStore();

  const { loadDrones } = useStore();
  const { loadEmployeeHistory } = useStore();

  const [sortedOrders, sortOrders] = useState(orders);

  if (drones.length === 0 && !loadedDrones) {
    loadDrones();
  }

  if (orders.length === 0 && loadedEmployeeOrders) {
    loadEmployeeHistory();
    sortOrders(orders);
  }

  const getDroneNames = (order: Order) => {
    const droneIds = order.cones.map((cone) => cone.drone_id);
    let names =
      drones.find((drone) => drone.id === droneIds[0])?.display_name ||
      "Drone Not Found";
    droneIds.shift();
    droneIds.forEach((droneId) => {
      let name =
        drones.find((drone) => drone.id === droneId)?.display_name || "";
      if (name !== "" && !names.includes(name)) {
        names = names + " and " + name;
      }
    });

    return names;
  };
  console.log(drones);
  return (
    <>
      {orders.length === 0 ? (
        <Card variant="outlined" sx={{ width: "full" }}>
          <CardContent>
            <Typography {...wordStyle} paddingBottom="10px">
              No orders yet!
            </Typography>
            <Typography {...wordStyle} fontSize="14px">
              Looks like your drones haven't delivered anything yet. Check again
              later!
            </Typography>
          </CardContent>
        </Card>
      ) : (
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
                    value={drone.display_name}
                  >
                    {drone.display_name}
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
                    order.order_time ? order.order_time : ""
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
                    order.total_price
                  )}`}</Typography>
                  <Typography>{`Your Earnings: ${getPriceString(
                    order?.employee_cut || 0
                  )}`}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
