import { BACKEND_URL_DEV } from "../../constants";
import { useStore } from "../../store";
import { FullCone, Order } from "../../types";
import axios from "../axios";
import { getConeString } from "../helperFunctions";

const userId = useStore((state) => state.user.id);

export default (order: Order) => {
  axios
    .post(`${BACKEND_URL_DEV}/${userId}/checkout`, {
      total_price: order.totalPrice,
      order_time: new Date(),
      cones: JSON.stringify(order.cones),
    })
    .then((response) => {
      console.log(response);
    });
};
