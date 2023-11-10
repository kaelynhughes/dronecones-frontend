import axios from "../axios";
import { BACKEND_URL_DEV } from "../../constants";
import { useStore } from "../../store";

// const userId = useStore((state) => state.user.id);
const userId = 5;

export default () => {
  axios
    .get(`${BACKEND_URL_DEV}/customer/${userId}/account`)
    .then((response) => console.log(response));
  return "account info";
};
