# Coding Guidelines

Ketentuan penulisan kode untuk project **fe-psikotes**.

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 |
| State Management | Zustand 5 |
| Data Fetching | TanStack React Query 5 |
| Form | React Hook Form + Zod |
| UI Components | Radix UI |
| Animation | Framer Motion |
| Icons | Lucide React |

## Struktur Folder

```
src/
├── app/                    # Next.js App Router pages
│   ├── (autentikasi)/      # Route group: login, register
│   ├── (public)/           # Route group: psikotes, konseling, training
│   └── (dasbor)/           # Route group: dashboard pages
├── components/ui/          # Reusable UI components (shadcn-style)
├── data/                   # JSON data files (mock/static)
├── features/               # Feature-based modules
│   └── [feature]/
│       ├── components/     # React components
│       ├── hooks/          # Custom hooks
│       ├── types/          # TypeScript types/interfaces
│       ├── schemas/        # Zod validation schemas
│       ├── services/       # API calls & services
│       └── index.ts        # Barrel exports
├── shared/
│   ├── components/         # Shared components (QueryProvider, etc)
│   └── types/              # Shared types (API response, etc)
├── store/                  # Zustand stores
├── lib/                    # Utility libraries (axios, utils, env)
└── styles/                 # Global styles & pillar colors
```

## Path Aliases

Gunakan path aliases yang sudah dikonfigurasi:

```typescript
import { Button } from '@/components/ui/button'       // @/* → src/*
import { useAuth } from '@features/auth'              // @features/* → src/features/*
import { QueryProvider } from '@shared/components'    // @shared/* → src/shared/*
import { cn } from '@lib/utils'                       // @lib/* → src/lib/*
import { useAuthStore } from '@store/auth.store'      // @store/* → src/store/*
```

## Penempatan File

| Jenis File | Lokasi | Contoh |
|------------|--------|--------|
| Types/Interfaces | `src/features/[feature]/types/` | `src/features/psikotes/types/index.ts` |
| Schema (Zod) | `src/features/[feature]/schemas/` | `src/features/auth/schemas/login.ts` |
| API/Services | `src/features/[feature]/services/` | `src/features/psikotes/services/index.ts` |
| JSON Data | `src/data/` | `src/data/test-categories.json` |
| UI Components | `src/components/ui/` | `src/components/ui/button.tsx` |
| Global Types | `src/shared/types/` | Hanya jika dipakai di >3 features |

## Feature Module Pattern

Setiap feature harus mengikuti struktur ini:

```
src/features/psikotes/
├── components/
│   ├── test-card.tsx
│   ├── test-list.tsx
│   └── index.ts          # Barrel export
├── hooks/
│   ├── use-tests.ts
│   ├── use-test.ts
│   └── index.ts
├── services/
│   └── index.ts          # API calls
├── types/
│   └── index.ts          # Interfaces & types
└── index.ts              # Public API barrel export
```

### Barrel Export Pattern

```typescript
// src/features/psikotes/index.ts
export * from './components'
export * from './hooks'
export * from './types'
```

## API Integration

### Service Pattern

```typescript
// src/features/psikotes/services/index.ts
import api from '@lib/axios'
import type { Test, TestSession } from '../types'

export const psikotesService = {
  getTests: () =>
    api.get<Test[]>('/tests'),

  getTest: (id: string) =>
    api.get<Test>(`/tests/${id}`),

  startSession: (testId: string) =>
    api.post<TestSession>(`/tests/${testId}/sessions`),
}
```

### React Query Hooks

```typescript
// src/features/psikotes/hooks/use-tests.ts
import { useQuery } from '@tanstack/react-query'
import { psikotesService } from '../services'

export function useTests() {
  return useQuery({
    queryKey: ['tests'],
    queryFn: psikotesService.getTests,
  })
}
```

## Styling

### Pillar Color System

Proyek ini menggunakan sistem warna berbasis **3 pilar**:

| Pilar | Prefix | Warna | Kesan |
|-------|--------|-------|-------|
| Psikotes | `ps-` | Biru | Profesional, Terpercaya |
| Konseling | `ks-` | Hijau | Tenang, Healing |
| Training | `tr-` | Orange | Energik, Motivasi |

### Menggunakan Pillar Colors

```typescript
// CSS Variables tersedia di src/styles/pillars.css

// Psikotes (Biru)
className="bg-ps-primary text-white"
className="text-ps-primary"
className="bg-ps-muted text-ps-muted-foreground"
className="border-ps-primary"
className="shadow-ps"
className="gradient-ps"

// Konseling (Hijau)
className="bg-ks-primary text-white"
className="text-ks-primary"
className="bg-ks-muted text-ks-muted-foreground"

// Training (Orange)
className="bg-tr-primary text-white"
className="text-tr-primary"
className="bg-tr-muted text-tr-muted-foreground"
```

### Tailwind CSS v4 Syntax

```typescript
// ❌ Syntax lama
className="bg-gradient-to-br"

// ✅ Syntax baru
className="bg-linear-to-br"
```

### Design Tokens

Gunakan design tokens, bukan hardcode:

```typescript
// ❌ Jangan
className="bg-[#3b82f6]"
className="w-[120px] p-[10px]"

// ✅ Gunakan
className="bg-ps-primary"           // Pillar colors
className="bg-primary"              // Base tokens
className="w-30 p-2.5"              // Tailwind spacing
```

### Class Organization

Urutan: layout → spacing → sizing → colors → effects

