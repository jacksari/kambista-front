import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth.store'
import { useUserService } from '~/services/user.service'
import { UserRole } from '~/types/auth.types'
import type { UserListItem } from '~/types/user.types'
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from '~/utils/get-api-error-message'

export function useAdminUsers() {
  const authStore = useAuthStore()
  const userService = useUserService()
  const { user } = storeToRefs(authStore)

  const users = ref<UserListItem[]>([])
  const pending = ref(false)
  const errorMessage = ref<string | null>(null)

  const isAdmin = computed(() => user.value?.rol === UserRole.ADMIN)

  async function loadUsers() {
    if (!isAdmin.value) {
      users.value = []
      errorMessage.value = null
      return
    }

    pending.value = true
    errorMessage.value = null

    try {
      const response = await userService.list()
      users.value = response.usuarios
    } catch (error) {
      const status = getApiErrorStatus(error)

      errorMessage.value = status === 403
        ? 'No tienes permisos para consultar la lista de usuarios.'
        : getApiErrorMessage(
            error,
            'No pudimos cargar los usuarios. Inténtalo nuevamente.',
          )
    } finally {
      pending.value = false
    }
  }

  return {
    users,
    pending,
    errorMessage,
    isAdmin,
    loadUsers,
  }
}
