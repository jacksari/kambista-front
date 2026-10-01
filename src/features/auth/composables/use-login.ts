import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth.store'
import { getApiErrorMessage } from '~/utils/get-api-error-message'
import type { LoginFormData } from '../validation/login.schema'

export function useLogin() {
  const authStore = useAuthStore()
  const state = reactive<LoginFormData>({
    email: '',
    password: '',
  })

  const pending = ref(false)
  const errorMessage = ref<string | null>(null)
  const showPassword = ref(false)

  function clearError() {
    errorMessage.value = null
  }

  async function submit(event: FormSubmitEvent<LoginFormData>) {
    pending.value = true
    errorMessage.value = null

    try {
      await authStore.login(event.data)
      await navigateTo('/')
    } catch (error) {
      errorMessage.value = getApiErrorMessage(
        error,
        'No pudimos iniciar sesión. Verifica tus credenciales.',
      )
    } finally {
      pending.value = false
    }
  }

  return {
    state,
    pending,
    errorMessage,
    showPassword,
    clearError,
    submit,
  }
}
