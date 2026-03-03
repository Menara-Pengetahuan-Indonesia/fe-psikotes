# Phase 4: Lint, Security & Code Quality — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all ESLint errors/warnings, patch security vulnerabilities, split oversized files, clean up code quality issues.

**Architecture:** Quick wins first (lint script, security patch, simple fixes), then structural changes (file splitting). Per-concern, 1 commit per task.

**Tech Stack:** TypeScript, Next.js 16, ESLint 9, Vitest 4, path aliases (`@features/*`, `@shared/*`, `@/*`)

---

### Task 1: Fix lint script, remove backup file

**Files:**
- Modify: `package.json`
- Delete: `src/middleware.ts.bak`

**Step 1: Fix lint script**

Di `package.json`, ganti:
```json
"lint": "eslint"
```
Dengan:
```json
"lint": "eslint src/"
```

**Step 2: Delete backup file**

```bash
rm src/middleware.ts.bak
```

**Step 3: Verifikasi**

```bash
npm run lint 2>&1 | tail -5
```
Expected: lint runs successfully (will still show errors — that's fine, we fix them in later tasks)

**Step 4: Commit**

```bash
git add package.json && git rm src/middleware.ts.bak
git commit -m "chore: fix lint script and remove middleware backup file"
```

---

### Task 2: Patch security vulnerabilities

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Update next to 16.1.6**

```bash
npm install next@16.1.6
```

**Step 2: Run npm audit fix**

```bash
npm audit fix
```

**Step 3: Verifikasi**

```bash
npm audit 2>&1 | tail -10
```
Expected: 0 vulnerabilities (or only informational)

```bash
npx tsc --noEmit --pretty 2>&1 | head -5
```
Expected: 0 errors

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: patch security vulnerabilities (next 16.1.6, npm audit fix)"
```

---

### Task 3: Fix unescaped entities lint errors

**Files:**
- Modify: `src/features/psikotes/components/psikotes-category-nav.tsx`
- Modify: `src/features/psikotes/components/psikotes-diagnostic.tsx`
- Modify: `src/features/psikotes/components/psikotes-hero.tsx`
- Modify: `src/features/psikotes/components/psikotes-join-practitioner.tsx`
- Modify: `src/features/psikotes/components/psikotes-pillars.tsx`
- Modify: `src/features/psikotes/components/psikotes-transformation-map.tsx`

**Step 1: Find all unescaped entities**

```bash
npx eslint src/ --rule '{"react/no-unescaped-entities": "error"}' --format compact 2>&1 | grep "no-unescaped-entities"
```

**Step 2: Fix each file**

Replace unescaped `"` with `&quot;` in JSX text content. Example:

Ganti:
```tsx
<p>Ini adalah "contoh" teks</p>
```
Dengan:
```tsx
<p>Ini adalah &quot;contoh&quot; teks</p>
```

**Step 3: Verifikasi**

```bash
npx eslint src/features/psikotes/components/ --rule '{"react/no-unescaped-entities": "error"}' 2>&1
```
Expected: 0 errors

**Step 4: Commit**

```bash
git add src/features/psikotes/components/
git commit -m "fix: escape unescaped entities in psikotes components"
```

---

### Task 4: Fix `any` types

**Files:**
- Modify: `src/features/psikotes/components/ExamInterface.tsx` (line 15 — `onComplete?: (result: any) => void`)
- Modify: `src/features/psikotes/components/psikotes-products.tsx` (line 55 — `as any`)
- Modify: `src/features/auth/services/index.ts` (lines 25, 55, 79, 89 — 4x `any`)
- Modify: `src/tests/e2e/api-integration-fixed.spec.ts` (line 20)
- Modify: `src/tests/e2e/api-integration.spec.ts` (lines 162, 171)
- Modify: `src/tests/e2e/api-public.spec.ts` (line 43)

**Step 1: Fix ExamInterface.tsx**

Read the file. Replace `any` in `onComplete` prop with the actual `TestResult` type:
```typescript
import type { TestResult } from '../types'

interface ExamInterfaceProps {
  testId: string
  onComplete?: (result: TestResult) => void
}
```

Also fix any other `any` usages (lines 221, 223, 226) — read the file to determine correct types.

**Step 2: Fix psikotes-products.tsx**

Read line 55. Replace `as any` with proper type assertion or fix the underlying type issue.

**Step 3: Fix auth/services/index.ts**

Read the file. The 4 `any` types are likely in API response handling. Replace with proper types:
- Use `unknown` instead of `any` for catch blocks
- Use proper response types for API calls

**Step 4: Fix test files**

For test files, replace `any` with `unknown` or proper types. E2E test files often use `any` for API responses — use `Record<string, unknown>` or specific response types.

**Step 5: Verifikasi**

```bash
npx eslint src/ --rule '{"@typescript-eslint/no-explicit-any": "error"}' --format compact 2>&1 | grep "no-explicit-any"
```
Expected: 0 matches

**Step 6: Commit**

```bash
git add src/features/psikotes/ src/features/auth/ src/tests/
git commit -m "fix: replace any types with proper type annotations"
```

---

### Task 5: Fix unused imports and missing hook dependencies

**Files (unused imports):**
- `src/app/(dasbor)/dashboard/page.tsx` — remove `UserRole`, `cn`
- `src/app/(dasbor)/layout.tsx` — remove `ShieldCheck`
- `src/features/admin/components/QuestionManagement/OptionMapper.tsx` — remove `questionId`, `mappedIndicatorIds`
- `src/features/admin/components/QuestionManagement/QuestionForm.tsx` — remove `currentImageUrl`
- `src/features/admin/services/index.ts` — remove `UpdateOptionIndicatorMappingDto`
- `src/features/auth/hooks/index.ts` — remove `role`
- `src/features/dashboard/components/admin-dashboard.tsx` — remove `Settings`, `ChevronRight`
- `src/features/dashboard/components/superadmin-dashboard.tsx` — remove `BarChart3`
- `src/features/psikotes/components/psikotes-pillars.tsx` — remove `Flower2`, `TOPO_PRIMARY_LIGHT`
- `src/features/psikotes/components/psikotes-products.tsx` — remove `Brain`, `Smile`, `Compass`, `Users`
- `src/features/psikotes/hooks/useExamState.ts` — remove `err`
- `src/tests/e2e/api-public.spec.ts` — remove `response`
- `src/tests/e2e/api-integration-fixed.spec.ts` — remove `response`
- `src/tests/unit/auth.store.test.ts` — remove `vi`

**Files (missing hook deps):**
- `src/features/psikotes/hooks/useExamState.ts` — add `addActivityLog` and `handleSubmit` to useEffect deps
- `src/features/admin/components/QuestionManagement/BulkImportCSV.tsx` — add `progress` to useCallback deps

**Step 1: Run eslint autofix**

```bash
npx eslint src/ --fix 2>&1 | tail -10
```

This will auto-remove some unused imports. Check what's left.

**Step 2: Manually fix remaining unused imports**

Read each file, remove the unused import. Be careful not to remove imports that are used as types only (check if they have `type` prefix).

**Step 3: Fix missing hook dependencies**

For `useExamState.ts`:
- Read the file carefully
- The missing deps `addActivityLog` and `handleSubmit` are likely functions defined in the same hook
- Wrap them in `useCallback` if not already, then add to deps array
- OR use `// eslint-disable-next-line react-hooks/exhaustive-deps` if adding deps would cause infinite loops (document why)

For `BulkImportCSV.tsx`:
- Add `progress` to the useCallback dependency array

**Step 4: Verifikasi**

```bash
npx eslint src/ 2>&1 | tail -5
```
Expected: 0 errors, 0 warnings (or only the `@next/next/no-img-element` warnings which are acceptable)

**Step 5: Commit**

```bash
git add -A
git commit -m "fix: remove unused imports and fix missing hook dependencies"
```

---

### Task 6: Split admin hooks barrel file

**Files:**
- Create: `src/features/admin/hooks/query-keys.ts`
- Create: `src/features/admin/hooks/use-tests.ts`
- Create: `src/features/admin/hooks/use-indicators.ts`
- Create: `src/features/admin/hooks/use-sections.ts`
- Create: `src/features/admin/hooks/use-questions.ts`
- Create: `src/features/admin/hooks/use-options.ts`
- Create: `src/features/admin/hooks/use-indicator-mappings.ts`
- Create: `src/features/admin/hooks/use-scoring-rules.ts`
- Create: `src/features/admin/hooks/use-upload.ts`
- Modify: `src/features/admin/hooks/index.ts` (replace 584 lines with barrel re-exports)

**Step 1: Read the full hooks file**

Read `src/features/admin/hooks/index.ts` to understand the structure. It has:
- `adminKeys` — query key factory
- `useTests`, `useTest`, `useCreateTest`, `useUpdateTest`, `useDeleteTest` — test hooks
- `useIndicators`, `useCreateIndicator`, `useUpdateIndicator`, `useDeleteIndicator` — indicator hooks
- `useSections`, `useCreateSection`, `useUpdateSection`, `useDeleteSection` — section hooks
- `useQuestions`, `useCreateQuestion`, `useUpdateQuestion`, `useDeleteQuestion` — question hooks
- `useOptions`, `useCreateOption`, `useUpdateOption`, `useDeleteOption` — option hooks
- `useIndicatorMappings`, `useCreateIndicatorMapping`, `useDeleteIndicatorMapping` — mapping hooks
- `useScoringRules`, `useCreateScoringRule`, `useUpdateScoringRule`, `useDeleteScoringRule` — scoring hooks
- `useUploadImage` — upload hook

**Step 2: Extract query keys**

Create `query-keys.ts` with `adminKeys` object.

**Step 3: Extract each hook group**

Each file imports `adminKeys` from `'./query-keys'`, services from `'../services'`, types from `'../types'`.

Keep `'use client'` directive in each file that uses React hooks.

**Step 4: Update barrel index.ts**

Replace entire file with re-exports:
```typescript
export { adminKeys } from './query-keys'
export { useTests, useTest, useCreateTest, useUpdateTest, useDeleteTest } from './use-tests'
export { useIndicators, useCreateIndicator, useUpdateIndicator, useDeleteIndicator } from './use-indicators'
// ... etc
```

**Step 5: Verifikasi**

```bash
npx tsc --noEmit --pretty 2>&1 | head -10
npx eslint src/features/admin/hooks/ 2>&1
```
Expected: 0 errors

**Step 6: Commit**

```bash
git add src/features/admin/hooks/
git commit -m "refactor: split admin hooks barrel into individual hook files"
```

---

### Task 7: Split dashboard page

**Files:**
- Modify: `src/app/(dasbor)/dashboard/page.tsx` (343 lines → thin routing page)

**Step 1: Read the file**

Read `src/app/(dasbor)/dashboard/page.tsx`. It contains 3 inline dashboard variants (UserDashboard, AdminDashboard, SuperadminDashboard) plus role-switching logic.

Note: `src/features/dashboard/components/` already has `user-dashboard.tsx`, `admin-dashboard.tsx`, `superadmin-dashboard.tsx`. Check if the page file duplicates these or uses them.

**Step 2: If page duplicates feature components**

Replace inline dashboard code with imports from feature components:
```tsx
import { UserDashboard } from '@/features/dashboard/components'
import { AdminDashboard } from '@/features/dashboard/components'
import { SuperadminDashboard } from '@/features/dashboard/components'
```

Keep only the role-switching logic in the page file.

**Step 3: If page has unique code not in features**

Move the inline dashboard variants to `src/features/dashboard/components/` as separate files, then import them in the page.

**Step 4: Verifikasi**

```bash
npx tsc --noEmit --pretty 2>&1 | head -10
wc -l src/app/\(dasbor\)/dashboard/page.tsx
```
Expected: page file < 50 lines

**Step 5: Commit**

```bash
git add src/app/ src/features/dashboard/
git commit -m "refactor: extract inline dashboard variants from page to feature components"
```

---

### Task 8: Final verification

**Step 1: TypeScript check**

```bash
npx tsc --noEmit --pretty 2>&1
```
Expected: 0 errors

**Step 2: ESLint check**

```bash
npx eslint src/ 2>&1 | tail -5
```
Expected: 0 errors, minimal warnings (only `@next/next/no-img-element` acceptable)

**Step 3: Run all tests**

```bash
npx vitest run 2>&1 | tail -10
```
Expected: all tests pass

**Step 4: Build check**

```bash
npm run build 2>&1 | tail -10
```
Expected: build succeeds

---

## Success Criteria

- `npx eslint src/` → 0 errors, minimal warnings
- `npm audit` → 0 high/critical vulnerabilities
- `npx tsc --noEmit` → 0 errors
- `npx vitest run` → all tests pass
- `npm run build` → succeeds
- Admin hooks split into individual files
- Dashboard page is thin routing only
- No `any` types in production code
- No unused imports
