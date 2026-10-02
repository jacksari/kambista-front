import { defineStore } from 'pinia'
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '~/types/auth.types'
import { useAuthSession } from '~/composables/use-auth-session'
import { useAuthService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const authService = useAuthService()
  const {
    accessToken,
    user,
    initialized,
    setAccessToken,
    clearSession,
  } = useAuthSession()
  const profilePending = ref(false)

  const isAuthenticated = computed(() => Boolean(accessToken.value && user.value))

  async function fetchProfile() {
    if (!accessToken.value) {
      clearSession()
      return null
    }

    profilePending.value = true

    try {
      user.value = await authService.profile()
      initialized.value = true
      return user.value
    } catch (error) {
      clearSession()
      throw error
    } finally {
      profilePending.value = false
    }
  }

  async function establishSession(response: AuthResponse) {
    setAccessToken(response.access_token)
    user.value = null
    initialized.value = false

    return await fetchProfile()
  }

  async function login(input: LoginRequest) {
    const response = await authService.login(input)
    return await establishSession(response)
  }

  async function register(input: RegisterRequest) {
    const response = await authService.register(input)
    return await establishSession(response)
  }

  function logout() {
    clearSession()
  }

  async function restoreSession() {
    if (initialized.value) {
      return user.value
    }

    if (!accessToken.value) {
      initialized.value = true
      return null
    }

    try {
      return await fetchProfile()
    } catch {
      return null
    }
  }

  return {
    accessToken,
    user,
    initialized,
    profilePending,
    isAuthenticated,
    login,
    register,
    fetchProfile,
    logout,
    restoreSession,
  }
})
