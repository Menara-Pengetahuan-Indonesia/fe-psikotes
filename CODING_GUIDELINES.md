# Coding Guidelines - FE Psikotes

> Panduan pengembangan untuk project FE Psikotes (TITIK MULA - Indonesian Life School)

## Table of Contents

- [Project Structure](#project-structure)
- [Folder Organization](#folder-organization)
- [File Naming Conventions](#file-naming-conventions)
- [Code Organization](#code-organization)
- [Component Guidelines](#component-guidelines)
- [State Management](#state-management)
- [API & Services](#api--services)
- [Testing Guidelines](#testing-guidelines)
- [Git Workflow](#git-workflow)
- [Code Quality](#code-quality)
- [Performance Guidelines](#performance-guidelines)

---

## Project Structure

```
fe-psikotes/
├── src/
│   ├── app/                    # Next.js App Router (routing only)
│   ├── features/               # Feature modules (domain logic)
│   ├── shared/                 # Shared resources
│   ├── components/             # shadcn/ui components
│   ├── lib/                    # Global utilities
│   ├── store/                  # Global zustand stores
│   ├── styles/                 # Global styles
│   └── tests/                  # Test utilities & configs
├── public/                     # Static assets
├── docs/                       # Documentation
└── [config files]
```

---

## Folder Organization

### 1. `src/app/` - Next.js Routing Layer

**Purpose:** Hanya untuk routing dan page composition. Tidak ada business logic.

```
src/app/
├── layout.tsx                  # Root layout
├── page.tsx                    # Homepage
├── login/
│   └── page.tsx               # Login page (composition only)
├── register/
│   └── page.tsx               # Register page
├── platform/
│   ├── page.tsx               # Platform page
│   ├── layout.tsx             # Platform layout (if needed)
│   └── psikotes/
│       ├── mahasiswa/
│       │   ├── page.tsx
│       │   ├── minat-bakat/
│       │   │   ├── page.tsx
│       │   │   └── form/page.tsx
│       │   └── [other-tests]/
│       ├── perusahaan/
│       └── kesehatan-mental/
├── konseling/
│   └── page.tsx
└── training/
    └── page.tsx
```

**Rules:**
- ❌ NO business logic di pages
- ❌ NO API calls di pages
- ❌ NO complex state management
- ✅ Import dari features/
- ✅ Composition components saja
- ✅ Metadata & SEO configuration

**Example:**
```tsx
// ✅ GOOD - src/app/login/page.tsx
import { LoginForm } from '@/features/auth/components/login-form'

export default function LoginPage() {
  return <LoginForm />
}

// ❌ BAD - Don't do this
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const handleSubmit = async () => {
    await fetch('/api/login', ...) // ❌ No API calls here
  }
  return <form>...</form> // ❌ No inline forms
}
```

---

### 2. `src/features/` - Feature Modules

**Purpose:** Domain-specific logic, components, dan resources.

```
src/features/
├── auth/
│   ├── components/            # Feature-specific components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── password-input.tsx
│   │   └── index.ts          # Barrel export
│   ├── hooks/                # Feature-specific hooks
│   │   ├── use-auth.ts
│   │   ├── use-login.ts
│   │   └── index.ts
│   ├── services/             # API calls for this feature
│   │   ├── auth.service.ts
│   │   └── index.ts
│   ├── store/                # Feature-specific zustand store
│   │   ├── auth.store.ts
│   │   └── index.ts
│   ├── types/                # TypeScript types
│   │   ├── auth.types.ts
│   │   └── index.ts
│   ├── schemas/              # Zod validation schemas
│   │   ├── login.schema.ts
│   │   ├── register.schema.ts
│   │   └── index.ts
│   ├── constants/            # Feature constants
│   │   ├── auth.constants.ts
│   │   └── index.ts
│   └── utils/                # Feature-specific utilities
│       └── index.ts
├── platform/
│   ├── components/
│   │   ├── platform-hero.tsx
│   │   ├── service-card.tsx
│   │   ├── philosophy-section.tsx
│   │   ├── curriculum-pyramid.tsx
│   │   └── index.ts
│   ├── constants/
│   │   ├── services.constants.ts
│   │   ├── philosophy.constants.ts
│   │   └── index.ts
│   └── types/
│       └── platform.types.ts
├── psikotes/
│   ├── mahasiswa/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── schemas/
│   ├── perusahaan/
│   ├── kesehatan-mental/
│   ├── gratis/
│   ├── premium/
│   └── shared/              # Shared antar sub-features psikotes
│       ├── components/
│       │   ├── test-card.tsx
│       │   ├── result-card.tsx
│       │   └── index.ts
│       └── types/
├── konseling/
└── training/
```

**Rules:**
- ✅ Self-contained features
- ✅ Export melalui index.ts (barrel exports)
- ✅ Business logic ada di sini
- ✅ Feature bisa punya sub-features
- ✅ Shared antar sub-feature taruh di `feature/shared/`

---

### 3. `src/shared/` - Shared Resources

**Purpose:** Resources yang dipakai di banyak features (2+ features).

```
src/shared/
├── components/               # Shared UI components
│   ├── layout/
│   │   ├── section.tsx      # Section wrapper
│   │   ├── container.tsx    # Container wrapper
│   │   ├── page-header.tsx
│   │   └── index.ts
│   ├── feedback/
│   │   ├── loading-spinner.tsx
│   │   ├── error-message.tsx
│   │   ├── empty-state.tsx
│   │   └── index.ts
│   ├── typography/
│   │   ├── typing-text.tsx
│   │   ├── gradient-text.tsx
│   │   └── index.ts
│   ├── query-provider.tsx
│   └── index.ts
├── hooks/                   # Shared hooks (3+ usage)
│   ├── use-media-query.ts
│   ├── use-local-storage.ts
│   └── index.ts
├── types/                   # Global types
│   ├── common.types.ts
│   ├── api.types.ts
│   └── index.ts
├── lib/                     # Shared utilities
│   ├── cn.ts               # Class name utility
│   ├── format.ts           # Formatters
│   ├── validation.ts       # Common validations
│   └── index.ts
└── constants/              # Global constants
    ├── routes.constants.ts
    ├── app.constants.ts
    └── index.ts
```

**Rules:**
- ✅ Component masuk shared HANYA jika dipakai 2+ features
- ✅ Hook masuk shared HANYA jika dipakai 3+ kali
- ✅ Utility function harus pure (no side effects)
- ❌ NO feature-specific logic

**Decision Tree:**
```
Is this used in 2+ features?
  ├─ YES → Put in src/shared/
  └─ NO → Put in src/features/{feature-name}/
```

---

### 4. `src/components/ui/` - shadcn/ui Components

**Purpose:** shadcn/ui components yang di-generate.

```
src/components/ui/
├── button.tsx
├── card.tsx
├── input.tsx
├── form.tsx
├── label.tsx
├── dialog.tsx
└── [other-shadcn-components].tsx
```

**Rules:**
- ✅ ONLY shadcn components
- ❌ DO NOT manually edit (jika perlu custom, wrap di shared/components)
- ✅ Import dari '@/components/ui/...'

---

### 5. `src/lib/` - Global Utilities

**Purpose:** Global utility functions & configurations.

```
src/lib/
├── utils.ts                # cn() & common utils
├── axios.ts                # Axios instance config
├── react-query.ts          # React Query config
└── validators.ts           # Common validators
```

---

### 6. `src/store/` - Global Stores

**Purpose:** Global zustand stores (app-wide state).

```
src/store/
├── auth.store.ts           # Global auth state
├── ui.store.ts             # Global UI state (theme, sidebar, etc)
└── index.ts
```

**Rules:**
- ✅ ONLY for truly global state
- ✅ Feature-specific state → `features/{name}/store/`
- ✅ Use zustand for state management

---

## File Naming Conventions

### General Rules

1. **Files:** `kebab-case.tsx` or `kebab-case.ts`
   - ✅ `login-form.tsx`
   - ✅ `use-auth.ts`
   - ❌ `LoginForm.tsx`
   - ❌ `useAuth.ts`

2. **Components:** PascalCase inside file
   ```tsx
   // ✅ login-form.tsx
   export function LoginForm() { ... }
   ```

3. **Hooks:** camelCase with `use` prefix
   ```ts
   // ✅ use-auth.ts
   export function useAuth() { ... }
   ```

4. **Types:** PascalCase with descriptive suffix
   ```ts
   // ✅ auth.types.ts
   export type User = { ... }
   export type LoginRequest = { ... }
   export type AuthState = { ... }
   ```

5. **Constants:** SCREAMING_SNAKE_CASE
   ```ts
   // ✅ auth.constants.ts
   export const API_ENDPOINTS = { ... }
   export const MAX_LOGIN_ATTEMPTS = 3
   ```

6. **Services:** camelCase class or functions
   ```ts
   // ✅ auth.service.ts
   export const authService = {
     login: async () => { ... },
     logout: async () => { ... }
   }
   ```

### File Suffixes

| Type | Suffix | Example |
|------|--------|---------|
| Component | `.tsx` | `button.tsx` |
| Hook | `.ts` | `use-auth.ts` |
| Type | `.types.ts` | `auth.types.ts` |
| Schema | `.schema.ts` | `login.schema.ts` |
| Constant | `.constants.ts` | `routes.constants.ts` |
| Service | `.service.ts` | `auth.service.ts` |
| Store | `.store.ts` | `auth.store.ts` |
| Util | `.ts` | `format.ts` |
| Test | `.test.tsx` or `.test.ts` | `button.test.tsx` |

---

## Code Organization

### Component Structure

```tsx
// 1. Imports - grouped & sorted
import { useState } from 'react'                    // React
import { useRouter } from 'next/navigation'         // Next.js
import { useForm } from 'react-hook-form'           // External libraries
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'     // UI components
import { Input } from '@/components/ui/input'

import { useAuth } from '@/features/auth/hooks'     // Feature hooks
import { loginSchema } from '@/features/auth/schemas'
import type { LoginRequest } from '@/features/auth/types'

import { cn } from '@/lib/utils'                    // Lib/utils

// 2. Types (if needed locally)
interface LoginFormProps {
  onSuccess?: () => void
  className?: string
}

// 3. Component
export function LoginForm({ onSuccess, className }: LoginFormProps) {
  // 3.1. Hooks
  const router = useRouter()
  const { login } = useAuth()
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema)
  })

  // 3.2. State
  const [isLoading, setIsLoading] = useState(false)

  // 3.3. Handlers
  const handleSubmit = async (data: LoginRequest) => {
    setIsLoading(true)
    try {
      await login(data)
      onSuccess?.()
      router.push('/platform')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // 3.4. Render
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('space-y-4', className)}>
      {/* JSX */}
    </form>
  )
}
```

**Order inside component:**
1. Hooks (useRouter, useForm, custom hooks)
2. State (useState, useReducer)
3. Effects (useEffect)
4. Handlers (functions)
5. Computed values (useMemo, derived state)
6. Render helpers (if needed)
7. Return JSX

---

### Service Structure

```ts
// auth.service.ts
import { api } from '@/lib/axios'
import type { LoginRequest, LoginResponse, User } from './types'

export const authService = {
  /**
   * Login user with email & password
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data)
    return response.data
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me')
    return response.data
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  }
}
```

**Rules:**
- ✅ One service per feature
- ✅ Use named exports
- ✅ Add JSDoc comments
- ✅ Type all parameters & return values
- ✅ Handle errors di service atau di caller (consistent)

---

### Store Structure (Zustand)

```ts
// auth.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, LoginRequest } from './types'
import { authService } from './services'

interface AuthState {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  login: (data: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (data) => {
        set({ isLoading: true })
        try {
          const response = await authService.login(data)
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        await authService.logout()
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
```

---

### Schema Structure (Zod)

```ts
// login.schema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
})

export type LoginFormData = z.infer<typeof loginSchema>
```

**Rules:**
- ✅ One schema per form/validation
- ✅ Export inferred type
- ✅ Clear error messages
- ✅ Match backend validation rules

---

### Types Structure

```ts
// auth.types.ts

// API Request/Response types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

// Domain types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

export type UserRole = 'admin' | 'user' | 'psychologist'

// State types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

**Naming Conventions:**
- Request: `{Action}Request` (LoginRequest, CreateUserRequest)
- Response: `{Action}Response` (LoginResponse, UserListResponse)
- Domain: Noun (User, Test, Result)
- State: `{Feature}State` (AuthState, UIState)

---

### Constants Structure

```ts
// auth.constants.ts

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password'
} as const

export const AUTH_STORAGE_KEY = 'auth-storage'

export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 100,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL_CHAR: true
} as const

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me'
} as const
```

**Rules:**
- ✅ Group related constants
- ✅ Use `as const` for type safety
- ✅ SCREAMING_SNAKE_CASE for primitive values
- ✅ PascalCase for object constants

---

## Component Guidelines

### Shared vs Feature Components

**When to put in `shared/components/`:**
- Used in 2+ different features
- Highly reusable (Button wrapper, Card wrapper, Layout)
- No business logic
- Generic purpose

**When to put in `features/{name}/components/`:**
- Feature-specific
- Has business logic for that feature
- Used only in 1 feature

**Example:**

```tsx
// ✅ SHARED - src/shared/components/layout/section.tsx
// Used in: platform, konseling, training, etc
interface SectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-6">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {description && <p className="text-muted-foreground mb-8">{description}</p>}
        {children}
      </div>
    </section>
  )
}
```

```tsx
// ✅ FEATURE-SPECIFIC - src/features/platform/components/curriculum-pyramid.tsx
// Only used in platform page
export function CurriculumPyramid() {
  const levels = CURRICULUM_LEVELS // from platform constants
  return (
    <div className="flex flex-col items-center gap-3">
      {levels.map((level, idx) => (
        <PyramidLevel key={level.id} level={level} index={idx} />
      ))}
    </div>
  )
}
```

### Component Size Limits

- **Max 250 lines** per component file
- **Max 150 lines** for component JSX
- If larger → split into smaller components

### Component Composition

```tsx
// ❌ BAD - Giant component
export function PlatformPage() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  )
}

// ✅ GOOD - Composed from smaller components
export function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <PhilosophySection />
      <CurriculumSection />
      <ServicesSection />
    </>
  )
}
```

---

## State Management

### Local State (useState)

Use for:
- UI state (modals, dropdowns, form inputs)
- Component-specific state
- Temporary state

```tsx
const [isOpen, setIsOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
```

### Feature Store (Zustand)

Use for:
- Feature-specific shared state
- State needed by multiple components in same feature
- Complex state logic

```ts
// src/features/psikotes/mahasiswa/store/test.store.ts
export const useTestStore = create<TestState>((set) => ({
  currentQuestion: 0,
  answers: {},
  setAnswer: (questionId, answer) => { ... }
}))
```

### Global Store

Use for:
- App-wide state (auth, theme, UI)
- State needed by 3+ features

```ts
// src/store/auth.store.ts
export const useAuthStore = create<AuthState>({ ... })
```

### Server State (React Query)

Use for:
- Data fetching
- Server data caching
- Mutations

```tsx
// ✅ GOOD - Use React Query for API data
const { data: user, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => userService.getUser(userId)
})
```

**Decision Tree:**
```
What type of state?
├─ UI state (local to component) → useState
├─ Feature state (shared in feature) → Feature Store
├─ Global state (app-wide) → Global Store
└─ Server data → React Query
```

---

## API & Services

### Axios Configuration

```ts
// src/lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error)
  }
)
```

### Service Pattern

```ts
// features/psikotes/mahasiswa/services/test.service.ts
import { api } from '@/lib/axios'
import type { Test, TestResult, SubmitAnswerRequest } from '../types'

