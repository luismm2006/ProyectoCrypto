export interface LoginResponse {
    token : string,
    user : User
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
export interface Mission {
    id:          number;
    codigo:      string;
    titulo:      string;
    descripcion: string;
    secreto:     string;
    estado:      string;
    agenteId:    number | null;
}

export interface Aspirant {
    id: string;
    alias: string;
    email: string,
    nacionalidad: string
}