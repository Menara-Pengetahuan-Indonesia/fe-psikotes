import { api } from '@/lib/axios'
import axios from 'axios'
import type { LoginFormData, RegisterFormData } from '../schemas'
import type { User } from '@/store/auth.store'

// ── Error helpers ──────────────────────────────────
const ERROR_MAP: Record<string, string> = {
  'Invalid credentials': 'Email atau password salah',
  'User not found': 'Akun tidak ditemukan',
  'Email already exists': 'Email sudah terdaftar',
  'Phone number already exists': 'Nomor HP sudah terdaftar',
  'Unauthorized': 'Sesi telah berakhir, silakan masuk kembali',
  'Too many requests': 'Terlalu banyak percobaan, coba lagi nanti',
  'Internal server error': 'Terjadi kesalahan pada server',
}

function translateError(msg: string): string {
  return ERROR_MAP[msg] || msg
}

function extractAxiosErrorMessage(error: unknown): string | undefined {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message as string | undefined
  }
  return undefined
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return translateError(error.message)
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return translateError((error as { message: string }).message)
  }
  return 'Terjadi kesalahan, coba lagi.'
}

// ── Auth service (real API) ───────────────────────────
interface NormalizedLoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export const authService = {
  login: async (data: LoginFormData): Promise<NormalizedLoginResponse> => {
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      const u = response.data.user
      return {
        user: {
          id: u.id,
          email: u.email,
          name: u.name ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
          role: u.role || 'USER',
        },
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      }
    } catch (error: unknown) {
      const message = extractAxiosErrorMessage(error) || 'Login failed'
      throw new Error(message)
    }
  },

  register: async (data: RegisterFormData) => {
    try {
      const response = await api.post('/auth/register', {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        telp: data.telp || '',
      })

      const u = response.data.user
      return {
        user: {
          id: u.id,
          email: u.email,
          name: u.name ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
          role: u.role || 'USER',
        },
        message: 'Registrasi berhasil',
      }
    } catch (error: unknown) {
      const message = extractAxiosErrorMessage(error) || 'Registration failed'
      throw new Error(message)
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
      return { message: 'Berhasil logout' }
    } catch (error: unknown) {
      const message = extractAxiosErrorMessage(error) || 'Logout failed'
      throw new Error(message)
    }
  },
}
