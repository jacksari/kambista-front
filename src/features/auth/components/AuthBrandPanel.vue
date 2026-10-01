<script setup lang="ts">
import AuthLogo from './AuthLogo.vue'

const benefits = [
  {
    title: 'Seguro',
    description: 'Tus operaciones están protegidas.',
    icon: 'i-lucide-shield-check',
  },
  {
    title: 'Rápido',
    description: 'Cambia tus divisas en segundos.',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Transparente',
    description: 'Tipos de cambio reales y actualizados.',
    icon: 'i-lucide-chart-no-axes-column-increasing',
  },
]
</script>

<template>
  <aside class="auth-brand-panel relative hidden min-h-screen overflow-hidden px-12 py-12 text-white lg:flex xl:px-20 xl:py-16">
    <div class="relative z-10 flex w-full max-w-2xl flex-col">
      <AuthLogo light />

      <div class="my-auto py-14">
        <p class="max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.045em] xl:text-6xl">
          Cambia<br>
          tus divisas,<br>
          sin complicaciones
        </p>

        <p class="mt-7 max-w-lg text-lg leading-8 text-white/78 xl:text-xl">
          Únete a Kambista y accede a una forma más simple, segura y transparente de cambiar tus divisas.
        </p>

        <ul class="mt-12 space-y-5">
          <li
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex items-center gap-5"
          >
            <span class="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/8 ring-1 ring-white/5 backdrop-blur-sm">
              <UIcon
                :name="benefit.icon"
                class="size-8 text-white"
              />
            </span>
            <span>
              <strong class="block text-lg font-semibold">{{ benefit.title }}</strong>
              <span class="mt-0.5 block text-sm text-white/72">{{ benefit.description }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="pointer-events-none absolute -right-10 bottom-[-9rem] select-none text-[31rem] font-black leading-none text-primary-400/10">
      K
    </div>
  </aside>
</template>

<style scoped>
.auth-brand-panel {
  background:
    radial-gradient(circle at 30% 18%, rgb(13 145 136 / 24%), transparent 34%),
    linear-gradient(145deg, #073f3e 0%, #064d4a 56%, #032f30 100%);
}
</style>
