import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'user' | 'company' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  age?: number
  gender?: 'male' | 'female'
  address?: string
  isProfileComplete?: boolean
}

interface ProfileData {
  age: number
  gender: 'male' | 'female'
  address: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  updateProfile: (data: ProfileData) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, token, isAuthenticated: true })
      },
      updateProfile: (data) => {
        set((state) => ({
          user: state.user
            ? { ...state.user, ...data, isProfileComplete: true }
            : null,
        }))
      },
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'auth-storage' }
  )
)
