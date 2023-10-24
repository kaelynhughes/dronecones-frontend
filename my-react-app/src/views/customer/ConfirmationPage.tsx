import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function ConfirmationPage() {

    const [arrivedBool, setArriveBool] = useState(false);
    const [hours, setHours] = useState(10);
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(10);
  
    useEffect(() => {
      const timer = setInterval(() => {
        if( hours == 0 && seconds == 0 && minutes == 0){
          setArriveBool(true)
        } else if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }, [hours, minutes, seconds]);
  
  
  return (
    <>
      <code>{String(hours).padStart(2, '0')}:
  {String(minutes).padStart(2, '0')}:
  {String(seconds).padStart(2, '0')}</code>
      {arrivedBool && <p>Arrived</p>}
    </>
  );
}
