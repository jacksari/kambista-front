<script setup lang="ts">
withDefaults(defineProps<{
  light?: boolean
}>(), {
  light: false,
})
</script>

<template>
  <NuxtLink
    to="/"
    class="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300"
    aria-label="Ir al inicio de Kambista"
  >
    <span class="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-primary-500 shadow-lg shadow-primary-950/15">
      <span class="absolute inset-y-0 left-0 w-2 bg-primary-300" />
      <span class="relative text-2xl font-black leading-none text-white">K</span>
    </span>
    <span
      class="text-3xl font-bold tracking-[-0.04em]"
      :class="light ? 'text-white' : 'text-slate-950'"
    >
      ambista
    </span>
  </NuxtLink>
</template>
