'use client'

import { useEffect, useRef } from 'react'
import axios from 'axios'
import { env } from '@/lib/env'
import { useAuthStore } from '@/store/auth.store'

function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp ? payload.exp * 1000 : null
  } catch {
    return null
  }
}

const REFRESH_BUFFER_MS = 60_000

export function useTokenRefresh() {
  const accessToken = useAuthStore((s) => s.accessToken)
  const refreshToken = useAuthStore((s) => s.refreshToken)
  const setTokens = useAuthStore((s) => s.setTokens)
  const logout = useAuthStore((s) => s.logout)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (!accessToken || !refreshToken) return

    const expiry = getTokenExpiry(accessToken)
    if (!expiry) return

    const now = Date.now()
    const refreshAt = expiry - REFRESH_BUFFER_MS
    const delay = Math.max(refreshAt - now, 0)

    timerRef.current = setTimeout(async () => {
      try {
        const { data } = await axios.post(
          `${env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken: useAuthStore.getState().refreshToken },
        )
        const tokens = data.data ?? data
        setTokens(tokens.accessToken, tokens.refreshToken)
      } catch {
        logout()
        if (typeof window !== 'undefined') {
          window.location.href = '/masuk'
        }
      }
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [accessToken, refreshToken, setTokens, logout])
}
