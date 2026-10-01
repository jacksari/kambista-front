<script setup lang="ts">
import RegisterForm from '~/features/auth/components/RegisterForm.vue'

definePageMeta({
  layout: 'public',
  middleware: 'guest',
})

useSeoMeta({
  title: 'Crear cuenta | Kambista',
  description: 'Crea tu cuenta para empezar a cambiar tus divisas.',
})
</script>

<template>
  <RegisterForm />
</template>
