import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Drone, UserType } from "../../types";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { getPriceString } from "../../services/helperFunctions";
import useGetDrones from "../../services/employee/useGetDrones";

const textStyle = {
  color: "white",
  fontFamily: "pixelfont",
};

export default function DroneQuickviewPage() {
  const user = useStore((state) => state.user);
  const drones = useStore((state) => state.drones);
  const theme = useTheme();

  const { loadDrones } = useStore();

  if (drones.length === 0) {
    loadDrones(useGetDrones());
  }

  let earnings = 0;
  drones.forEach((drone) => (earnings += drone.earnings));

  let coneCount = 0;
  //This may not be accurate for how many cones a drone has delivered, but in an ideal world it would be.
  drones.forEach((drone) => (coneCount += drone.orderCount * drone.size));

  drones.sort((a: Drone, b: Drone) => {
    if (a.orderCount > b.orderCount) {
      return -1;
    } else if (a.orderCount < b.orderCount) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      {(user.userType === UserType.EMPLOYEE ||
        user.userType === UserType.MANAGER) && (
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
          {drones.length > 0 && (
            <>
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
                Your drones have earned a total of {getPriceString(earnings)}!
              </Typography>
              <Typography
                sx={textStyle}
                variant="h4"
                component="h2"
                gutterBottom
              >
                You have {drones.length} drones registered, which have delivered{" "}
                {coneCount} cones!
              </Typography>
            </>
          )}

          {drones.length > 0 && (
            <Typography sx={textStyle} variant="h5" component="h4" gutterBottom>
              {drones[0].name} (Capacity: {drones[0].size} cone
              {drones[0].size > 1 ? "s" : ""}) - {drones[0].orderCount} orders
            </Typography>
          )}
          {drones.length > 1 && (
            <Typography sx={textStyle} variant="h5" component="h4" gutterBottom>
              {drones[1]?.name} (Capacity: {drones[1]?.size} cone
              {drones[0].size > 1 ? "s" : ""}) - {drones[1].orderCount} orders
            </Typography>
          )}
          {drones.length > 2 && (
            <Typography sx={textStyle} variant="h5" component="h4" gutterBottom>
              {drones[2].name} (Capacity: {drones[2].size} cone
              {drones[0].size > 1 ? "s" : ""}) - {drones[2].orderCount} orders
            </Typography>
          )}

          {drones.length > 0 && (
            <>
              <Divider />
              <Typography
                sx={textStyle}
                variant="h6"
                component="h4"
                gutterBottom
              >
                Visit the Manage Drones or History pages for more details!
              </Typography>
            </>
          )}
          {drones.length === 0 && (
            <>
              <Typography
                sx={textStyle}
                variant="h3"
                component="h4"
                gutterBottom
              >
                Welcome to Drone Cones!
              </Typography>
              <Typography
                sx={textStyle}
                variant="h4"
                component="h4"
                gutterBottom
              >
                It looks like you haven't registered any drones yet. to get
                started earning and flying, visit the 'Manage Drones' page using
                the navbar on the left, and click the '+ New Drone' button.
                Happy Flying!
              </Typography>
            </>
          )}
        </Box>
      )}
    </>
  );
}
