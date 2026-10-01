<script setup lang="ts">
import LoginForm from '~/features/auth/components/LoginForm.vue'

definePageMeta({
  layout: 'public',
  middleware: 'guest',
})

useSeoMeta({
  title: 'Iniciar sesión | Kambista',
  description: 'Ingresa a tu cuenta de Kambista.',
})
</script>

<template>
  <LoginForm />
</template>
