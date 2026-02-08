import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/features/auth/schemas'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct input', () => {
      const result = loginSchema.safeParse({
        method: 'email',
        identifier: 'test@example.com',
        password: 'Abcdefg1',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        method: 'email',
        identifier: 'invalid',
        password: '12345678',
      })
      expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
      const result = loginSchema.safeParse({
        method: 'email',
        identifier: 'test@example.com',
        password: '123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('validates correct input', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phone: '081234567890',
        password: 'Abcdefg1',
        confirmPassword: 'Abcdefg1',
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phone: '081234567890',
        password: 'Abcdefg1',
        confirmPassword: 'Different1',
      })
      expect(result.success).toBe(false)
    })
  })
})
