import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order, UserType } from "../../types";
import { useStore } from "../../store";
import useGetHistory from "../../services/manager/useGetHistory";

export default function ManagerHistoryPage() {
  const user = useStore((state) => state.user);
  const [history, setHistory] = useState<Order[]>();
  const fetchHistory = async () => {
    const fetchedHistory = useGetHistory();
    setHistory(fetchedHistory);
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <>
      {user.userType === UserType.MANAGER && (
        <>
          <h1>
            Manager History Page, allows the manager to view all recent orders
            and their details
          </h1>
          <Button
            variant="contained"
            component={Link}
            to="/app/manager-quickview"
          >
            Back to Quickview
          </Button>
        </>
      )}
    </>
  );
}
