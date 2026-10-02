import { z } from 'zod'

export const createTransactionSchema = z.object({
  monto: z
    .number({ error: 'Ingresa el monto que deseas cambiar.' })
    .positive('El monto debe ser mayor a cero.')
    .max(9_999_999.99, 'El monto máximo es 9,999,999.99.')
    .refine(
      value => (value.toString().split('.')[1]?.length ?? 0) <= 2,
      'El monto admite como máximo 2 decimales.',
    ),
  monedaOrigen: z.enum(['USD', 'PEN']),
  monedaDestino: z.enum(['USD', 'PEN']),
}).refine(
  data => data.monedaOrigen !== data.monedaDestino,
  {
    message: 'Las monedas de origen y destino deben ser diferentes.',
    path: ['monedaDestino'],
  },
)

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>
