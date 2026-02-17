export type ApiRole = 'USER' | 'COMPANY' | 'ADMIN'
export type AppRole = 'user' | 'company' | 'admin'

export interface ApiUser {
  id: string
  email: string
  name: string
  role: ApiRole
}

export interface LoginResponse {
  user: ApiUser
  accessToken: string
  refreshToken: string
}

export interface RegisterResponse {
  user: ApiUser
  message: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface LogoutResponse {
  message: string
}

export interface ApiErrorResponse {
  message: string | string[]
  error?: string
  statusCode?: number
}
