import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth.store'
import { getApiErrorMessage } from '~/utils/get-api-error-message'
import type { RegisterFormData } from '../validation/register.schema'

export function useRegister() {
  const authStore = useAuthStore()
  const state = reactive<RegisterFormData>({
    nombre: '',
    email: '',
    password: '',
  })

  const pending = ref(false)
  const errorMessage = ref<string | null>(null)
  const showPassword = ref(false)

  function clearError() {
    errorMessage.value = null
  }

  async function submit(event: FormSubmitEvent<RegisterFormData>) {
    pending.value = true
    errorMessage.value = null

    try {
      await authStore.register(event.data)
      await navigateTo('/')
    } catch (error) {
      errorMessage.value = getApiErrorMessage(
        error,
        'No pudimos crear tu cuenta. Inténtalo nuevamente.',
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