export const testService = {
  getTest: async (testId: string): Promise<Test> => {
    const { data } = await api.get<Test>(`/tests/${testId}`)
    return data
  },

  submitAnswer: async (request: SubmitAnswerRequest): Promise<void> => {
    await api.post('/tests/submit', request)
  },

  getResult: async (testId: string): Promise<TestResult> => {
    const { data } = await api.get<TestResult>(`/tests/${testId}/result`)
    return data
  }
}
```

### React Query Usage

```tsx
// features/psikotes/mahasiswa/hooks/use-test.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { testService } from '../services'

export function useTest(testId: string) {
  return useQuery({
    queryKey: ['test', testId],
    queryFn: () => testService.getTest(testId),
    enabled: !!testId
  })
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: testService.submitAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test'] })
    }
  })
}
```

---

## Testing Guidelines

### Testing Strategy

1. **Unit Tests** - All shared components, hooks, utils
2. **Integration Tests** - Feature components with business logic
3. **No E2E** - Playwright disabled

### Coverage Requirements

- **Minimum 70% coverage** for all code
- **80% coverage** for shared components
- **60% coverage** for feature components
- **90% coverage** for utilities & helpers

### Test File Structure

```
src/features/auth/
├── components/
│   ├── login-form.tsx
│   └── login-form.test.tsx        # Co-located test
├── hooks/
│   ├── use-auth.ts
│   └── use-auth.test.ts
└── services/
    ├── auth.service.ts
    └── auth.service.test.ts
