<script setup lang="ts">
import CreateTransactionModal from '~/features/transactions/components/CreateTransactionModal.vue'
import TransactionFilters from '~/features/transactions/components/TransactionFilters.vue'
import TransactionHistoryTable from '~/features/transactions/components/TransactionHistoryTable.vue'
import { useAdminUsers } from '~/features/transactions/composables/use-admin-users'
import { useTransactionHistory } from '~/features/transactions/composables/use-transaction-history'
import { formatMoney } from '~/features/transactions/utils/transaction-formatters'
import type { Transaction } from '~/types/transaction.types'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Transacciones | Kambista',
  description: 'Consulta y registra tus operaciones de cambio de divisas.',
})

const toast = useToast()
const createModalOpen = ref(false)

const {
  filters,
  transactions,
  pagination,
  selectedUserId,
  isAdmin,
  pending,
  errorMessage,
  loadHistory,
  applyFilters,
  changePage,
  refresh,
} = useTransactionHistory()

const {
  users,
  pending: usersPending,
  errorMessage: usersError,
  loadUsers,
} = useAdminUsers()

onMounted(async () => {
  await Promise.all([
    loadHistory(),
    loadUsers(),
  ])
})

async function handleCreated(transaction: Transaction) {
  toast.add({
    title: 'Transacción registrada',
    description: `Recibirás ${formatMoney(transaction.montoCambiado, transaction.monedaDestino)}.`,
    color: 'success',
    icon: 'i-lucide-circle-check',
  })

  await refresh()
}
</script>

<template>
  <main class="px-5 py-8 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-7xl">
      <header class="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.16em] text-primary-700">
            Operaciones
          </p>
          <h1 class="mt-2 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Historial de transacciones
          </h1>
          <p class="mt-2 text-base text-slate-500 sm:text-lg">
            Consulta tus operaciones realizadas filtrando por rango de fechas.
          </p>
        </div>

        <UButton
          color="primary"
          size="lg"
          icon="i-lucide-arrow-left-right"
          class="h-12 justify-center rounded-xl px-6 font-semibold cursor-pointer"
          @click="createModalOpen = true"
        >
          Nueva transacción
        </UButton>
      </header>

      <div class="space-y-6">
        <TransactionFilters
          v-model="filters"
          v-model:user-id="selectedUserId"
          :pending="pending"
          :is-admin="isAdmin"
          :users="users"
          :users-pending="usersPending"
          :users-error="usersError"
          @submit="applyFilters"
          @retry-users="loadUsers"
        />

        <TransactionHistoryTable
          :transactions="transactions"
          :pagination="pagination"
          :pending="pending"
          :error-message="errorMessage"
          @retry="loadHistory"
          @change-page="changePage"
        />
      </div>
    </div>

    <CreateTransactionModal
      v-model:open="createModalOpen"
      @created="handleCreated"
    />
  </main>
</template>
