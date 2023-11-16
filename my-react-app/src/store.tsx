import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Drone, FullCone, Order, Product, User, UserType } from "./types";
import { BACKEND_URL_DEV } from "./constants";
import axios, { AxiosResponse } from "axios";
import { json } from "react-router-dom";

type DroneConesState = {
  appPath: string;
  user: User;
  userMode: UserType;
  products: Product[];
  cart: FullCone[];
  drones: Drone[];
  orders: Order[];

  loadedProducts: boolean;
  loadedDrones: boolean;
  loadedEmployeeOrders: boolean;
  loadedCustomerOrders: boolean;
  loadedManagerOrders: boolean;
};

type DroneConesActions = {
  login: (user: User) => void;

  changeMode: (mode: UserType) => void;
  changePath: (path: string) => void;

  loadProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  editProduct: (id: number, product: Product) => void;

  addConeToCart: (cone: FullCone) => void;
  addConesToCart: (cones: FullCone[]) => void;
  removeConeFromCart: (cone: FullCone) => void;
  clearCart: () => void;

  loadDrones: () => void;
  loadDrone: (drone: Drone) => void;
  editDrone: (id: number, drone: Drone) => void;
  createDrone: (drone: Drone) => void;
  removeDrone: (serial_number: string) => void;

  loadEmployeeHistory: () => void;
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

  loadedProducts: false,
  loadedDrones: false,
  loadedEmployeeOrders: false,
  loadedCustomerOrders: false,
  loadedManagerOrders: false,
};

export const useStore = create<DroneConesState & DroneConesActions>()(
  persist(
    (set, get) => ({
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
          products: [...state.products.filter((item) => item !== product)],
        })),
      editProduct: (id, product) =>
        set((state) => ({
          products: [
            ...state.products.filter((product) => product.id !== id),
            product,
          ],
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

      loadDrones: async () => {
        const userId = get().user?.id || 0;
        try {
          const response: AxiosResponse = await axios.get(
            `${BACKEND_URL_DEV}/employee/${userId}/drones`
          );
          if (response.data?.drones.length > 0) {
            const droneArray: Drone[] = response.data.drones;
            set((state) => ({
              drones: [
                ...state.drones,
                ...droneArray.filter(
                  (drone) =>
                    state.drones.filter(
                      (stateDrone) => stateDrone.id === drone.id
                    ).length === 0
                ),
              ],
              loadedDrones: true,
            }));
          } else {
            set((state) => ({ ...state, loadedDrones: true }));
          }
        } catch (error) {
          console.log(error);
        }
      },
      loadDrone: (drone) =>
        set((state) => ({ drones: [...state.drones, drone] })),
      editDrone: async (id, drone) => {
        const userId = get().user?.id || 0;
        try {
          const body = {
            display_name: drone.display_name,
            drone_size: drone.drone_size,
            serial_number: drone.serial_number,
            is_active: drone.is_active ? 1 : 0,
          };
          const response: AxiosResponse = await axios.put(
            `${BACKEND_URL_DEV}/employee/${userId}/drone`,
            body
          );
          if (!response.data?.error) {
            set((state) => ({
              drones: [
                ...state.drones.filter((drone) => drone.id !== id),
                drone,
              ],
            }));
          }
        } catch (error) {
          console.log(error);
        }
      },

      createDrone: async (drone) => {
        const userId = get().user?.id || 0;
        try {
          const body = {
            display_name: drone.display_name,
            drone_size: drone.drone_size,
            serial_number: drone.serial_number,
            is_active: drone.is_active ? 1 : 0,
          };
          const response: AxiosResponse = await axios.post(
            `${BACKEND_URL_DEV}/employee/${userId}/drone`,
            body
          );
          if (response.data?.Drone_id) {
            set((state) => ({
              drones: [
                ...state.drones,
                { ...drone, id: response.data.Drone_id },
              ],
            }));
          }
        } catch (error) {
          console.log(error);
        }
      },
      removeDrone: async (serial_number) => {
        const userId = get().user?.id || 0;
        try {
          const body = {
            serial_number: serial_number,
          };
          const response: AxiosResponse = await axios.delete(
            `${BACKEND_URL_DEV}/employee/${userId}/drone`,
            { data: body }
          );
          if (!response.data?.error) {
            set((state) => ({
              drones: state.drones.filter(
                (drone) => drone.serial_number !== serial_number
              ),
            }));
          }
        } catch (error) {
          console.log(error);
        }
      },

      loadEmployeeHistory: async () => {
        const userId = get().user?.id || 0;
        try {
          const response: AxiosResponse = await axios.get(
            `${BACKEND_URL_DEV}/customer/${userId}/history`
          );
          if (response.data?.full_orders.length > 0) {
            set((state) => ({
              orders: [...state.orders, ...response.data.full_orders],
              loadedEmployeeOrders: true,
            }));
          } else {
            set((state) => ({ ...state, loadedEmployeeOrders: true }));
          }
        } catch (error) {
          console.log(error);
        }
      },
      addHistory: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
