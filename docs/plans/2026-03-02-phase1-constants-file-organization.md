# Phase 1: Konstanta & Organisasi File — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminasi duplikasi konstanta, pindahkan file ke lokasi yang benar sesuai arsitektur feature-based, dan rapikan barrel exports.

**Architecture:** Setiap feature punya folder `constants/` sendiri. Shared hooks masuk ke `src/shared/hooks/`. Barrel exports harus konsisten di semua feature.

**Tech Stack:** TypeScript, Next.js App Router, path aliases (`@features/*`, `@shared/*`, `@/*`)

---

### Task 1: Buat shared constants untuk question types di admin feature

**Files:**
- Create: `src/features/admin/constants/question-types.constants.ts`
- Create: `src/features/admin/constants/index.ts`

**Step 1: Buat file constants**

```typescript
// src/features/admin/constants/question-types.constants.ts

export const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  TRUE_FALSE: 'Benar/Salah',
  RATING_SCALE: 'Skala Rating',
  ESSAY: 'Essay',
}

export const QUESTION_TYPE_SHORT_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'PG',
  TRUE_FALSE: 'B/S',
  RATING_SCALE: 'Skala',
  ESSAY: 'Essay',
}

export const QUESTION_TYPE_COLORS: Record<string, string> = {
  MULTIPLE_CHOICE: 'bg-blue-100 text-blue-800 border-blue-200',
  TRUE_FALSE: 'bg-green-100 text-green-800 border-green-200',
  RATING_SCALE: 'bg-purple-100 text-purple-800 border-purple-200',
  ESSAY: 'bg-orange-100 text-orange-800 border-orange-200',
}
```

**Step 2: Buat barrel export**

```typescript
// src/features/admin/constants/index.ts
export {
  QUESTION_TYPE_LABELS,
  QUESTION_TYPE_SHORT_LABELS,
  QUESTION_TYPE_COLORS,
} from './question-types.constants'
```

**Step 3: Commit**

```bash
git add src/features/admin/constants/
git commit -m "refactor: extract shared question type constants for admin feature"
```

---

### Task 2: Update QuestionFormWizard.tsx — hapus duplikat QUESTION_TYPE_LABELS

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx:40-45`

**Step 1: Hapus definisi lokal dan ganti dengan import**

Hapus baris 40-45:
```typescript
const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  TRUE_FALSE: 'Benar/Salah',
  RATING_SCALE: 'Skala Rating',
  ESSAY: 'Essay',
}
```

Tambahkan import di bagian atas file:
```typescript
import { QUESTION_TYPE_LABELS } from '@features/admin/constants'
```

**Step 2: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Tidak ada error terkait QUESTION_TYPE_LABELS

**Step 3: Commit**

```bash
git add src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx
git commit -m "refactor: use shared QUESTION_TYPE_LABELS in QuestionFormWizard"
```

---

### Task 3: Update QuestionForm.tsx — hapus duplikat QUESTION_TYPE_LABELS

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/QuestionForm.tsx:46-51`

**Step 1: Hapus definisi lokal dan ganti dengan import**

Hapus baris 46-51:
```typescript
const QUESTION_TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  TRUE_FALSE: 'Benar/Salah',
  RATING_SCALE: 'Skala Rating',
  ESSAY: 'Essay',
}
```

Tambahkan import di bagian atas file:
```typescript
import { QUESTION_TYPE_LABELS } from '@features/admin/constants'
```

**Step 2: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Tidak ada error terkait QUESTION_TYPE_LABELS

**Step 3: Commit**

```bash
git add src/features/admin/components/QuestionManagement/QuestionForm.tsx
git commit -m "refactor: use shared QUESTION_TYPE_LABELS in QuestionForm"
```

---

### Task 4: Update QuestionList.tsx — hapus duplikat TYPE_LABELS & TYPE_COLORS

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/QuestionList.tsx:30-42`

**Step 1: Hapus definisi lokal dan ganti dengan import**

Hapus baris 30-42 (TYPE_LABELS dan TYPE_COLORS):
```typescript
const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  TRUE_FALSE: 'Benar/Salah',
  RATING_SCALE: 'Skala Rating',
  ESSAY: 'Essay',
}

