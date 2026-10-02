import { vi } from 'vitest'
import {
  UserRole,
  type AuthResponse,
  type AuthUser,
  type LoginRequest,
  type RegisterRequest,
} from '~/types/auth.types'

export const loginRequestMock: LoginRequest = {
  email: 'janasarii@gmail.com',
  password: '12345678',
}

export const registerRequestMock: RegisterRequest = {
  ...loginRequestMock,
  nombre: 'Jack Sari',
}

export const authUserMock: AuthUser = {
  id: 'user-1',
  nombre: 'Jack Sari',
  email: loginRequestMock.email,
  rol: UserRole.USER,
}

export const authResponseMock: AuthResponse = {
  access_token: 'access-token-test',
  usuario: authUserMock,
}

export const loginMock = vi.fn()
export const registerMock = vi.fn()
export const profileMock = vi.fn()

vi.mock('~/services/auth.service', () => ({
  useAuthService: () => ({
    login: loginMock,
    register: registerMock,
    profile: profileMock,
  }),
}))
