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

  const [newName, setNewName] = useState("");
  const [newSize, setNewSize] = useState(1);
  const [newIsActive, setNewIsActive] = useState(true);

  let errorState = false;

  useEffect(() => {
    // Find the drone to be edited
    const drone = drones.find((drone) => drone.id === droneId);

    if (drone) {
      // If a drone is found, set the input fields with its data
      setNewName(drone.name);
      setNewSize(drone.size);
      setNewIsActive(drone.isActive);
    } else {
      // If creating a new drone, reset the input fields
      setNewName("");
      setNewSize(1);
      setNewIsActive(true);
    }
  }, [open, droneId, drones]);

  const toggle = () => setNewIsActive((prev) => !prev);

  return (
    <Dialog
      PaperProps={{
        sx: { backgroundColor: "rgba(97, 29, 159, 1)" },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={wordStyle}>
        {droneId != -1 ? "Edit Drone" : "New Drone"}
      </DialogTitle>
      <DialogContent>
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
            error: errorState,
            helperText: "Invalid Input.",
          }}
          value={newSize}
          onChange={(event) => {
            if (
              parseInt(event.target.value) <= 3 &&
              parseInt(event.target.value) >= 1
            ) {
              setNewSize(parseInt(event.target.value));
              errorState = false;
            } else {
              setNewSize(1);
              errorState = true;
            }
          }}
          sx={{ input: wordStyle }}
        />
        <Tooltip title="Drone Available Off/On">
          <Switch checked={newIsActive} onChange={toggle} />
        </Tooltip>
      </DialogContent>
      <DialogActions>
        <Button sx={wordStyle} variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={wordStyle}
          variant="contained"
          onClick={() => {
            editDrone(droneId, {
              name: newName,
              size: newSize,
              isActive: newIsActive,
              earnings: droneEdit?.earnings || 0,
              orderCount: droneEdit?.orderCount || 0,
              id: droneId,
            });
            onClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
