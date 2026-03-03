# Phase 5: Testing, Tooling & Documentation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Boost test coverage for critical paths, setup bundle analyzer, update README, adopt next/image.

**Architecture:** Quick tooling tasks first (bundle analyzer, next/image, README), then test tasks grouped by feature. Tests follow existing patterns: Vitest + React Testing Library + jsdom. Tests live in `src/tests/component/`.

**Tech Stack:** Vitest 4, @testing-library/react, @testing-library/user-event, jsdom, @next/bundle-analyzer, next/image

---

### Task 1: Setup bundle analyzer

**Files:**
- Modify: `package.json` (add script + dependency)
- Modify: `next.config.ts` (wrap with analyzer)

**Step 1: Install @next/bundle-analyzer**

```bash
npm install --save-dev @next/bundle-analyzer
```

**Step 2: Add analyze script to package.json**

Tambahkan di scripts:
```json
"analyze": "ANALYZE=true next build"
```

**Step 3: Wrap next.config.ts**

```typescript
import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // ... existing config
};

export default analyzer(nextConfig);
```

**Step 4: Verifikasi**

```bash
npx tsc --noEmit --pretty 2>&1 | head -5
```

**Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts
git commit -m "chore: setup bundle analyzer with @next/bundle-analyzer"
```

---

### Task 2: Replace img tags with next/image

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/QuestionForm.tsx` (~line 274)
- Modify: `src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx` (~line 515)

**Step 1: Read both files at the img tag locations**

**Step 2: Replace img with Image in QuestionForm.tsx**

Tambahkan import:
```typescript
import Image from 'next/image'
```

Ganti:
```tsx
<img
  src={imagePreview}
  alt="Preview"
  className="max-h-48 rounded-md border"
/>
```
Dengan:
```tsx
<Image
  src={imagePreview}
  alt="Preview"
  width={400}
  height={192}
  className="max-h-48 rounded-md border object-contain"
  unoptimized
/>
```

Note: `unoptimized` karena ini preview dari user upload (blob URL atau external URL), bukan static asset.

**Step 3: Same untuk QuestionFormWizard.tsx**

**Step 4: Verifikasi**

```bash
npx tsc --noEmit --pretty 2>&1 | head -5
npx eslint src/features/admin/components/QuestionManagement/ 2>&1 | tail -5
```
Expected: 0 `@next/next/no-img-element` warnings

**Step 5: Commit**

```bash
git add src/features/admin/components/QuestionManagement/
git commit -m "refactor: replace img tags with next/image in admin components"
```

---

### Task 3: Update README

**Files:**
- Modify: `README.md`

**Step 1: Read existing README dan project structure**

```bash
ls src/features/
cat .env.example
```

**Step 2: Replace README content**

Tulis README baru dengan sections:
- **Project Overview** — Bermoela/Titik Mula psikotes platform
- **Tech Stack** — Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Zustand, TanStack Query, Vitest
- **Architecture** — Feature-based structure (`src/features/`, `src/shared/`, `src/app/`)
- **Getting Started** — Prerequisites, install, env setup, dev server
- **Scripts** — dev, build, lint, test, test:coverage, test:e2e, analyze
- **Project Structure** — Tree diagram of src/features/ and src/app/
- **Environment Variables** — List from .env.example

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: replace boilerplate README with project documentation"
```

---

### Task 4: Tests — shared layout (navbar, footer, breadcrumb)

**Files:**
- Create: `src/tests/component/navbar.test.tsx`
- Create: `src/tests/component/footer.test.tsx`
- Create: `src/tests/component/breadcrumb.test.tsx`

**Context:** Navbar dan Footer are `'use client'` components that use `usePathname()`. Need to mock `next/navigation`.

**Step 1: Write navbar tests**

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/psikotes',
}))

import { Navbar } from '@/shared/components/layout/navbar'

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    // Check for logo text or element
  })

  it('renders navigation items', () => {
    render(<Navbar />)
    // Check for nav links
  })

  it('renders auth buttons', () => {
    render(<Navbar />)
    // Check for Masuk/Daftar buttons
  })
})
```

