import type { FormSubmitEvent } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { useExchangeStore } from '~/stores/exchange.store'
import { useTransactionService } from '~/services/transaction.service'
import type { Transaction } from '~/types/transaction.types'
import { getApiErrorMessage } from '~/utils/get-api-error-message'
import type { CreateTransactionFormData } from '../validation/create-transaction.schema'

export function useCreateTransaction() {
  const exchangeStore = useExchangeStore()
  const transactionService = useTransactionService()
  const { currentRate, pending: ratePending } = storeToRefs(exchangeStore)

  const state = reactive<CreateTransactionFormData>({
    monto: 100,
    monedaOrigen: 'USD',
    monedaDestino: 'PEN',
  })
  const pending = ref(false)
  const errorMessage = ref<string | null>(null)

  const sameCurrency = computed(
    () => state.monedaOrigen === state.monedaDestino,
  )

  const appliedRate = computed(() => {
    if (!currentRate.value || sameCurrency.value) {
      return null
    }

    return state.monedaOrigen === 'USD'
      ? currentRate.value.tipoDeCambioVenta
      : currentRate.value.tipoDeCambioCompra
  })

  const estimatedAmount = computed(() => {
    if (!appliedRate.value || !state.monto || state.monto <= 0) {
      return null
    }

    return state.monedaOrigen === 'USD'
      ? state.monto * appliedRate.value
      : state.monto / appliedRate.value
  })

  const canSubmit = computed(() => Boolean(
    currentRate.value
    && !sameCurrency.value
    && !pending.value
    && !ratePending.value,
  ))

  function clearError() {
    errorMessage.value = null
  }

  function swapCurrencies() {
    const origin = state.monedaOrigen
    state.monedaOrigen = state.monedaDestino
    state.monedaDestino = origin
    clearError()
  }

  async function loadCurrentRate(force = false) {
    errorMessage.value = null

    try {
      await exchangeStore.fetchCurrent(force)
    } catch (error) {
      errorMessage.value = getApiErrorMessage(
        error,
        'No pudimos obtener el tipo de cambio actual.',
      )
    }
  }

  async function submit(
    event: FormSubmitEvent<CreateTransactionFormData>,
  ): Promise<Transaction | null> {
    pending.value = true
    errorMessage.value = null

    try {
      return await transactionService.create(event.data)
    } catch (error) {
      errorMessage.value = getApiErrorMessage(
        error,
        'No pudimos registrar la transacción. Inténtalo nuevamente.',
      )
      return null
    } finally {
      pending.value = false
    }
  }

  return {
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
  }
}
