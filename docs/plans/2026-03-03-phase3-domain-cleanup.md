# Phase 3: Domain Cleanup & Consolidation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Consolidate duplicate types, extract remaining inline constants, fix misplaced files, clean up empty barrels, standardize remaining `export *`, fix TS errors, resolve TODOs, remove empty placeholders.

**Architecture:** Per-concern, bottom-up, 1 commit per task. Shared types go to `shared/types/`, feature-specific types stay in feature `types/`. Constants go to feature `constants/`. Empty placeholders get deleted.

**Tech Stack:** TypeScript, Next.js App Router, path aliases (`@features/*`, `@shared/*`, `@/*`)

---

### Task 1: Consolidate duplicate FaqItem type

**Files:**
- Create: `src/shared/types/faq.types.ts`
- Modify: `src/shared/types/index.ts`
- Modify: `src/features/pelatihan/types/index.ts`
- Modify: `src/features/konseling/types/index.ts`
- Modify: `src/features/psikotes/types/psikotes.types.ts`
- Modify: `src/features/general/components/section-faq-types.ts`
- Modify: all consumer files importing FaqItem from these locations

**Step 1: Buat shared FaqItem type**

```typescript
// src/shared/types/faq.types.ts
export interface FaqItem {
  q: string
  a: string
}
```

**Step 2: Update shared/types/index.ts**

Tambahkan:
```typescript
export type { FaqItem } from './faq.types'
```

**Step 3: Hapus FaqItem dari pelatihan/types/index.ts**

Hapus `export interface FaqItem { q: string; a: string }`. Tambahkan re-export:
```typescript
export type { FaqItem } from '@shared/types'
```

**Step 4: Hapus FaqItem dari konseling/types/index.ts**

Same pattern — hapus definisi, tambahkan re-export dari `@shared/types`.

**Step 5: Hapus FaqItem dari psikotes/types/psikotes.types.ts**

Hapus `export interface FaqItem { q: string; a: string }`. Tambahkan import:
```typescript
import type { FaqItem } from '@shared/types'
```
Dan re-export:
```typescript
export type { FaqItem }
```

**Step 6: Update general/components/section-faq-types.ts**

Ganti:
```typescript
export type FaqItem = { q: string; a: string }
```
Dengan:
```typescript
import type { FaqItem } from '@shared/types'
export type { FaqItem }
```

**Step 7: Grep semua consumer files**

```bash
grep -r "import.*FaqItem" src/ --include="*.ts" --include="*.tsx"
```

Update semua yang import dari lokasi lama — pastikan mereka tetap bisa import dari barrel terdekat (tidak perlu ubah jika sudah import dari feature types).

**Step 8: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 9: Commit**

```bash
git add src/shared/types/ src/features/pelatihan/types/ src/features/konseling/types/ src/features/psikotes/types/ src/features/general/components/section-faq-types.ts
git commit -m "refactor: consolidate duplicate FaqItem type to shared/types"
```

---

### Task 2: Consolidate duplicate ActivityLogEntry type

**Files:**
- Modify: `src/features/psikotes/types/exam.types.ts` (keep definition here — canonical location)
- Modify: `src/features/psikotes/types/index.ts` (add export)
- Modify: `src/features/psikotes/hooks/useExamState.ts` (remove duplicate, import from types)
- Modify: `src/features/psikotes/components/ActivityLog.tsx` (remove duplicate, import from types)

**Step 1: Verify canonical definition in exam.types.ts**

`ActivityLogEntry` sudah ada di `exam.types.ts` — ini jadi single source of truth.

**Step 2: Update psikotes/types/index.ts**

Tambahkan export jika belum ada:
```typescript
export type { ActivityLogEntry } from './exam.types'
```

**Step 3: Update useExamState.ts**

Hapus:
```typescript
export interface ActivityLogEntry {
  timestamp: Date
  action: string
  questionIndex: number
  details?: string
}
```

Tambahkan import:
```typescript
import { TestConfig, ExamState, TestResult, ActivityLogEntry } from '../types/exam.types'
```
(Extend existing import line yang sudah import TestConfig, ExamState, TestResult)

**Step 4: Update ActivityLog.tsx**

Hapus:
```typescript
export interface ActivityLogEntry {
  timestamp: Date
  action: string
  questionIndex: number
  details?: string
}
```

Tambahkan import:
```typescript
import type { ActivityLogEntry } from '../types'
```

**Step 5: Grep untuk consumer lain**

```bash
grep -r "ActivityLogEntry" src/ --include="*.ts" --include="*.tsx"
```

