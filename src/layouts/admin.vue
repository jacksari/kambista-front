<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AuthLogo from '~/features/auth/components/AuthLogo.vue'
import { useAuthStore } from '~/stores/auth.store'
import { useExchangeStore } from '~/stores/exchange.store'

const authStore = useAuthStore()
const exchangeStore = useExchangeStore()
const { user } = storeToRefs(authStore)

const initials = computed(() => user.value?.nombre
  .split(' ')
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0]?.toUpperCase())
  .join('') || 'US')

async function logout() {
  exchangeStore.clear()
  authStore.logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_85%_15%,rgba(27,173,160,0.08),transparent_25%),#f7fafc]">
    <header class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <AuthLogo />

        <div class="flex items-center gap-3 sm:gap-5">
          <div class="hidden items-center gap-3 sm:flex">
            <span class="grid size-11 place-items-center rounded-full bg-slate-100 text-sm font-bold text-primary-700">
              {{ initials }}
            </span>
            <div class="max-w-56">
              <p class="truncate text-sm font-bold text-slate-900">
                {{ user?.nombre }} <strong class="font-normal text-slate-500">({{ user?.rol }})</strong>
              </p>
              <p class="truncate text-xs text-slate-500">
                {{ user?.email }}
              </p>
            </div>
          </div>

          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-log-out"
            class="font-semibold text-slate-600 hover:text-primary-700 cursor-pointer"
            @click="logout"
          >
            <span class="hidden md:inline">Cerrar sesión</span>
          </UButton>
        </div>
      </div>
    </header>

    <slot />
  </div>
</template>
