import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order } from "../../types";
import useGetHistory from "../../services/customer/useGetHistory";

export default function CustomerHistoryPage() {
  const [history, setHistory] = useState<Order[] | null>();
  const fetchHistory = async () => {
    const historyList = await useGetHistory();
    setHistory(historyList);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <h1>Customer History Page, displays info about past orders</h1>
      <Button variant="contained" component={Link} to="/">
        Back to Home
      </Button>
    </>
  );
}
