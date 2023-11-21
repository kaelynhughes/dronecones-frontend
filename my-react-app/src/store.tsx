import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Drone,
  FullCone,
  Order,
  Product,
  ProductType,
  User,
  UserType,
} from "./types";
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
  users: User[];
  error: string;

  loadedProducts: boolean;
  loadedDrones: boolean;
  loadedUsers: boolean;
  loadedEmployeeOrders: boolean;
  loadedCustomerOrders: boolean;
  loadedManagerOrders: boolean;
};

type DroneConesActions = {
  login: (username: string, password: string) => void;
  signup: (username: string, password: string, user_type: UserType) => void;

  changeMode: (mode: UserType) => void;
  changePath: (path: string) => void;
  setError: (error: string) => void;
  removeError: () => void;

  loadProducts: () => void;
  addProduct: (product: Product) => void;
  editProduct: (id: number, product: Product) => void;
  removeProduct: (id: number) => void;
  checkoutOrder: (order: Order) => void;

  addConeToCart: (cone: FullCone) => void;
  addConesToCart: (cones: FullCone[]) => void;
  removeConeFromCart: (cone: FullCone) => void;
  clearCart: () => void;

  loadDrones: () => void;
  editDrone: (id: number, drone: Drone) => void;
  createDrone: (drone: Drone) => void;
  removeDrone: (serial_number: string) => void;

  loadUsers: () => void;
  editUser: (user: User) => void;

  loadCustomerHistory: () => void;
  loadEmployeeHistory: () => void;
  loadManagerHistory: () => void;
  addHistory: (order: Order) => void;

  clearState: () => void;
};

