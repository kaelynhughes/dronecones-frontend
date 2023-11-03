export type Drone = {
  name: string;
  isActive: boolean;
  size: number;
  earnings: number;
  orderCount: number;
  id: number;
};

export type FullCone = {
  droneId?: number;
  components: Product[];
};

export type Order = {
  cones: FullCone[];
  totalPrice: number;
  employeeCut?: number;
  remainder?: number;
  timestamp: Date;
  id?: number;
};

export type Product = {
  name: string;
  stock?: number;
  //ppu is the Price the customer will pay for a unit of this Product
  ppu?: number;
  //cpu is the Cost we pay as the vendor to supply a unit of this Product
  cpu?: number;
  img?: File;
  type: ProductType;
  id?: number;
};

export enum ProductType {
  ICECREAM = "Ice Cream",
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
