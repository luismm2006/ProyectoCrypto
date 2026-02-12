export interface LoginResponse {
    token : string,
    User : User
}

export interface User{
    id : string,
    email : string,
    nombre : string,
    alias : string,
    role : string
}
export interface JWTPayload {
    id : string,
    email: string,
    nombre: string, 
    role: string,
    alias : string,
    iat: number,
    exp: number
}