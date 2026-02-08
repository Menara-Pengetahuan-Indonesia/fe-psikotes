import type { LoginFormData, RegisterFormData } from '../schemas'
import type { AuthResponse } from '../types'
import {
  DUMMY_USER,
  DUMMY_PASSWORD,
  DUMMY_TOKEN,
} from '../constants'

export const authService = {
  login: async (
    data: LoginFormData,
  ): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 500))

    const isMatch =
      data.identifier === DUMMY_USER.email &&
      data.password === DUMMY_PASSWORD

    if (!isMatch) {
      throw new Error('Email atau password salah')
    }

    return { user: DUMMY_USER, token: DUMMY_TOKEN }
  },

  register: async (
    data: RegisterFormData,
  ): Promise<AuthResponse> => {
    await new Promise((r) => setTimeout(r, 500))

    const user: AuthResponse['user'] = {
      id: `usr_${Date.now()}`,
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      role: 'user',
    }

    return { user, token: DUMMY_TOKEN }
  },

  logout: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200))
  },

  me: async (): Promise<AuthResponse['user']> => {
    await new Promise((r) => setTimeout(r, 200))
    return DUMMY_USER
  },
}
