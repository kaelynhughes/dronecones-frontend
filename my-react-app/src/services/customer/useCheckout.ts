import { BACKEND_URL_DEV } from "../../constants";
import { useStore } from "../../store";
import { FullCone, Order } from "../../types";
import axios from "../axios";

const userId = useStore((state) => state.user.id);
const tempOrder = {
  total_price: 10,
  employee_cut: 5,
  profit: 3,
  order_time: "11-10-2023",
  products: {
    cone: 5,
    scoop_1: 13,
    scoop_2: 14,
    scoop_3: 15,
    topping_1: 10,
    topping_2: 11,
    topping_3: 12,
  },
};

export default (order: Order) => {
  axios
    .post(`${BACKEND_URL_DEV}/customer/${userId}/checkout`, {
      total_price: order.totalPrice,
      order_time: new Date(),
      cones: JSON.stringify(order.cones),
    })
    .then((response) => {
      console.log(response);
    });
};
