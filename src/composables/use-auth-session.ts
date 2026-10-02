import type { AuthUser } from '~/types/auth.types'

export function useAuthSession() {
  const accessTokenCookie = useCookie<string | null>('kambista_access_token', {
    default: () => null,
    maxAge: 60 * 60 * 8,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  })
  const accessToken = useState<string | null>(
    'kambista_auth_access_token',
    () => accessTokenCookie.value,
  )
  const user = useState<AuthUser | null>('kambista_auth_user', () => null)
  const initialized = useState('kambista_auth_initialized', () => false)

  function setAccessToken(token: string) {
    accessToken.value = token
    accessTokenCookie.value = token
  }

  function clearSession() {
    accessToken.value = null
    accessTokenCookie.value = null
    user.value = null
    initialized.value = true
  }

  return {
    accessToken,
    user,
    initialized,
    setAccessToken,
    clearSession,
  }
}
