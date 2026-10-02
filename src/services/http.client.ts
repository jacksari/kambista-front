import { useAuthSession } from '~/composables/use-auth-session'

export function useHttpClient() {
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const { accessToken, clearSession } = useAuthSession()

  return $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      Accept: 'application/json',
    },
    onRequest({ options }) {
      if (!accessToken.value) {
        return
      }

      const headers = new Headers(options.headers)
      headers.set('Authorization', `Bearer ${accessToken.value}`)
      options.headers = headers
    },
    async onResponseError({ response }) {
      if (response.status !== 401 || !accessToken.value) {
        return
      }

      clearSession()
      await nuxtApp.runWithContext(() => navigateTo('/login'))
    },
  })
}
