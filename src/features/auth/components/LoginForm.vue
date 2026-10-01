<script setup lang="ts">
import AuthCard from './AuthCard.vue'
import { useLogin } from '../composables/use-login'
import { loginSchema } from '../validation/login.schema'

const {
  state,
  pending,
  errorMessage,
  showPassword,
  clearError,
  submit,
} = useLogin()
</script>

<template>
  <AuthCard
    title="Bienvenido de nuevo"
    description="Ingresa a tu cuenta para continuar cambiando tus divisas."
  >
    <UAlert
      v-if="errorMessage"
      color="error"
      variant="soft"
      icon="i-lucide-circle-alert"
      :description="errorMessage"
      class="mb-6"
    />

    <UForm
      :schema="loginSchema"
      :state="state"
      class="space-y-4"
      @submit="submit"
    >
      <UFormField label="Correo electrónico" name="email">
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="email"
          placeholder="tu@correo.com"
          icon="i-lucide-mail"
          size="lg"
          class="w-full"
          :disabled="pending"
          @input="clearError"
        />
      </UFormField>

      <UFormField label="Contraseña" name="password">
        <UInput
          v-model="state.password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          placeholder="Ingresa tu contraseña"
          icon="i-lucide-lock-keyhole"
          size="lg"
          class="w-full"
          :disabled="pending"
          @input="clearError"
        >
          <template #trailing>
            <UButton
              type="button"
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        :loading="pending"
        class="mt-6 justify-center font-semibold text-white cursor-pointer"
      >
        Iniciar sesión
      </UButton>
    </UForm>

    <p class="mt-6 text-center text-sm text-slate-600">
      ¿Aún no tienes una cuenta?
      <NuxtLink
        to="/register"
        class="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-4 transition hover:text-primary-800"
      >
        Regístrate
      </NuxtLink>
    </p>
  </AuthCard>
</template>
