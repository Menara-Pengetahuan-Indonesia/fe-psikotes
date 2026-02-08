import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/features/auth/schemas'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct email and password', () => {
      const result = loginSchema.safeParse({
        method: 'email',
        identifier: 'test@example.com',
        password: 'password123'
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        method: 'email',
        identifier: 'invalid-email',
        password: 'password123'
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const msg = result.error.issues[0].message.toLowerCase()
        expect(msg).toContain('email')
      }
    })

    it('rejects short password', () => {
      const result = loginSchema.safeParse({
        method: 'email',
        identifier: 'test@example.com',
        password: '123'
      })
      expect(result.success).toBe(false)
    })

    it('validates correct phone and password', () => {
      const result = loginSchema.safeParse({
        method: 'phone',
        identifier: '081234567890',
        password: 'password123'
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid phone number', () => {
      const result = loginSchema.safeParse({
        method: 'phone',
        identifier: '12345',
        password: 'password123'
      })
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    it('validates correct registration data', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '081234567890',
        password: 'Password123',
        confirmPassword: 'Password123'
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '081234567890',
        password: 'Password123',
        confirmPassword: 'DifferentPassword'
      })
      expect(result.success).toBe(false)
    })

    it('requires uppercase in password', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '081234567890',
        password: 'password123',
        confirmPassword: 'password123'
      })
      expect(result.success).toBe(false)
    })
  })
})
