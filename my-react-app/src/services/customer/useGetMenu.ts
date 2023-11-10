import axios from "../axios";
import { BACKEND_URL_DEV } from "../../constants";
import { Product, ProductType } from "../../types";

export default () => {
  axios.get(`/customer/menu`).then((response) => {
    console.log(response.data);
  });

  const dummyData: Product[] = [
    { name: "Sugar", stock: 100, ppu: 100, cpu: 50, type: ProductType.CONE },
    { name: "Waffle", stock: 20, ppu: 200, cpu: 60, type: ProductType.CONE },
    {
      name: "Chocolate",
      stock: 40,
      ppu: 100,
      cpu: 50,
      type: ProductType.ICECREAM,
    },
    {
      name: "Vanilla",
      stock: 60,
      ppu: 100,
      cpu: 50,
      type: ProductType.ICECREAM,
    },
    {
      name: "Sprinkles",
      stock: 300,
      ppu: 10,
      cpu: 5,
      type: ProductType.TOPPING,
    },
    {
      name: "Hot Fudge",
      stock: 100,
      ppu: 30,
      cpu: 20,
      type: ProductType.TOPPING,
    },
  ];
  return dummyData;
};
