import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Drone, FullCone, Order, Product, User, UserType } from "./types";

type DroneConesState = {
  appPath: string;
  user: User;
  userMode: UserType;
  products: Product[];
  cart: FullCone[];
  drones: Drone[];
  orders: Order[];
};

type DroneConesActions = {
  login: (user: User) => void;

  changeMode: (mode: UserType) => void;
  changePath: (path: string) => void;

  loadProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;

  addConeToCart: (cone: FullCone) => void;
  addConesToCart: (cones: FullCone[]) => void;
  removeConeFromCart: (cone: FullCone) => void;
  clearCart: () => void;

  loadDrones: (drones: Drone[]) => void;
  loadDrone: (drone: Drone) => void;
  editDrone: (id: number, drone: Drone) => void;
  removeDrone: (id: number) => void;

  loadHistory: (orders: Order[]) => void;
  addHistory: (order: Order) => void;

  clearState: () => void;

  //TODO: Add update functions for if an item is neither created nor removed, but changed?
};

const initialState: DroneConesState = {
  appPath: "menu",
  user: { userType: UserType.GUEST, username: "Guest", isActive: true },
  userMode: UserType.CUSTOMER,
  products: [],
  cart: [],
  drones: [],
  orders: [],
};

export const useStore = create<DroneConesState & DroneConesActions>()(
  persist(
    (set) => ({
      ...initialState,
      clearState: () => set(initialState),

      changeMode: (mode) => set(() => ({ userMode: mode })),
      changePath: (path) => set(() => ({ appPath: path })),

      login: (user) => set(() => ({ user: user })),

      loadProducts: (products) =>
        set((state) => ({ products: [...state.products, ...products] })),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (product) =>
        set((state) => ({ 
          products: [...state.products.filter((item) => item !== product)] 
        })),  

      addConeToCart: (cone) =>
        set((state) => ({ cart: [...state.cart, cone] })),
      addConesToCart: (cones) =>
        set((state) => ({ cart: [...state.cart, ...cones] })),
      removeConeFromCart: (cone) =>
        set((state) => ({
          cart: state.cart.filter((item) => item !== cone),
        })),
      clearCart: () => set(() => ({ cart: [] })),

      loadDrones: (drones) =>
        set((state) => ({ drones: [...state.drones, ...drones] })),
      loadDrone: (drone) =>
        set((state) => ({ drones: [...state.drones, drone] })),
      editDrone: (id, drone) =>
        set((state) => ({
          drones: [...state.drones.filter((drone) => drone.id !== id), drone],
        })),
      removeDrone: (id) =>
        set((state) => ({
          drones: state.drones.filter((drone) => drone.id !== id),
        })),

      loadHistory: (orders) =>
        set((state) => ({
          orders: [...state.orders, ...orders],
        })),
      addHistory: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