Update semua yang import dari `useExamState` atau `ActivityLog` — arahkan ke `../types`.

**Step 6: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 7: Commit**

```bash
git add src/features/psikotes/
git commit -m "refactor: consolidate duplicate ActivityLogEntry type to exam.types"
```

---

### Task 3: Consolidate duplicate NavItem and QuestionType

**Files:**
- Modify: `src/features/dashboard/types/index.ts` (add NavItem)
- Modify: `src/features/dashboard/components/sidebar-nav.tsx` (import from types)
- Modify: `src/app/(dasbor)/layout.tsx` (import from dashboard types)
- Modify: `src/features/admin/types/index.ts` (add QuestionType if not there)
- Modify: `src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx` (import QuestionType)
- Modify: `src/features/admin/components/QuestionManagement/BulkImportCSV.tsx` (import QuestionType if used)

**Step 1: Add NavItem to dashboard/types/index.ts**

File saat ini berisi `export {}`. Ganti dengan:
```typescript
import type { ComponentType } from 'react'

export interface NavItem {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}
```

**Step 2: Update sidebar-nav.tsx**

Cari definisi NavItem lokal, hapus, tambahkan:
```typescript
import type { NavItem } from '../types'
```

**Step 3: Update (dasbor)/layout.tsx**

Hapus:
```typescript
interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}
```

Tambahkan:
```typescript
import type { NavItem } from '@/features/dashboard/types'
```

**Step 4: Check QuestionType in admin**

`QuestionType` di `QuestionFormWizard.tsx` adalah:
```typescript
type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'RATING_SCALE' | 'ESSAY'
```

Cek apakah `admin/types/index.ts` sudah punya ini. Jika tidak, tambahkan. Lalu update `QuestionFormWizard.tsx` untuk import dari `../../types`.

Cek `BulkImportCSV.tsx` — file ini punya `VALID_TYPES` array tapi mungkin tidak punya explicit `QuestionType` type. Grep untuk memastikan.

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add src/features/dashboard/ src/features/admin/ src/app/
git commit -m "refactor: consolidate duplicate NavItem and QuestionType types"
```

---

### Task 4: Extract remaining psikotes sub-feature inline constants

**Files:**
- Create: `src/features/psikotes/mahasiswa/constants/test-detail.constants.ts`
- Create: `src/features/psikotes/mahasiswa/constants/index.ts` (jika belum ada)
- Create: `src/features/psikotes/gratis/constants/listing.constants.ts`
- Create: `src/features/psikotes/premium/constants/premium.constants.ts`
- Create: `src/features/psikotes/premium/constants/index.ts` (jika belum ada)
- Modify: `src/features/psikotes/mahasiswa/components/test-detail-faq-section.tsx`
- Modify: `src/features/psikotes/mahasiswa/components/test-detail-section-heading.tsx`
- Modify: `src/features/psikotes/gratis/components/gratis-listing.tsx`
- Modify: `src/features/psikotes/gratis/components/premium-upsell-section.tsx`
- Modify: `src/features/psikotes/gratis/components/test-detail-page.tsx`
- Modify: `src/features/psikotes/gratis/constants/index.ts`
- Modify: `src/features/psikotes/premium/components/testimonials.tsx`
- Modify: `src/features/psikotes/premium/components/faq-accordion.tsx`
- Modify: `src/features/psikotes/premium/components/premium-listing.tsx`

**Step 1: Extract mahasiswa constants**

Buat `test-detail.constants.ts`:
- `FAQ_ITEMS` dari `test-detail-faq-section.tsx`
- `HEADING_COLORS` dan `HeadingColor` type dari `test-detail-section-heading.tsx`

Buat barrel `mahasiswa/constants/index.ts`:
```typescript
export { FAQ_ITEMS } from './test-detail.constants'
export { HEADING_COLORS, type HeadingColor } from './test-detail.constants'
```

Update component files — hapus inline definitions, import dari `'../constants'`.

**Step 2: Extract gratis constants**

Buat `listing.constants.ts`:
- `GRATIS_FILTER_TABS` (rename dari `FILTER_TABS`) dari `gratis-listing.tsx`
- `PREMIUM_BENEFITS` dari `premium-upsell-section.tsx`
- `GRATIS_INSTRUCTIONS` (rename dari `INSTRUCTIONS`) dari `test-detail-page.tsx`

Update `gratis/constants/index.ts` — tambahkan exports.

Update component files.

**Step 3: Extract premium constants**

Buat `premium.constants.ts`:
- `TESTIMONIALS` dari `testimonials.tsx`
- `PREMIUM_FAQS` (rename dari `FAQS`) dari `faq-accordion.tsx`
- `PREMIUM_FILTERS` (rename dari `FILTERS`) dari `premium-listing.tsx`

Buat barrel `premium/constants/index.ts`:
```typescript
export { TESTIMONIALS, PREMIUM_FAQS, PREMIUM_FILTERS } from './premium.constants'
```

Update component files.

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/psikotes/mahasiswa/ src/features/psikotes/gratis/ src/features/psikotes/premium/
git commit -m "refactor: extract remaining psikotes sub-feature inline constants"
```

