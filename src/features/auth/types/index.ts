export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    role: 'user' | 'company' | 'admin'
  }
  token: string
}
