import type { UsersResponse } from '~/types/user.types'
import { useHttpClient } from './http.client'

export function useUserService() {
  const http = useHttpClient()

  return {
    list() {
      return http<UsersResponse>('/users', {
        method: 'GET',
      })
    },
  }
}
