import type {
  CreateTransactionRequest,
  Transaction,
  TransactionHistoryQuery,
  TransactionHistoryResponse,
} from '~/types/transaction.types'
import { useHttpClient } from './http.client'

export function useTransactionService() {
  const http = useHttpClient()

  return {
    create(input: CreateTransactionRequest) {
      return http<Transaction>('/transactions', {
        method: 'POST',
        body: input,
      })
    },

    history(query: TransactionHistoryQuery) {
      return http<TransactionHistoryResponse>('/transactions/history', {
        method: 'GET',
        query,
      })
    },
  }
}
