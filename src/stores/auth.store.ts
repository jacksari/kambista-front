import { defineStore } from 'pinia'
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '~/types/auth.types'
import { useAuthService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const authService = useAuthService()
  const accessToken = useCookie<string | null>('kambista_access_token', {
    default: () => null,
    maxAge: 60 * 60 * 8,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  })

  const user = ref<AuthUser | null>(null)
  const initialized = ref(false)
  const profilePending = ref(false)

  const isAuthenticated = computed(() => Boolean(accessToken.value && user.value))

  function clearSession() {
    accessToken.value = null
    user.value = null
    initialized.value = true
  }

  async function fetchProfile() {
    if (!accessToken.value) {
      clearSession()
      return null
    }

    profilePending.value = true

    try {
      user.value = await authService.profile(accessToken.value)
      console.log('User:', user.value)
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
    accessToken.value = response.access_token
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

  function logout() {
    clearSession()
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
    restoreSession,
    logout,
  }
})
