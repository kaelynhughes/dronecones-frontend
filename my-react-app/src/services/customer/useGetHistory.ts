import axios from "../axios";
import { BACKEND_URL_DEV } from "../../constants";
import { Order, FullCone, ProductType } from "../../types";
import { useStore } from "../../store";

const dummyData: Order[] = [
  {
    cones: [
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Chocolate", type: ProductType.ICECREAM },
        ],
      },
    ],
    totalPrice: 500,
    timestamp: new Date(),
    id: 1,
  },
  {
    cones: [
      {
        components: [
          { name: "Waffle", type: ProductType.CONE },
          { name: "Chocolate", type: ProductType.ICECREAM },
          { name: "Chocolate", type: ProductType.ICECREAM },
          { name: "Chocolate", type: ProductType.ICECREAM },
          { name: "Hot Fudge", type: ProductType.TOPPING },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
      },
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Chocolate", type: ProductType.ICECREAM },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
      },
      {
        components: [
          { name: "Waffle", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Hot Fudge", type: ProductType.TOPPING },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
      },
    ],
    totalPrice: 1800,
    timestamp: new Date(),
    id: 2,
  },
  {
    cones: [
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
      },
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
      },
    ],
    totalPrice: 1000,
    timestamp: new Date(),
    id: 3,
  },
];

// const userId = useStore((state) => state.user.id);
const userId = 5;

export default () => {
  axios
    .get(`${BACKEND_URL_DEV}/customer/${userId}/history`)
    .then((response) => {
      console.log(response.data);
    });
  return dummyData;
};
