import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  authResponseMock,
  authUserMock,
  loginMock,
  loginRequestMock,
  profileMock,
  registerMock,
  registerRequestMock,
} from '../mocks/services/auth-service.mock'

const { useAuthStore } = await import('~/stores/auth.store')

describe('useAuthStore', () => {
  beforeEach(() => {
    clearNuxtState()
    useCookie('kambista_access_token').value = null
    setActivePinia(createPinia())

    loginMock.mockReset()
    registerMock.mockReset()
    profileMock.mockReset()
  })

  it('inicia sesión, guarda el token y obtiene el perfil', async () => {
    loginMock.mockResolvedValue(authResponseMock)
    profileMock.mockResolvedValue(authUserMock)
    const store = useAuthStore()

    const result = await store.login(loginRequestMock)

    expect(loginMock).toHaveBeenCalledOnce()
    expect(loginMock).toHaveBeenCalledWith(loginRequestMock)
    expect(profileMock).toHaveBeenCalledOnce()
    expect(result).toEqual(authUserMock)
    expect(store.accessToken).toBe(authResponseMock.access_token)
    expect(store.user).toEqual(authUserMock)
    expect(store.isAuthenticated).toBe(true)
    expect(useCookie('kambista_access_token').value).toBe(
      authResponseMock.access_token,
    )
  })

  it('registra al usuario y establece la sesión con su perfil', async () => {
    registerMock.mockResolvedValue(authResponseMock)
    profileMock.mockResolvedValue(authUserMock)
    const store = useAuthStore()

    const result = await store.register(registerRequestMock)

    expect(registerMock).toHaveBeenCalledOnce()
    expect(registerMock).toHaveBeenCalledWith(registerRequestMock)
    expect(profileMock).toHaveBeenCalledOnce()
    expect(result).toEqual(authUserMock)
    expect(store.accessToken).toBe(authResponseMock.access_token)
    expect(store.user).toEqual(authUserMock)
    expect(store.isAuthenticated).toBe(true)
  })

  it('limpia la sesión cuando no puede obtener el perfil', async () => {
    loginMock.mockResolvedValue(authResponseMock)
    profileMock.mockRejectedValue(new Error('Unauthorized'))
    const store = useAuthStore()

    await expect(store.login(loginRequestMock)).rejects.toThrow('Unauthorized')

    expect(store.accessToken).toBeNull()
    expect(store.user).toBeNull()
    expect(store.initialized).toBe(true)
    expect(store.isAuthenticated).toBe(false)
    await nextTick()
    expect(document.cookie).not.toContain(authResponseMock.access_token)
  })

  it('cierra la sesión y elimina sus datos', async () => {
    loginMock.mockResolvedValue(authResponseMock)
    profileMock.mockResolvedValue(authUserMock)
    const store = useAuthStore()
    await store.login(loginRequestMock)

    store.logout()

    expect(store.accessToken).toBeNull()
    expect(store.user).toBeNull()
    expect(store.initialized).toBe(true)
    expect(store.isAuthenticated).toBe(false)
    await nextTick()
    expect(document.cookie).not.toContain(authResponseMock.access_token)
  })
})