---

### Task 5: Extract admin and psikotes inline constants

**Files:**
- Modify: `src/features/admin/constants/index.ts`
- Create: `src/features/admin/constants/bulk-import.constants.ts` (jika perlu)
- Modify: `src/features/admin/components/QuestionManagement/BulkImportCSV.tsx`
- Modify: `src/features/psikotes/components/philosophy-section.tsx`
- Modify: `src/features/psikotes/constants/index.ts`

**Step 1: Extract VALID_TYPES dari BulkImportCSV.tsx**

Buat `bulk-import.constants.ts`:
```typescript
export const VALID_QUESTION_TYPES = [
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'RATING_SCALE',
  'ESSAY',
] as const
```

Update barrel dan component.

**Step 2: Extract ICONS dari philosophy-section.tsx**

`ICONS = [Sparkles, Target, Zap, Heart]` — ini adalah icon mapping untuk PHILOSOPHY_ITEMS. Pindahkan ke `psikotes/constants/philosophy.constants.ts` (file sudah ada, tambahkan di sana).

Atau: karena ini hanya 1 line icon array yang tightly coupled ke component rendering, bisa juga dibiarkan. Evaluasi saat implementasi.

**Step 3: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 4: Commit**

```bash
git add src/features/admin/ src/features/psikotes/
git commit -m "refactor: extract admin bulk-import and psikotes philosophy constants"
```

---

### Task 6: Move misplaced files

**Files:**
- Move: `src/app/psikotes/mahasiswa/try-out/form/exam-result-screen.tsx` → `src/features/psikotes/mahasiswa/components/exam-result-screen.tsx`
- Move: `src/app/psikotes/mahasiswa/try-out/form/exam-start-screen.tsx` → `src/features/psikotes/mahasiswa/components/exam-start-screen.tsx`
- Move: `src/app/psikotes/mahasiswa/try-out/form/exam-ui-parts.tsx` → `src/features/psikotes/mahasiswa/components/exam-ui-parts.tsx`
- Move: `src/features/general/components/legal-types.ts` → `src/features/general/types/legal.types.ts`
- Move: `src/features/general/components/legal-themes.ts` → `src/features/general/constants/legal.constants.ts`
- Move: `src/features/general/components/section-faq-types.ts` → `src/features/general/types/faq.types.ts`
- Move: `src/features/general/components/section-faq-themes.ts` → `src/features/general/constants/faq-themes.constants.ts`
- Create: `src/features/general/types/index.ts`
- Modify: `src/features/general/constants/index.ts`
- Modify: all consumer files

**Step 1: Move 3 app files ke features**

```bash
cp src/app/psikotes/mahasiswa/try-out/form/exam-result-screen.tsx src/features/psikotes/mahasiswa/components/exam-result-screen.tsx
cp src/app/psikotes/mahasiswa/try-out/form/exam-start-screen.tsx src/features/psikotes/mahasiswa/components/exam-start-screen.tsx
cp src/app/psikotes/mahasiswa/try-out/form/exam-ui-parts.tsx src/features/psikotes/mahasiswa/components/exam-ui-parts.tsx
```

Update `src/app/psikotes/mahasiswa/try-out/form/page.tsx` — ubah imports dari `'./exam-result-screen'` ke `'@/features/psikotes/mahasiswa/components/exam-result-screen'` (atau dari barrel).

Hapus file lama setelah imports updated.

**Step 2: Move general types files**

```bash
mkdir -p src/features/general/types
cp src/features/general/components/legal-types.ts src/features/general/types/legal.types.ts
cp src/features/general/components/section-faq-types.ts src/features/general/types/faq.types.ts
```

Buat `general/types/index.ts`:
```typescript
export type { LegalSection, LegalTheme, LegalPageProps } from './legal.types'
export type { FaqTheme, SectionFaqPageProps } from './faq.types'
export type { FaqItem } from '@shared/types'
```

