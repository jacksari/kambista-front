import type { ExchangeRate } from '~/types/exchange.types'
import { useHttpClient } from './http.client'

export function useExchangeService() {
  const http = useHttpClient()

  return {
    current() {
      return http<ExchangeRate>('/exchange-rates/current', {
        method: 'GET',
      })
    },
  }
}