const TYPE_COLORS: Record<string, string> = {
  MULTIPLE_CHOICE: 'bg-blue-100 text-blue-800 border-blue-200',
  TRUE_FALSE: 'bg-green-100 text-green-800 border-green-200',
  RATING_SCALE: 'bg-purple-100 text-purple-800 border-purple-200',
  ESSAY: 'bg-orange-100 text-orange-800 border-orange-200',
}
```

Tambahkan import:
```typescript
import {
  QUESTION_TYPE_LABELS,
  QUESTION_TYPE_COLORS,
} from '@features/admin/constants'
```

Lalu rename semua usage di file:
- `TYPE_LABELS` → `QUESTION_TYPE_LABELS`
- `TYPE_COLORS` → `QUESTION_TYPE_COLORS`

**Step 2: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 3: Commit**

```bash
git add src/features/admin/components/QuestionManagement/QuestionList.tsx
git commit -m "refactor: use shared question type constants in QuestionList"
```

---

### Task 5: Update QuestionStepContent.tsx — hapus duplikat TYPE_LABELS & TYPE_COLORS

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/QuestionStepContent.tsx:26-38`

**Step 1: Hapus definisi lokal dan ganti dengan import**

Hapus baris 26-38 (TYPE_LABELS dan TYPE_COLORS):
```typescript
const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'PG',
  TRUE_FALSE: 'B/S',
  RATING_SCALE: 'Skala',
  ESSAY: 'Essay',
}

const TYPE_COLORS: Record<string, string> = {
  MULTIPLE_CHOICE: 'bg-blue-100 text-blue-800 border-blue-200',
  TRUE_FALSE: 'bg-green-100 text-green-800 border-green-200',
  RATING_SCALE: 'bg-purple-100 text-purple-800 border-purple-200',
  ESSAY: 'bg-orange-100 text-orange-800 border-orange-200',
}
```

Tambahkan import:
```typescript
import {
  QUESTION_TYPE_SHORT_LABELS,
  QUESTION_TYPE_COLORS,
} from '@features/admin/constants'
```

Lalu rename semua usage di file:
- `TYPE_LABELS` → `QUESTION_TYPE_SHORT_LABELS`
- `TYPE_COLORS` → `QUESTION_TYPE_COLORS`

**Step 2: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 3: Commit**

```bash
git add src/features/admin/components/QuestionManagement/QuestionStepContent.tsx
git commit -m "refactor: use shared question type constants in QuestionStepContent"
```

---

### Task 6: Update BulkImportCSV.tsx — hapus duplikat TYPE_LABELS

**Files:**
- Modify: `src/features/admin/components/QuestionManagement/BulkImportCSV.tsx:57-62`

**Step 1: Hapus definisi lokal dan ganti dengan import**

Hapus baris 57-62:
```typescript
const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'PG',
  TRUE_FALSE: 'B/S',
  RATING_SCALE: 'Skala',
  ESSAY: 'Essay',
}
```

Tambahkan import:
```typescript
import { QUESTION_TYPE_SHORT_LABELS } from '@features/admin/constants'
```

Lalu rename semua usage di file:
- `TYPE_LABELS` → `QUESTION_TYPE_SHORT_LABELS`

**Step 2: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 3: Commit**

```bash
git add src/features/admin/components/QuestionManagement/BulkImportCSV.tsx
git commit -m "refactor: use shared QUESTION_TYPE_SHORT_LABELS in BulkImportCSV"
```

---

### Task 7: Pindahkan careers-constants.ts ke folder constants

**Files:**
- Move: `src/features/general/components/careers-constants.ts` → `src/features/general/constants/careers.constants.ts`
- Modify: `src/features/general/constants/index.ts`
- Modify: `src/features/general/components/careers-benefits-section.tsx`
- Modify: `src/features/general/components/careers-positions-section.tsx`

**Step 1: Pindahkan file**

Copy isi `src/features/general/components/careers-constants.ts` ke `src/features/general/constants/careers.constants.ts` (isi identik, tidak perlu ubah).

Hapus file lama: `src/features/general/components/careers-constants.ts`

**Step 2: Update barrel export**

Tambahkan ke `src/features/general/constants/index.ts`:
```typescript
export { BENEFITS, POSITIONS } from './careers.constants'
```

**Step 3: Update imports di consumer files**

`careers-benefits-section.tsx` — ubah:
```typescript
// BEFORE
import { BENEFITS } from './careers-constants'

// AFTER
import { BENEFITS } from '@features/general/constants'
```

`careers-positions-section.tsx` — ubah:
```typescript
// BEFORE
import { POSITIONS } from './careers-constants'

// AFTER
import { POSITIONS } from '@features/general/constants'
```

