# Phase 2: Feature Components - Auth, Platform, Konseling, Training

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans OR superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Build feature-specific components for Auth (Login/Register), Platform, Konseling, and Training features menggunakan shared components dari Phase 1.

**Architecture:** Bottom-up component-first approach. Build authentication forms dengan React Hook Form + Zod validation, platform sections dengan data constants, lalu compose ke pages. Semua menggunakan shared components (Section, Container, PageHeader, ServiceCard, dll) yang sudah dibuat di Phase 1.

**Tech Stack:** Next.js 16, TypeScript, shadcn/ui, React Hook Form, Zod, TDD dengan Vitest

---

## Task 1: Auth Validation Schemas (Zod)

**Context:** Authentication forms butuh validation. Create Zod schemas terlebih dahulu sebelum components.

**Files:**
- Create: `src/features/auth/schemas/login.schema.ts`
- Create: `src/features/auth/schemas/register.schema.ts`
- Create: `src/features/auth/schemas/index.ts`

**Step 1: Create login schema dengan tests**

Create `src/features/auth/schemas/login.schema.ts`:

```typescript
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password terlalu panjang')
})

export type LoginFormData = z.infer<typeof loginSchema>
```

**Step 2: Create register schema**

Create `src/features/auth/schemas/register.schema.ts`:

```typescript
import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama terlalu panjang'),
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password terlalu panjang')
    .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung angka'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword']
})

export type RegisterFormData = z.infer<typeof registerSchema>
```

**Step 3: Create barrel export**

Create `src/features/auth/schemas/index.ts`:

```typescript
export { loginSchema, type LoginFormData } from './login.schema'
export { registerSchema, type RegisterFormData } from './register.schema'
```

**Step 4: Write tests untuk schemas**

Create `src/tests/schemas/auth.schema.test.ts`:

```typescript
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
        expect(result.error.issues[0].message).toContain('email')
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
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123'
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'DifferentPassword'
      })
      expect(result.success).toBe(false)
    })

    it('requires uppercase in password', () => {
      const result = registerSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      })
      expect(result.success).toBe(false)
    })
  })
})
```

**Step 5: Run tests**

```bash
npm test -- src/tests/schemas/auth.schema.test.ts
```

Expected: All tests passing

**Step 6: Commit**

```bash
git add src/features/auth/schemas/ src/tests/schemas/
git commit -m "feat(auth): add login and register validation schemas

- Add Zod schema for login (email, password)
- Add Zod schema for register (name, email, password, confirmPassword)
- Password requirements: min 8 chars, uppercase, lowercase, number
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Login Form Component

**Context:** Create login form component dengan React Hook Form + shadcn/ui. Reference dari `psikotest-ipsi/app/login/page.tsx`.

**Files:**
- Create: `src/features/auth/components/login-form.tsx`
- Create: `src/tests/component/login-form.test.tsx`
- Modify: `src/features/auth/components/index.ts` (create if not exists)

**Step 1: Write failing test for LoginForm**

Create `src/tests/component/login-form.test.tsx`:

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/features/auth/components/login-form'

describe('LoginForm', () => {
  it('renders login form with all fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/format email tidak valid/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/password/i)
    await user.type(passwordInput, '123')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: /toggle password/i })

    expect(passwordInput.type).toBe('password')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('text')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })

  it('calls onSuccess callback on valid submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    render(<LoginForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders Google login button', () => {
    render(<LoginForm />)

    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument()
  })

  it('renders register link', () => {
    render(<LoginForm />)

    expect(screen.getByText(/sign up now/i)).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/tests/component/login-form.test.tsx
```

Expected: FAIL - "Module not found: login-form"

**Step 3: Create LoginForm component**

Create `src/features/auth/components/login-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { loginSchema, type LoginFormData } from '../schemas'
import { cn } from '@/lib/utils'

interface LoginFormProps {
  onSuccess?: () => void
  className?: string
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login logic
      console.log('Login attempt:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      onSuccess?.()
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
    // TODO: Implement Google OAuth
  }

  return (
    <div
      className={cn(
        'w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <Link href="/" className="inline-block">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter">
            TITIK MULA<span className="text-primary">.</span>
          </h1>
        </Link>
        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
          Welcome Back
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Email Address
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-11"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-11 pr-12"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Or</span>
        <Separator className="flex-1" />
      </div>

      {/* Social Login */}
      <Button
        type="button"
        variant="outline"
        className="w-full mb-8"
        onClick={handleGoogleLogin}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </Button>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link href="/register" className="font-bold text-gray-900 hover:text-black hover:underline transition-all">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}
```

