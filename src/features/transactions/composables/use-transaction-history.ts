import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth.store'
import { useTransactionService } from '~/services/transaction.service'
import type {
  PaginationMeta,
  Transaction,
  TransactionHistoryQuery,
} from '~/types/transaction.types'
import { UserRole } from '~/types/auth.types'
import { CURRENT_USER_FILTER } from '~/types/user.types'
import { getApiErrorMessage } from '~/utils/get-api-error-message'
import type { HistoryFilterData } from '../validation/history-filter.schema'
import {
  getLimaToday,
  toLimaDateTime,
} from '../utils/transaction-formatters'

const DEFAULT_PER_PAGE = 5

export function useTransactionHistory() {
  const authStore = useAuthStore()
  const transactionService = useTransactionService()
  const today = getLimaToday()

  const filters = reactive<HistoryFilterData>({
    startDate: `${today.slice(0, 8)}01`,
    endDate: today,
  })
  const transactions = ref<Transaction[]>([])
  const pagination = ref<PaginationMeta>({
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    total: 0,
    totalPages: 0,
  })
  const page = ref(1)
  const selectedUserId = ref(CURRENT_USER_FILTER)
  const pending = ref(false)
  const errorMessage = ref<string | null>(null)

  const isAdmin = computed(() => authStore.user?.rol === UserRole.ADMIN)

  async function loadHistory() {
    pending.value = true
    errorMessage.value = null

    try {
      const query: TransactionHistoryQuery = {
        startDate: toLimaDateTime(filters.startDate),
        endDate: toLimaDateTime(filters.endDate, true),
        page: page.value,
        perPage: DEFAULT_PER_PAGE,
      }

      if (
        isAdmin.value
        && selectedUserId.value !== CURRENT_USER_FILTER
      ) {
        query.userId = selectedUserId.value
      }

      const response = await transactionService.history(query)

      transactions.value = response.data
      pagination.value = response.pagination
    } catch (error) {
      errorMessage.value = getApiErrorMessage(
        error,
        'No pudimos cargar el historial. Inténtalo nuevamente.',
      )
    } finally {
      pending.value = false
    }
  }

  async function applyFilters(_event?: FormSubmitEvent<HistoryFilterData>) {
    page.value = 1
    await loadHistory()
  }

  async function changePage(nextPage: number) {
    page.value = nextPage
    await loadHistory()
  }

  async function refresh() {
    page.value = 1
    await loadHistory()
  }

  return {
    filters,
    transactions,
    pagination,
    page,
    selectedUserId,
    isAdmin,
    pending,
    errorMessage,
    loadHistory,
    applyFilters,
    changePage,
    refresh,
  }
}
