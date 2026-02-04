# Phase 1: Foundation - shadcn Setup & Shared Components

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Setup foundation dengan shadcn/ui components dan build semua shared components yang akan digunakan di semua features.

**Architecture:** Bottom-up component-first approach. Install dan configure shadcn/ui terlebih dahulu, customize theme untuk monochrome design, lalu build shared components sebagai building blocks untuk feature components.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Vitest, Testing Library

---

## Task 1: Install shadcn/ui Missing Components

**Files:**
- Install components via CLI
- Auto-generated files in `src/components/ui/`

**Step 1: Install Dialog component**

```bash
npx shadcn@latest add dialog
```

Expected: Creates `src/components/ui/dialog.tsx`

**Step 2: Install Tabs component**

```bash
npx shadcn@latest add tabs
```

Expected: Creates `src/components/ui/tabs.tsx`

**Step 3: Install Badge component**

```bash
npx shadcn@latest add badge
```

Expected: Creates `src/components/ui/badge.tsx`

**Step 4: Install Separator component**

```bash
npx shadcn@latest add separator
```

Expected: Creates `src/components/ui/separator.tsx`

**Step 5: Install Skeleton component**

```bash
npx shadcn@latest add skeleton
```

Expected: Creates `src/components/ui/skeleton.tsx`

**Step 6: Install Dropdown Menu component**

```bash
npx shadcn@latest add dropdown-menu
```

Expected: Creates `src/components/ui/dropdown-menu.tsx`

**Step 7: Install Select component**

```bash
npx shadcn@latest add select
```

Expected: Creates `src/components/ui/select.tsx`

**Step 8: Install Checkbox component**

```bash
npx shadcn@latest add checkbox
```

Expected: Creates `src/components/ui/checkbox.tsx`

**Step 9: Install Radio Group component**

```bash
npx shadcn@latest add radio-group
```

Expected: Creates `src/components/ui/radio-group.tsx`

**Step 10: Verify all components installed**

```bash
ls src/components/ui/
```

Expected: All 9 new components + existing components listed

**Step 11: Build to verify no errors**

```bash
npm run build
```

Expected: Build succeeds without TypeScript errors

**Step 12: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): add shadcn components

- Add Dialog, Tabs, Badge, Separator, Skeleton
- Add Dropdown Menu, Select, Checkbox, Radio Group
- Foundation for shared components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Customize Tailwind Theme for Monochrome Design

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/styles/globals.css` (if needed)

**Step 1: Read current tailwind config**

```bash
cat tailwind.config.ts
```

**Step 2: Update tailwind.config.ts with extended theme**

Add to `theme.extend`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Feature-specific colors
        'ps-primary': 'hsl(var(--ps-primary))',
        'ps-muted': 'hsl(var(--ps-muted))',
        'ks-primary': 'hsl(var(--ks-primary))',
        'ks-muted': 'hsl(var(--ks-muted))',
        'tr-primary': 'hsl(var(--tr-primary))',
        'tr-muted': 'hsl(var(--tr-muted))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

**Step 3: Build to verify config is valid**

```bash
npm run build
```

Expected: Build succeeds

**Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(theme): customize tailwind for monochrome design

- Add extended border radius (xl, 2xl, 3xl, 4xl)
- Add soft shadow variants
- Add feature-specific colors (psikotes, konseling, training)
- Maintain existing shadcn color system

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create Shared Layout Components - Section

**Files:**
- Create: `src/shared/components/layout/section.tsx`
- Create: `src/shared/components/layout/section.test.tsx`
- Create: `src/shared/components/layout/index.ts`

**Step 1: Write failing test for Section component**

Create `src/shared/components/layout/section.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Section } from './section'

