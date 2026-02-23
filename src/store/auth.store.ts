import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect, useState } from 'react'

export type UserRole = 'user' | 'company' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  setAuth: (
    user: User,
    accessToken: string,
    refreshToken: string,
  ) => void
  setTokens: (
    accessToken: string,
    refreshToken: string,
  ) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      },
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken })
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ _hasHydrated: true })
      },
    },
  ),
)

/**
 * SSR-safe hook — returns default (server) values
 * until Zustand has rehydrated from localStorage,
 * preventing hydration mismatches.
 */
export function useAuthStoreHydrated() {
  const [hydrated, setHydrated] = useState(false)
  const store = useAuthStore()

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return {
      ...store,
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    }
  }

  return store
}
