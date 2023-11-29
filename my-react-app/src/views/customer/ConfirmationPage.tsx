import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { Box } from "@mui/material";

export default function ConfirmationPage() {
  const { time, setTime } = useStore();
  const [arrivedBool, setArriveBool] = useState(false);
  const { completedOrder, orderSent, setError } = useStore();

  const timeRef = useRef(time);
  timeRef.current = time;

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setError(
            "Geolocation denied, please enabled location tracking in your browser settings - better hurry!"
          );
        }
      );
    }
  }, []);

  useEffect(() => {
    if (completedOrder) {
      setTime({ minutes: 10, seconds: 0 });
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
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
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
        <h3
          className="pixel-font"
          style={{ fontSize: "25px", whiteSpace: "pre-line" }}
        >
          Delivering to your coordinates: {"\n"}({String(location.latitude)},
          {String(location.longitude)})
        </h3>
      </Box>
    </>
  );
}