describe('Section', () => {
  it('renders children correctly', () => {
    render(
      <Section>
        <p>Test content</p>
      </Section>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Section title="Test Title">Content</Section>)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Section description="Test Description">Content</Section>)

    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Section className="custom-class">Content</Section>)

    const section = screen.getByText('Content').closest('section')
    expect(section).toHaveClass('custom-class')
  })

  it('renders with default spacing', () => {
    render(<Section data-testid="section">Content</Section>)

    const section = screen.getByTestId('section')
    expect(section).toHaveClass('py-16')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/layout/section.test.tsx
```

Expected: FAIL - "Module not found: section"

**Step 3: Create Section component**

Create `src/shared/components/layout/section.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface SectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Section({
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-muted-foreground text-lg mb-8">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
```

**Step 4: Create barrel export**

Create `src/shared/components/layout/index.ts`:

```ts
export { Section } from './section'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/shared/components/layout/section.test.tsx
```

Expected: PASS - All 5 tests passing

**Step 6: Run coverage to verify 80%+ coverage**

```bash
npm test -- src/shared/components/layout/section.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/shared/components/layout/
git commit -m "feat(shared): add Section layout component

- Reusable section wrapper with consistent spacing
- Optional title and description
- Responsive padding (py-16 md:py-24)
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create Shared Layout Components - Container

**Files:**
- Create: `src/shared/components/layout/container.tsx`
- Create: `src/shared/components/layout/container.test.tsx`
- Modify: `src/shared/components/layout/index.ts`

**Step 1: Write failing test for Container component**

Create `src/shared/components/layout/container.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Container } from './container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(<Container>Test content</Container>)

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies max-width constraint', () => {
    render(<Container data-testid="container">Content</Container>)

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('max-w-7xl')
  })

  it('applies default padding', () => {
    render(<Container data-testid="container">Content</Container>)

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('px-6')
  })

  it('applies custom className', () => {
    render(<Container className="custom-class">Content</Container>)

    const container = screen.getByText('Content')
    expect(container).toHaveClass('custom-class')
  })

  it('centers content with mx-auto', () => {
    render(<Container data-testid="container">Content</Container>)

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('mx-auto')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/layout/container.test.tsx
```

Expected: FAIL - "Module not found: container"

**Step 3: Create Container component**

Create `src/shared/components/layout/container.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-7xl mx-auto px-6', className)}>{children}</div>
  )
}
```

**Step 4: Update barrel export**

Modify `src/shared/components/layout/index.ts`:

```ts
export { Section } from './section'
export { Container } from './container'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/shared/components/layout/container.test.tsx
```

Expected: PASS - All 5 tests passing

**Step 6: Run coverage**

```bash
npm test -- src/shared/components/layout/container.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/shared/components/layout/
git commit -m "feat(shared): add Container layout component

- Max-width container (max-w-7xl)
- Centered with mx-auto
- Responsive padding (px-6)
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Shared Layout Components - PageHeader

**Files:**
- Create: `src/shared/components/layout/page-header.tsx`
- Create: `src/shared/components/layout/page-header.test.tsx`
- Modify: `src/shared/components/layout/index.ts`

**Step 1: Write failing test for PageHeader component**

Create `src/shared/components/layout/page-header.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeader } from './page-header'

describe('PageHeader', () => {
  it('renders title correctly', () => {
    render(<PageHeader title="Test Title" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<PageHeader title="Title" subtitle="Test Subtitle" />)

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('renders badge when provided', () => {
    render(<PageHeader title="Title" badge="New Feature" />)

    expect(screen.getByText('New Feature')).toBeInTheDocument()
  })

  it('renders centered alignment by default', () => {
    render(<PageHeader title="Title" data-testid="header" />)

    const header = screen.getByTestId('header')
    expect(header).toHaveClass('text-center')
  })

  it('renders left alignment when specified', () => {
    render(<PageHeader title="Title" align="left" data-testid="header" />)

    const header = screen.getByTestId('header')
    expect(header).not.toHaveClass('text-center')
  })

  it('applies custom className', () => {
    render(<PageHeader title="Title" className="custom-class" />)

    const header = screen.getByText('Title').closest('div')
    expect(header).toHaveClass('custom-class')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/layout/page-header.test.tsx
```

Expected: FAIL - "Module not found: page-header"

**Step 3: Create PageHeader component**

Create `src/shared/components/layout/page-header.tsx`:

```tsx
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center'
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  badge,
  align = 'center',
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'space-y-4',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <div className={cn(align === 'center' && 'flex justify-center')}>
          <Badge
            variant="outline"
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
          >
            {badge}
          </Badge>
        </div>
      )}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

**Step 4: Update barrel export**

Modify `src/shared/components/layout/index.ts`:

```ts
export { Section } from './section'
export { Container } from './container'
export { PageHeader } from './page-header'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/shared/components/layout/page-header.test.tsx
```

Expected: PASS - All 6 tests passing

**Step 6: Run coverage**

```bash
npm test -- src/shared/components/layout/page-header.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/shared/components/layout/
git commit -m "feat(shared): add PageHeader component

- Page header with title, subtitle, badge
- Support centered/left alignment
- Responsive typography (text-4xl → text-6xl)
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Shared Card Component - ServiceCard

**Files:**
- Create: `src/shared/components/service-card.tsx`
- Create: `src/shared/components/service-card.test.tsx`
- Create: `src/shared/components/index.ts`

**Step 1: Write failing test for ServiceCard component**

Create `src/shared/components/service-card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BookOpen } from 'lucide-react'
import { ServiceCard } from './service-card'

describe('ServiceCard', () => {
  const defaultProps = {
    icon: BookOpen,
    title: 'Test Service',
    description: 'Test description',
  }

  it('renders title and description', () => {
    render(<ServiceCard {...defaultProps} />)

    expect(screen.getByText('Test Service')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(<ServiceCard {...defaultProps} />)

    const icon = screen.getByTestId('service-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders price when provided', () => {
    render(<ServiceCard {...defaultProps} price="Rp100.000" />)

    expect(screen.getByText('Rp100.000')).toBeInTheDocument()
  })

  it('renders tag when provided', () => {
    render(<ServiceCard {...defaultProps} tag="Popular" />)

    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    render(<ServiceCard {...defaultProps} actionLabel="View Details" />)

    expect(screen.getByRole('button', { name: 'View Details' })).toBeInTheDocument()
  })

  it('calls onAction when action button clicked', async () => {
    const onAction = vi.fn()
    render(
      <ServiceCard {...defaultProps} actionLabel="Click Me" onAction={onAction} />
    )

    const button = screen.getByRole('button', { name: 'Click Me' })
    await userEvent.click(button)

    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<ServiceCard {...defaultProps} className="custom-class" />)

    const card = screen.getByText('Test Service').closest('div')?.parentElement
    expect(card).toHaveClass('custom-class')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/service-card.test.tsx
```

Expected: FAIL - "Module not found: service-card"

**Step 3: Create ServiceCard component**

Create `src/shared/components/service-card.tsx`:

```tsx
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  price?: string
  tag?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  price,
  tag,
  actionLabel,
  onAction,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        'group transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1',
        className
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            data-testid="service-icon"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Icon className="h-6 w-6" />
          </div>
          {tag && (
            <Badge variant="outline" className="text-[10px] font-bold uppercase">
              {tag}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>

      {(price || actionLabel) && (
        <CardFooter className="flex items-center justify-between border-t pt-4">
          {price && <span className="text-lg font-bold">{price}</span>}
          {actionLabel && (
            <Button
              onClick={onAction}
              size="sm"
              className="ml-auto"
            >
              {actionLabel}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
```

**Step 4: Create barrel export**

Create `src/shared/components/index.ts`:

```ts
export { ServiceCard } from './service-card'
```

**Step 5: Add missing test imports**

Update `src/shared/components/service-card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BookOpen } from 'lucide-react'
import { ServiceCard } from './service-card'
```

**Step 6: Run test to verify it passes**

```bash
npm test -- src/shared/components/service-card.test.tsx
```

Expected: PASS - All 7 tests passing

**Step 7: Run coverage**

```bash
npm test -- src/shared/components/service-card.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 8: Commit**

```bash
git add src/shared/components/
git commit -m "feat(shared): add ServiceCard component

- Card for displaying services/products
- Support icon, title, description, price, tag
- Optional action button with callback
- Hover effects (lift + shadow)
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create Shared Typography Component - TypingText (Already Exists)

**Note:** Component `TypingText` already exists at `src/shared/components/typing-text.tsx`. Skip creation, but verify and add to barrel export if missing.

**Files:**
- Read: `src/shared/components/typing-text.tsx`
- Modify: `src/shared/components/index.ts` (if needed)

**Step 1: Verify TypingText exists**

```bash
cat src/shared/components/typing-text.tsx
```

Expected: File exists with TypingText component

**Step 2: Check if already exported**

```bash
grep "TypingText" src/shared/components/index.ts
```

**Step 3: Add to barrel export if missing**

If not found, modify `src/shared/components/index.ts`:

```ts
export { ServiceCard } from './service-card'
export { TypingText } from './typing-text'
```

**Step 4: Commit if changes made**

```bash
git add src/shared/components/index.ts
git commit -m "feat(shared): add TypingText to barrel export

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create Shared Feedback Component - LoadingSpinner

**Files:**
- Create: `src/shared/components/feedback/loading-spinner.tsx`
- Create: `src/shared/components/feedback/loading-spinner.test.tsx`
- Create: `src/shared/components/feedback/index.ts`

**Step 1: Write failing test for LoadingSpinner**

Create `src/shared/components/feedback/loading-spinner.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoadingSpinner } from './loading-spinner'

describe('LoadingSpinner', () => {
  it('renders spinner', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('renders with default size', () => {
    render(<LoadingSpinner data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('h-8', 'w-8')
  })

  it('renders small size', () => {
    render(<LoadingSpinner size="sm" data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('h-4', 'w-4')
  })

  it('renders large size', () => {
    render(<LoadingSpinner size="lg" data-testid="spinner" />)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('h-12', 'w-12')
  })

  it('renders loading text when provided', () => {
    render(<LoadingSpinner text="Loading..." />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" data-testid="spinner" />)

    const container = screen.getByTestId('spinner').parentElement
    expect(container).toHaveClass('custom-class')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/feedback/loading-spinner.test.tsx
```

Expected: FAIL - "Module not found: loading-spinner"

**Step 3: Create LoadingSpinner component**

Create `src/shared/components/feedback/loading-spinner.tsx`:

```tsx
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div
        role="status"
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size]
        )}
        aria-label="Loading"
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
```

**Step 4: Create barrel export**

Create `src/shared/components/feedback/index.ts`:

```ts
export { LoadingSpinner } from './loading-spinner'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/shared/components/feedback/loading-spinner.test.tsx
```

Expected: PASS - All 6 tests passing

**Step 6: Run coverage**

```bash
npm test -- src/shared/components/feedback/loading-spinner.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/shared/components/feedback/
git commit -m "feat(shared): add LoadingSpinner component

- Spinner with size variants (sm, md, lg)
- Optional loading text
- Animated with Tailwind animate-spin
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create Shared Feedback Component - ErrorMessage

**Files:**
- Create: `src/shared/components/feedback/error-message.tsx`
- Create: `src/shared/components/feedback/error-message.test.tsx`
- Modify: `src/shared/components/feedback/index.ts`

**Step 1: Write failing test for ErrorMessage**

Create `src/shared/components/feedback/error-message.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ErrorMessage } from './error-message'

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<ErrorMessage title="Error" message="Something went wrong" />)

    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders retry button when onRetry provided', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('calls onRetry when retry button clicked', async () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)

    const button = screen.getByRole('button', { name: /retry/i })
    await userEvent.click(button)

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<ErrorMessage message="Error" className="custom-class" />)

    const container = screen.getByText('Error').closest('div')
    expect(container).toHaveClass('custom-class')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/feedback/error-message.test.tsx
```

Expected: FAIL - "Module not found: error-message"

**Step 3: Create ErrorMessage component**

Create `src/shared/components/feedback/error-message.tsx`:

```tsx
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-8 text-center',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  )
}
```

**Step 4: Update barrel export**

Modify `src/shared/components/feedback/index.ts`:

```ts
export { LoadingSpinner } from './loading-spinner'
export { ErrorMessage } from './error-message'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/shared/components/feedback/error-message.test.tsx
```

Expected: PASS - All 5 tests passing

**Step 6: Run coverage**

```bash
npm test -- src/shared/components/feedback/error-message.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/shared/components/feedback/
git commit -m "feat(shared): add ErrorMessage component

- Error display with icon, title, message
- Optional retry button with callback
- Destructive color theme (red tones)
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Create Shared Feedback Component - EmptyState

**Files:**
- Create: `src/shared/components/feedback/empty-state.tsx`
- Create: `src/shared/components/feedback/empty-state.test.tsx`
- Modify: `src/shared/components/feedback/index.ts`

**Step 1: Write failing test for EmptyState**

Create `src/shared/components/feedback/empty-state.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No data" description="No items found" />)

    expect(screen.getByText('No data')).toBeInTheDocument()
    expect(screen.getByText('No items found')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const onAction = vi.fn()
    render(
      <EmptyState
        title="No data"
        description="No items found"
        actionLabel="Add Item"
        onAction={onAction}
      />
    )

    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument()
  })

  it('calls onAction when action button clicked', async () => {
    const onAction = vi.fn()
    render(
      <EmptyState
        title="No data"
        description="No items"
        actionLabel="Add"
        onAction={onAction}
      />
    )

    const button = screen.getByRole('button', { name: 'Add' })
    await userEvent.click(button)

    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('renders custom icon when provided', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Icon</div>
    render(
      <EmptyState
        title="No data"
        description="No items"
        icon={CustomIcon}
      />
    )

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <EmptyState
        title="No data"
        description="No items"
        className="custom-class"
      />
    )

    const container = screen.getByText('No data').closest('div')
    expect(container).toHaveClass('custom-class')
  })
})
```

**Step 2: Run test to verify it fails**

```bash
npm test -- src/shared/components/feedback/empty-state.test.tsx
```

Expected: FAIL - "Module not found: empty-state"

**Step 3: Create EmptyState component**

Create `src/shared/components/feedback/empty-state.tsx`:

```tsx
import { Inbox, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-lg border border-dashed p-12 text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
```

**Step 4: Update barrel export**

Modify `src/shared/components/feedback/index.ts`:

```ts
export { LoadingSpinner } from './loading-spinner'
export { ErrorMessage } from './error-message'
export { EmptyState } from './empty-state'
```

**Step 5: Run test to verify it passes**

```bash
npm test -- src/shared/components/feedback/empty-state.test.tsx
```

Expected: PASS - All 5 tests passing

**Step 6: Run coverage**

```bash
npm test -- src/shared/components/feedback/empty-state.test.tsx --coverage
```

Expected: Coverage ≥ 80%

**Step 7: Commit**

```bash
git add src/shared/components/feedback/
git commit -m "feat(shared): add EmptyState component

- Empty state with icon, title, description
- Optional action button with callback
- Default Inbox icon, customizable
- Dashed border style
- Test coverage: 100%

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Run All Tests & Verify Coverage

**Step 1: Run all tests**

```bash
npm test
```

Expected: All tests passing (auth tests + new shared component tests)

**Step 2: Run coverage report**

```bash
npm run test:coverage
```

Expected: Overall coverage ≥ 70%, shared components ≥ 80%

**Step 3: Check coverage details**

```bash
cat coverage/coverage-summary.json
```

Expected: Verify numbers match requirements

**Step 4: Build project to verify no errors**

```bash
npm run build
```

Expected: Build succeeds without errors

**Step 5: Commit if any fixes needed**

If any fixes were made during verification:

```bash
git add .
git commit -m "test: ensure all tests pass and coverage meets requirements

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Update Main Barrel Export for Shared Components

**Files:**
- Create: `src/shared/components/index.ts` (if doesn't exist)
- OR Modify: `src/shared/components/index.ts` (if exists)

**Step 1: Check if main barrel export exists**

```bash
cat src/shared/components/index.ts 2>/dev/null || echo "File not found"
```

**Step 2: Create or update main barrel export**

Create/Update `src/shared/components/index.ts`:

```ts
// Layout components
export { Section, Container, PageHeader } from './layout'

// Card components
export { ServiceCard } from './service-card'

// Typography components
export { TypingText } from './typing-text'

// Feedback components
export { LoadingSpinner, ErrorMessage, EmptyState } from './feedback'
```

**Step 3: Test imports work correctly**

Create temporary test file to verify imports:

```bash
cat > /tmp/test-imports.ts << 'EOF'
import {
  Section,
  Container,
  PageHeader,
  ServiceCard,
  TypingText,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from './src/shared/components'

// This file just tests that imports resolve correctly
// Will be removed after verification
EOF
```

**Step 4: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors

**Step 5: Remove temp test file**

```bash
rm /tmp/test-imports.ts
```

**Step 6: Commit**

```bash
git add src/shared/components/index.ts
git commit -m "feat(shared): add main barrel export for components

- Export all layout, card, typography, feedback components
- Single import point: @/shared/components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Final Verification & Phase 1 Completion

**Step 1: Run full test suite**

```bash
npm test
```

Expected: All tests passing

**Step 2: Run coverage**

```bash
npm run test:coverage
```

Expected:
- Overall ≥ 70%
- Shared components ≥ 80%

**Step 3: Run lint**

```bash
npm run lint
```

Expected: No linting errors

**Step 4: Build**

```bash
npm run build
```

Expected: Build succeeds

**Step 5: Verify file structure**

```bash
tree src/shared/components -I node_modules
```

Expected output:
```
src/shared/components/
├── feedback/
│   ├── empty-state.test.tsx
│   ├── empty-state.tsx
│   ├── error-message.test.tsx
│   ├── error-message.tsx
│   ├── index.ts
│   ├── loading-spinner.test.tsx
│   └── loading-spinner.tsx
├── layout/
│   ├── container.test.tsx
│   ├── container.tsx
│   ├── index.ts
│   ├── page-header.test.tsx
│   ├── page-header.tsx
│   ├── section.test.tsx
│   └── section.tsx
├── index.ts
├── query-provider.tsx
├── service-card.test.tsx
├── service-card.tsx
└── typing-text.tsx
```

**Step 6: Check component count**

```bash
find src/shared/components -name "*.tsx" -not -name "*.test.tsx" | wc -l
```

Expected: 10 component files (Section, Container, PageHeader, ServiceCard, TypingText, QueryProvider, LoadingSpinner, ErrorMessage, EmptyState, + barrel exports)

**Step 7: Create Phase 1 completion tag**

```bash
git tag -a phase1-foundation-complete -m "Phase 1: Foundation complete

- shadcn/ui components installed (9 new components)
- Tailwind theme customized for monochrome design
- Shared layout components (Section, Container, PageHeader)
- Shared card component (ServiceCard)
- Shared feedback components (LoadingSpinner, ErrorMessage, EmptyState)
- Typography component (TypingText - existing)
- All components tested with ≥80% coverage
- Build passing, lint passing

Ready for Phase 2: Feature Components"
```

**Step 8: Push tag**

```bash
git push origin phase1-foundation-complete
```

---

## Success Criteria

### Functional
- ✅ All 9 shadcn components installed
- ✅ Tailwind theme customized (border radius, shadows, colors)
- ✅ 8 shared components created and tested
- ✅ All components exported via barrel exports
- ✅ All tests passing

### Quality
- ✅ Test coverage ≥ 80% for shared components
- ✅ TypeScript strict mode compliant
- ✅ ESLint passes
- ✅ Build succeeds
- ✅ Components follow CODING_GUIDELINES.md

### Deliverables
- ✅ `src/components/ui/` - 9 shadcn components
- ✅ `src/shared/components/layout/` - 3 layout components + tests
- ✅ `src/shared/components/service-card.tsx` + test
- ✅ `src/shared/components/feedback/` - 3 feedback components + tests
- ✅ Barrel exports for clean imports
- ✅ Git tag: `phase1-foundation-complete`

---

## Next Steps

After Phase 1 completion:
- **Phase 2: Feature Components** (Auth, Platform, Psikotes Shared)
- Use @superpowers:writing-plans to create Phase 2 plan
- Continue in same worktree or merge to main first (user choice)

---

**Estimated Time:** 4-6 hours for competent developer
**Tasks:** 13 tasks
**Commits:** ~13 commits (one per task/component)
