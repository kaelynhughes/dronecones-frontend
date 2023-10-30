import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Drone, UserType } from "../../types";
import { useStore } from "../../store";
import useGetDrones from "../../services/employee/useGetDrones";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import { DroneDialog } from "./DroneDialog";

const tableCellStyleHeader = {
  color: "white",
  fontSize: "20px",
  fontFamily: "pixelfont",
};

const tableCellStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};

export default function ManageDronesPage() {
  const theme = useTheme();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentDroneId, setCurrentDroneId] = useState(-1);

  const open = () => setDialogOpen(true);
  const close = () => setDialogOpen(false);

  const user = useStore((state) => state.user);
  const drones = useStore((state) => state.drones);
  const navigate = useNavigate();

  const { removeDrone } = useStore();
  const { editDrone } = useStore();

  return (
    <>
      {(user.userType === UserType.EMPLOYEE ||
        user.userType === UserType.MANAGER) && (
        <Box
          sx={{
            height: "92vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ ...tableCellStyle, flexGrow: 1 }}
              >
                Manage Drones
              </Typography>
              <Button
                sx={{
                  color: "white",
                  fontSize: "12px",
                  fontFamily: "pixelfont",
                  padding: "6px",
                }}
                color="inherit"
                variant="outlined"
                onClick={() => {
                  setCurrentDroneId(-1);
                  setDialogOpen(true);
                }}
              >
                <AddIcon />
                New Drone
              </Button>
              <DroneDialog
                open={isDialogOpen}
                onClose={close}
                droneId={currentDroneId}
              />
            </Toolbar>
          </AppBar>

          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "100%",
              width: "100%",
              overflow: "auto",
              mt: 2,
              flexGrow: 1,
            }}
          >
            <Table
              stickyHeader
              sx={{ width: "100%", tableLayout: "fixed" }}
              aria-label="drone management table"
            >
              <TableHead
                sx={{
                  "& th": {
                    bgcolor: `${theme.palette.secondary.main}`,
                  },
                }}
              >
                <TableRow>
                  <TableCell sx={{ ...tableCellStyleHeader, width: "40%" }}>
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ ...tableCellStyleHeader, width: "10%" }}
                  >
                    Cone Cap
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ ...tableCellStyleHeader, width: "10%" }}
                  >
                    Order Count
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ ...tableCellStyleHeader, width: "15%" }}
                  >
                    Earnings
                  </TableCell>
                  <TableCell
                    sx={{ ...tableCellStyleHeader, width: "15%" }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drones
                  .sort((a: Drone, b: Drone) => {
                    if (a.earnings > b.earnings) {
                      return -1;
                    } else if (a.earnings < b.earnings) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((drone) => (
                    <TableRow
                      key={drone.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={tableCellStyle}
                        component="th"
                        scope="drone"
                      >
                        {drone.name}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {drone.size}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {drone.orderCount}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {(drone.earnings / 100).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell sx={tableCellStyle} align="right">
                        <Tooltip title="Drone Available Off/On">
                          <Switch
                            inputProps={{ "aria-label": "controlled" }}
                            name="active"
                            checked={drone.isActive}
                            onChange={() => {
                              const updateDrone = { ...drone };
                              updateDrone.isActive = !drone.isActive;
                              if (drone.id) {
                                editDrone(drone.id, updateDrone);
                              }
                            }}
                          />
                        </Tooltip>

                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => {
                            setCurrentDroneId(drone.id || -1);
                            setDialogOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            if (drone.id) {
                              removeDrone(drone.id);
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}
