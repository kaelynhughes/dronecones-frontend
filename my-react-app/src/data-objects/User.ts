export type User = {
    username: String,
    userType: UserType,
    isActive: boolean,
    id: number
}

export enum UserType {
    CUSTOMER = "Customer",
    EMPLOYEE = "Employee",
    MANAGER = "Manager"
}