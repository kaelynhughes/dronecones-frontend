export type Drone = {
  display_name: string;
  is_active: boolean;
  drone_size: number;
  earnings: number;
  num_orders: number;
  serial_number: string;
  id?: number;
};

export type FullCone = {
  droneId?: number;
  products: Product[];
};

export type Order = {
  cones: FullCone[];
  total_price: number;
  employee_cut?: number;
  profit?: number;
  order_time?: Date;
  id?: number;
};

export type Product = {
  display_name: string;
  stock?: number;
  //ppu is the Price the customer will pay for a unit of this Product
  price_per_unit?: number;
  //cpu is the Cost we pay as the vendor to supply a unit of this Product
  cpu?: number;
  img?: File;
  product_type: ProductType;
  id?: number;
};

export enum ProductType {
  ICECREAM = "IceCream",
  CONE = "Cone",
  TOPPING = "Topping",
}

export type User = {
  username: string;
  userType: UserType;
  isActive: boolean;
  id?: number;
};

export enum UserType {
  CUSTOMER = "Customer",
  EMPLOYEE = "Employee",
  MANAGER = "Manager",
  GUEST = "Guest",
}
