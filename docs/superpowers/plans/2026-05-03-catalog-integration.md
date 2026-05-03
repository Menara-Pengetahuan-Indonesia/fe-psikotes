# Catalog API Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace broken `/packages` API calls with the new `/catalog/*` hierarchy, add purchase flow, and add "My Packages" page.

**Architecture:** New catalog service + hooks in `src/features/psikotes/`, replacing `publicPackageService` and old hooks. All catalog consumers (landing page, category pages, jenis-tes) updated to use new hooks.

**Tech Stack:** Next.js App Router, TanStack Query, Axios, TypeScript, Sonner (toast)

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/features/psikotes/types/catalog.types.ts` | Catalog API response types |
| Create | `src/features/psikotes/services/catalog.service.ts` | Catalog API service layer |
| Create | `src/features/psikotes/hooks/use-catalog.ts` | All catalog hooks (queries + mutation) |
| Modify | `src/features/psikotes/components/psikotes-products.tsx` | Use new catalog hooks |
| Modify | `src/features/psikotes/components/package-card.tsx` | Use `CatalogChildPackage` type |
| Modify | `src/features/psikotes/components/package-detail.tsx` | Use new hooks, remove test/duration info, add purchase |
| Modify | `src/app/bisnis/page.tsx` | Use new catalog hooks |
| Modify | `src/app/diri-pribadi/page.tsx` | Use new catalog hooks |
| Modify | `src/app/relationship/page.tsx` | Use new catalog hooks |
| Modify | `src/app/jenis-tes/page.tsx` | Use new catalog hooks |
| Modify | `src/app/jenis-tes/[packageId]/page.tsx` | Use new catalog hooks |
| Create | `src/app/(dasbor)/pengguna/paket-saya/page.tsx` | My Packages page |
| Create | `src/features/psikotes/components/my-packages.tsx` | My Packages component |
| Delete | `src/features/psikotes/hooks/use-public-packages.ts` | Replaced by use-catalog.ts |
| Delete | `src/features/psikotes/hooks/use-public-package-detail.ts` | Replaced by use-catalog.ts |
| Modify | `src/features/admin/services/index.ts` | Remove `publicPackageService` |
| Modify | `src/features/admin/types/index.ts` | Remove `PublicPackage`, `PublicTest` |
| Modify | `src/tests/component/psikotes-products.test.tsx` | Update mock to new hook |

---

### Task 1: Create Catalog Types

**Files:**
- Create: `src/features/psikotes/types/catalog.types.ts`

- [ ] **Step 1: Create the types file**

```ts
// src/features/psikotes/types/catalog.types.ts

export interface CatalogPackage {
  id: string
  name: string
  description?: string
  createdAt: string
}

export interface CatalogChildPackage {
  id: string
  packageId: string
  name: string
  description?: string
}

export interface CatalogPackageType {
  id: string
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
}

