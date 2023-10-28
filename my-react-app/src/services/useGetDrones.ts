import axios from "./axios";
import { BACKEND_URL_DEV } from "../constants";
import { Drone } from "../types";

export default () => {
  axios.get(`${BACKEND_URL_DEV}/employee/drones`).then((response) => {
    console.log(response);
  });
  const drone1: Drone = {
    name: "C-3PO",
    isActive: true,
    size: 3,
  };
  const drone2: Drone = {
    name: "R2-D2",
    isActive: false,
    size: 2,
  };
  const drone3: Drone = {
    name: "BB-8",
    isActive: true,
    size: 1,
  };
  return [drone1, drone2, drone3];
};
