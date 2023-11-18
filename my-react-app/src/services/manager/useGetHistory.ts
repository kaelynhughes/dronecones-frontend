import { Order, ProductType } from "../../types";

const dummyData: Order[] = [
  {
    cones: [
      {
        products: [
          { display_name: "Sugar", product_type: ProductType.CONE },
          { display_name: "Chocolate", product_type: ProductType.ICECREAM },
        ],
        droneId: 3,
      },
    ],
    total_price: 500,
    order_time: new Date(),
    employee_cut: 300,
  },
  {
    cones: [
      {
        products: [
          { display_name: "Waffle", product_type: ProductType.CONE },
          { display_name: "Chocolate", product_type: ProductType.ICECREAM },
          { display_name: "Chocolate", product_type: ProductType.ICECREAM },
          { display_name: "Chocolate", product_type: ProductType.ICECREAM },
          { display_name: "Hot Fudge", product_type: ProductType.TOPPING },
          { display_name: "Sprinkles", product_type: ProductType.TOPPING },
        ],
        droneId: 1,
      },
      {
        products: [
          { display_name: "Sugar", product_type: ProductType.CONE },
          { display_name: "Vanilla", product_type: ProductType.ICECREAM },
          { display_name: "Chocolate", product_type: ProductType.ICECREAM },
          { display_name: "Sprinkles", product_type: ProductType.TOPPING },
        ],
        droneId: 1,
      },
      {
        products: [
          { display_name: "Waffle", product_type: ProductType.CONE },
          { display_name: "Vanilla", product_type: ProductType.ICECREAM },
          { display_name: "Vanilla", product_type: ProductType.ICECREAM },
          { display_name: "Hot Fudge", product_type: ProductType.TOPPING },
          { display_name: "Sprinkles", product_type: ProductType.TOPPING },
        ],
        droneId: 1,
      },
    ],
    total_price: 1800,
    order_time: new Date(),
    employee_cut: 1000,
  },
  {
    cones: [
      {
        products: [
          { display_name: "Sugar", product_type: ProductType.CONE },
          { display_name: "Vanilla", product_type: ProductType.ICECREAM },
          { display_name: "Sprinkles", product_type: ProductType.TOPPING },
        ],
        droneId: 2,
      },
      {
        products: [
          { display_name: "Sugar", product_type: ProductType.CONE },
          { display_name: "Vanilla", product_type: ProductType.ICECREAM },
          { display_name: "Sprinkles", product_type: ProductType.TOPPING },
        ],
        droneId: 2,
      },
    ],
    total_price: 1000,
    order_time: new Date(),
    employee_cut: 500,
  },
];

export default () => {
  // axios call for manager history
  return dummyData;
};
