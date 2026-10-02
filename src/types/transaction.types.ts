import type { Currency } from './exchange.types'

export interface CreateTransactionRequest {
  monedaOrigen: Currency
  monedaDestino: Currency
  monto: number
}

export interface Transaction extends CreateTransactionRequest {
  id: string
  montoCambiado: number
  tipoCambio: number
  fecha: string
}

export interface TransactionHistoryQuery {
  startDate: string
  endDate: string
  page: number
  perPage: number
  userId?: string
}

export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface TransactionHistoryResponse {
  data: Transaction[]
  pagination: PaginationMeta
}
