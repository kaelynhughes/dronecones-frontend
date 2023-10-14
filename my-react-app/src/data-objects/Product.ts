export type Product = {
    name: String,
    stock: number,
    //ppu is the Price the customer will pay for a unit of this Product
    ppu: number,
    //cpu is the Cost we pay as the vendor to suppoly a unit of this Product
    cpu: number,
    img: File,
    type: ProductType,
    id: number,
}

export enum ProductType {
    ICECREAM = "Ice Cream",
    CONE = "Cone",
    TOPPING = "Topping"
}