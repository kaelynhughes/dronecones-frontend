import { FullCone, Product, ProductType } from "../types";

export const getPriceString = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

export const getConeString = (cone: FullCone): String => {

  console.log(cone);
  const coneType: Product[] = [];
  const scoops: Product[] = [];
  const toppings: Product[] = [];
  cone.products.forEach((product) => {
    if (product.product_type == ProductType.CONE) {
      coneType.push(product);
    } else if (product.product_type == ProductType.ICECREAM) {
      scoops.push(product);
    } else {
      toppings.push(product);
    }
  });
  if (scoops.length == 0 || coneType.length == 0) {
    return "Bad data: not enough information saved about this cone";
  }
  let fullString: String = `${coneType[0].display_name} cone with `;
  if (scoops.length > 2) fullString += `${scoops[2].display_name}, `;
  if (scoops.length > 1) fullString += `${scoops[1].display_name} and `;
  fullString += `${scoops[0].display_name} ice cream`;
  if (toppings.length > 2)
    fullString += ` and ${toppings[0].display_name}, ${toppings[1].display_name}, and ${toppings[2].display_name}.`;
  else if (toppings.length > 1)
    fullString += ` and ${toppings[0].display_name} and ${toppings[1].display_name}.`;
  else if (toppings.length > 0) fullString += ` and ${toppings[0].display_name}.`;
  else fullString += ".";
  return fullString;
};

export const getCartString = (cone: FullCone): String => {
  const coneType: Product[] = [];
  const scoops: Product[] = [];
  const toppings: Product[] = [];
  cone.products.forEach((product) => {
    if (product.product_type == ProductType.CONE) {
      coneType.push(product);
    } else if (product.product_type == ProductType.ICECREAM) {
      scoops.push(product);
    } else {
      toppings.push(product);
    }
  });
  let fullString: String = ``;
  if (toppings.length > 2)
    fullString += `${toppings[0].display_name}, ${toppings[1].display_name}, and ${toppings[2].display_name} \n`;
  else if (toppings.length > 1)
    fullString += `${toppings[0].display_name} and ${toppings[1].display_name} \n`;
  else if (toppings.length > 0) fullString += `${toppings[0].display_name} \n`;
  if (scoops.length > 2) fullString += `${scoops[2].display_name}, `;
  if (scoops.length > 1) fullString += `${scoops[1].display_name} and `;
  fullString += `${scoops[0].display_name} Ice Cream \n`;
  fullString += `${coneType[0].display_name} Cone`
  return fullString;
}

export const getConePrice = (cone: FullCone): number => {
  let price = 0;
  cone.products.forEach((product) => price += product?.price_per_unit || 0);
  return price;
}