export interface MyPackageType {
  id: string
  name: string
  description?: string
  price: number
  childPackageName?: string
  packageName?: string
  purchasedAt: string
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to catalog.types.ts

- [ ] **Step 3: Commit**

```bash
git add src/features/psikotes/types/catalog.types.ts
git commit -m "feat: add catalog API response types"
```

---

### Task 2: Create Catalog Service

**Files:**
- Create: `src/features/psikotes/services/catalog.service.ts`

- [ ] **Step 1: Create the service file**

```ts
// src/features/psikotes/services/catalog.service.ts
import { api } from '@/lib/axios'
import type {
  CatalogPackage,
  CatalogChildPackage,
  CatalogPackageType,
  MyPackageType,
} from '../types/catalog.types'

interface ApiResponse<T> {
  data: T
}

export const catalogService = {
  getPackages: async (): Promise<CatalogPackage[]> => {
    const { data } = await api.get<ApiResponse<CatalogPackage[]>>('/catalog/packages')
    return data.data
  },

  getChildPackages: async (packageId: string): Promise<CatalogChildPackage[]> => {
    const { data } = await api.get<ApiResponse<CatalogChildPackage[]>>(
      `/catalog/packages/${packageId}/child-packages`,
    )
    return data.data
  },

  getPackageTypes: async (childPackageId: string): Promise<CatalogPackageType[]> => {
    const { data } = await api.get<ApiResponse<CatalogPackageType[]>>(
      `/catalog/child-packages/${childPackageId}/package-types`,
    )
    return data.data
  },

  purchasePackageType: async (packageTypeId: string): Promise<void> => {
    await api.post(`/catalog/package-types/${packageTypeId}/purchase`)
  },

  getMyPackages: async (): Promise<MyPackageType[]> => {
    const { data } = await api.get<ApiResponse<MyPackageType[]>>('/catalog/my-packages')
    return data.data
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to catalog.service.ts

- [ ] **Step 3: Commit**

```bash
git add src/features/psikotes/services/catalog.service.ts
git commit -m "feat: add catalog API service layer"
```

---

### Task 3: Create Catalog Hooks

**Files:**
- Create: `src/features/psikotes/hooks/use-catalog.ts`

- [ ] **Step 1: Create the hooks file**

```ts
// src/features/psikotes/hooks/use-catalog.ts
'use client'

import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { catalogService } from '../services/catalog.service'
import type { CatalogChildPackage } from '../types/catalog.types'

export const catalogKeys = {
  packages: ['catalog', 'packages'] as const,
  childPackages: (packageId: string) => ['catalog', 'child-packages', packageId] as const,
  packageTypes: (childPackageId: string) => ['catalog', 'package-types', childPackageId] as const,
  myPackages: ['catalog', 'my-packages'] as const,
}

export function useCatalogPackages() {
  return useQuery({
    queryKey: catalogKeys.packages,
    queryFn: catalogService.getPackages,
  })
}

export function useCatalogChildPackages(packageId: string) {
  return useQuery({
    queryKey: catalogKeys.childPackages(packageId),
    queryFn: () => catalogService.getChildPackages(packageId),
    enabled: !!packageId,
  })
}

export function useAllChildPackages(packageIds: string[]) {
  return useQueries({
    queries: packageIds.map((id) => ({
      queryKey: catalogKeys.childPackages(id),
      queryFn: () => catalogService.getChildPackages(id),
      enabled: !!id,
    })),
    combine: (results) => {
      const isLoading = results.some((r) => r.isLoading)
      const data = results.flatMap((r) => r.data ?? [])
      return { data, isLoading }
    },
  })
}

export function useCatalogPackageTypes(childPackageId: string) {
  return useQuery({
    queryKey: catalogKeys.packageTypes(childPackageId),
    queryFn: () => catalogService.getPackageTypes(childPackageId),
    enabled: !!childPackageId,
  })
}

export function usePurchasePackageType() {
  const qc = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (packageTypeId: string) => catalogService.purchasePackageType(packageTypeId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: catalogKeys.myPackages })
      toast.success('Paket berhasil dibeli!')
      router.push('/pengguna/paket-saya')
    },
    onError: (error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status
      if (status === 409) {
        toast.info('Kamu sudah memiliki paket ini')
        router.push('/pengguna/paket-saya')
      } else if (status === 401) {
        router.push('/login')
      } else {
        toast.error('Gagal membeli paket. Coba lagi.')
      }
    },
  })
}

export function useMyPackages() {
  return useQuery({
    queryKey: catalogKeys.myPackages,
    queryFn: catalogService.getMyPackages,
  })
}

