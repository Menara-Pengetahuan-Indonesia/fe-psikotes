import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/features/auth/types'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct input', () => {
      const result = loginSchema.safeParse({ email: 'test@example.com', password: '123456' })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({ email: 'invalid', password: '123456' })
      expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
      const result = loginSchema.safeParse({ email: 'test@example.com', password: '123' })
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('validates correct input', () => {
      const result = registerSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '123456',
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '654321',
      })
      expect(result.success).toBe(false)
    })
  })
})
