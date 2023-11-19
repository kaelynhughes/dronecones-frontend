import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Order, UserType } from "../../types";
import { useStore } from "../../store";
import useGetHistory from "../../services/manager/useGetHistory";
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
} from "@mui/material";
import { getConeString, getPriceString } from "../../services/helperFunctions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const wordStyle = {
  color: "white",
  fontSize: "16px",
  fontFamily: "pixelfont",
};


export default function ManagerHistoryPage() {
  const user = useStore((state) => state.user);
  const [history, setHistory] = useState<Order[]>();
  const fetchHistory = async () => {
    const fetchedHistory = useGetHistory();
    setHistory(fetchedHistory);
  };

  console.log(history);

  let renderedHistory = history?.map((order) => {

    
    return(
      <Accordion
      sx={{
        width: "1130px",
        "& .MuiTypography-root": wordStyle,
        flexGrow: 1,
      }}
      key={order.id}
    >
      <AccordionSummary
        sx={{ flexGrow: 1, width: "100%",fontFamily:"pixelfont",color:"white" }}
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
      >

        {/*REPLACE CUSTOMER NAME LATER*/}
          {order.timestamp.getMonth()}/{order.timestamp.getDate()}/{order.timestamp.getFullYear()} {order.timestamp.getHours()}:{order.timestamp.getMinutes()} - CUSTOMER NAME - Order Size: {order.cones.length}
      </AccordionSummary>
      <AccordionDetails sx={{ flexGrow: 1, width: "100%" }}>
        {/*REPLACE DRONEID AND DRONEOPERATOR ID LATER*/}
        DRONEID AND DRONEOPERATOR ID
        {order.cones.map((cone, index) => (
          <Typography key={index}>{getConeString(cone)}</Typography>
        ))}
        <Typography>{`Total Order Price: ${getPriceString(
          order.totalPrice
        )}`}</Typography>
        <Typography>{`Employee cut: ${getPriceString(
          order?.employeeCut || 0
        )}`}</Typography>
      </AccordionDetails>
    </Accordion>
      
    );
  })

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <>
      {user.userType === UserType.MANAGER && (
        <>

        {/* Manager History Page, allows the manager to view all recent orders
            and their details */}
          <h1 className="header-font">
            History
          </h1>
          
          {renderedHistory}
          
        </>
      )}
    </>
  );
}