Read the actual component to determine exact text/elements to assert.

**Step 2: Write footer tests**

Similar pattern — mock `usePathname`, render, check for footer sections (links, social icons, copyright).

**Step 3: Write breadcrumb tests**

Read `src/shared/components/layout/breadcrumb.tsx` first. Test renders breadcrumb items correctly.

**Step 4: Run tests**

```bash
npx vitest run src/tests/component/navbar.test.tsx src/tests/component/footer.test.tsx src/tests/component/breadcrumb.test.tsx
```

**Step 5: Commit**

```bash
git add src/tests/component/
git commit -m "test: add shared layout component tests (navbar, footer, breadcrumb)"
```

---

### Task 5: Tests — auth components

**Files:**
- Create: `src/tests/component/forgot-password-form.test.tsx`
- Create: `src/tests/component/auth-guard.test.tsx`

**Context:** `forgot-password-form.tsx` uses `react-hook-form` + `zod`. `auth-guard.tsx` checks auth state and redirects.

**Step 1: Write forgot-password-form tests**

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

// Mock next/navigation and next/link
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/forgot-password',
}))

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'

describe('ForgotPasswordForm', () => {
  it('renders email input', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByRole('button', { name: /kirim|reset|lupa/i })).toBeInTheDocument()
  })

  it('validates empty email on submit', async () => {
    const user = userEvent.setup()
    render(<ForgotPasswordForm />)
    const submitBtn = screen.getByRole('button', { name: /kirim|reset/i })
    await user.click(submitBtn)
    // Check for validation error
  })

  it('renders back to login link', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByText(/masuk|login|kembali/i)).toBeInTheDocument()
  })
})
```

Read actual component to determine exact text.

**Step 2: Write auth-guard tests**

Read `src/features/auth/components/auth-guard.tsx`. Test: renders children when authenticated, redirects when not.

**Step 3: Run tests**

```bash
npx vitest run src/tests/component/forgot-password-form.test.tsx src/tests/component/auth-guard.test.tsx
```

**Step 4: Commit**

```bash
git add src/tests/component/
git commit -m "test: add auth component tests (forgot-password-form, auth-guard)"
```

---

### Task 6: Tests — dashboard components

**Files:**
- Create: `src/tests/component/user-dashboard.test.tsx`
- Create: `src/tests/component/admin-dashboard.test.tsx`
- Create: `src/tests/component/sidebar-nav.test.tsx`

**Context:** Dashboard components use `useAuthStoreHydrated()` from Zustand store and `usePathname()`. Need to mock both.

**Step 1: Write user-dashboard tests**

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}))

vi.mock('@/store/auth.store', () => ({
  useAuthStoreHydrated: () => ({
    user: { name: 'Test User', email: 'test@test.com', role: 'USER' },
    isAuthenticated: true,
  }),
}))

import { UserDashboard } from '@/features/dashboard/components/user-dashboard'

describe('UserDashboard', () => {
  it('renders welcome message with user name', () => {
    render(<UserDashboard />)
    expect(screen.getByText(/Test User/)).toBeInTheDocument()
  })

  it('renders test history section', () => {
    render(<UserDashboard />)
    // Check for history/riwayat section
  })

  it('renders quick action links', () => {
    render(<UserDashboard />)
    // Check for action buttons/links
  })
})
```

**Step 2: Write admin-dashboard tests** — similar pattern, mock admin role

**Step 3: Write sidebar-nav tests** — test nav items render, active state

**Step 4: Run tests and commit**

```bash
npx vitest run src/tests/component/user-dashboard.test.tsx src/tests/component/admin-dashboard.test.tsx src/tests/component/sidebar-nav.test.tsx
git add src/tests/component/
git commit -m "test: add dashboard component tests (user, admin, sidebar-nav)"
```

