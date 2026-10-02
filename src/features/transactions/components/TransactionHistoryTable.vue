<script setup lang="ts">
import type {
  PaginationMeta,
  Transaction,
} from '~/types/transaction.types'
import type { Currency } from '~/types/exchange.types'
import {
  formatMoney,
  formatTransactionDate,
} from '../utils/transaction-formatters'

defineProps<{
  transactions: Transaction[]
  pagination: PaginationMeta
  pending: boolean
  errorMessage: string | null
}>()

const emit = defineEmits<{
  retry: []
  changePage: [page: number]
}>()

const currencyFlag: Record<Currency, string> = {
  USD: '🇺🇸',
  PEN: '🇵🇪',
}
</script>

<template>
  <section class="overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-sm">
    <header class="flex items-center gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
      <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700">
        <UIcon name="i-lucide-receipt-text" class="size-6" />
      </span>
      <div>
        <h2 class="text-lg font-bold text-slate-950 sm:text-xl">
          Transacciones realizadas
        </h2>
        <p class="mt-0.5 text-sm text-slate-500">
          {{ pagination.total }} {{ pagination.total === 1 ? 'resultado' : 'resultados' }}
        </p>
      </div>
    </header>

    <div v-if="pending" class="space-y-3 p-5 sm:p-7">
      <div
        v-for="row in 5"
        :key="row"
        class="h-14 animate-pulse rounded-xl bg-slate-100"
      />
    </div>

    <div v-else-if="errorMessage" class="p-5 sm:p-7">
      <UAlert
        color="error"
        variant="soft"
        icon="i-lucide-circle-alert"
        title="No se pudo cargar el historial"
        :description="errorMessage"
        :actions="[{ label: 'Reintentar', color: 'error', variant: 'soft', onClick: () => emit('retry') }]"
      />
    </div>

    <div
      v-else-if="transactions.length === 0"
      class="m-5 grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-300 px-5 text-center sm:m-7"
    >
      <div class="max-w-sm py-10">
        <span class="mx-auto grid size-16 place-items-center rounded-full bg-primary-50 text-primary-700">
          <UIcon name="i-lucide-file-search-2" class="size-8" />
        </span>
        <h3 class="mt-5 text-lg font-bold text-slate-950">
          No se encontraron transacciones
        </h3>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          Intenta con un rango de fechas diferente o registra una nueva operación.
        </p>
      </div>
    </div>

    <template v-else>
      <div class="hidden overflow-x-auto md:block">
        <table class="w-full min-w-[58rem] border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th class="px-7 py-4">Fecha</th>
              <th class="px-5 py-4">Moneda origen</th>
              <th class="px-5 py-4">Moneda destino</th>
              <th class="px-5 py-4">Monto</th>
              <th class="px-5 py-4">Tipo de cambio</th>
              <th class="px-7 py-4 text-right">Monto cambiado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
              class="transition-colors hover:bg-primary-50/30"
            >
              <td class="whitespace-nowrap px-7 py-4 text-sm text-slate-600">
                {{ formatTransactionDate(transaction.fecha) }}
              </td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-2.5 font-semibold text-slate-700">
                  <span class="text-xl" aria-hidden="true">{{ currencyFlag[transaction.monedaOrigen] }}</span>
                  {{ transaction.monedaOrigen }}
                </span>
              </td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-2.5 font-semibold text-slate-700">
                  <span class="text-xl" aria-hidden="true">{{ currencyFlag[transaction.monedaDestino] }}</span>
                  {{ transaction.monedaDestino }}
                </span>
              </td>
              <td class="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                {{ formatMoney(transaction.monto, transaction.monedaOrigen) }}
              </td>
              <td class="px-5 py-4 font-medium tabular-nums text-slate-600">
                {{ transaction.tipoCambio.toFixed(3) }}
              </td>
              <td class="whitespace-nowrap px-7 py-4 text-right font-bold text-slate-950">
                {{ formatMoney(transaction.montoCambiado, transaction.monedaDestino) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="divide-y divide-slate-100 md:hidden">
        <article
          v-for="transaction in transactions"
          :key="transaction.id"
          class="p-5"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-medium text-slate-500">
                {{ formatTransactionDate(transaction.fecha) }}
              </p>
              <div class="mt-3 flex items-center gap-2 font-bold text-slate-900">
                <span>{{ currencyFlag[transaction.monedaOrigen] }}</span>
                <span>{{ transaction.monedaOrigen }}</span>
                <UIcon name="i-lucide-arrow-right" class="size-4 text-slate-400" />
                <span>{{ currencyFlag[transaction.monedaDestino] }}</span>
                <span>{{ transaction.monedaDestino }}</span>
              </div>
            </div>
            <span class="rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">
              {{ transaction.tipoCambio.toFixed(3) }}
            </span>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-3.5">
            <div>
              <p class="text-xs text-slate-500">Enviaste</p>
              <p class="mt-1 font-semibold text-slate-800">
                {{ formatMoney(transaction.monto, transaction.monedaOrigen) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-slate-500">Recibiste</p>
              <p class="mt-1 font-bold text-slate-950">
                {{ formatMoney(transaction.montoCambiado, transaction.monedaDestino) }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <footer
        v-if="pagination.totalPages > 1"
        class="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7"
      >
        <p class="text-sm text-slate-500">
          Página {{ pagination.page }} de {{ pagination.totalPages }}
        </p>
        <UPagination
          :page="pagination.page"
          :items-per-page="pagination.perPage"
          :total="pagination.total"
          size="sm"
          @update:page="emit('changePage', $event)"
        />
      </footer>
    </template>
  </section>
</template>
