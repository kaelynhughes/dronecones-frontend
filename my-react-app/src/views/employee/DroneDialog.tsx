import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Switch,
  useTheme,
  Tooltip,
  Box,
} from "@mui/material";
import { useStore } from "../../store";
import { useEffect, useState } from "react";

type DroneDialogProps = {
  open: boolean;
  onClose: () => void;
  droneId: number;
};

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};

export const DroneDialog: React.FC<DroneDialogProps> = ({
  open,
  onClose,
  droneId,
}) => {
  const theme = useTheme();
  const drones = useStore((state) => state.drones);
  const droneEdit = useStore((state) =>
    state.drones.find((drone) => drone.id === droneId)
  );
  const { editDrone } = useStore();
  const { createDrone } = useStore();

  const [newName, setNewName] = useState("");
  const [newSize, setNewSize] = useState(1);
  const [newIsActive, setNewIsActive] = useState(true);
  const [newSerialNumber, setNewSerialNumber] = useState("");

  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    // Find the drone to be edited
    const drone = drones.find((drone) => drone.id === droneId);

    if (drone) {
      // If a drone is found, set the input fields with its data
      setNewName(drone.display_name);
      setNewSize(drone.drone_size);
      setNewIsActive(drone.is_active);
      setNewSerialNumber(drone.serial_number);
    } else {
      // If creating a new drone, reset the input fields
      setNewName("");
      setNewSize(1);
      setNewIsActive(true);
      setNewSerialNumber("");
    }
  }, [open, droneId, drones]);

  const toggle = () => setNewIsActive((prev) => !prev);

  return (
    <Dialog
      PaperProps={{
        sx: {
          backgroundColor: "rgba(97, 29, 159, 1)",
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={wordStyle}>
        {droneId != -1 ? "Edit Drone" : "New Drone"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            sx={{ input: wordStyle }}
          />
          <TextField
            margin="dense"
            label="Size"
            type="number"
            inputProps={{
              min: "1",
              max: "3",
              step: "1",
              error: errorState.toString(),
              helpertext: "Invalid Input.",
            }}
            value={newSize}
            onChange={(event) => {
              if (
                parseInt(event.target.value) <= 3 &&
                parseInt(event.target.value) >= 1
              ) {
                setNewSize(parseInt(event.target.value));
                setErrorState(false);
              } else {
                setNewSize(1);
                setErrorState(true);
              }
            }}
            sx={{ input: wordStyle }}
          />
          {!droneEdit && (
            <TextField
              margin="dense"
              label="Serial #"
              value={newSerialNumber}
              onChange={(event) => setNewSerialNumber(event.target.value)}
              sx={{ input: wordStyle }}
            />
          )}

          <Tooltip title="Drone Available Off/On">
            <Switch checked={newIsActive} onChange={toggle} />
          </Tooltip>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={wordStyle} variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={wordStyle}
          variant="contained"
          onClick={() => {
            if (droneEdit) {
              editDrone(droneId, {
                display_name: newName,
                drone_size: newSize,
                is_active: newIsActive,
                earnings: droneEdit?.earnings || 0,
                num_orders: droneEdit?.num_orders || 0,
                serial_number: newSerialNumber,
                id: droneId,
              });
            } else {
              createDrone({
                display_name: newName,
                drone_size: newSize,
                is_active: newIsActive,
                serial_number: newSerialNumber,
                earnings: 0,
                num_orders: 0,
              });
            }
            onClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
