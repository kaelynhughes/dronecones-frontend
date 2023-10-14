import { FullCone } from "./FullCone";

export type Order = {
    cones: FullCone[],
    totalPrice: number,
    employeeCut: number,
    remainder: number,
    timestamp: Date,
    id: number,
}