```typescript
className="flex items-center gap-2 p-4 w-full bg-white rounded-lg shadow-sm"
```

## TypeScript Rules

### Strict Mode

```typescript
// ❌ Jangan gunakan any
const data: any = fetchData()
const icons: Record<string, any> = {}

// ✅ Gunakan proper types
const data: TestData = fetchData()
const icons: Record<string, LucideIcon> = {}
```

### Unused Variables

```typescript
// ❌ Jangan
function Component({ period }: Props) { // period tidak dipakai

// ✅ Gunakan underscore prefix atau hapus
function Component({ _period }: Props) {
```

### Props Interface

```typescript
interface Props {
  title: string
  onSubmit: (data: FormData) => void
  isLoading?: boolean  // optional dengan ?
}

export function MyComponent({ title, onSubmit, isLoading = false }: Props) {}
```

## Icons

**Wajib menggunakan `lucide-react`**

```typescript
import { Brain, Heart, Target, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Icon mapping dari JSON
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Heart,
  Target,
}
```

## State Management

### Kapan Pakai Apa

| State Type | Use Case |
|------------|----------|
| `useState` | Local component state |
| Zustand | Global state (auth, UI, context) |
| React Query | Server state (API data, caching) |

### Zustand Store Pattern

```typescript
// src/store/auth.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)
```

## Form Validation

### Zod Schema

```typescript
// src/features/auth/schemas/login.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Minimal 8 karakter'),
})

export type LoginFormData = z.infer<typeof loginSchema>
```

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../schemas/login'

const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '' },
})
```

## Component Guidelines

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `TestCard.tsx` |
| Hooks | camelCase + use | `useTests.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `interface TestData {}` |
| Store | kebab-case + .store | `auth.store.ts` |

### File Naming

```
# Components - kebab-case
test-card.tsx
psikotes-hero.tsx

# Hooks - kebab-case dengan prefix use
use-tests.ts
use-auth.ts
```

### Boolean Naming

```typescript
const isLoading = true
const hasPermission = false
const canEdit = true
```

## Panjang Kode

### Batasan

- **Max lines per file**: 300 baris
- **Max lines per function**: 50 baris
- **Max lines per component**: 150 baris

### Jika Terlalu Panjang

1. Pecah menjadi sub-components
2. Extract logic ke custom hooks
3. Pindahkan data ke JSON files
4. Extract utilities ke file terpisah

## Data Management

### Hardcoded Data → JSON

```typescript
// ❌ Jangan hardcode di component
const CATEGORIES = [
  { id: 1, name: 'Kepribadian' },
  { id: 2, name: 'Minat Karir' },
]

// ✅ Pindahkan ke src/data/
// src/data/test-categories.json
import categoriesData from '@/data/test-categories.json'
```

### Icon di JSON

```json
// JSON tidak bisa simpan React components
{ "icon": "Brain" }  // simpan sebagai string

// Di component, mapping ke LucideIcon
const Icon = iconMap[item.icon]
```

## Animation (Framer Motion)

### Pattern Dasar

```typescript
import { motion } from 'framer-motion'

// Fade in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

## Git Workflow

### Commit Messages

```
feat: add new feature
fix: bug fix
refactor: code refactoring
docs: documentation
style: formatting, styling
chore: maintenance
test: add/update tests
```

### Commit Rules

- **No emojis** in commit messages
- **No AI attribution** (no "Co-Authored-By: Claude", etc.)
- **Use imperative mood** ("add feature" not "added feature")
- **Keep it concise** - max 72 characters

```
# ❌ Bad
🚀 feat: add new feature
feat: add login (Co-Authored-By: Claude)

# ✅ Good
feat: add login form with validation
fix: resolve null pointer in user service
```

### Branch Naming

```
feat/add-login-form
fix/test-session-bug
refactor/psikotes-components
```

### ⚠️ IMPORTANT

- **Do not push without instruction**
- **Do not force push** to main/development
- **Always pull before push**

## Checklist Sebelum Commit

- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `npm run lint` → 0 errors
- [ ] Tidak ada `any` types
- [ ] Tidak ada unused variables
- [ ] Icons menggunakan lucide-react
- [ ] Pillar colors menggunakan CSS variables
- [ ] File tidak lebih dari 300 baris

## Accessibility (a11y)

### Wajib

```typescript
// ❌ Jangan
<div onClick={handleClick}>Click me</div>
<img src="logo.png" />

// ✅ Gunakan
<button onClick={handleClick}>Click me</button>
<img src="logo.png" alt="Logo Psikotes" />
```

### ARIA Labels

```typescript
<button aria-label="Tutup modal">
  <X className="h-4 w-4" />
</button>
```

## Performance

### Lazy Loading

```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />
})
```

### Memoization

```typescript
// Expensive calculations
const sortedTests = useMemo(() =>
  tests.sort((a, b) => a.name.localeCompare(b.name)),
[tests])

// Callbacks passed to memoized children
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

## Error Handling

### Try/Catch Pattern

```typescript
try {
  const data = await psikotesService.getTests()
  setTests(data)
} catch (error) {
  toast.error('Gagal memuat data tes')
  console.error(error)
}
```

### React Query Error Handling

```typescript
const { data, error, isLoading } = useTests()

if (isLoading) return <Loading />
if (error) return <ErrorState message="Gagal memuat data" />
return <TestList tests={data} />
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.psikotes.com
NEXT_PUBLIC_APP_ENV=development
```

Validasi dengan Zod di `src/lib/env.ts`:

```typescript
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'staging', 'production']),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
})
```
