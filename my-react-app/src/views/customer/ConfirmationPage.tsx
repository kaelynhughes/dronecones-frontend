import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Box } from "@mui/material";

export default function ConfirmationPage() {
  const { time, setTime } = useStore();
  const [arrivedBool, setArriveBool] = useState(false);
  const { completedOrder, orderSent } = useStore();

  const timeRef = useRef(time);
  timeRef.current = time;

  useEffect(() => {
    if (completedOrder) {
      setTime({ minutes: 5, seconds: 0 });
    }
    orderSent();
  }, [orderSent]);

  useEffect(() => {
    const tick = () => {
      let { minutes, seconds } = timeRef.current;

      if (minutes === 0 && seconds === 0) {
        setArriveBool(true);
        return;
      }

      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;
        if (minutes > 0) {
          minutes--;
        }
      }

      if (
        timeRef.current.minutes !== minutes ||
        timeRef.current.seconds !== seconds
      ) {
        setTime({ minutes, seconds });
      }
    };

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [setTime]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h1 className="logo-fontFirst" style={{ fontSize: "250px" }}>
          {String(time.minutes).padStart(2, "0")}:
        </h1>
        <h1 className="logo-fontSecond" style={{ fontSize: "250px" }}>
          {String(time.seconds).padStart(2, "0")}
        </h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {!arrivedBool && (
          <h2 className="header-font" style={{ fontSize: "50px" }}>
            Your ice cream is on the way!
          </h2>
        )}
        {arrivedBool && (
          <h2 className="header-font" style={{ fontSize: "75px" }}>
            Enjoy your Drone Cones!
          </h2>
        )}
      </Box>
    </>
  );
}
