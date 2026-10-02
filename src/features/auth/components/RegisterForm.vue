<script setup lang="ts">
import AuthCard from './AuthCard.vue'
import { useRegister } from '../composables/use-register'
import { registerSchema } from '../validation/register.schema'

const {
  state,
  pending,
  errorMessage,
  showPassword,
  clearError,
  submit,
} = useRegister()
</script>

<template>
  <AuthCard
    title="Crea tu cuenta"
    description="Únete a Kambista para empezar a cambiar tus divisas."
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
      :schema="registerSchema"
      :state="state"
      class="space-y-4"
      @submit="submit"
    >
      <UFormField label="Nombre" name="nombre">
        <UInput
          v-model="state.nombre"
          autocomplete="name"
          placeholder="Tu nombre completo"
          icon="i-lucide-user-round"
          size="lg"
          class="w-full"
          :disabled="pending"
          @input="clearError"
        />
      </UFormField>

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
          autocomplete="new-password"
          placeholder="Mínimo 8 caracteres"
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
        Crear cuenta
      </UButton>
    </UForm>

    <p class="mt-6 text-center text-sm text-slate-600">
      ¿Ya tienes una cuenta?
      <NuxtLink
        to="/login"
        class="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-4 transition hover:text-primary-800"
      >
        Inicia sesión
      </NuxtLink>
    </p>
  </AuthCard>
</template>
