import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Drone, UserType } from "../../types";
import { Box, Divider, Typography, useTheme } from "@mui/material";

const textStyle = {
  color: "white",
  fontFamily: "pixelfont",
};

export default function DroneQuickviewPage() {
  const user = useStore((state) => state.user);
  const drones = useStore((state) => state.drones);
  const theme = useTheme();

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
          <Typography sx={textStyle} variant="h4" component="h2" gutterBottom>
            Welcome back, {user.username}!
          </Typography>
          <Typography sx={textStyle} variant="h4" component="h2" gutterBottom>
            Your drones have earned a total of{" "}
            {(earnings / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            !
          </Typography>

          <Typography sx={textStyle} variant="h4" component="h2" gutterBottom>
            You have {drones.length} drones registered, which have delivered{" "}
            {coneCount} cones!
          </Typography>
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

          <Divider />
          <Typography sx={textStyle} variant="h6" component="h4" gutterBottom>
            Visit the Manage Drones or History pages for more details!
          </Typography>
        </Box>
      )}
    </>
  );
}
