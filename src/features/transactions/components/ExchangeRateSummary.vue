<script setup lang="ts">
import type { Currency, ExchangeRate } from '~/types/exchange.types'
import { formatMoney } from '../utils/transaction-formatters'

defineProps<{
  pending: boolean
  currentRate: ExchangeRate | null
  appliedRate: number | null
  estimatedAmount: number | null
  sourceCurrency: Currency
  targetCurrency: Currency
}>()
</script>

<template>
  <div
    v-if="pending"
    class="h-32 animate-pulse rounded-2xl bg-slate-100"
  />

  <div
    v-else-if="currentRate"
    class="grid gap-5 rounded-2xl bg-gradient-to-r from-primary-50 to-cyan-50 p-5 sm:grid-cols-2 sm:p-6"
  >
    <div class="flex items-center gap-4 border-b border-primary-100 pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-5">
      <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-primary-700">
        <UIcon name="i-lucide-refresh-cw" class="size-6" />
      </span>
      <div>
        <p class="text-sm font-semibold text-slate-700">Tipo de cambio aplicado</p>
        <p class="mt-1 text-3xl font-bold tabular-nums text-slate-950">
          {{ appliedRate?.toFixed(3) || '—' }}
        </p>
        <p class="mt-1 text-xs text-slate-500">
          {{ currentRate.fuente }} · {{ sourceCurrency === 'USD' ? 'Venta' : 'Compra' }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-4 sm:pl-2">
      <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-primary-700">
        <UIcon name="i-lucide-calculator" class="size-6" />
      </span>
      <div>
        <p class="text-sm font-semibold text-slate-700">Monto estimado que recibirás</p>
        <p class="mt-1 text-3xl font-bold tabular-nums text-slate-950">
          {{ estimatedAmount === null ? '—' : formatMoney(estimatedAmount, targetCurrency) }}
        </p>
        <p class="mt-1 text-xs text-slate-500">
          El monto final será confirmado por la API.
        </p>
      </div>
    </div>
  </div>
</template>
