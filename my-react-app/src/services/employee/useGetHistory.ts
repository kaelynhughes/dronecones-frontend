import { BACKEND_URL_DEV } from "../../constants";
import { Order, ProductType } from "../../types";
import axios from "../axios";

const dummyData: Order[] = [
  {
    cones: [
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Chocolate", type: ProductType.ICECREAM },
        ],
        droneId: 3,
      },
    ],
    totalPrice: 500,
    timestamp: new Date(),
    employeeCut: 300,
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
        droneId: 1,
      },
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Chocolate", type: ProductType.ICECREAM },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
        droneId: 1,
      },
      {
        components: [
          { name: "Waffle", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Hot Fudge", type: ProductType.TOPPING },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
        droneId: 1,
      },
    ],
    totalPrice: 1800,
    timestamp: new Date(),
    employeeCut: 1000,
  },
  {
    cones: [
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
        droneId: 2,
      },
      {
        components: [
          { name: "Sugar", type: ProductType.CONE },
          { name: "Vanilla", type: ProductType.ICECREAM },
          { name: "Sprinkles", type: ProductType.TOPPING },
        ],
        droneId: 2,
      },
    ],
    totalPrice: 1000,
    timestamp: new Date(),
    employeeCut: 500,
  },
];

export default () => {
  axios.get(`${BACKEND_URL_DEV}/employee/drones`).then((response) => {
    console.log(response);
  });
  return dummyData;
};
