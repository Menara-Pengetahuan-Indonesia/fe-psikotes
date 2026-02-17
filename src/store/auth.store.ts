import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
    { name: 'auth-storage' },
  ),
)