---

### Task 7: Tests — admin components

**Files:**
- Create: `src/tests/component/question-list.test.tsx`

**Context:** QuestionList displays a list of questions with CRUD actions. QuestionFormWizard is 734 lines — too complex for full testing, skip for now.

**Step 1: Read QuestionList component**

Read `src/features/admin/components/QuestionManagement/QuestionList.tsx` to understand props and rendering.

**Step 2: Write QuestionList tests**

Test: renders question items, renders empty state, renders action buttons (edit, delete).

Mock: `@tanstack/react-query` hooks, admin hooks.

**Step 3: Run tests and commit**

```bash
npx vitest run src/tests/component/question-list.test.tsx
git add src/tests/component/
git commit -m "test: add admin QuestionList component test"
```

---

### Task 8: Tests — psikotes components

**Files:**
- Create: `src/tests/component/psikotes-diagnostic.test.tsx`
- Create: `src/tests/component/category-showcase.test.tsx`

**Context:** `psikotes-diagnostic.tsx` is a chat-like diagnostic input. `category-showcase.tsx` is a marquee/carousel of category pills.

**Step 1: Write psikotes-diagnostic tests**

Test: renders input field, renders send button, handles user input.

**Step 2: Write category-showcase tests**

Test: renders category pills, renders marquee rows.

**Step 3: Run tests and commit**

```bash
npx vitest run src/tests/component/psikotes-diagnostic.test.tsx src/tests/component/category-showcase.test.tsx
git add src/tests/component/
git commit -m "test: add psikotes diagnostic and category-showcase tests"
```

---

### Task 9: Tests — useExamState hook

**Files:**
- Create: `src/tests/unit/use-exam-state.test.ts`

**Context:** `useExamState` is the core exam hook — fetches config, manages state, handles answers, timer, submission. Needs to mock `api` (axios).

**Step 1: Write hook tests**

```typescript
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock axios
vi.mock('@/lib/axios', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

import { useExamState } from '@/features/psikotes/hooks/useExamState'
import { api } from '@/lib/axios'

describe('useExamState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts in loading state', () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: null })
    const { result } = renderHook(() => useExamState('test-1'))
    expect(result.current.loading).toBe(true)
  })

  it('fetches test config on mount', async () => {
    const mockConfig = {
      test: { id: 'test-1', name: 'Test', duration: 30 },
      indicators: [],
      sections: [],
      questions: [],
      features: { hasCamera: false, hasSidebar: false, hasActivityLog: false, hasTimer: true },
    }
    ;(api.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockConfig })

    const { result } = renderHook(() => useExamState('test-1'))

    // Wait for effect
    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.config).toEqual(mockConfig)
    expect(api.get).toHaveBeenCalledWith('/tests/test-1/config')
  })

  it('handles fetch error', async () => {
    ;(api.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useExamState('test-1'))

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Failed to load test')
  })
})
```

**Step 2: Run tests**

```bash
npx vitest run src/tests/unit/use-exam-state.test.ts
```

**Step 3: Commit**

```bash
git add src/tests/unit/
git commit -m "test: add useExamState hook tests"
```

---

### Task 10: Final verification

**Step 1: Run all tests**

```bash
npx vitest run 2>&1 | tail -15
```
Expected: all tests pass, count > 100

**Step 2: TypeScript check**

```bash
npx tsc --noEmit --pretty 2>&1
```
Expected: 0 errors

**Step 3: ESLint check**

```bash
npx eslint src/ 2>&1 | tail -5
```
Expected: 0 errors

---

## Success Criteria

- Test count: 91 → 110+ tests
- Bundle analyzer: `npm run analyze` works
- README: real project documentation
- 0 `<img>` tags in production code
- All tests pass
- 0 TS errors, 0 ESLint errors
