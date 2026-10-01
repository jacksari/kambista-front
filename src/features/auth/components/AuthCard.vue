<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="w-full max-w-[32rem] rounded-xl border border-white/75 bg-white p-6 shadow-[0_24px_80px_rgba(15,46,55,0.10)] sm:p-8 lg:p-9">
    <header class="mb-6">
      <h1 class="text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-[2rem]">
        {{ title }}
      </h1>
      <p class="mt-2 text-base leading-6 text-slate-500">
        {{ description }}
      </p>
    </header>

    <slot />
  </section>
</template>
