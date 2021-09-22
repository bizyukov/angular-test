export interface User {
    id: number
    firstName: string
    lastName: string
    middleName: string
    phone: number
    email: string
    banned: boolean
    banReason: string
    dateOfBirth: Date
    createdAt: Date
    updatedAt: Date
}
