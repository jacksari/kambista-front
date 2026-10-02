import { vi } from 'vitest'
import type { ExchangeRate } from '~/types/exchange.types'

export const exchangeRateMock: ExchangeRate = {
  id: 'rate-1',
  tipoDeCambioCompra: 3.441,
  tipoDeCambioVenta: 3.45,
  fuente: 'SUNAT',
  moneda: 'USD',
  fechaTipoDeCambio: '2026-09-30',
  fechaCreacion: '2026-10-01T04:59:37.221Z',
}

export const getCurrentRateMock = vi.fn()

vi.mock('~/services/exchange.service', () => ({
  useExchangeService: () => ({
    current: getCurrentRateMock,
  }),
}))