```

### Component Testing

```tsx
// login-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { LoginForm } from './login-form'

describe('LoginForm', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    mockOnSuccess.mockClear()
  })

  it('renders login form', () => {
    render(<LoginForm onSuccess={mockOnSuccess} />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<LoginForm onSuccess={mockOnSuccess} />)

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    render(<LoginForm onSuccess={mockOnSuccess} />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })
})
```

### Hook Testing

```ts
// use-auth.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useAuth } from './use-auth'

describe('useAuth', () => {
  it('returns authenticated user', async () => {
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.user).toBeDefined()
      expect(result.current.isAuthenticated).toBe(true)
    })
  })
})
```

### Service Testing

```ts
// auth.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from './auth.service'
import { api } from '@/lib/axios'

vi.mock('@/lib/axios')

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('calls API with correct credentials', async () => {
      const mockResponse = { data: { user: {}, token: 'abc' } }
      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      })

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      })
      expect(result).toEqual(mockResponse.data)
    })
  })
})
```

### Run Tests

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test login-form.test.tsx

# Watch mode
npm run test -- --watch
```

---

## Git Workflow

### Branch Naming

```
feat/{feature-name}         # New feature
fix/{bug-description}       # Bug fix
refactor/{what}            # Code refactoring
chore/{what}               # Maintenance tasks
docs/{what}                # Documentation
test/{what}                # Adding tests
```

