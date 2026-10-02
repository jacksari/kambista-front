import { describe, expect, it } from 'vitest'
import { createTransactionSchema } from '~/features/transactions/validation/create-transaction.schema'

const validTransaction = {
  monto: 100.50,
  monedaOrigen: 'USD' as const,
  monedaDestino: 'PEN' as const,
}

describe('createTransactionSchema', () => {
  it('acepta una transacción válida', () => {
    const result = createTransactionSchema.safeParse(validTransaction)

    expect(result.success).toBe(true)
  })

  it('rechaza un monto menor o igual a cero', () => {
    const result = createTransactionSchema.safeParse({
      ...validTransaction,
      monto: 0,
    })

    expect(result.success).toBe(false)
  })

  it('rechaza un monto con más de dos decimales', () => {
    const result = createTransactionSchema.safeParse({
      ...validTransaction,
      monto: 100.123,
    })

    expect(result.success).toBe(false)
  })

  it('rechaza monedas de origen y destino iguales', () => {
    const result = createTransactionSchema.safeParse({
      ...validTransaction,
      monedaDestino: 'USD',
    })

    expect(result.success).toBe(false)
  })

  it('rechaza montos superiores a siete dígitos enteros', () => {
    const result = createTransactionSchema.safeParse({
      ...validTransaction,
      monto: 10_000_000,
    })

    expect(result.success).toBe(false)
  })
})
