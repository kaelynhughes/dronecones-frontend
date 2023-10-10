type User = {
    username: String,
    userType: UserType,
    isActive: boolean,
    id: number
}

enum UserType {
    CUSTOMER = "Customer",
    EMPLOYEE = "Employee",
    MANAGER = "Manager"
}