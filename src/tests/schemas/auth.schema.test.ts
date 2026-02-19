import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/features/auth/schemas'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct email and password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123'
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
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
        email: 'test@example.com',
        password: '123'
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
        telp: '081234567890',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telp: '081234567890',
        password: 'Password123!',
        confirmPassword: 'DifferentPassword!'
      })
      expect(result.success).toBe(false)
    })

    it('rejects short first name', () => {
      const result = registerSchema.safeParse({
        firstName: 'J',
        lastName: 'Doe',
        email: 'john@example.com',
        telp: '081234567890',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      })
      expect(result.success).toBe(false)
    })

    it('rejects password without special char', () => {
      const result = registerSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        telp: '081234567890',
        password: 'Password123',
        confirmPassword: 'Password123'
      })
      expect(result.success).toBe(false)
    })
  })
})
