import { z } from 'zod'

export const historyFilterSchema = z.object({
  startDate: z.string().min(1, 'Selecciona la fecha de inicio.'),
  endDate: z.string().min(1, 'Selecciona la fecha de fin.'),
}).refine(
  data => !data.startDate || !data.endDate || data.startDate <= data.endDate,
  {
    message: 'La fecha final debe ser igual o posterior a la inicial.',
    path: ['endDate'],
  },
)

export type HistoryFilterData = z.infer<typeof historyFilterSchema>
