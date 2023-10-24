import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Drone, FullCone, Order, Product, User, UserType } from "./types";

type DroneConesState = {
  user: User;
  userMode: UserType;
  products: Product[];
  cart: FullCone[];
  drones: Drone[];
  orders: Order[];
};

type DroneConesActions = {
  login: (user: User) => void;
  logout: () => void;

  changeMode: (mode: UserType) => void;

  loadProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;

  addConeToCart: (cone: FullCone) => void;
  addConesToCart: (cones: FullCone[]) => void;
  removeConeFromCart: (cone: FullCone) => void;
  clearCart: () => void;

  loadDrones: (drones: Drone[]) => void;
  loadDrone: (drone: Drone) => void;
  removeDrone: (drone: Drone) => void;

  loadHistory: (orders: Order[]) => void;
  addHistory: (order: Order) => void;

  clearState: () => void;

  //TODO: Add update functions for if an item is neither created nor removed, but changed?
};

const initialState: DroneConesState = {
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

      login: (user) => set(() => ({ user: user })),
      logout: () =>
        set(() => ({
          user: { userType: UserType.GUEST, username: "Guest", isActive: true },
        })),

      loadProducts: (products) =>
        set((state) => ({ products: [...state.products, ...products] })),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      addConeToCart: (cone) =>
        set((state) => ({ cart: [...state.cart, cone] })),
      addConesToCart: (cones) =>
        set((state) => ({ cart: [...state.cart, ...cones] })),
      removeConeFromCart: (cone) =>
        set((state) => ({
          cart: state.cart.splice(
            state.cart.findIndex((element) => element === cone),
            1
          ),
        })),
      clearCart: () => set(() => ({ cart: [] })),

      loadDrones: (drones) =>
        set((state) => ({ drones: [...state.drones, ...drones] })),
      loadDrone: (drone) =>
        set((state) => ({ drones: [...state.drones, drone] })),
      removeDrone: (drone) =>
        set((state) => ({
          drones: state.drones.splice(
            state.drones.findIndex((element) => element === drone),
            1
          ),
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
