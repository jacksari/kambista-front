export function useHttpClient() {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      Accept: 'application/json',
    },
  })
}
