<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Currency } from '~/types/exchange.types'
import type { Transaction } from '~/types/transaction.types'
import { useCreateTransaction } from '../composables/use-create-transaction'
import ExchangeRateSummary from './ExchangeRateSummary.vue'
import {
  createTransactionSchema,
  type CreateTransactionFormData,
} from '../validation/create-transaction.schema'

const emit = defineEmits<{
  created: [transaction: Transaction]
}>()

const open = defineModel<boolean>('open', { default: false })

const {
  state,
  pending,
  ratePending,
  errorMessage,
  currentRate,
  sameCurrency,
  appliedRate,
  estimatedAmount,
  canSubmit,
  clearError,
  swapCurrencies,
  loadCurrentRate,
  submit,
} = useCreateTransaction()

const currencies = [
  {
    label: 'USD — Dólares estadounidenses',
    value: 'USD',
    flag: '🇺🇸',
  },
  {
    label: 'PEN — Soles peruanos',
    value: 'PEN',
    flag: '🇵🇪',
  },
]

const currencyByCode = Object.fromEntries(
  currencies.map(currency => [currency.value, currency]),
) as Record<Currency, typeof currencies[number]>

watch(open, async (isOpen) => {
  if (isOpen) {
    await loadCurrentRate()
  }
})

async function handleSubmit(
  event: FormSubmitEvent<CreateTransactionFormData>,
) {
  const transaction = await submit(event)

  if (!transaction) {
    return
  }

  emit('created', transaction)
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Nueva transacción"
    description="Completa los datos para registrar una operación de cambio."
    :dismissible="!pending"
    :close="!pending"
    :ui="{
      content: 'w-[calc(100vw-2rem)] max-w-4xl rounded-md',
      header: 'border-b border-slate-100 px-6 py-5 sm:px-8',
      body: 'px-6 py-6 sm:px-8',
      footer: 'border-t border-slate-100 px-6 py-5 sm:px-8',
      title: 'text-2xl font-bold text-slate-950',
      description: 'mt-1 text-slate-500',
    }"
  >
    <template #body>
      <UAlert
        v-if="errorMessage"
        color="error"
        variant="soft"
        icon="i-lucide-circle-alert"
        :description="errorMessage"
        class="mb-5"
      />

      <UForm
        id="create-transaction-form"
        :schema="createTransactionSchema"
        :state="state"
        class="space-y-6"
        @submit="handleSubmit"
      >
        <div class="grid gap-5 lg:grid-cols-[1fr_1fr_auto_1fr] lg:items-start">
          <UFormField label="Monto a cambiar" name="monto">
            <UInput
              v-model.number="state.monto"
              type="number"
              inputmode="decimal"
              min="0.01"
              max="9999999.99"
              step="0.01"
              icon="i-lucide-coins"
              size="lg"
              class="w-full"
              :ui="{ base: 'h-12 rounded-xl pe-14' }"
              :disabled="pending"
              @input="clearError"
            >
              <template #trailing>
                <span class="text-sm font-semibold text-slate-500">
                  {{ state.monedaOrigen }}
                </span>
              </template>
            </UInput>
          </UFormField>

          <UFormField label="Moneda de origen" name="monedaOrigen">
            <USelect
              v-model="state.monedaOrigen"
              :items="currencies"
              value-key="value"
              size="lg"
              class="w-full cursor-pointer"
              :ui="{ base: 'h-12 rounded-xl bg-white ring-slate-300' }"
              :disabled="pending"
              @update:model-value="clearError"
            >
              <template #leading>
                <span aria-hidden="true">{{ currencyByCode[state.monedaOrigen].flag }}</span>
              </template>
            </USelect>
          </UFormField>

          <UButton
            type="button"
            color="neutral"
            variant="soft"
            icon="i-lucide-arrow-left-right"
            aria-label="Intercambiar monedas"
            class="md:mt-[1.625rem] size-12 justify-center rounded-xl cursor-pointer p-0 text-slate-500 hover:bg-slate-100 focus:bg-slate-100"
            :disabled="pending"
            @click="swapCurrencies"
          />

          <UFormField label="Moneda de destino" name="monedaDestino">
            <USelect
              v-model="state.monedaDestino"
              :items="currencies"
              value-key="value"
              size="lg"
              class="w-full cursor-pointer"
              :ui="{ base: 'h-12 rounded-xl bg-white ring-slate-300' }"
              :disabled="pending"
              @update:model-value="clearError"
            >
              <template #leading>
                <span aria-hidden="true">{{ currencyByCode[state.monedaDestino].flag }}</span>
              </template>
            </USelect>
          </UFormField>
        </div>

        <div class="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:gap-8">
          <span class="inline-flex items-center gap-2">
            <UIcon name="i-lucide-circle-check" class="size-4 text-primary-600" />
            Máximo 2 decimales y 7 dígitos enteros.
          </span>
          <span
            class="inline-flex items-center gap-2"
            :class="sameCurrency ? 'text-red-600' : ''"
          >
            <UIcon
              :name="sameCurrency ? 'i-lucide-circle-alert' : 'i-lucide-circle-check'"
              class="size-4"
              :class="sameCurrency ? 'text-red-500' : 'text-primary-600'"
            />
            Las monedas deben ser diferentes.
          </span>
        </div>

        <ExchangeRateSummary
          :pending="ratePending"
          :current-rate="currentRate"
          :applied-rate="appliedRate"
          :estimated-amount="estimatedAmount"
          :source-currency="state.monedaOrigen"
          :target-currency="state.monedaDestino"
        />
      </UForm>
    </template>

    <template #footer>
      <div class="grid w-full gap-3 sm:grid-cols-[0.8fr_1.2fr]">
        <UButton
          type="button"
          color="neutral"
          variant="outline"
          size="lg"
          block
          :disabled="pending"
          class="h-12 justify-center rounded-xl font-semibold cursor-pointer"
          @click="open = false"
        >
          Cancelar
        </UButton>
        <UButton
          type="submit"
          form="create-transaction-form"
          color="primary"
          size="lg"
          block
          :loading="pending"
          :disabled="!canSubmit"
          class="h-12 justify-center rounded-xl font-semibold text-white flex items-center cursor-pointer"
        >
          Registrar transacción
        </UButton>
      </div>
    </template>
  </UModal>
</template>
