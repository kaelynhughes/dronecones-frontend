import { FullCone, Product, ProductType } from "../types";

export const getPriceString = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

export const getConeString = (cone: FullCone): String => {
  const coneType: Product[] = [];
  const scoops: Product[] = [];
  const toppings: Product[] = [];
  cone.components.forEach((product) => {
    if (product.type == ProductType.CONE) {
      coneType.push(product);
    } else if (product.type == ProductType.ICECREAM) {
      scoops.push(product);
    } else {
      toppings.push(product);
    }
  });
  if (scoops.length == 0 || coneType.length == 0) {
    return "Bad data: not enough information saved about this cone";
  }
  let fullString: String = `${coneType[0].name} cone with `;
  if (scoops.length > 2) fullString += `${scoops[2].name}, `;
  if (scoops.length > 1) fullString += `${scoops[1].name} and `;
  fullString += `${scoops[0].name} ice cream`;
  if (toppings.length > 2)
    fullString += ` and ${toppings[0].name}, ${toppings[1].name}, and ${toppings[2]}.`;
  else if (toppings.length > 1)
    fullString += ` and ${toppings[0].name} and ${toppings[1].name}.`;
  else if (toppings.length > 0) fullString += ` and ${toppings[0].name}.`;
  else fullString += ".";
  return fullString;
};
