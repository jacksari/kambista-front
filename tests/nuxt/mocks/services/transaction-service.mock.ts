import { vi } from 'vitest'
import type { Transaction } from '~/types/transaction.types'
import type { CreateTransactionFormData } from '~/features/transactions/validation/create-transaction.schema'

export const createTransactionFormMock: CreateTransactionFormData = {
  monto: 100,
  monedaOrigen: 'USD',
  monedaDestino: 'PEN',
}

export const createdTransactionMock: Transaction = {
  id: 'transaction-1',
  ...createTransactionFormMock,
  montoCambiado: 345,
  tipoCambio: 3.45,
  fecha: '2026-10-01T09:58:49.057Z',
}

export const createTransactionMock = vi.fn()

vi.mock('~/services/transaction.service', () => ({
  useTransactionService: () => ({
    create: createTransactionMock,
  }),
}))