**Step 4: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/general/
git commit -m "refactor: move careers constants to constants folder"
```

---

### Task 8: Pindahkan blog-constants.ts ke folder constants

**Files:**
- Move: `src/features/general/components/blog-constants.ts` → `src/features/general/constants/blog.constants.ts`
- Modify: `src/features/general/constants/index.ts`
- Modify: `src/features/general/components/blog-card.tsx`
- Modify: `src/features/general/components/blog-page.tsx`

**Step 1: Pindahkan file**

Copy isi `src/features/general/components/blog-constants.ts` ke `src/features/general/constants/blog.constants.ts` (isi identik).

Hapus file lama: `src/features/general/components/blog-constants.ts`

**Step 2: Update barrel export**

Tambahkan ke `src/features/general/constants/index.ts`:
```typescript
export { BLOG_POSTS } from './blog.constants'
export type { BlogPost } from './blog.constants'
```

**Step 3: Update imports di consumer files**

`blog-card.tsx` — ubah:
```typescript
// BEFORE
import type { BlogPost } from './blog-constants'

// AFTER
import type { BlogPost } from '@features/general/constants'
```

`blog-page.tsx` — ubah:
```typescript
// BEFORE
import { BLOG_POSTS } from './blog-constants'

// AFTER
import { BLOG_POSTS } from '@features/general/constants'
```

**Step 4: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/general/
git commit -m "refactor: move blog constants to constants folder"
```

---

### Task 9: Pindahkan use-mobile.ts ke shared hooks

**Files:**
- Move: `src/hooks/use-mobile.ts` → `src/shared/hooks/use-mobile.ts`
- Modify: `src/shared/hooks/index.ts`
- Modify: `src/components/ui/sidebar.tsx`

**Step 1: Pindahkan file**

Copy isi `src/hooks/use-mobile.ts` ke `src/shared/hooks/use-mobile.ts` (isi identik).

Hapus file lama: `src/hooks/use-mobile.ts`

Hapus folder `src/hooks/` jika kosong setelah pemindahan.

**Step 2: Update barrel export**

Ganti isi `src/shared/hooks/index.ts`:
```typescript
export { useIsMobile } from './use-mobile'
```

**Step 3: Update import di consumer**

`src/components/ui/sidebar.tsx` — ubah:
```typescript
// BEFORE
import { useIsMobile } from "@/hooks/use-mobile"

// AFTER
import { useIsMobile } from "@shared/hooks"
```

**Step 4: Verifikasi tidak ada error**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/hooks/ src/shared/hooks/ src/components/ui/sidebar.tsx
git commit -m "refactor: move useIsMobile to shared hooks"
```

---

### Task 10: Rapikan barrel exports yang kosong

**Files:**
- Modify: `src/features/psikotes/services/index.ts`
- Modify: `src/features/dashboard/services/index.ts`
- Modify: `src/features/dashboard/hooks/index.ts`
- Modify: `src/shared/lib/index.ts`

**Step 1: Cek apakah ada file service/hook di folder tersebut yang belum di-export**

Jika ada file lain di folder tersebut, tambahkan export-nya.
Jika folder benar-benar kosong (hanya index.ts), hapus `export {}` dan beri komentar:

```typescript
// src/features/psikotes/services/index.ts
// TODO: Add service exports as they are created

// src/features/dashboard/services/index.ts
// TODO: Add service exports as they are created

// src/features/dashboard/hooks/index.ts
// TODO: Add hook exports as they are created

// src/shared/lib/index.ts
// Shared utility functions — add exports as they are created
```

**Step 2: Commit**

```bash
git add src/features/psikotes/services/index.ts \
  src/features/dashboard/services/index.ts \
  src/features/dashboard/hooks/index.ts \
  src/shared/lib/index.ts
git commit -m "refactor: clean up empty barrel exports with TODO comments"
```

---

### Task 11: Verifikasi akhir — build & lint

**Step 1: Type check**

Run: `npx tsc --noEmit --pretty`
Expected: 0 errors

**Step 2: Lint**

Run: `npx eslint src/features/admin/constants/ src/features/general/constants/ src/shared/hooks/ --no-error-on-unmatched-pattern`
Expected: 0 errors

**Step 3: Run existing tests**

Run: `npx vitest run --reporter=verbose 2>&1 | tail -30`
Expected: Semua test yang sebelumnya pass tetap pass

**Step 4: Commit final jika ada fix**

```bash
git add -A
git commit -m "refactor: phase 1 final verification and fixes"
```