Note: `FaqItem` sudah di-consolidate ke shared di Task 1, jadi `faq.types.ts` hanya re-export dari shared.

**Step 3: Move general themes/constants files**

```bash
cp src/features/general/components/legal-themes.ts src/features/general/constants/legal.constants.ts
cp src/features/general/components/section-faq-themes.ts src/features/general/constants/faq-themes.constants.ts
```

Update imports di kedua file — `legal.constants.ts` import `LegalTheme` dari `'../types'` bukan `'./legal-types'`. Same untuk `faq-themes.constants.ts`.

Update `general/constants/index.ts` — tambahkan exports.

**Step 4: Update all consumers**

Grep semua file yang import dari lokasi lama:
```bash
grep -r "legal-types\|legal-themes\|section-faq-types\|section-faq-themes" src/ --include="*.ts" --include="*.tsx"
```

Update imports ke lokasi baru (`'../types'` atau `'../constants'`).

**Step 5: Hapus file lama**

```bash
rm src/features/general/components/legal-types.ts
rm src/features/general/components/legal-themes.ts
rm src/features/general/components/section-faq-types.ts
rm src/features/general/components/section-faq-themes.ts
rm src/app/psikotes/mahasiswa/try-out/form/exam-result-screen.tsx
rm src/app/psikotes/mahasiswa/try-out/form/exam-start-screen.tsx
rm src/app/psikotes/mahasiswa/try-out/form/exam-ui-parts.tsx
```

**Step 6: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 7: Commit**

```bash
git add src/features/general/ src/features/psikotes/mahasiswa/ src/app/psikotes/mahasiswa/
git commit -m "refactor: move misplaced types, themes, and components to correct locations"
```

---

### Task 7: Clean up empty barrels and placeholder dirs

**Files to delete:**
- `src/features/psikotes/hooks/index.ts` (`export {}`)
- `src/features/pelatihan/services/index.ts` (`export {}`)
- `src/features/pelatihan/hooks/index.ts` (`export {}`)
- `src/features/konseling/services/index.ts` (`export {}`)
- `src/features/konseling/hooks/index.ts` (`export {}`)
- `src/features/psikotes/services/index.ts` (TODO comment only)
- `src/features/dashboard/hooks/index.ts` (TODO comment only)
- `src/features/dashboard/services/index.ts` (TODO comment only)
- `src/shared/lib/index.ts` (comment placeholder only)

**Step 1: Check if any file imports from these barrels**

```bash
grep -r "from.*psikotes/hooks" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*dashboard/hooks" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*dashboard/services" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*pelatihan/hooks" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*pelatihan/services" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*konseling/hooks" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*konseling/services" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*shared/lib" src/ --include="*.ts" --include="*.tsx"
```

Jika ada consumer, update dulu sebelum delete.

**Step 2: Check feature-level index.ts files**

Pastikan `dashboard/index.ts`, `konseling/index.ts`, `pelatihan/index.ts`, `psikotes/index.ts` TIDAK re-export dari barrel yang akan dihapus. Jika ada, hapus line tersebut.

**Step 3: Delete empty files**

```bash
rm src/features/psikotes/hooks/index.ts
rm src/features/pelatihan/services/index.ts
rm src/features/pelatihan/hooks/index.ts
rm src/features/konseling/services/index.ts
rm src/features/konseling/hooks/index.ts
rm src/features/psikotes/services/index.ts
rm src/features/dashboard/hooks/index.ts
rm src/features/dashboard/services/index.ts
rm src/shared/lib/index.ts
```

**Step 4: Delete empty parent dirs jika kosong**

```bash
rmdir src/features/psikotes/hooks/ 2>/dev/null
rmdir src/features/pelatihan/services/ 2>/dev/null
rmdir src/features/pelatihan/hooks/ 2>/dev/null
rmdir src/features/konseling/services/ 2>/dev/null
rmdir src/features/konseling/hooks/ 2>/dev/null
rmdir src/features/psikotes/services/ 2>/dev/null
rmdir src/features/dashboard/hooks/ 2>/dev/null
rmdir src/features/dashboard/services/ 2>/dev/null
rmdir src/shared/lib/ 2>/dev/null
```