Examples:
- `feat/auth-login`
- `fix/button-spacing`
- `refactor/extract-header-component`
- `chore/update-dependencies`

### Commit Messages

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `test`: Adding tests
- `docs`: Documentation
- `chore`: Maintenance
- `style`: Formatting, no code change
- `perf`: Performance improvement

**Examples:**
```
feat(auth): add login form component

- Create LoginForm component with email/password inputs
- Add form validation with zod
- Integrate with auth service
- Add unit tests

Closes #123
```

```
fix(button): correct spacing in mobile view

The button padding was incorrect on mobile devices.
Changed from p-2 to p-4 for better touch targets.
```

### Pre-Commit Checklist

**BEFORE every commit:**

1. ✅ **Build passes**
   ```bash
   npm run build
   ```

2. ✅ **Tests pass**
   ```bash
   npm run test
   ```

3. ✅ **Linting passes**
   ```bash
   npm run lint
   ```

4. ✅ **Code formatted**
   - Check if code follows guidelines
   - Check file naming
   - Check imports order

5. ✅ **Coverage maintained**
   ```bash
   npm run test:coverage
   # Ensure coverage doesn't drop
   ```

### Pre-Push Checklist

**BEFORE pushing to remote:**

1. ✅ All pre-commit checks pass
2. ✅ Branch is up to date with main
   ```bash
   git pull origin main
   ```
