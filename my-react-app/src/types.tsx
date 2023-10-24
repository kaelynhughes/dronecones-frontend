export type Drone = {
  name: String;
  isActive: boolean;
  size: number;
  id?: number;
};

export type FullCone = {
  droneId?: number;
  components: Product[];
};

export type Order = {
  cones: FullCone[];
  totalPrice: number;
  employeeCut: number;
  remainder: number;
  timestamp: Date;
  id?: number;
};

export type Product = {
  name: String;
  stock: number;
  //ppu is the Price the customer will pay for a unit of this Product
  ppu: number;
  //cpu is the Cost we pay as the vendor to suppoly a unit of this Product
  cpu: number;
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
  username: String;
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
