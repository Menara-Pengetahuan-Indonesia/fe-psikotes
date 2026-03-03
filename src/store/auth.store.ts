'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useSyncExternalStore } from 'react'

export type UserRole = 'USER' | 'ADMIN' | 'SUPERADMIN'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

// Cookie helpers for middleware route protection
function setAuthCookie(role: UserRole) {
  if (typeof document === 'undefined') return
  document.cookie = `auth-role=${role}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
  document.cookie = `auth-active=1; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
}

function clearAuthCookie() {
  if (typeof document === 'undefined') return
  document.cookie = 'auth-role=; path=/; max-age=0'
  document.cookie = 'auth-active=; path=/; max-age=0'
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
        setAuthCookie(user.role)
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          _hasHydrated: true,
        })
      },
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken })
      },
      logout: () => {
        clearAuthCookie()
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
      onRehydrateStorage: () => (state) => {
        useAuthStore.setState({ _hasHydrated: true })
        // Sync cookie on rehydrate
        if (state?.user?.role) {
          setAuthCookie(state.user.role)
        }
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
  const hydrated = useSyncExternalStore(
    useAuthStore.subscribe,
    () => useAuthStore.getState()._hasHydrated,
    () => false,
  )

  const store = useAuthStore()

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
