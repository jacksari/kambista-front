import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  exchangeRateMock,
  getCurrentRateMock,
} from '../mocks/services/exchange-service.mock'

const { useExchangeStore } = await import('~/stores/exchange.store')

describe('useExchangeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    getCurrentRateMock.mockReset()
  })

  it('obtiene y almacena el tipo de cambio actual', async () => {
    getCurrentRateMock.mockResolvedValue(exchangeRateMock)
    const store = useExchangeStore()

    const result = await store.fetchCurrent()

    expect(getCurrentRateMock).toHaveBeenCalledOnce()
    expect(result).toEqual(exchangeRateMock)
    expect(store.currentRate).toEqual(exchangeRateMock)
    expect(store.pending).toBe(false)
  })

  it('reutiliza el valor almacenado durante el tiempo de caché', async () => {
    getCurrentRateMock.mockResolvedValue(exchangeRateMock)
    const store = useExchangeStore()

    await store.fetchCurrent()
    await store.fetchCurrent()

    expect(getCurrentRateMock).toHaveBeenCalledOnce()
  })

  it('vuelve a consultar cuando force es true', async () => {
    getCurrentRateMock.mockResolvedValue(exchangeRateMock)
    const store = useExchangeStore()

    await store.fetchCurrent()
    await store.fetchCurrent(true)

    expect(getCurrentRateMock).toHaveBeenCalledTimes(2)
  })

  it('limpia el tipo de cambio almacenado', async () => {
    getCurrentRateMock.mockResolvedValue(exchangeRateMock)
    const store = useExchangeStore()
    await store.fetchCurrent()

    store.clear()

    expect(store.currentRate).toBeNull()
  })
})