Note: `rmdir` hanya hapus jika dir kosong — safe.

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove empty barrel files and placeholder directories"
```

---

### Task 8: Convert remaining export * to explicit named exports

**Files:**
- Modify: `src/shared/types/index.ts`
- Modify: `src/features/admin/schemas/index.ts`
- Modify: `src/features/dashboard/components/index.ts`
- Modify: `src/features/dashboard/constants/index.ts`

**Step 1: Fix shared/types/index.ts**

Read `src/shared/types/api.types.ts` untuk list semua exports.

Ganti:
```typescript
export * from './api.types'
```
Dengan explicit named exports, contoh:
```typescript
export type { ApiResponse, PaginatedResponse, ApiError } from './api.types'
export type { FaqItem } from './faq.types'
```

**Step 2: Fix admin/schemas/index.ts**

Read setiap schema file untuk list exports. Ganti 6 `export *` dengan explicit named exports.

**Step 3: Fix dashboard/components/index.ts**

Read `user-dashboard.tsx`, `admin-dashboard.tsx`, `superadmin-dashboard.tsx` untuk list exports.

Ganti:
```typescript
export * from './user-dashboard'
export * from './admin-dashboard'
export * from './superadmin-dashboard'
```
Dengan:
```typescript
export { UserDashboard } from './user-dashboard'
export { AdminDashboard } from './admin-dashboard'
export { SuperadminDashboard } from './superadmin-dashboard'
```

**Step 4: Fix dashboard/constants/index.ts**

Ganti:
```typescript
export * from './test-history.constants'
```
Dengan explicit named exports dari `test-history.constants.ts`.

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add src/shared/types/ src/features/admin/schemas/ src/features/dashboard/
git commit -m "refactor: convert remaining export * to explicit named exports"
```

---

### Task 9: Fix QuestionFormWizard TypeScript errors

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx`

**Context:** 3 TS errors:
1. Line 208: `zodResolver` — `sectionId` is `string | undefined` in schema but `string` in `FormValues`
2. Lines 432, 439: `data` typed as `TFieldValues` instead of `FormValues`

**Step 1: Read current file**

Read lines 47-100 dan 200-445 untuk understand the schema and form setup.

**Step 2: Fix sectionId mismatch**

Di `FormValues` interface, ganti:
```typescript
sectionId: string
```
Dengan:
```typescript
sectionId?: string | ''
```

Ini match dengan schema: `z.string().optional().or(z.literal(''))`.

**Step 3: Fix data parameter typing**

Di lines 432 dan 439, the `onSubmit` handler receives `data` as generic `TFieldValues`. Fix dengan explicit cast atau type the form properly.

Option A — type the `useForm` call:
```typescript
const form = useForm<FormValues>({
  resolver: zodResolver(questionFormWizardSchema),
  ...
})
```

Pastikan `handleSubmit` callback receives `FormValues`:
```typescript
form.handleSubmit(async (data: FormValues) => { ... })
```

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: 0 errors

**Step 5: Commit**

```bash
git add src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx
git commit -m "fix: resolve TypeScript errors in QuestionFormWizard"
```

---

### Task 10: Resolve TODOs and final cleanup

**Files:**
- Modify: `src/app/psikotes/mahasiswa/minat-bakat/form/page.tsx` (line 12 TODO)

**Step 1: Fix testId TODO**

Read the file. The TODO says `const testId = 'riasec-test' // TODO: Get from URL params`.

Cek apakah ini page file yang bisa pakai `params` dari Next.js. Jika ya, update. Jika tidak (karena testId hardcoded by design untuk specific test page), hapus TODO comment dan tambahkan comment yang menjelaskan kenapa hardcoded.

**Step 2: Verifikasi semua TODO resolved**

```bash
grep -r "TODO" src/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v ".test."
```

Pastikan tidak ada TODO sisa dari refactoring (TODO di business logic boleh tetap).

**Step 3: Commit**

```bash
git add src/app/psikotes/mahasiswa/
git commit -m "refactor: resolve remaining TODO comments from previous refactoring"
```

---

### Task 11: Final verification

**Step 1: TypeScript check**

```bash
npx tsc --noEmit --pretty 2>&1
```
Expected: 0 errors

**Step 2: Run all tests**

```bash
npx vitest run 2>&1
```
Expected: all tests pass

**Step 3: Lint check**

```bash
npx next lint 2>&1 | head -30
```
Expected: no errors

**Step 4: Build check**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds

---

## Success Criteria

- `npx tsc --noEmit` → 0 errors
- `npx vitest run` → all tests pass
- No duplicate type definitions across features
- No inline constants in component files
- No component files in `src/app/`
- No empty barrel files or placeholder dirs
- All barrel exports use explicit named pattern
- No unresolved TODO comments from refactoring
