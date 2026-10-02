<script setup lang="ts">
import type { UserListItem } from '~/types/user.types'
import { CURRENT_USER_FILTER } from '~/types/user.types'

const props = defineProps<{
  users: UserListItem[]
  pending: boolean
  errorMessage: string | null
}>()

const emit = defineEmits<{
  retry: []
}>()

const selectedUserId = defineModel<string>({
  default: CURRENT_USER_FILTER,
})

const items = computed(() => [
  {
    label: 'Mi historial',
    value: CURRENT_USER_FILTER,
  },
  ...props.users.map(user => ({
    label: `${user.nombre} — ${user.email}`,
    value: user.id,
  })),
])
</script>

<template>
  <UFormField label="Usuario">
    <USelect
      v-model="selectedUserId"
      :items="items"
      value-key="value"
      icon="i-lucide-users-round"
      size="lg"
      class="w-full"
      :ui="{ base: 'h-12 rounded-xl bg-white ring-slate-300' }"
      :loading="pending"
      :disabled="pending"
      aria-label="Seleccionar usuario para consultar su historial"
    />

    <p v-if="errorMessage" class="mt-1.5 text-xs text-red-600">
      {{ errorMessage }}
      <button
        type="button"
        class="font-semibold underline underline-offset-2"
        @click="emit('retry')"
      >
        Reintentar
      </button>
    </p>
  </UFormField>
</template>
