export const CURRENT_USER_FILTER = 'current-user'

export interface UserListItem {
  id: string
  nombre: string
  email: string
}

export interface UsersResponse {
  usuarios: UserListItem[]
}
