import { api } from '@/lib/axios'
import type { LoginFormData, RegisterFormData } from '../schemas'
import type { AuthResponse } from '../types'

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', data)
    return res.data
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', data)
    return res.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  me: async (): Promise<AuthResponse['user']> => {
    const res = await api.get<AuthResponse['user']>('/auth/me')
    return res.data
  },
}
