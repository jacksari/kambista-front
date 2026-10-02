import type {
  AuthResponse,
  LoginRequest,
  ProfileResponse,
  RegisterRequest,
} from '~/types/auth.types'
import { useHttpClient } from './http.client'

export function useAuthService() {
  const http = useHttpClient()

  return {
    login(input: LoginRequest) {
      return http<AuthResponse>('/auth/login', {
        method: 'POST',
        body: input,
      })
    },

    register(input: RegisterRequest) {
      return http<AuthResponse>('/auth/register', {
        method: 'POST',
        body: input,
      })
    },

    profile() {
      return http<ProfileResponse>('/auth/profile', {
        method: 'GET',
      })
    },
  }
}
