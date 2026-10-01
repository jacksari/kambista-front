<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth.store'

definePageMeta({
  middleware: 'auth',
})

useSeoMeta({
  title: 'Inicio | Kambista',
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

async function logout() {
  authStore.logout()
  await navigateTo('/login')
}
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-5 py-8 sm:px-8">
    <section class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
      <UCard class="w-full">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
              Sesión activa
            </p>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Hola, {{ user?.nombre }}
            </h1>
            <p class="mt-2 text-slate-500">
              Tu perfil fue validado correctamente con la API.
            </p>
          </div>

          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-log-out"
            @click="logout"
          >
            Cerrar sesión
          </UButton>
        </div>
      </UCard>
    </section>
  </main>
</template>
