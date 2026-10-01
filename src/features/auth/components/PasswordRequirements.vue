<script setup lang="ts">
const props = defineProps<{
  password: string
}>()

const requirements = computed(() => [
  {
    label: 'Al menos 8 caracteres',
    valid: props.password.length >= 8,
  },
  {
    label: 'Una letra mayúscula',
    valid: /[A-Z]/.test(props.password),
  },
  {
    label: 'Un número',
    valid: /[0-9]/.test(props.password),
  },
])
</script>

<template>
  <ul class="mt-3 space-y-1.5" aria-label="Requisitos de contraseña">
    <li
      v-for="requirement in requirements"
      :key="requirement.label"
      class="flex items-center gap-2 text-sm transition-colors"
      :class="requirement.valid ? 'text-primary-700' : 'text-slate-500'"
    >
      <span
        class="grid size-5 place-items-center rounded-full transition-colors"
        :class="requirement.valid ? 'bg-primary-100' : 'bg-slate-100'"
      >
        <UIcon
          name="i-lucide-check"
          class="size-3.5"
        />
      </span>
      {{ requirement.label }}
    </li>
  </ul>
</template>
