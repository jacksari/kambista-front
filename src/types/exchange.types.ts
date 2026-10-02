export type Currency = 'USD' | 'PEN'

export interface ExchangeRate {
  id: string
  tipoDeCambioCompra: number
  tipoDeCambioVenta: number
  fuente: string
  moneda: Currency
  fechaTipoDeCambio: string
  fechaCreacion: string
}