3. ✅ No conflicts
4. ✅ Meaningful commit messages

### GitHub Actions

File: `.github/workflows/ci.yml`

The CI pipeline runs on every push and PR:

```yaml
# Automatic checks:
- Checkout code
- Install dependencies
- Run linting
- Run type checking (tsc)
- Run tests with coverage
- Build project
- Check coverage threshold (70% minimum)
```

**All checks must pass** before merging to main.

---

## Code Quality

### ESLint Rules

Key rules to follow:
- No unused variables
- No console.log in production code (use console.error for errors)
- Prefer const over let
- No any types (use unknown or proper types)
- Import order (React → Next → External → Internal)

### TypeScript Guidelines

1. **Strict Mode ON**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noImplicitAny": true,
       "strictNullChecks": true
     }
   }
   ```

2. **No `any` type**
   ```ts
   // ❌ BAD
   const data: any = fetchData()

   // ✅ GOOD
   const data: User | null = fetchData()
   ```

3. **Explicit return types for functions**
   ```ts
   // ❌ BAD
   function getUser(id: string) {
     return userService.get(id)
   }

   // ✅ GOOD
   function getUser(id: string): Promise<User> {
     return userService.get(id)
   }
   ```

4. **Use type imports**
   ```ts
   // ✅ GOOD
   import type { User } from './types'
   import { Button } from './button'
   ```

### Code Review Checklist

Before requesting review, check:

- [ ] Code follows naming conventions
- [ ] No hardcoded values (use constants)
- [ ] No magic numbers
- [ ] No commented code (delete it)
- [ ] No console.log
- [ ] Proper error handling
- [ ] TypeScript strict mode compliant
- [ ] Tests added/updated
- [ ] Coverage maintained
- [ ] Build passes
- [ ] Linting passes
- [ ] Meaningful variable/function names
- [ ] Components < 250 lines
- [ ] Functions < 50 lines
- [ ] Proper comments for complex logic

---

## Performance Guidelines

### Code Splitting

1. **Dynamic imports for heavy components**
   ```tsx
   import dynamic from 'next/dynamic'

   const HeavyChart = dynamic(() => import('./heavy-chart'), {
     loading: () => <LoadingSpinner />
   })
   ```

2. **Route-based splitting** (automatic with Next.js App Router)

### Image Optimization

```tsx
import Image from 'next/image'

