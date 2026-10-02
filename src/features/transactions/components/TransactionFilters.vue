<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { UserListItem } from '~/types/user.types'
import { CURRENT_USER_FILTER } from '~/types/user.types'
import AdminUserSelect from './AdminUserSelect.vue'
import type { HistoryFilterData } from '../validation/history-filter.schema'
import { historyFilterSchema } from '../validation/history-filter.schema'

const props = defineProps<{
  pending: boolean
  isAdmin: boolean
  users: UserListItem[]
  usersPending: boolean
  usersError: string | null
}>()

const emit = defineEmits<{
  submit: [event: FormSubmitEvent<HistoryFilterData>]
  retryUsers: []
}>()

const filters = defineModel<HistoryFilterData>({ required: true })
const selectedUserId = defineModel<string>('userId', {
  default: CURRENT_USER_FILTER,
})

const layoutClass = computed(() => props.isAdmin
  ? 'xl:grid-cols-[1fr_1fr_1.35fr_auto]'
  : 'lg:grid-cols-[1fr_1fr_auto]')
</script>

<template>
  <UForm
    :schema="historyFilterSchema"
    :state="filters"
    class="grid gap-5 rounded-md border border-slate-200/80 bg-white p-5 shadow sm:p-6 lg:items-start"
    :class="layoutClass"
    @submit="emit('submit', $event)"
  >
    <UFormField label="Fecha de inicio" name="startDate">
      <UInput
        v-model="filters.startDate"
        type="date"
        icon="i-lucide-calendar-days"
        size="lg"
        class="w-full"
        :ui="{ base: 'h-12 rounded-xl' }"
        :disabled="pending"
      />
    </UFormField>

    <UFormField label="Fecha de fin" name="endDate">
      <UInput
        v-model="filters.endDate"
        type="date"
        icon="i-lucide-calendar-days"
        size="lg"
        class="w-full"
        :ui="{ base: 'h-12 rounded-xl' }"
        :disabled="pending"
      />
    </UFormField>

    <AdminUserSelect
      v-if="isAdmin"
      v-model="selectedUserId"
      :users="users"
      :pending="usersPending"
      :error-message="usersError"
      @retry="emit('retryUsers')"
    />

    <UButton
      type="submit"
      color="primary"
      size="lg"
      icon="i-lucide-list-filter"
      :loading="pending"
      class="h-12 justify-center self-start rounded-xl px-10 font-semibold text-white lg:mt-[1.625rem] cursor-pointer"
    >
      Filtrar
    </UButton>
  </UForm>
</template>
