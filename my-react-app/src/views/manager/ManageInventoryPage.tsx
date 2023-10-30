import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Product, UserType } from "../../types";
import { useStore } from "../../store";
import useGetInventory from "../../services/manager/useGetInventory";

export default function ManageInventoryPage() {
  const user = useStore((state) => state.user);

  const [inventory, setInventory] = useState<Product[] | null>();

  const fetchInventory = async () => {
    const fetchedInventory = await useGetInventory();
    setInventory(fetchedInventory);
  };

  useEffect(() => {
    fetchInventory;
  }, []);

  return (
    <>
      {user.userType === UserType.MANAGER && (
        <>
          <h1>
            Manage Inventory Page, displays remaining stock and inventory cost,
            allows user to bulk restock items, add new items, and change prices
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
