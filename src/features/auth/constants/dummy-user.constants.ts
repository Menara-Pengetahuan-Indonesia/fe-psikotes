import type { AuthResponse } from '../types'

export const DUMMY_USER: AuthResponse['user'] = {
  id: 'usr_dummy_001',
  email: 'user@bermoela.com',
  name: 'Budi Santoso',
  role: 'user',
}

export const DUMMY_PASSWORD = 'User1234'

export const DUMMY_TOKEN = 'dummy-jwt-token-bermoela'
