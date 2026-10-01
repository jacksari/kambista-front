interface ApiErrorData {
  error?: string
  message?: string | string[]
}

interface ApiErrorLike {
  data?: ApiErrorData
  message?: string
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ocurrió un error. Inténtalo nuevamente.',
) {
  if (!error || typeof error !== 'object') {
    return fallback
  }

  const apiError = error as ApiErrorLike
  const message = apiError.data?.message

  if (Array.isArray(message)) {
    return message[0] || fallback
  }

  return message || apiError.data?.error || fallback
}
