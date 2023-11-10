import { BACKEND_URL_DEV } from "../../constants";
import axios from "../axios";

export default () => {
  const userId = 5;
  axios
    .get(`${BACKEND_URL_DEV}/customer/${userId}/checkout`)
    .then((response) => {
      console.log(response);
    });
  return "last order";
};
