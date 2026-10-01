<script setup lang="ts">
import AuthBrandPanel from '~/features/auth/components/AuthBrandPanel.vue'
import AuthLogo from '~/features/auth/components/AuthLogo.vue'
</script>

<template>
  <main class="grid min-h-screen bg-slate-50 lg:grid-cols-[minmax(29rem,0.92fr)_minmax(38rem,1.08fr)]">
    <AuthBrandPanel />

    <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(27,173,160,0.08),transparent_38%)]" />

      <div class="relative z-10 w-full">
        <div class="mb-8 flex justify-center lg:hidden">
          <AuthLogo />
        </div>

        <div class="flex justify-center">
          <slot />
        </div>
      </div>
    </section>
  </main>
</template>
