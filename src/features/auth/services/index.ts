import { AxiosError } from 'axios'
import { api } from '@/lib/axios'
import type { LoginFormData, RegisterFormData } from '../schemas'
import type {
  LoginResponse,
  RegisterResponse,
  LogoutResponse,
  AppRole,
  ApiErrorResponse,
} from '../types'
import type { User } from '@/store/auth.store'

interface NormalizedLoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

function normalizeRole(role: string): AppRole {
  return role.toLowerCase() as AppRole
}

const ERROR_MAP: Record<string, string> = {
  'Invalid credentials': 'Email atau password salah',
  'User not found': 'Akun tidak ditemukan',
  'Email already exists': 'Email sudah terdaftar',
  'Phone number already exists':
    'Nomor HP sudah terdaftar',
  'Unauthorized': 'Sesi telah berakhir, silakan masuk kembali',
  'Too many requests':
    'Terlalu banyak percobaan, coba lagi nanti',
  'Internal server error':
    'Terjadi kesalahan pada server',
}

function translateError(msg: string): string {
  return ERROR_MAP[msg] || msg
}

export function extractErrorMessage(
  error: unknown,
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | ApiErrorResponse
      | undefined
    if (data?.message) {
      if (Array.isArray(data.message)) {
        return translateError(data.message[0])
      }
      return translateError(data.message)
    }
  }
  if (error instanceof Error) {
    return translateError(error.message)
  }
  return 'Terjadi kesalahan, coba lagi.'
}

export const authService = {
  login: async (
    data: LoginFormData,
  ): Promise<NormalizedLoginResponse> => {
    const res = await api.post<LoginResponse>(
      '/auth/login',
      data,
    )
    const { user, accessToken, refreshToken } = res.data
    return {
      user: { ...user, role: normalizeRole(user.role) },
      accessToken,
      refreshToken,
    }
  },

  register: async (data: RegisterFormData) => {
    const { confirmPassword: _, ...payload } = data as
      RegisterFormData & { confirmPassword?: string }
    const res = await api.post<RegisterResponse>(
      '/auth/register',
      payload,
    )
    return res.data
  },

  logout: async () => {
    const res = await api.post<LogoutResponse>(
      '/auth/logout',
    )
    return res.data
  },
}