export function useCatalogChildPackageById(childPackageId: string) {
  const { data: packages, isLoading: packagesLoading } = useCatalogPackages()
  const packageIds = packages?.map((p) => p.id) ?? []
  const { data: allChildren, isLoading: childrenLoading } = useAllChildPackages(packageIds)

  const result = (() => {
    if (!allChildren.length) return null
    const child = allChildren.find((c) => c.id === childPackageId)
    if (!child) return null
    const parent = packages?.find((p) => p.id === child.packageId)
    return { child, parentName: parent?.name ?? '', parentId: parent?.id ?? '' }
  })()

  return { data: result, isLoading: packagesLoading || childrenLoading }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to use-catalog.ts

- [ ] **Step 3: Commit**

```bash
git add src/features/psikotes/hooks/use-catalog.ts
git commit -m "feat: add catalog hooks with TanStack Query"
```

---

### Task 4: Update PsikotesProducts Component

**Files:**
- Modify: `src/features/psikotes/components/psikotes-products.tsx`

- [ ] **Step 1: Replace the full file content**

```tsx
// src/features/psikotes/components/psikotes-products.tsx
'use client'

import { Target, Zap } from 'lucide-react'
import { useCatalogPackages, useAllChildPackages } from '../hooks/use-catalog'
import { ChildPackageCard, PackageGridSkeleton, PackageEmptyState } from './package-card'

function getCategorySlug(packageName: string): string {
  const lower = packageName.toLowerCase()
  if (lower.includes('relationship')) return 'relationship'
  if (lower.includes('bisnis') || lower.includes('perusahaan')) return 'bisnis'
  if (lower.includes('diri') || lower.includes('pribadi')) return 'diri-pribadi'
  return 'diri-pribadi'
}

export function PsikotesProducts() {
  const { data: packages, isLoading: packagesLoading } = useCatalogPackages()
  const activePackages = packages ?? []
  const packageIds = activePackages.map((p) => p.id)
  const { data: allChildren, isLoading: childrenLoading } = useAllChildPackages(packageIds)

  const isLoading = packagesLoading || childrenLoading

  const childrenWithCategory = allChildren.map((child) => {
    const parent = activePackages.find((p) => p.id === child.packageId)
    return {
      ...child,
      categorySlug: getCategorySlug(parent?.name ?? ''),
    }
  })

  return (
    <section id="masa-depan" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="space-y-4 max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 border border-accent-200 shadow-sm">
            <Zap className="w-3 h-3 text-accent-600 fill-accent-600" />
            <span className="text-xs font-black text-accent-700 uppercase tracking-widest">Assessment & Solusi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Pilih Bekal <span className="text-primary-600 italic">Transformasimu</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Setiap alat tes dirancang khusus untuk membantumu menemukan kejelasan yang selama ini kamu cari.
          </p>
        </div>

        {isLoading ? (
          <PackageGridSkeleton />
        ) : childrenWithCategory.length === 0 ? (
          <PackageEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {childrenWithCategory.map((child) => (
              <ChildPackageCard key={child.id} child={child} categorySlug={child.categorySlug} />
            ))}
          </div>
        )}

        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                Masih Bingung Menentukan <span className="text-accent-300 italic">Bermoela?</span>
              </h3>
              <p className="text-primary-50 font-medium text-sm md:text-base max-w-xl">
                Ceritakan situasimu ke AI Counsellor kami — gratis, tanpa daftar, dan langsung dapat rekomendasi produk yang paling sesuai.
              </p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 h-16 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
            >
              Mulai Analisis Sekarang <Target className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/features/psikotes/components/psikotes-products.tsx
git commit -m "feat: update PsikotesProducts to use catalog API"
```

---

### Task 5: Update ChildPackageCard Component

**Files:**
- Modify: `src/features/psikotes/components/package-card.tsx`

- [ ] **Step 1: Update the import and interface**

Change the import from:
```ts
import type { ChildPackage } from '@/features/admin/types'
```
To:
```ts
import type { CatalogChildPackage } from '../types/catalog.types'
```

Change the interface from:
```ts
interface ChildPackageCardProps {
  child: ChildPackage
  categorySlug: string
}
```
To:
```ts
interface ChildPackageCardProps {
  child: CatalogChildPackage
  categorySlug: string
}
```

- [ ] **Step 2: Remove packageTypes/price logic from ChildPackageCard**

The `CatalogChildPackage` type does not have `packageTypes`. Remove the tier/price display from the card. The card now only shows name, description, and a "Lihat Detail" link. Replace the body of `ChildPackageCard` with:

```tsx
export function ChildPackageCard({ child, categorySlug }: ChildPackageCardProps) {
  return (
    <Link
      href={`/${categorySlug}/${child.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
            {child.name}
          </h3>
          {child.description && (
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
              {child.description}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary-600 text-white text-sm font-bold group-hover:bg-primary-700 transition-colors">
          Lihat Detail
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Remove unused `formatPrice` function**

Delete the `formatPrice` function from this file (it's no longer used here; it remains in `package-detail.tsx`).

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/features/psikotes/components/package-card.tsx
git commit -m "refactor: update ChildPackageCard to use CatalogChildPackage type"
```

---

### Task 6: Update PackageDetailClient with Purchase

**Files:**
- Modify: `src/features/psikotes/components/package-detail.tsx`

- [ ] **Step 1: Replace imports**

Change:
```ts
import { usePublicChildPackage } from '../hooks/use-public-packages'
import { usePublicPackageDetail } from '../hooks/use-public-package-detail'
import type { PackageType } from '@/features/admin/types'
```
To:
```ts
import { useCatalogChildPackageById, useCatalogPackageTypes, usePurchasePackageType } from '../hooks/use-catalog'
import type { CatalogPackageType } from '../types/catalog.types'
```

- [ ] **Step 2: Update data fetching in PackageDetailClient**

Replace lines 38-40:
```ts
  const { data, isLoading } = usePublicChildPackage(childId)
  const { data: packageDetail, isLoading: isLoadingDetail } = usePublicPackageDetail(data?.parentId ?? '')
```
With:
```ts
  const { data, isLoading } = useCatalogChildPackageById(childId)
  const { data: packageTypes, isLoading: isLoadingTypes } = useCatalogPackageTypes(childId)
```

- [ ] **Step 3: Update the tiers and remove tests/duration**

Replace:
```ts
  const { child } = data
  const tiers = child.packageTypes?.filter(pt => pt.isActive) ?? []
  const tests = packageDetail?.tests?.sort((a, b) => a.order - b.order) ?? []
  const totalDuration = tests.reduce((sum, t) => sum + (t.duration ?? 0), 0)
```
With:
```ts
  const { child } = data
  const tiers = packageTypes ?? []
```

Remove the "tests" and "totalDuration" badges from the hero section (the `{tests.length > 0 && ...}` and `{totalDuration > 0 && ...}` blocks). Also remove the "Tes yang Termasuk" section that lists tests.

- [ ] **Step 4: Update TierCard to use purchase mutation**

Change the `TierCard` component to accept and use the purchase mutation:

```tsx
function TierCard({ tier }: { tier: CatalogPackageType }) {
  const { mutate: purchase, isPending } = usePurchasePackageType()

  return (
    <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-900">{tier.name}</h4>
        <span className="text-lg font-black text-primary-600">{formatPrice(tier.price)}</span>
      </div>
      {tier.description && (
        <p className="text-sm text-slate-500 mb-4">{tier.description}</p>
      )}
      <button
        onClick={() => purchase(tier.id)}
        disabled={isPending}
        className="w-full h-11 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Memproses...' : 'Pilih Paket Ini'}
      </button>
    </div>
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/features/psikotes/components/package-detail.tsx
git commit -m "feat: update package detail to use catalog API with purchase flow"
```

---

### Task 7: Update Category Pages (bisnis, diri-pribadi, relationship)

**Files:**
- Modify: `src/app/bisnis/page.tsx`
- Modify: `src/app/diri-pribadi/page.tsx`
- Modify: `src/app/relationship/page.tsx`

- [ ] **Step 1: Update bisnis/page.tsx**

Replace the import:
```ts
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
```
With:
```ts
import { useCatalogPackages, useAllChildPackages } from '@/features/psikotes/hooks/use-catalog'
```

Replace the data fetching:
```ts
const { data: packages, isLoading } = usePublicPackages()
```
With:
```ts
const { data: packages, isLoading: packagesLoading } = useCatalogPackages()
const packageIds = packages?.map((p) => p.id) ?? []
const { data: allChildren, isLoading: childrenLoading } = useAllChildPackages(packageIds)
const isLoading = packagesLoading || childrenLoading
```

Update any code that accesses `packages[].childPackages` to use `allChildren` filtered by the relevant package name (containing "bisnis" or "perusahaan").

- [ ] **Step 2: Update diri-pribadi/page.tsx**

Same pattern as bisnis — replace `usePublicPackages` with `useCatalogPackages` + `useAllChildPackages`. Filter children by parent package name containing "diri" or "pribadi".

- [ ] **Step 3: Update relationship/page.tsx**

Same pattern — filter children by parent package name containing "relationship".

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/bisnis/page.tsx src/app/diri-pribadi/page.tsx src/app/relationship/page.tsx
git commit -m "feat: update category pages to use catalog API"
```

---

### Task 8: Update Jenis-Tes Pages

**Files:**
- Modify: `src/app/jenis-tes/page.tsx`
- Modify: `src/app/jenis-tes/[packageId]/page.tsx`

- [ ] **Step 1: Update jenis-tes/page.tsx**

Replace:
```ts
import { publicPackageService } from '@/features/admin/services'
import type { PublicPackage } from '@/features/admin/types'
```
With:
```ts
import { useCatalogPackages } from '@/features/psikotes/hooks/use-catalog'
import type { CatalogPackage } from '@/features/psikotes/types/catalog.types'
```

Replace the `useState` + `useEffect` pattern with the `useCatalogPackages()` hook. Add `'use client'` directive if not already present.

- [ ] **Step 2: Update jenis-tes/[packageId]/page.tsx**

Replace:
```ts
import { publicPackageService } from '@/features/admin/services'
import type { PublicPackage } from '@/features/admin/types'
```
With:
```ts
import { useCatalogChildPackages } from '@/features/psikotes/hooks/use-catalog'
import type { CatalogChildPackage } from '@/features/psikotes/types/catalog.types'
```

Replace the `useState` + `useEffect` fetching with `useCatalogChildPackages(packageId)`. Add `'use client'` directive if not already present.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/app/jenis-tes/page.tsx src/app/jenis-tes/\[packageId\]/page.tsx
git commit -m "feat: update jenis-tes pages to use catalog API"
```

---

### Task 9: Create My Packages Page

**Files:**
- Create: `src/features/psikotes/components/my-packages.tsx`
- Create: `src/app/(dasbor)/pengguna/paket-saya/page.tsx`

- [ ] **Step 1: Create the My Packages component**

```tsx
// src/features/psikotes/components/my-packages.tsx
'use client'

import { Package, Loader2, Inbox } from 'lucide-react'
import { useMyPackages } from '../hooks/use-catalog'

export function MyPackages() {
  const { data: packages, isLoading } = useMyPackages()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Belum Ada Paket</h2>
        <p className="text-sm text-slate-500">Kamu belum memiliki paket tes. Jelajahi katalog untuk membeli.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <Package className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Paket Saya</h1>
          <p className="text-sm text-slate-500">{packages.length} paket dimiliki</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            <h3 className="font-bold text-slate-900 mb-1">{pkg.name}</h3>
            {pkg.packageName && (
              <p className="text-xs text-slate-400 mb-2">{pkg.packageName} — {pkg.childPackageName}</p>
            )}
            {pkg.description && (
              <p className="text-sm text-slate-500 mb-3">{pkg.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Dibeli: {new Date(pkg.purchasedAt).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create the page route**

```tsx
// src/app/(dasbor)/pengguna/paket-saya/page.tsx
import { MyPackages } from '@/features/psikotes/components/my-packages'

export default function PaketSayaPage() {
  return <MyPackages />
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/features/psikotes/components/my-packages.tsx src/app/\(dasbor\)/pengguna/paket-saya/page.tsx
git commit -m "feat: add My Packages page"
```

---

### Task 10: Remove Old Public Package Code

**Files:**
- Delete: `src/features/psikotes/hooks/use-public-packages.ts`
- Delete: `src/features/psikotes/hooks/use-public-package-detail.ts`
- Modify: `src/features/admin/services/index.ts` (remove `publicPackageService`)
- Modify: `src/features/admin/types/index.ts` (remove `PublicPackage`, `PublicTest`)

- [ ] **Step 1: Delete old hook files**

```bash
rm src/features/psikotes/hooks/use-public-packages.ts
rm src/features/psikotes/hooks/use-public-package-detail.ts
```

- [ ] **Step 2: Remove publicPackageService from admin services**

In `src/features/admin/services/index.ts`, delete the entire `publicPackageService` block (lines ~219-227) and remove `PublicPackage` from the import statement at line 4.

- [ ] **Step 3: Remove PublicPackage and PublicTest from admin types**

In `src/features/admin/types/index.ts`, delete the `PublicPackage` interface (lines 19-27) and `PublicTest` interface (lines 29-40).

- [ ] **Step 4: Verify no remaining references**

Run: `grep -rn "publicPackageService\|PublicPackage\|PublicTest\|use-public-packages\|use-public-package-detail" src/ --include="*.ts" --include="*.tsx"`
Expected: No results (or only the test file which is updated in Task 11)

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove deprecated publicPackageService and old hooks"
```

---

### Task 11: Update Test File

**Files:**
- Modify: `src/tests/component/psikotes-products.test.tsx`

- [ ] **Step 1: Update the mock**

Replace:
```ts
vi.mock('@/features/psikotes/hooks/use-public-packages', () => ({
  usePublicPackages: () => ({ data: [], isLoading: false }),
}))
```
With:
```ts
vi.mock('@/features/psikotes/hooks/use-catalog', () => ({
  useCatalogPackages: () => ({ data: [], isLoading: false }),
  useAllChildPackages: () => ({ data: [], isLoading: false }),
}))
```

- [ ] **Step 2: Run tests**

Run: `npx vitest run src/tests/component/psikotes-products.test.tsx`
Expected: PASS

- [ ] **Step 3: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/tests/component/psikotes-products.test.tsx
git commit -m "test: update psikotes-products test to use catalog hooks"
```

---

### Task 12: Final Verification

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Full test suite**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 3: Build check**

Run: `npx next build`
Expected: Build succeeds

- [ ] **Step 4: Manual smoke test**

Start dev server (`npm run dev`) and verify:
1. Landing page shows package grid from `/catalog/packages`
2. Clicking a child package navigates to detail page
3. Detail page shows tiers with prices from `/catalog/child-packages/{id}/package-types`
4. "Pilih Paket Ini" button triggers purchase (or redirects to login if not authenticated)
5. `/pengguna/paket-saya` page shows owned packages (or empty state)
