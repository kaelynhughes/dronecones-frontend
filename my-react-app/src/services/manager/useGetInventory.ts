import axios from "../axios";
import { BACKEND_URL_DEV } from "../../constants";
import { Product, ProductType } from "../../types";

const dummyData: Product[] = [
  {
    name: "Sugar",
    stock: 100,
    ppu: 100,
    cpu: 50,
    type: ProductType.CONE,
    id: 1,
  },
  {
    name: "Waffle",
    stock: 20,
    ppu: 200,
    cpu: 60,
    type: ProductType.CONE,
    id: 2,
  },
  {
    name: "Chocolate",
    stock: 40,
    ppu: 100,
    cpu: 50,
    type: ProductType.ICECREAM,
    id: 3,
  },
  {
    name: "Vanilla",
    stock: 60,
    ppu: 100,
    cpu: 50,
    type: ProductType.ICECREAM,
    id: 4,
  },
  {
    name: "Sprinkles",
    stock: 300,
    ppu: 10,
    cpu: 5,
    type: ProductType.TOPPING,
    id: 5,
  },
  {
    name: "Hot Fudge",
    stock: 100,
    ppu: 30,
    cpu: 20,
    type: ProductType.TOPPING,
    id: 6,
  },
];

export default () => {
  // axios.get

  return dummyData;
};
