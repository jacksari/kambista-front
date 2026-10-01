import { useAuthStore } from '~/stores/auth.store'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  await authStore.restoreSession()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
