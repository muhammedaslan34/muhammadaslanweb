'use client'

import { useEffect } from 'react'

const CHUNK_ERROR_FLAG = '__chunk_error_reloaded_once__'
const CHUNK_ERROR_PATTERN =
  /(ChunkLoadError|Loading chunk .* failed|CSS_CHUNK_LOAD_FAILED)/i

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return ''
}

export function ChunkErrorRecovery() {
  useEffect(() => {
    const maybeRecover = (error: unknown) => {
      const message = getErrorMessage(error)
      if (!CHUNK_ERROR_PATTERN.test(message)) return

      const hasReloaded = sessionStorage.getItem(CHUNK_ERROR_FLAG) === '1'
      if (!hasReloaded) {
        sessionStorage.setItem(CHUNK_ERROR_FLAG, '1')
        window.location.reload()
        return
      }

      sessionStorage.removeItem(CHUNK_ERROR_FLAG)
    }

    const handleError = (event: ErrorEvent) => maybeRecover(event.error ?? event.message)
    const handleRejection = (event: PromiseRejectionEvent) => maybeRecover(event.reason)

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return null
}
