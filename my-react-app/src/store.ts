import { create } from "zustand";
import { Drone, FullCone, Product, UserType } from "./types";

type DroneConesState = {
    user: UserType;
    products: Product[];
    cart: FullCone[];
    drones: Drone[];
}

type DroneConesActions = {
    login: (user: UserType) => void;
    logout: () => void;
    
    loadProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    updateProducts: (products: Product[]) => void;
    
    addConeToCart: (cone: FullCone) => void;
    addConesToCart: (cones: FullCone[]) => void;
    removeConeFromCart: (cone: FullCone) => void;
    clearCart: () => void;
    
    loadDrones: (drones: Drone[]) => void;
    loadDrone: (drone: Drone) => void;
    removeDrone: (drone: Drone) => void;
    
    clearState: () => void;
}

const initialState: DroneConesState = {
    user: UserType.GUEST,
    products: [],
    cart: [],
    drones: [],
}

const useStore = create<DroneConesState & DroneConesActions>()((set) => ({
    ...initialState,
    clearState: () => set(initialState),

    login: (user) => set(() => ({user: user})),
    logout: () => set(() => ({user: UserType.GUEST})),

    loadProducts: (products) => set((state) => ({products: [...state.products, ...products]})),
    addProduct: (product) => set((state) => ({products: [...state.products, product]})),
    updateProducts: (products) => set((state) => (
        {products: state.products.map((element) => {
            const index = products.findIndex((product) => product?.id === element.id);
            if (index > 0) {
                return element;
            }
            
        }
        )
    })),

    addConeToCart: (cone) => set((state) => ({cart: [...state.cart, cone]})),
    addConesToCart: (cones) => set((state) => ({cart: [...state.cart, ...cones]})),
    removeConeFromCart: (cone) => set((state) => ({cart: state.cart.splice(state.cart.findIndex((element) => element === cone), 1)})),
    clearCart: () => set(() => ({cart: []})),

    loadDrones: (drones) => set((state) => ({drones: [...state.drones, ...drones]})),
    loadDrone: (drone) => set((state) => ({drones: [...state.drones, drone]})),
    removeDrone: (drone) => set((state) => ({drones: state.drones.splice(state.drones.findIndex((element) => element === drone), 1)}))
}))