import { BACKEND_URL_DEV } from "../../constants";
import { useStore } from "../../store";
import axios from "../axios";

// const userId = useStore((state) => state.user.id);
const userId = 1;

export default (username: String | null, password: String | null) => {
  axios
    .patch(`${BACKEND_URL_DEV}/customer/${userId}/account`, {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response);
    });
  return "updated";
};