const initialState: DroneConesState = {
  appPath: "menu",
  user: { user_type: UserType.GUEST, username: "Guest", is_active: true },
  userMode: UserType.CUSTOMER,
  products: [],
  cart: [],
  drones: [],
  orders: [],
  users: [],
  error: "",

  loadedProducts: false,
  loadedDrones: false,
  loadedUsers: false,
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
      setError: (error) => set(() => ({ error: error })),
      removeError: () => set(() => ({ error: "" })),

      login: async (username, password) => {
        const body = { username: username, password: password };
        try {
          const response = await axios.post(
            `${BACKEND_URL_DEV}/auth/login`,
            body
          );
          if (!response.data?.error) {
            set((state) => ({
              ...state,
              user: {
                username: username,
                id: response.data.id,
                user_type: response.data.user_type,
                is_active: response.data.is_active,
              },
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },

      signup: async (username, password, user_type) => {
        const body = {
          username: username,
          password: password,
          user_type: user_type,
        };
        try {
          const response = await axios.post(
            `${BACKEND_URL_DEV}/auth/register`,
            body
          );
          if (!response.data?.error) {
            get().login(username, password);
          } else {
            set((state) => ({
              ...state,
              error: "Error registering: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },

      loadProducts: async () => {
        try {
          const response = await axios.get(`${BACKEND_URL_DEV}/customer/menu`);
          if (!response.data?.error) {
            set((state) => ({
              loadedProducts: true,
              products: [
                ...state.products,
                ...response.data.toppings.filter(
                  (product: Product) =>
                    state.products.filter(
                      (stateProduct) => stateProduct.id === product.id
                    ).length === 0
                ),
                ...response.data.cones.filter(
                  (product: Product) =>
                    state.products.filter(
                      (stateProduct) => stateProduct.id === product.id
                    ).length === 0
                ),
                ...response.data.icecream.filter(
                  (product: Product) =>
                    state.products.filter(
                      (stateProduct) => stateProduct.id === product.id
                    ).length === 0
                ),
              ],
            }));
          } else {
            set((state) => ({
              ...state,
              loadedProducts: true,
              error: "Error loading menu: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },
      checkoutOrder: async (order) => {
        const userId = get().user?.id || 0;
        const date = new Date();
        const parsedCones: Array<any> = order.cones.map((cone) => {
          const new_element = {
            cone: cone.products
              .filter((product) => product.product_type === ProductType.CONE)
              ?.at(0)?.id,
            scoop_1: cone.products
              .filter(
                (product) => product.product_type === ProductType.ICECREAM
              )
              .at(0)?.id,
            scoop_2:
              cone.products
                .filter(
                  (product) => product.product_type === ProductType.ICECREAM
                )
                ?.at(1)?.id || null,
            scoop_3:
              cone.products
                .filter(
                  (product) => product.product_type === ProductType.ICECREAM
                )
                ?.at(2)?.id || null,
            topping_1:
              cone.products
                .filter(
                  (product) => product.product_type === ProductType.TOPPING
                )
                ?.at(0)?.id || null,
            topping_2:
              cone.products
                .filter(
                  (product) => product.product_type === ProductType.TOPPING
                )
                ?.at(1)?.id || null,
            topping_3:
              cone.products
                .filter(
                  (product) => product.product_type === ProductType.TOPPING
                )
                ?.at(2)?.id || null,
          };
          return new_element;
        });
        if (parsedCones.length > 3) {
          set((state) => ({
            ...state,
            error:
              "Error: You cannot currently order this many cones. Only 3 cones may be ordered at once.",
          }));
        } else {
          try {
            const body = {
              total_price: order.total_price,
              employee_cut: order.employee_cut,
              profit: order.profit,
              order_time: date.toLocaleString(),
              cones: parsedCones,
            };
            const response = await axios.post(
              `${BACKEND_URL_DEV}/customer/${userId}/checkout`,
              body
            );
            if (!response.data?.error) {
              set((state) => ({
                cart: [],
              }));
            } else {
              set((state) => ({
                ...state,
                error:
                  "Error placing order: " +
                  response.data?.error +
                  ", please try again.",
              }));
            }
          } catch (error) {
            console.log(error);
            set((state) => ({ ...state, error: `${error}` }));
          }
        }
      },
      addProduct: async (product) => {
        try {
          const body = {
            display_name: product.display_name,
            price_per_unit: product?.price_per_unit || 0,
            product_type: product.product_type,
            stock: product?.stock || 0,
          };
          const response: AxiosResponse = await axios.post(
            `${BACKEND_URL_DEV}/manager/product`,
            body
          );
          if (response.data?.success) {
            set((state) => ({
              products: [
                ...state.products,
                { ...product, id: response.data.success },
              ],
            }));
          } else {
            set((state) => ({
              ...state,
              error: "Error creating product: " + response.data.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },
      editProduct: async (id, product) => {
        const userId = get().user?.id || 0;
        try {
          const body = {
            display_name: product.display_name,
            price_per_unit: product?.price_per_unit || 0,
            product_type: product.product_type,
            stock: product?.stock || 0,
            id: product?.id || 0,
          };
          const response: AxiosResponse = await axios.put(
            `${BACKEND_URL_DEV}/manager/product`,
            body
          );
          if (response.data?.success) {
            set((state) => ({
              products: [
                ...state.products.filter((product) => product.id !== id),
                product,
              ],
            }));
          } else {
            set((state) => ({
              ...state,
              error: "Error updating product: " + response.data.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },
      removeProduct: async (id) => {
        const body = { id: id };
        try {
          const response: AxiosResponse = await axios.delete(
            `${BACKEND_URL_DEV}/manager/product`,
            { data: body }
          );
          if (!response.data?.error) {
            set((state) => ({
              ...state,
              products: state.products.filter((product) => product.id !== id),
            }));
          } else {
            set((state) => ({
              ...state,
              error: "Error deleting product: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },

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
          if (response.data?.drones?.length > 0) {
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
            set((state) => ({
              ...state,
              loadedDrones: true,
              error: "Error loading drones: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },
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
          } else {
            set((state) => ({
              ...state,
              error: "Error editing drone: " + response.data.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
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
          } else {
            set((state) => ({
              ...state,
              error: "Error creating drone: " + response.data.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
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
          } else {
            set((state) => ({
              ...state,
              error: "Error removing drone: " + response.data.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },

      loadUsers: async () => {
        try {
          const response: AxiosResponse = await axios.get(
            `${BACKEND_URL_DEV}/manager/users`
          );
          if (response.data?.users?.length > 0) {
            const userArray: User[] = response.data.users;
            set((state) => ({
              users: [
                ...state.users,
                ...userArray.filter(
                  (user) =>
                    state.users.filter((stateUser) => stateUser.id === user.id)
                      .length === 0
                ),
              ],
              loadedUsers: true,
            }));
          } else {
            set((state) => ({
              ...state,
              loadedUsers: true,
              error: "Error loading users: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },
      editUser: async (user) => {
        const userId = user?.id || 0;
        if (userId !== 0) {
          try {
            const body = {
              username: user.username,
              is_active: user.is_active,
            };
            const response: AxiosResponse = await axios.patch(
              `${BACKEND_URL_DEV}/customer/${userId}/account`,
              body
            );
            if (!response.data?.error) {
              set((state) => ({
                users: [
                  ...state.users.filter(
                    (stateUser) => stateUser.id !== user.id
                  ),
                  user,
                ],
              }));
            } else {
              set((state) => ({
                ...state,
                error: "Error editing user: " + response.data.error,
              }));
            }
          } catch (error) {
            console.log(error);
            set((state) => ({ ...state, error: `${error}` }));
          }
        }
      },

      loadCustomerHistory: async () => {
        const userId = get().user?.id || 0;
        try {
          const response: AxiosResponse = await axios.get(
            `${BACKEND_URL_DEV}/customer/${userId}/history`
          );
          if (response.data?.full_orders.length > 0) {
            set((state) => ({
              orders: [...state.orders, ...response.data.full_orders],
              loadedCustomerOrders: true,
            }));
          } else {
            set((state) => ({
              ...state,
              loadedCustomerOrders: true,
              error: "Error loading history: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
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
            set((state) => ({
              ...state,
              loadedEmployeeOrders: true,
              error: "Error loading history: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
        }
      },
      loadManagerHistory: async () => {
        const userId = get().user?.id || 0;
        try {
          const response: AxiosResponse = await axios.get(
            `${BACKEND_URL_DEV}/customer/${userId}/history`
          );
          if (response.data?.full_orders.length > 0) {
            set((state) => ({
              orders: [...state.orders, ...response.data.full_orders],
              loadedManagerOrders: true,
            }));
          } else {
            set((state) => ({
              ...state,
              loadedManagerOrders: true,
              error: "Error loading history: " + response.data?.error,
            }));
          }
        } catch (error) {
          console.log(error);
          set((state) => ({ ...state, error: `${error}` }));
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
