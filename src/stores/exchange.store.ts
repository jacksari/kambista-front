import { defineStore } from 'pinia'
import type { ExchangeRate } from '~/types/exchange.types'
import { useExchangeService } from '~/services/exchange.service'

const RATE_CACHE_TIME = 30_000

export const useExchangeStore = defineStore('exchange', () => {
  const exchangeService = useExchangeService()

  const currentRate = ref<ExchangeRate | null>(null)
  const pending = ref(false)
  const errorMessage = ref<string | null>(null)

  let lastFetchedAt = 0
  let pendingRequest: Promise<ExchangeRate> | null = null

  async function fetchCurrent(force = false) {
    const hasFreshRate = currentRate.value
      && Date.now() - lastFetchedAt < RATE_CACHE_TIME

    if (!force && hasFreshRate) {
      return currentRate.value as ExchangeRate
    }

    if (pendingRequest) {
      return await pendingRequest
    }

    pending.value = true
    errorMessage.value = null

    pendingRequest = exchangeService.current()

    try {
      const rate = await pendingRequest
      currentRate.value = rate
      lastFetchedAt = Date.now()
      return rate
    } finally {
      pending.value = false
      pendingRequest = null
    }
  }

  function clear() {
    currentRate.value = null
    errorMessage.value = null
    lastFetchedAt = 0
  }

  return {
    currentRate,
    pending,
    errorMessage,
    fetchCurrent,
    clear,
  }
})
