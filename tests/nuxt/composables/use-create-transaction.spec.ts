import type { FormSubmitEvent } from '@nuxt/ui'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import type { CreateTransactionFormData } from '~/features/transactions/validation/create-transaction.schema'
import {
  createdTransactionMock,
  createTransactionFormMock,
  createTransactionMock,
} from '../mocks/services/transaction-service.mock'

const { useCreateTransaction } = await import(
  '~/features/transactions/composables/use-create-transaction'
)

describe('useCreateTransaction', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    createTransactionMock.mockReset()
  })

  it('registra una transacción con los datos del formulario', async () => {
    createTransactionMock.mockResolvedValue(createdTransactionMock)
    const { submit, pending, errorMessage } = useCreateTransaction()
    const event = {
      data: createTransactionFormMock,
    } as FormSubmitEvent<CreateTransactionFormData>

    const result = await submit(event)

    expect(createTransactionMock).toHaveBeenCalledOnce()
    expect(createTransactionMock).toHaveBeenCalledWith(createTransactionFormMock)
    expect(result).toEqual(createdTransactionMock)
    expect(pending.value).toBe(false)
    expect(errorMessage.value).toBeNull()
  })
})
