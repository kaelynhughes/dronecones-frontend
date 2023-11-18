import axios from "../axios";
import { BACKEND_URL_DEV } from "../../constants";
import { Product, ProductType } from "../../types";

const dummyData: Product[] = [
  {
    display_name: "Sugar",
    stock: 100,
    price_per_unit: 100,
    cpu: 50,
    product_type: ProductType.CONE,
    id: 1,
  },
  {
    display_name: "Waffle",
    stock: 20,
    price_per_unit: 200,
    cpu: 60,
    product_type: ProductType.CONE,
    id: 2,
  },
  {
    display_name: "Chocolate",
    stock: 40,
    price_per_unit: 100,
    cpu: 50,
    product_type: ProductType.ICECREAM,
    id: 3,
  },
  {
    display_name: "Vanilla",
    stock: 60,
    price_per_unit: 100,
    cpu: 50,
    product_type: ProductType.ICECREAM,
    id: 4,
  },
  {
    display_name: "Sprinkles",
    stock: 300,
    price_per_unit: 10,
    cpu: 5,
    product_type: ProductType.TOPPING,
    id: 5,
  },
  {
    display_name: "Hot Fudge",
    stock: 100,
    price_per_unit: 30,
    cpu: 20,
    product_type: ProductType.TOPPING,
    id: 6,
  },
];

export default () => {
  // axios.get

  return dummyData;
};
