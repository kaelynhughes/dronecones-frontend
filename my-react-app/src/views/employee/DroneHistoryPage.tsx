import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Drone, UserType } from "../../types";
import useGetDrones from "../../services/employee/useGetDrones";

export default function DroneHistoryPage() {
  const user = useStore((state) => state.user);
  const [drones, setDrones] = useState<Drone[] | null>();

  const fetchDrones = async () => {
    const dronesList = await useGetDrones();
    setDrones(dronesList);
  };

  useEffect(() => {
    fetchDrones();
  }, []);
  return (
    <>
      {(user.userType === UserType.EMPLOYEE ||
        user.userType === UserType.MANAGER) && (
        <>
          <h1>
            Drone History Page, displays info on recent drone deliveries and
            income from each delivery
          </h1>
          <Button
            variant="contained"
            component={Link}
            to="/app/drone-quickview"
          >
            Back to Quickview
          </Button>
        </>
      )}
    </>
  );
}