// ✅ GOOD
<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // for LCP images
/>

// ❌ BAD
<img src="/hero.jpg" alt="Hero" />
```

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react'

// Memo for expensive components
export const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{/* ... */}</div>
})

// useMemo for expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value)
}, [data])

// useCallback for functions passed as props
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

### Bundle Size

- Monitor bundle size with `npm run build`
- Keep main bundle < 200KB (gzipped)
- Lazy load non-critical features
- Tree-shake unused code

---

## Import Order

**Standard order:**

```tsx
// 1. React
import { useState, useEffect } from 'react'

// 2. Next.js
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// 3. External libraries (alphabetical)
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 4. UI components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// 5. Shared components
import { Section } from '@/shared/components/layout'

// 6. Feature imports
import { useAuth } from '@/features/auth/hooks'
import { loginSchema } from '@/features/auth/schemas'

// 7. Types
import type { User } from '@/features/auth/types'

// 8. Utils & lib
import { cn } from '@/lib/utils'

// 9. Constants
import { ROUTES } from '@/shared/constants'
```

---

## Line Length & Code Formatting

### Line Length

- **Maximum 100 characters** per line
- If longer, break into multiple lines

```tsx
// ❌ BAD - Too long
<Button onClick={handleSubmit} className="w-full bg-primary text-white hover:bg-primary/90 transition-colors">

// ✅ GOOD
<Button
  onClick={handleSubmit}
  className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
>
```

### Function Parameters

```tsx
// ❌ BAD - All on one line
function createUser(email: string, password: string, name: string, role: UserRole, createdAt: Date) {

// ✅ GOOD - Multiple lines
function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole,
  createdAt: Date
): Promise<User> {
```

### Object/Array

```tsx
// ✅ GOOD
const user = {
  id: '123',
  email: 'test@example.com',
  name: 'John Doe',
  role: 'admin'
}

const items = [
  'item1',
  'item2',
  'item3'
]
```

---

## Additional Best Practices

### Error Handling

```tsx
// ✅ GOOD - Specific error handling
try {
  await loginUser(credentials)
} catch (error) {
  if (error instanceof ValidationError) {
    showToast('Invalid credentials')
  } else if (error instanceof NetworkError) {
    showToast('Network error. Please try again.')
  } else {
    showToast('An unexpected error occurred')
    console.error('Login error:', error)
  }
}
```

### Environment Variables

```ts
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
API_SECRET=xxx
```

**Rules:**
- `NEXT_PUBLIC_*` for client-side variables
- NO secrets in `NEXT_PUBLIC_*`
- Validate env vars on app start

```ts
// src/lib/env.ts
const requiredEnvs = ['NEXT_PUBLIC_API_URL'] as const

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required env: ${env}`)
  }
})
```

### Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML
- Add `aria-label` for icon-only buttons
- Maintain color contrast ratios (WCAG AA)

```tsx
// ✅ GOOD
<button aria-label="Close menu" onClick={handleClose}>
  <X className="h-4 w-4" />
</button>
```

### Documentation

Add JSDoc for:
- Public APIs
- Complex functions
- Non-obvious logic

```tsx
/**
 * Calculate user's test score based on answers
 * @param answers - User's answers to test questions
 * @param test - Test configuration with scoring rules
 * @returns Calculated score (0-100)
 */
function calculateScore(answers: Answer[], test: Test): number {
  // Implementation
}
```

---

## Summary Checklist

**Before every commit:**
- [ ] `npm run build` passes
- [ ] `npm run test` passes
- [ ] `npm run lint` passes
- [ ] Coverage maintained (>70%)
- [ ] Code follows naming conventions
- [ ] Imports properly ordered
- [ ] No console.log
- [ ] No commented code
- [ ] Proper TypeScript types
- [ ] Tests added for new code
- [ ] Line length < 100 chars
- [ ] Components < 250 lines
- [ ] Meaningful commit message

**Before every PR:**
- [ ] All commits follow conventions
- [ ] Branch up to date with main
- [ ] CI/CD pipeline passes
- [ ] Code reviewed
- [ ] No merge conflicts

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Docs](https://vitest.dev)

---

**Last Updated:** 2026-02-04
**Version:** 1.0.0