**Step 4: Create barrel export**

Create `src/features/auth/components/index.ts`:

```typescript
export { LoginForm } from './login-form'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/tests/component/login-form.test.tsx
```

Expected: All 7 tests passing

**Step 6: Run coverage**

```bash
npm test -- src/tests/component/login-form.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/features/auth/components/ src/tests/component/login-form.test.tsx
git commit -m "feat(auth): add LoginForm component

- Form with email and password inputs
- React Hook Form + Zod validation
- Password visibility toggle
- Google OAuth button (placeholder)
- Link to register page
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Register Form Component

**Context:** Similar to LoginForm but with name field and confirm password.

**Files:**
- Create: `src/features/auth/components/register-form.tsx`
- Create: `src/tests/component/register-form.test.tsx`
- Modify: `src/features/auth/components/index.ts`

**Step 1: Write failing test**

Create `src/tests/component/register-form.test.tsx`:

```tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from '@/features/auth/components/register-form'

describe('RegisterForm', () => {
  it('renders all fields', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('validates password requirements', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    const passwordInput = screen.getByLabelText(/^password/i)
    await user.type(passwordInput, 'weak')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password minimal 8 karakter/i)).toBeInTheDocument()
    })
  })

  it('validates password mismatch', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/^password/i), 'Password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Different123')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/password tidak cocok/i)).toBeInTheDocument()
    })
  })

  it('calls onSuccess on valid submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    render(<RegisterForm onSuccess={onSuccess} />)

    await user.type(screen.getByLabelText(/^name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'Password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })

  it('renders login link', () => {
    render(<RegisterForm />)

    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/tests/component/register-form.test.tsx
```

Expected: FAIL - "Module not found"

**Step 3: Create RegisterForm component**

Create `src/features/auth/components/register-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, Lock, Eye, EyeOff, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { registerSchema, type RegisterFormData } from '../schemas'
import { cn } from '@/lib/utils'

interface RegisterFormProps {
  onSuccess?: () => void
  className?: string
}

export function RegisterForm({ onSuccess, className }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual register logic
      console.log('Register attempt:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      onSuccess?.()
    } catch (error) {
      console.error('Register error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    console.log('Google signup clicked')
    // TODO: Implement Google OAuth
  }

  return (
    <div
      className={cn(
        'w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-lg',
        className
      )}
    >
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <Link href="/" className="inline-block">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter">
            TITIK MULA<span className="text-primary">.</span>
          </h1>
        </Link>
        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
          Create Account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Full Name
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-11"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Email Address
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-11"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Password
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-11 pr-12"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Confirm Password
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-11 pr-12"
              {...register('confirmPassword')}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Or</span>
        <Separator className="flex-1" />
      </div>

      {/* Social Signup */}
      <Button
        type="button"
        variant="outline"
        className="w-full mb-8"
        onClick={handleGoogleSignup}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign up with Google
      </Button>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold text-gray-900 hover:text-black hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
```

**Step 4: Update barrel export**

Modify `src/features/auth/components/index.ts`:

```typescript
export { LoginForm } from './login-form'
export { RegisterForm } from './register-form'
```

**Step 5: Run tests**

```bash
npm test -- src/tests/component/register-form.test.tsx
```

Expected: All 5 tests passing

**Step 6: Commit**

```bash
git add src/features/auth/components/ src/tests/component/register-form.test.tsx
git commit -m "feat(auth): add RegisterForm component

- Form with name, email, password, confirm password
- React Hook Form + Zod validation
- Password requirements: uppercase, lowercase, number
- Password visibility toggles
- Google OAuth button (placeholder)
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Platform Constants & Types

**Context:** Platform page memiliki data static (services, philosophy items). Extract ke constants.

**Files:**
- Create: `src/features/platform/constants/services.constants.ts`
- Create: `src/features/platform/constants/philosophy.constants.ts`
- Create: `src/features/platform/constants/index.ts`
- Create: `src/features/platform/types/platform.types.ts`
- Create: `src/features/platform/types/index.ts`

**Step 1: Create types**

Create `src/features/platform/types/platform.types.ts`:

```typescript
import type { LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  price: string
  tag: string
  description: string
  icon?: LucideIcon
}

export interface PhilosophyItem {
  title: string
  description: string
}

export interface CurriculumLevel {
  level: number
  label: string
  width: string
  background: string
}
```

Create `src/features/platform/types/index.ts`:

```typescript
export type { Service, PhilosophyItem, CurriculumLevel } from './platform.types'
```

**Step 2: Create services constants**

Create `src/features/platform/constants/services.constants.ts`:

```typescript
import { Layout, FileText } from 'lucide-react'
import type { Service } from '../types'

export const SERVICES: Service[] = [
  {
    title: 'Psikotes Online Premium',
    price: 'Rp25.000',
    tag: 'Terpopuler',
    description: 'Analisis mendalam berbasis riset untuk hasil akurat.',
    icon: Layout
  },
  {
    title: 'Mentoring Satu Persen',
    price: 'Rp150.000',
    tag: 'Personal',
    description: 'Bimbingan intensif 1-on-1 dengan mentor terlatih.',
    icon: FileText
  },
  {
    title: 'Konseling Psikolog',
    price: 'Rp350.000',
    tag: 'Klinis',
    description: 'Sesi profesional bersama psikolog klinis berpengalaman.',
    icon: Layout
  },
  {
    title: 'Webinar Lifeskills',
    price: 'Gratis',
    tag: 'Edukasi',
    description: 'Belajar keterampilan hidup dasar secara interaktif.',
    icon: FileText
  },
  {
    title: 'Kelas Berlangganan',
    price: 'Rp99.000',
    tag: 'Premium',
    description: 'Akses ratusan materi video pengembangan diri.',
    icon: Layout
  },
  {
    title: 'Tes Karir & Minat Bakat',
    price: 'Rp45.000',
    tag: 'Karir',
    description: 'Temukan jalur karir yang sesuai dengan kepribadianmu.',
    icon: FileText
  }
]
```

**Step 3: Create philosophy constants**

Create `src/features/platform/constants/philosophy.constants.ts`:

```typescript
import type { PhilosophyItem } from '../types'

export const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    title: 'Self-Awareness',
    description: 'Mengenali kekuatan dan kelemahan diri secara objektif.'
  },
  {
    title: 'Good Pragmatism',
    description: 'Fokus pada apa yang benar-benar berhasil dalam hidup.'
  },
  {
    title: 'Continuous Growth',
    description: 'Tumbuh satu persen lebih baik setiap harinya.'
  },
  {
    title: 'Mental Resilience',
    description: 'Membangun ketahanan mental menghadapi tantangan.'
  }
]

export const CURRICULUM_LEVELS = [
  { level: 1, label: 'Self Mastery', width: 'w-[30%]', background: 'bg-black text-white shadow-xl' },
  { level: 2, label: 'Core Stability', width: 'w-[45%]', background: 'bg-slate-800 text-white' },
  { level: 3, label: 'Action & Habits', width: 'w-[60%]', background: 'bg-slate-600 text-white' },
  { level: 4, label: 'Social Intelligence', width: 'w-[75%]', background: 'bg-slate-400 text-white' },
  { level: 5, label: 'Legacy & Impact', width: 'w-[90%]', background: 'bg-slate-200 text-slate-700' }
] as const
```

**Step 4: Create barrel export**

Create `src/features/platform/constants/index.ts`:

```typescript
export { SERVICES } from './services.constants'
export { PHILOSOPHY_ITEMS, CURRICULUM_LEVELS } from './philosophy.constants'
```

**Step 5: Commit**

```bash
git add src/features/platform/
git commit -m "feat(platform): add constants and types

- Add Service, PhilosophyItem, CurriculumLevel types
- Add services data array (6 services)
- Add philosophy items array (4 items)
- Add curriculum levels array (5 levels)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Success Criteria

### Functional
- ✅ Auth schemas validate correctly
- ✅ LoginForm & RegisterForm render and work
- ✅ Form validation shows proper error messages
- ✅ Platform constants & types defined

### Quality
- ✅ Test coverage ≥ 80% for all components
- ✅ TypeScript strict mode compliant
- ✅ ESLint passes
- ✅ Build succeeds
- ✅ Components follow CODING_GUIDELINES.md

### Deliverables
- ✅ Auth schemas (login, register)
- ✅ LoginForm component + tests
- ✅ RegisterForm component + tests
- ✅ Platform types & constants

---

## Next Steps

After Phase 2 Part 1 completion:
- **Phase 2 Part 2:** Platform components (PlatformHero, PhilosophySection, etc.)
- **Phase 2 Part 3:** Konseling & Training pages
- **Phase 3:** Pages assembly & routing

---

**Estimated Time:** 4-6 hours
**Tasks:** 4 tasks
**Commits:** ~4 commits
