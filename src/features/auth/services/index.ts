import type { LoginFormData, RegisterFormData } from '../schemas'
import type { User } from '@/store/auth.store'

// ── Dummy data (simulasi) ──────────────────────────
interface DummyUser {
  id: string
  email: string
  name: string
  password: string
  role: User['role']
}

const DUMMY_USERS: DummyUser[] = [
  {
    id: '1',
    email: 'user@test.com',
    name: 'Budi Santoso',
    password: 'Password1!',
    role: 'user',
  },
  {
    id: '2',
    email: 'admin@test.com',
    name: 'Admin Bermoela',
    password: 'Password1!',
    role: 'admin',
  },
  {
    id: '3',
    email: 'company@test.com',
    name: 'PT Maju Jaya',
    password: 'Password1!',
    role: 'company',
  },
]

function delay(ms = 800) {
  return new Promise((r) => setTimeout(r, ms))
}

function generateToken() {
  return `dummy-token-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// ── Error helpers ──────────────────────────────────
const ERROR_MAP: Record<string, string> = {
  'Invalid credentials': 'Email atau password salah',
  'User not found': 'Akun tidak ditemukan',
  'Email already exists': 'Email sudah terdaftar',
  'Phone number already exists':
    'Nomor HP sudah terdaftar',
  'Unauthorized':
    'Sesi telah berakhir, silakan masuk kembali',
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
  if (error instanceof Error) {
    return translateError(error.message)
  }
  return 'Terjadi kesalahan, coba lagi.'
}

// ── Auth service (dummy) ───────────────────────────
interface NormalizedLoginResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export const authService = {
  login: async (
    data: LoginFormData,
  ): Promise<NormalizedLoginResponse> => {
    await delay()
    const found = DUMMY_USERS.find(
      (u) => u.email === data.email,
    )
    if (!found || found.password !== data.password) {
      throw new Error('Invalid credentials')
    }
    return {
      user: {
        id: found.id,
        email: found.email,
        name: found.name,
        role: found.role,
      },
      accessToken: generateToken(),
      refreshToken: generateToken(),
    }
  },

  register: async (data: RegisterFormData) => {
    await delay()
    const exists = DUMMY_USERS.some(
      (u) => u.email === data.email,
    )
    if (exists) {
      throw new Error('Email already exists')
    }
    const newUser: DummyUser = {
      id: String(DUMMY_USERS.length + 1),
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      password: data.password,
      role: 'user',
    }
    DUMMY_USERS.push(newUser)
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: 'USER' as const,
      },
      message: 'Registrasi berhasil',
    }
  },

  logout: async () => {
    await delay(400)
    return { message: 'Berhasil logout' }
  },
}
