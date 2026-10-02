export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface AuthUser {
  id: string
  nombre: string
  email: string
  rol: UserRole
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  nombre: string
}

export interface AuthResponse {
  access_token: string
  usuario: AuthUser
}

export type ProfileResponse = AuthUser
