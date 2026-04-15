# Restructure Admin Panel to Match Backend API — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the admin feature layer (types, services, hooks, schemas, components, pages) to match the actual backend API hierarchy: Package → ChildPackage → PackageType → Test → SubTest → Question. Remove all dead code (Indicator, Section, ScoringRule, OptionMapping, TestWizard, publish/unpublish endpoints that don't exist in BE).

**Architecture:** Flat REST endpoints with parent IDs as fields (e.g. `POST /admin/child-packages` with `packageId` in body). Drill-down admin UI with breadcrumb navigation. Each level is its own list page. Backend wraps responses in `{ statusCode, message, data }` — services must unwrap `.data.data`. Question creation sends options inline (not separate CRUD).

**Tech Stack:** Next.js 15 App Router, TypeScript, TanStack Query v5, Zod, shadcn/ui (Radix), Tailwind CSS v4, Lucide icons, react-hook-form, sonner for toasts.

---

## Backend API Reference

```
POST/GET     /admin/packages                    → Package CRUD (name, description, isActive, childPackages[])
GET/PATCH/DELETE /admin/packages/{id}

POST/GET     /admin/child-packages              → ChildPackage CRUD (packageId, name, description, isActive)
GET/PATCH/DELETE /admin/child-packages/{id}

POST/GET     /admin/package-types               → PackageType CRUD (childPackageId, name, description, price, testTool, isActive)
GET/PATCH/DELETE /admin/package-types/{id}

POST/GET     /admin/tests                       → Test CRUD (packageTypeId, name, description, scoringType, order, isActive, originalYear, precision, adaptationYear, popularity)
GET/PATCH/DELETE /admin/tests/{id}

POST/GET     /admin/subtests                    → SubTest CRUD (testId, name, description, duration, order, isActive)
GET/PATCH/DELETE /admin/subtests/{id}

POST/GET     /admin/questions                   → Question CRUD (subTestId, questionType, questionText, imageUrl, order, points, options[], correctAnswer{})
GET/PATCH/DELETE /admin/questions/{id}
```

Question types: `MULTIPLE_CHOICE`, `CHECKBOX`, `SCALE_RATING`, `ESSAY`
Scoring types: `IMMEDIATE`, `END_OF_TEST`

Response format: `{ statusCode: number, message: string, data: T }`

---

## File Structure

### Files to DELETE (dead code from old structure)

```
src/features/admin/components/IndicatorManagement/    (entire folder)
src/features/admin/components/SectionManagement/      (entire folder)
src/features/admin/components/ScoringRuleManagement/  (entire folder)
src/features/admin/components/TestManagement/TestWizard.tsx
src/features/admin/components/TestManagement/PublishTab.tsx
src/features/admin/components/TestManagement/TestDetail.tsx
src/features/admin/components/TestManagement/TestList.tsx
src/features/admin/components/TestManagement/TestForm.tsx
src/features/admin/components/QuestionManagement/OptionMapper.tsx
src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx
src/features/admin/components/QuestionManagement/QuestionStepContent.tsx
src/features/admin/hooks/use-indicators.ts
src/features/admin/hooks/use-sections.ts
src/features/admin/hooks/use-scoring-rules.ts
src/features/admin/hooks/use-indicator-mappings.ts
src/features/admin/hooks/use-options.ts
src/features/admin/schemas/indicator.schema.ts
src/features/admin/schemas/section.schema.ts
src/features/admin/schemas/scoring-rule.schema.ts
src/features/admin/schemas/option.schema.ts
src/features/admin/constants/test-categories.constants.ts
src/app/api/admin/tests/          (entire mock API folder)
src/app/api/admin/packages/       (entire mock API folder)
src/app/api/admin/upload/         (entire mock API folder)
src/app/api/_mock-data.ts
src/app/api/packages/             (entire mock public API folder)
src/app/(dasbor)/admin/tests/[testId]/pertanyaan/   (entire folder)
src/app/(dasbor)/admin/tests/buat/page.tsx
```

### Files to REWRITE

```
src/features/admin/types/index.ts           → New types matching BE schemas
src/features/admin/services/index.ts        → New services matching BE endpoints
src/features/admin/hooks/index.ts           → New hook exports
src/features/admin/hooks/query-keys.ts      → New query key factory
src/features/admin/hooks/use-tests.ts       → Rewrite for new Test shape
src/features/admin/hooks/use-packages.ts    → Rewrite for new Package shape (no publish/unpublish)
src/features/admin/hooks/use-questions.ts   → Rewrite for new Question shape
src/features/admin/schemas/test.schema.ts   → New fields (scoringType, packageTypeId, etc.)
src/features/admin/schemas/question.schema.ts → New fields (questionType, options inline, correctAnswer)
src/features/admin/components/index.ts      → New exports
src/features/admin/index.ts                 → New exports
```

### Files to CREATE

```
src/features/admin/hooks/use-child-packages.ts
src/features/admin/hooks/use-package-types.ts
src/features/admin/hooks/use-subtests.ts
src/features/admin/schemas/child-package.schema.ts
src/features/admin/schemas/package-type.schema.ts
src/features/admin/schemas/subtest.schema.ts
src/app/(dasbor)/admin/packages/[packageId]/child-packages/page.tsx
src/app/(dasbor)/admin/packages/[packageId]/child-packages/[childId]/page.tsx
src/app/(dasbor)/admin/packages/[packageId]/child-packages/[childId]/[typeId]/page.tsx
src/app/(dasbor)/admin/tests/[testId]/subtests/page.tsx
src/app/(dasbor)/admin/tests/[testId]/subtests/[subtestId]/page.tsx
```

### Pages to REWRITE

```
src/app/(dasbor)/admin/packages/page.tsx           → Remove publish/unpublish, use isActive, remove price/duration
src/app/(dasbor)/admin/packages/[packageId]/page.tsx → Show child packages list (drill-down)
src/app/(dasbor)/admin/tests/page.tsx              → New TestList inline
src/app/(dasbor)/admin/tests/[testId]/page.tsx     → Show subtests list (drill-down)
```

---

## Tasks

### Task 1: Delete Dead Code

**Files:** All files listed in "Files to DELETE" section above.

- [ ] **Step 1: Delete old mock API routes and data**

```bash
rm -rf src/app/api/admin/tests/
rm -rf src/app/api/admin/packages/
rm -rf src/app/api/admin/upload/
rm -f src/app/api/_mock-data.ts
rm -rf src/app/api/packages/
rm -rf src/app/api/auth/
```

- [ ] **Step 2: Delete old admin components that don't map to BE**

```bash
rm -rf src/features/admin/components/IndicatorManagement/
rm -rf src/features/admin/components/SectionManagement/
rm -rf src/features/admin/components/ScoringRuleManagement/
rm -f src/features/admin/components/TestManagement/TestWizard.tsx
rm -f src/features/admin/components/TestManagement/PublishTab.tsx
rm -f src/features/admin/components/TestManagement/TestDetail.tsx
rm -f src/features/admin/components/TestManagement/TestList.tsx
rm -f src/features/admin/components/TestManagement/TestForm.tsx
rm -f src/features/admin/components/QuestionManagement/OptionMapper.tsx
rm -f src/features/admin/components/QuestionManagement/QuestionFormWizard.tsx
rm -f src/features/admin/components/QuestionManagement/QuestionStepContent.tsx
```

- [ ] **Step 3: Delete old hooks, schemas, constants**

```bash
rm -f src/features/admin/hooks/use-indicators.ts
rm -f src/features/admin/hooks/use-sections.ts
rm -f src/features/admin/hooks/use-scoring-rules.ts
rm -f src/features/admin/hooks/use-indicator-mappings.ts
rm -f src/features/admin/hooks/use-options.ts
rm -f src/features/admin/schemas/indicator.schema.ts
rm -f src/features/admin/schemas/section.schema.ts
rm -f src/features/admin/schemas/scoring-rule.schema.ts
rm -f src/features/admin/schemas/option.schema.ts
rm -f src/features/admin/constants/test-categories.constants.ts
```

- [ ] **Step 4: Delete old admin pages**

```bash
rm -rf src/app/\(dasbor\)/admin/tests/\[testId\]/pertanyaan/
rm -f src/app/\(dasbor\)/admin/tests/buat/page.tsx
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: delete dead admin code (old mock APIs, indicators, sections, scoring rules, wizard)"
```

---

### Task 2: Rewrite Types

**Files:**
- Rewrite: `src/features/admin/types/index.ts`

- [ ] **Step 1: Rewrite types/index.ts with all new types matching BE schemas**

```typescript
// ============================================================
// DOMAIN TYPES — matches backend API response shapes
// ============================================================

export type QuestionType = 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'SCALE_RATING' | 'ESSAY'
export type ScoringType = 'IMMEDIATE' | 'END_OF_TEST'

export interface Package {
  id: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  childPackages?: ChildPackage[]
}

export interface ChildPackage {
  id: string
  packageId: string
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  packageTypes?: PackageType[]
}

export interface PackageType {
  id: string
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Test {
  id: string
  packageTypeId: string
  name: string
  description?: string
  scoringType: ScoringType
  order: number
  isActive: boolean
  originalYear?: number | null
  precision?: number | null
  adaptationYear?: number | null
  popularity?: string | null
  createdAt: string
  updatedAt: string
}

export interface SubTest {
  id: string
  testId: string
  name: string
  description?: string
  duration?: number | null
  order: number
  isDefault: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface QuestionOption {
  id?: string
  optionText: string
  imageUrl?: string | null
  isCorrect: boolean
  points: number
  order: number
}

export interface CorrectAnswer {
  correctEssayKeywords?: string[]
  minScaleValue?: number
  maxScaleValue?: number
  scaleWeights?: Record<string, number>
}

export interface Question {
  id: string
  subTestId: string
  questionType: QuestionType
  questionText: string
  imageUrl?: string | null
  order: number
  points: number
  options?: QuestionOption[]
  correctAnswer?: CorrectAnswer | null
  createdAt: string
  updatedAt: string
}

// ============================================================
// API RESPONSE WRAPPER
// ============================================================

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

// ============================================================
// CREATE / UPDATE DTOs
// ============================================================

export interface CreatePackageDto {
  name: string
  description?: string
  isActive?: boolean
  childPackages?: {
    name: string
    description?: string
    packageTypes: {
      name: string
      description?: string
      price: number
    }[]
  }[]
}

export interface UpdatePackageDto {
  name?: string
  description?: string
  isActive?: boolean
}

export interface CreateChildPackageDto {
  packageId: string
  name: string
  description?: string
  isActive?: boolean
}

export interface UpdateChildPackageDto {
  packageId?: string
  name?: string
  description?: string
  isActive?: boolean
}

export interface CreatePackageTypeDto {
  childPackageId: string
  name: string
  description?: string
  price: number
  testTool?: string
  isActive?: boolean
}

export interface UpdatePackageTypeDto {
  childPackageId?: string
  name?: string
  description?: string
  price?: number
  testTool?: string
  isActive?: boolean
}

export interface CreateTestDto {
  packageTypeId: string
  name: string
  description?: string
  scoringType: ScoringType
  order?: number
  isActive?: boolean
  originalYear?: number
  precision?: number
  adaptationYear?: number
  popularity?: string
}

export interface UpdateTestDto {
  packageTypeId?: string
  name?: string
  description?: string
  scoringType?: ScoringType
  order?: number
  isActive?: boolean
  originalYear?: number
  precision?: number
  adaptationYear?: number
  popularity?: string
}

export interface CreateSubTestDto {
  testId: string
  name: string
  description?: string
  duration?: number
  order: number
  isActive: boolean
}

export interface UpdateSubTestDto {
  testId?: string
  name?: string
  description?: string
  duration?: number
  order?: number
  isActive?: boolean
}

export interface CreateQuestionDto {
  subTestId: string
  questionType: QuestionType
  questionText: string
  imageUrl?: string
  order: number
  points?: number
  options?: Omit<QuestionOption, 'id'>[]
  correctAnswer?: CorrectAnswer
}

export interface UpdateQuestionDto {
  subTestId?: string
  questionType?: QuestionType
  questionText?: string
  imageUrl?: string
  order?: number
  points?: number
  options?: Omit<QuestionOption, 'id'>[]
  correctAnswer?: CorrectAnswer
}

// ============================================================
// UPLOAD TYPES
// ============================================================

export interface UploadResponse {
  url: string
  filename: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/admin/types/index.ts
git commit -m "feat: rewrite admin types to match backend API schemas"
```

---

### Task 3: Rewrite Services

**Files:**
- Rewrite: `src/features/admin/services/index.ts`

- [ ] **Step 1: Rewrite services/index.ts with all new service functions**

```typescript
import { api } from '@/lib/axios'
import type {
  Package, ChildPackage, PackageType, Test, SubTest, Question,
  ApiResponse,
  CreatePackageDto, UpdatePackageDto,
  CreateChildPackageDto, UpdateChildPackageDto,
  CreatePackageTypeDto, UpdatePackageTypeDto,
  CreateTestDto, UpdateTestDto,
  CreateSubTestDto, UpdateSubTestDto,
  CreateQuestionDto, UpdateQuestionDto,
} from '../types'

// ── PACKAGE SERVICE ─────────────────────────────────
export const packageService = {
  getAll: async (): Promise<Package[]> => {
    const { data } = await api.get<ApiResponse<Package[]>>('/admin/packages')
    return data.data
  },
  getById: async (id: string): Promise<Package> => {
    const { data } = await api.get<ApiResponse<Package>>(`/admin/packages/${id}`)
    return data.data
  },
  create: async (dto: CreatePackageDto): Promise<Package> => {
    const { data } = await api.post<ApiResponse<Package>>('/admin/packages', dto)
    return data.data
  },
  update: async (id: string, dto: UpdatePackageDto): Promise<Package> => {
    const { data } = await api.patch<ApiResponse<Package>>(`/admin/packages/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/packages/${id}`)
  },
}

// ── CHILD PACKAGE SERVICE ───────────────────────────
export const childPackageService = {
  getAll: async (): Promise<ChildPackage[]> => {
    const { data } = await api.get<ApiResponse<ChildPackage[]>>('/admin/child-packages')
    return data.data
  },
  getById: async (id: string): Promise<ChildPackage> => {
    const { data } = await api.get<ApiResponse<ChildPackage>>(`/admin/child-packages/${id}`)
    return data.data
  },
  create: async (dto: CreateChildPackageDto): Promise<ChildPackage> => {
    const { data } = await api.post<ApiResponse<ChildPackage>>('/admin/child-packages', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateChildPackageDto): Promise<ChildPackage> => {
    const { data } = await api.patch<ApiResponse<ChildPackage>>(`/admin/child-packages/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/child-packages/${id}`)
  },
}

// ── PACKAGE TYPE SERVICE ────────────────────────────
export const packageTypeService = {
  getAll: async (): Promise<PackageType[]> => {
    const { data } = await api.get<ApiResponse<PackageType[]>>('/admin/package-types')
    return data.data
  },
  getById: async (id: string): Promise<PackageType> => {
    const { data } = await api.get<ApiResponse<PackageType>>(`/admin/package-types/${id}`)
    return data.data
  },
  create: async (dto: CreatePackageTypeDto): Promise<PackageType> => {
    const { data } = await api.post<ApiResponse<PackageType>>('/admin/package-types', dto)
    return data.data
  },
  update: async (id: string, dto: UpdatePackageTypeDto): Promise<PackageType> => {
    const { data } = await api.patch<ApiResponse<PackageType>>(`/admin/package-types/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/package-types/${id}`)
  },
}

// ── TEST SERVICE ────────────────────────────────────
export const testService = {
  getAll: async (): Promise<Test[]> => {
    const { data } = await api.get<ApiResponse<Test[]>>('/admin/tests')
    return data.data
  },
  getById: async (id: string): Promise<Test> => {
    const { data } = await api.get<ApiResponse<Test>>(`/admin/tests/${id}`)
    return data.data
  },
  create: async (dto: CreateTestDto): Promise<Test> => {
    const { data } = await api.post<ApiResponse<Test>>('/admin/tests', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateTestDto): Promise<Test> => {
    const { data } = await api.patch<ApiResponse<Test>>(`/admin/tests/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/tests/${id}`)
  },
}

// ── SUBTEST SERVICE ─────────────────────────────────
export const subTestService = {
  getAll: async (): Promise<SubTest[]> => {
    const { data } = await api.get<ApiResponse<SubTest[]>>('/admin/subtests')
    return data.data
  },
  getById: async (id: string): Promise<SubTest> => {
    const { data } = await api.get<ApiResponse<SubTest>>(`/admin/subtests/${id}`)
    return data.data
  },
  create: async (dto: CreateSubTestDto): Promise<SubTest> => {
    const { data } = await api.post<ApiResponse<SubTest>>('/admin/subtests', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateSubTestDto): Promise<SubTest> => {
    const { data } = await api.patch<ApiResponse<SubTest>>(`/admin/subtests/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/subtests/${id}`)
  },
}

// ── QUESTION SERVICE ────────────────────────────────
export const questionService = {
  getAll: async (): Promise<Question[]> => {
    const { data } = await api.get<ApiResponse<Question[]>>('/admin/questions')
    return data.data
  },
  getById: async (id: string): Promise<Question> => {
    const { data } = await api.get<ApiResponse<Question>>(`/admin/questions/${id}`)
    return data.data
  },
  create: async (dto: CreateQuestionDto): Promise<Question> => {
    const { data } = await api.post<ApiResponse<Question>>('/admin/questions', dto)
    return data.data
  },
  update: async (id: string, dto: UpdateQuestionDto): Promise<Question> => {
    const { data } = await api.patch<ApiResponse<Question>>(`/admin/questions/${id}`, dto)
    return data.data
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/questions/${id}`)
  },
}

// ── UPLOAD SERVICE ──────────────────────────────────
export const uploadService = {
  uploadImage: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<{ url: string; filename: string }>(
      '/admin/upload/image',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return data
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/admin/services/index.ts
git commit -m "feat: rewrite admin services to match backend flat REST endpoints"
```

---

### Task 4: Rewrite Query Keys and Hooks

**Files:**
- Rewrite: `src/features/admin/hooks/query-keys.ts`
- Rewrite: `src/features/admin/hooks/use-packages.ts`
- Rewrite: `src/features/admin/hooks/use-tests.ts`
- Rewrite: `src/features/admin/hooks/use-questions.ts`
- Create: `src/features/admin/hooks/use-child-packages.ts`
- Create: `src/features/admin/hooks/use-package-types.ts`
- Create: `src/features/admin/hooks/use-subtests.ts`
- Rewrite: `src/features/admin/hooks/index.ts`

- [ ] **Step 1: Rewrite query-keys.ts**

```typescript
export const adminKeys = {
  packages: {
    all: ['admin', 'packages'] as const,
    detail: (id: string) => ['admin', 'packages', id] as const,
  },
  childPackages: {
    all: ['admin', 'child-packages'] as const,
    detail: (id: string) => ['admin', 'child-packages', id] as const,
  },
  packageTypes: {
    all: ['admin', 'package-types'] as const,
    detail: (id: string) => ['admin', 'package-types', id] as const,
  },
  tests: {
    all: ['admin', 'tests'] as const,
    detail: (id: string) => ['admin', 'tests', id] as const,
  },
  subTests: {
    all: ['admin', 'subtests'] as const,
    detail: (id: string) => ['admin', 'subtests', id] as const,
  },
  questions: {
    all: ['admin', 'questions'] as const,
    detail: (id: string) => ['admin', 'questions', id] as const,
  },
}
```

- [ ] **Step 2: Rewrite use-packages.ts**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { packageService } from '../services'
import { adminKeys } from './query-keys'
import type { CreatePackageDto, UpdatePackageDto } from '../types'

export function usePackages() {
  return useQuery({
    queryKey: adminKeys.packages.all,
    queryFn: packageService.getAll,
  })
}

export function usePackage(id: string) {
  return useQuery({
    queryKey: adminKeys.packages.detail(id),
    queryFn: () => packageService.getById(id),
    enabled: !!id,
  })
}

export function useCreatePackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePackageDto) => packageService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat paket'),
  })
}

export function useUpdatePackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePackageDto }) =>
      packageService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui paket'),
  })
}

export function useDeletePackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus paket'),
  })
}
```

- [ ] **Step 3: Create use-child-packages.ts**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { childPackageService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateChildPackageDto, UpdateChildPackageDto } from '../types'

export function useChildPackages() {
  return useQuery({
    queryKey: adminKeys.childPackages.all,
    queryFn: childPackageService.getAll,
  })
}

export function useChildPackage(id: string) {
  return useQuery({
    queryKey: adminKeys.childPackages.detail(id),
    queryFn: () => childPackageService.getById(id),
    enabled: !!id,
  })
}

export function useCreateChildPackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateChildPackageDto) => childPackageService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Sub-paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat sub-paket'),
  })
}

export function useUpdateChildPackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateChildPackageDto }) =>
      childPackageService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Sub-paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui sub-paket'),
  })
}

export function useDeleteChildPackage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => childPackageService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      qc.invalidateQueries({ queryKey: adminKeys.packages.all })
      toast.success('Sub-paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus sub-paket'),
  })
}
```

- [ ] **Step 4: Create use-package-types.ts**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { packageTypeService } from '../services'
import { adminKeys } from './query-keys'
import type { CreatePackageTypeDto, UpdatePackageTypeDto } from '../types'

export function usePackageTypes() {
  return useQuery({
    queryKey: adminKeys.packageTypes.all,
    queryFn: packageTypeService.getAll,
  })
}

export function usePackageType(id: string) {
  return useQuery({
    queryKey: adminKeys.packageTypes.detail(id),
    queryFn: () => packageTypeService.getById(id),
    enabled: !!id,
  })
}

export function useCreatePackageType() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePackageTypeDto) => packageTypeService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      toast.success('Tipe paket berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat tipe paket'),
  })
}

export function useUpdatePackageType() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePackageTypeDto }) =>
      packageTypeService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      toast.success('Tipe paket berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui tipe paket'),
  })
}

export function useDeletePackageType() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => packageTypeService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.packageTypes.all })
      qc.invalidateQueries({ queryKey: adminKeys.childPackages.all })
      toast.success('Tipe paket berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus tipe paket'),
  })
}
```

- [ ] **Step 5: Rewrite use-tests.ts**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { testService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateTestDto, UpdateTestDto } from '../types'

export function useTests() {
  return useQuery({
    queryKey: adminKeys.tests.all,
    queryFn: testService.getAll,
  })
}

export function useTest(id: string) {
  return useQuery({
    queryKey: adminKeys.tests.detail(id),
    queryFn: () => testService.getById(id),
    enabled: !!id,
  })
}

export function useCreateTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateTestDto) => testService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      toast.success('Tes berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat tes'),
  })
}

export function useUpdateTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTestDto }) =>
      testService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      toast.success('Tes berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui tes'),
  })
}

export function useDeleteTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => testService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.tests.all })
      toast.success('Tes berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus tes'),
  })
}
```

- [ ] **Step 6: Create use-subtests.ts**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { subTestService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateSubTestDto, UpdateSubTestDto } from '../types'

export function useSubTests() {
  return useQuery({
    queryKey: adminKeys.subTests.all,
    queryFn: subTestService.getAll,
  })
}

export function useSubTest(id: string) {
  return useQuery({
    queryKey: adminKeys.subTests.detail(id),
    queryFn: () => subTestService.getById(id),
    enabled: !!id,
  })
}

export function useCreateSubTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateSubTestDto) => subTestService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Sub-tes berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat sub-tes'),
  })
}

export function useUpdateSubTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSubTestDto }) =>
      subTestService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Sub-tes berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui sub-tes'),
  })
}

export function useDeleteSubTest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => subTestService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.subTests.all })
      toast.success('Sub-tes berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus sub-tes'),
  })
}
```

- [ ] **Step 7: Rewrite use-questions.ts**

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { questionService } from '../services'
import { adminKeys } from './query-keys'
import type { CreateQuestionDto, UpdateQuestionDto } from '../types'

export function useQuestions() {
  return useQuery({
    queryKey: adminKeys.questions.all,
    queryFn: questionService.getAll,
  })
}

export function useQuestion(id: string) {
  return useQuery({
    queryKey: adminKeys.questions.detail(id),
    queryFn: () => questionService.getById(id),
    enabled: !!id,
  })
}

export function useCreateQuestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateQuestionDto) => questionService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success('Soal berhasil dibuat')
    },
    onError: () => toast.error('Gagal membuat soal'),
  })
}

export function useUpdateQuestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateQuestionDto }) =>
      questionService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success('Soal berhasil diperbarui')
    },
    onError: () => toast.error('Gagal memperbarui soal'),
  })
}

export function useDeleteQuestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => questionService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.questions.all })
      toast.success('Soal berhasil dihapus')
    },
    onError: () => toast.error('Gagal menghapus soal'),
  })
}
```

- [ ] **Step 8: Rewrite hooks/index.ts**

```typescript
export { adminKeys } from './query-keys'
export { usePackages, usePackage, useCreatePackage, useUpdatePackage, useDeletePackage } from './use-packages'
export { useChildPackages, useChildPackage, useCreateChildPackage, useUpdateChildPackage, useDeleteChildPackage } from './use-child-packages'
export { usePackageTypes, usePackageType, useCreatePackageType, useUpdatePackageType, useDeletePackageType } from './use-package-types'
export { useTests, useTest, useCreateTest, useUpdateTest, useDeleteTest } from './use-tests'
export { useSubTests, useSubTest, useCreateSubTest, useUpdateSubTest, useDeleteSubTest } from './use-subtests'
export { useQuestions, useQuestion, useCreateQuestion, useUpdateQuestion, useDeleteQuestion } from './use-questions'
export { useUploadImage } from './use-upload'
```

- [ ] **Step 9: Commit**

```bash
git add src/features/admin/hooks/
git commit -m "feat: rewrite admin hooks — add child-packages, package-types, subtests"
```

---

### Task 5: Rewrite Schemas

**Files:**
- Rewrite: `src/features/admin/schemas/test.schema.ts`
- Rewrite: `src/features/admin/schemas/question.schema.ts`
- Create: `src/features/admin/schemas/child-package.schema.ts`
- Create: `src/features/admin/schemas/package-type.schema.ts`
- Create: `src/features/admin/schemas/subtest.schema.ts`
- Rewrite: `src/features/admin/schemas/index.ts`

- [ ] **Step 1: Rewrite test.schema.ts**

```typescript
import { z } from 'zod'

export const createTestSchema = z.object({
  packageTypeId: z.string().min(1, 'Package type wajib dipilih'),
  name: z.string().min(1, 'Nama tes wajib diisi').max(255),
  description: z.string().max(1000).optional().or(z.literal('')),
  scoringType: z.enum(['IMMEDIATE', 'END_OF_TEST']),
  order: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  originalYear: z.number().optional().nullable(),
  precision: z.number().optional().nullable(),
  adaptationYear: z.number().optional().nullable(),
  popularity: z.string().optional().nullable(),
})

export const updateTestSchema = createTestSchema.partial()

export type CreateTestFormData = z.infer<typeof createTestSchema>
export type UpdateTestFormData = z.infer<typeof updateTestSchema>
```

- [ ] **Step 2: Rewrite question.schema.ts**

```typescript
import { z } from 'zod'

const optionSchema = z.object({
  optionText: z.string().min(1, 'Teks opsi wajib diisi'),
  imageUrl: z.string().optional().nullable(),
  isCorrect: z.boolean().default(false),
  points: z.number().default(0),
  order: z.number().min(0),
})

const correctAnswerSchema = z.object({
  correctEssayKeywords: z.array(z.string()).optional(),
  minScaleValue: z.number().optional(),
  maxScaleValue: z.number().optional(),
  scaleWeights: z.record(z.string(), z.number()).optional(),
})

export const createQuestionSchema = z.object({
  subTestId: z.string().min(1, 'Sub-tes wajib dipilih'),
  questionType: z.enum(['MULTIPLE_CHOICE', 'CHECKBOX', 'SCALE_RATING', 'ESSAY']),
  questionText: z.string().min(1, 'Teks soal wajib diisi').max(2000),
  imageUrl: z.string().optional().nullable(),
  order: z.number().min(0).default(0),
  points: z.number().min(0).default(0),
  options: z.array(optionSchema).optional(),
  correctAnswer: correctAnswerSchema.optional().nullable(),
})

export const updateQuestionSchema = createQuestionSchema.partial()

export type CreateQuestionFormData = z.infer<typeof createQuestionSchema>
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>
```

- [ ] **Step 3: Create child-package.schema.ts**

```typescript
import { z } from 'zod'

export const createChildPackageSchema = z.object({
  packageId: z.string().min(1, 'Paket induk wajib dipilih'),
  name: z.string().min(1, 'Nama sub-paket wajib diisi').max(255),
  description: z.string().max(1000).optional().or(z.literal('')),
  isActive: z.boolean().default(true),
})

export const updateChildPackageSchema = createChildPackageSchema.partial()

export type CreateChildPackageFormData = z.infer<typeof createChildPackageSchema>
export type UpdateChildPackageFormData = z.infer<typeof updateChildPackageSchema>
```

- [ ] **Step 4: Create package-type.schema.ts**

```typescript
import { z } from 'zod'

export const createPackageTypeSchema = z.object({
  childPackageId: z.string().min(1, 'Sub-paket wajib dipilih'),
  name: z.string().min(1, 'Nama tipe paket wajib diisi').max(255),
  description: z.string().max(1000).optional().or(z.literal('')),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
  testTool: z.string().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
})

export const updatePackageTypeSchema = createPackageTypeSchema.partial()

export type CreatePackageTypeFormData = z.infer<typeof createPackageTypeSchema>
export type UpdatePackageTypeFormData = z.infer<typeof updatePackageTypeSchema>
```

- [ ] **Step 5: Create subtest.schema.ts**

```typescript
import { z } from 'zod'

export const createSubTestSchema = z.object({
  testId: z.string().min(1, 'Tes wajib dipilih'),
  name: z.string().min(1, 'Nama sub-tes wajib diisi').max(255),
  description: z.string().max(1000).optional().or(z.literal('')),
  duration: z.number().min(1).optional().nullable(),
  order: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
})

export const updateSubTestSchema = createSubTestSchema.partial()

export type CreateSubTestFormData = z.infer<typeof createSubTestSchema>
export type UpdateSubTestFormData = z.infer<typeof updateSubTestSchema>
```

- [ ] **Step 6: Rewrite schemas/index.ts**

```typescript
export { createTestSchema, updateTestSchema, type CreateTestFormData, type UpdateTestFormData } from './test.schema'
export { createQuestionSchema, updateQuestionSchema, type CreateQuestionFormData, type UpdateQuestionFormData } from './question.schema'
export { createChildPackageSchema, updateChildPackageSchema, type CreateChildPackageFormData, type UpdateChildPackageFormData } from './child-package.schema'
export { createPackageTypeSchema, updatePackageTypeSchema, type CreatePackageTypeFormData, type UpdatePackageTypeFormData } from './package-type.schema'
export { createSubTestSchema, updateSubTestSchema, type CreateSubTestFormData, type UpdateSubTestFormData } from './subtest.schema'
```

- [ ] **Step 7: Rewrite components/index.ts and admin/index.ts**

`src/features/admin/components/index.ts`:
```typescript
export { QuestionList } from './QuestionManagement/QuestionList'
export { QuestionForm } from './QuestionManagement/QuestionForm'
export { BulkImportCSV } from './QuestionManagement/BulkImportCSV'
export { ConfirmDialog } from './Common/ConfirmDialog'
export { FormField } from './Common/FormField'
export { BentoGrid, BentoCard } from './Common/Bento'
```

`src/features/admin/index.ts`:
```typescript
export * from './types'
export * from './hooks'
export * from './services'
export * from './schemas'
```

- [ ] **Step 8: Commit**

```bash
git add src/features/admin/schemas/ src/features/admin/components/index.ts src/features/admin/index.ts
git commit -m "feat: rewrite admin schemas — add child-package, package-type, subtest schemas"
```

---

### Task 6: Rewrite Packages List Page

**Files:**
- Rewrite: `src/app/(dasbor)/admin/packages/page.tsx`

- [ ] **Step 1: Rewrite packages page — remove publish/unpublish, use isActive, remove price/duration fields**

The page keeps the same visual style (hero banner, filter, search, list) but adapts to the new Package shape:
- No more `isPublished` → use `isActive`
- No more `price`, `estimatedDuration` → Package only has `name`, `description`, `isActive`
- No more publish/unpublish buttons → toggle `isActive` via update
- Click row → navigate to `/admin/packages/[id]` (drill-down to child packages)
- Create/Edit dialog only has: name, description, isActive toggle
- Stats: Total, Active, Inactive

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { usePackages, useCreatePackage, useUpdatePackage, useDeletePackage } from '@/features/admin/hooks'
import type { Package as PackageType } from '@/features/admin/types'

type FilterType = 'all' | 'active' | 'inactive'

const accentColors = [
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
  'from-violet-400 to-violet-500',
  'from-rose-400 to-rose-500',
  'from-amber-400 to-amber-500',
  'from-cyan-400 to-cyan-500',
]

export default function AdminPackagesPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<PackageType | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const { data: packages, isLoading } = usePackages()
  const createPackage = useCreatePackage()
  const updatePackage = useUpdatePackage()
  const deletePackage = useDeletePackage()

  const allPackages = packages ?? []
  const activeCount = allPackages.filter((p) => p.isActive).length
  const inactiveCount = allPackages.filter((p) => !p.isActive).length

  const filtered = allPackages.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && p.isActive) ||
      (filter === 'inactive' && !p.isActive)
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.description ?? '').toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (pkg: PackageType) => {
    setEditData(pkg)
    setFormName(pkg.name)
    setFormDesc(pkg.description ?? '')
    setFormActive(pkg.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama paket wajib diisi.'); return }
    if (editData) {
      updatePackage.mutate(
        { id: editData.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createPackage.mutate(
        { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deletePackage.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <Skeleton className="h-11 rounded-xl" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-violet-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Manajemen</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">Paket.</h1>
            <p className="text-slate-400 font-medium text-sm">Kelola paket utama psikotes.</p>
          </div>
          <Button size="lg" onClick={openCreate} className="bg-white text-slate-900 hover:bg-violet-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Buat Paket
          </Button>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center"><Package className="size-5 text-violet-300" /></div>
            <div><p className="text-2xl font-black leading-none">{allPackages.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-teal-300" /></div>
            <div><p className="text-2xl font-black leading-none">{activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p></div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center"><XCircle className="size-5 text-rose-300" /></div>
            <div><p className="text-2xl font-black leading-none">{inactiveCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p></div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><Package className="size-72" /></div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {([
            { key: 'all', label: 'Semua', count: allPackages.length },
            { key: 'active', label: 'Aktif', count: activeCount },
            { key: 'inactive', label: 'Nonaktif', count: inactiveCount },
          ] as const).map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={cn('px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap', filter === f.key ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50')}>
              {f.label} <span className={cn('ml-1', filter === f.key ? 'text-slate-400' : 'text-slate-300')}>{f.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input placeholder="Cari paket..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500/10" />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5"><Package className="size-8 text-violet-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((pkg, index) => {
            const color = accentColors[index % accentColors.length]
            const childCount = pkg.childPackages?.length ?? 0
            return (
              <div key={pkg.id} onClick={() => router.push(`/admin/packages/${pkg.id}`)} className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <Package className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">{pkg.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', pkg.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400')}>
                      {pkg.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{pkg.description}</p>
                </div>
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 bg-violet-50 px-3 py-1.5 rounded-full">
                    <Package className="size-3.5" />
                    <span>{childCount} sub-paket</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(pkg) }} className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500">
                    <Pencil className="size-4" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(pkg.id) }} className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500">
                    <Trash2 className="size-4" />
                  </button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-violet-500 text-white flex items-center justify-center"><Package className="size-4" /></div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">{editData ? 'Edit Paket' : 'Paket Baru'}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">{editData ? 'Perbarui informasi paket.' : 'Buat paket utama baru.'}</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Paket</Label>
                <Input placeholder="Misal: Proses Bisnis" value={formName} onChange={(e) => { setFormName(e.target.value); setFormError('') }} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10" />
                {formError && <p className="text-rose-500 text-[10px] font-bold flex items-center gap-1">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea placeholder="Penjelasan singkat..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-violet-500/10" />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Aktif</Label>
                <button type="button" onClick={() => setFormActive(!formActive)} className={cn('flex items-center gap-2 text-sm font-bold transition-colors', formActive ? 'text-teal-600' : 'text-slate-400')}>
                  {formActive ? <ToggleRight className="size-6" /> : <ToggleLeft className="size-6" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={createPackage.isPending || updatePackage.isPending} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95">
                {editData ? 'Simpan' : 'Buat Paket'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Paket" description="Apakah Anda yakin ingin menghapus paket ini? Semua sub-paket di dalamnya juga akan terhapus." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(dasbor\)/admin/packages/page.tsx
git commit -m "feat: rewrite packages list page — isActive instead of publish, no price/duration"
```

---

### Task 7: Rewrite Package Detail Page (Drill-down to Child Packages)

**Files:**
- Rewrite: `src/app/(dasbor)/admin/packages/[packageId]/page.tsx`

- [ ] **Step 1: Rewrite package detail page to show child packages list with CRUD**

This page shows the package detail header + list of child packages belonging to this package. Users can create/edit/delete child packages here. Clicking a child package navigates to `/admin/packages/[packageId]/child-packages/[childId]`.

Since the BE returns child packages nested inside `GET /admin/packages/{id}`, we use `usePackage(id)` and filter `childPackages` from the response. For create/update/delete we use the `childPackageService` flat endpoints.

```typescript
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Package,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Layers,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { usePackage } from '@/features/admin/hooks'
import { useCreateChildPackage, useUpdateChildPackage, useDeleteChildPackage } from '@/features/admin/hooks'
import type { ChildPackage } from '@/features/admin/types'

const accentColors = [
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
  'from-violet-400 to-violet-500',
  'from-rose-400 to-rose-500',
  'from-amber-400 to-amber-500',
]

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = params.packageId as string
  const { data: pkg, isLoading, error } = usePackage(packageId)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<ChildPackage | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createChild = useCreateChildPackage()
  const updateChild = useUpdateChildPackage()
  const deleteChild = useDeleteChildPackage()

  const children = pkg?.childPackages ?? []
  const activeCount = children.filter((c) => c.isActive).length

  const filtered = children.filter((c) => {
    return !search || c.name.toLowerCase().includes(search.toLowerCase()) || (c.description ?? '').toLowerCase().includes(search.toLowerCase())
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (child: ChildPackage) => {
    setEditData(child)
    setFormName(child.name)
    setFormDesc(child.description ?? '')
    setFormActive(child.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama sub-paket wajib diisi.'); return }
    if (editData) {
      updateChild.mutate(
        { id: editData.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createChild.mutate(
        { packageId, name: formName.trim(), description: formDesc.trim() || undefined, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteChild.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5"><Package className="size-8 text-rose-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Paket tidak ditemukan.</p>
          <Button onClick={() => router.push('/admin/packages')} className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button onClick={() => router.push('/admin/packages')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"><ArrowLeft className="size-4" /></div>
            <span className="text-sm font-bold">Kembali ke Paket</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg"><Package className="size-7 text-white" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', pkg.isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-500/20 text-slate-300')}>
                    {pkg.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{pkg.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{pkg.description}</p>
              </div>
            </div>
            <Button size="lg" onClick={openCreate} className="bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Sub-Paket
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-indigo-500/30 flex items-center justify-center"><Layers className="size-5 text-indigo-300" /></div>
              <div><p className="text-2xl font-black leading-none">{children.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sub-Paket</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-teal-300" /></div>
              <div><p className="text-2xl font-black leading-none">{activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center"><XCircle className="size-5 text-rose-300" /></div>
              <div><p className="text-2xl font-black leading-none">{children.length - activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><Package className="size-72" /></div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input placeholder="Cari sub-paket..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/10" />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5"><Layers className="size-8 text-indigo-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada sub-paket.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((child, index) => {
            const color = accentColors[index % accentColors.length]
            const typeCount = child.packageTypes?.length ?? 0
            return (
              <div key={child.id} onClick={() => router.push(`/admin/packages/${packageId}/child-packages/${child.id}`)} className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <Layers className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{child.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', child.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400')}>
                      {child.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{child.description}</p>
                </div>
                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
                    <Package className="size-3.5" /><span>{typeCount} tipe</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(child) }} className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"><Pencil className="size-4" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(child.id) }} className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"><Trash2 className="size-4" /></button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all"><ChevronRight className="size-4" /></div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center"><Layers className="size-4" /></div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">{editData ? 'Edit Sub-Paket' : 'Sub-Paket Baru'}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">{editData ? 'Perbarui informasi sub-paket.' : 'Tambah sub-paket baru.'}</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Sub-Paket</Label>
                <Input placeholder="Misal: Administrasi" value={formName} onChange={(e) => { setFormName(e.target.value); setFormError('') }} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/10" />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea placeholder="Penjelasan singkat..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10" />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Aktif</Label>
                <button type="button" onClick={() => setFormActive(!formActive)} className={cn('flex items-center gap-2 text-sm font-bold transition-colors', formActive ? 'text-teal-600' : 'text-slate-400')}>
                  {formActive ? <ToggleRight className="size-6" /> : <ToggleLeft className="size-6" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={createChild.isPending || updateChild.isPending} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95">
                {editData ? 'Simpan' : 'Tambah'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Sub-Paket" description="Apakah Anda yakin? Semua tipe paket di dalamnya juga akan terhapus." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(dasbor\)/admin/packages/\[packageId\]/page.tsx
git commit -m "feat: rewrite package detail page — drill-down to child packages"
```

---

### Task 8: Create Child Package Detail Page (Drill-down to Package Types)

**Files:**
- Create: `src/app/(dasbor)/admin/packages/[packageId]/child-packages/[childId]/page.tsx`

- [ ] **Step 1: Create the child package detail page showing package types list**

This page shows child package info + list of package types. Click a type → navigate to `/admin/packages/[packageId]/child-packages/[childId]/[typeId]`.

```typescript
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Layers,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  CreditCard,
  Wrench,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { useChildPackage, useCreatePackageType, useUpdatePackageType, useDeletePackageType } from '@/features/admin/hooks'
import type { PackageType } from '@/features/admin/types'

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const accentColors = [
  'from-emerald-400 to-emerald-500',
  'from-blue-400 to-blue-500',
  'from-purple-400 to-purple-500',
  'from-orange-400 to-orange-500',
]

export default function ChildPackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = params.packageId as string
  const childId = params.childId as string
  const { data: child, isLoading, error } = useChildPackage(childId)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<PackageType | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formPrice, setFormPrice] = useState(0)
  const [formTestTool, setFormTestTool] = useState('')
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createType = useCreatePackageType()
  const updateType = useUpdatePackageType()
  const deleteType = useDeletePackageType()

  const types = child?.packageTypes ?? []
  const activeCount = types.filter((t) => t.isActive).length

  const filtered = types.filter((t) => {
    return !search || t.name.toLowerCase().includes(search.toLowerCase()) || (t.description ?? '').toLowerCase().includes(search.toLowerCase())
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormPrice(0)
    setFormTestTool('')
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (pt: PackageType) => {
    setEditData(pt)
    setFormName(pt.name)
    setFormDesc(pt.description ?? '')
    setFormPrice(pt.price)
    setFormTestTool(pt.testTool ?? '')
    setFormActive(pt.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama tipe paket wajib diisi.'); return }
    if (editData) {
      updateType.mutate(
        { id: editData.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, price: formPrice, testTool: formTestTool.trim() || undefined, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createType.mutate(
        { childPackageId: childId, name: formName.trim(), description: formDesc.trim() || undefined, price: formPrice, testTool: formTestTool.trim() || undefined, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteType.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
      </div>
    )
  }

  if (error || !child) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5"><Layers className="size-8 text-rose-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Sub-paket tidak ditemukan.</p>
          <Button onClick={() => router.push(`/admin/packages/${packageId}`)} className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button onClick={() => router.push(`/admin/packages/${packageId}`)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"><ArrowLeft className="size-4" /></div>
            <span className="text-sm font-bold">Kembali ke Sub-Paket</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-lg"><Layers className="size-7 text-white" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', child.isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-500/20 text-slate-300')}>
                    {child.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{child.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{child.description}</p>
              </div>
            </div>
            <Button size="lg" onClick={openCreate} className="bg-white text-slate-900 hover:bg-emerald-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Tipe Paket
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-emerald-500/30 flex items-center justify-center"><CreditCard className="size-5 text-emerald-300" /></div>
              <div><p className="text-2xl font-black leading-none">{types.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tipe Paket</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-teal-300" /></div>
              <div><p className="text-2xl font-black leading-none">{activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center"><XCircle className="size-5 text-rose-300" /></div>
              <div><p className="text-2xl font-black leading-none">{types.length - activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><Layers className="size-72" /></div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input placeholder="Cari tipe paket..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/10" />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5"><CreditCard className="size-8 text-emerald-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada tipe paket.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((pt, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div key={pt.id} onClick={() => router.push(`/admin/packages/${packageId}/child-packages/${childId}/${pt.id}`)} className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <CreditCard className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-emerald-600 transition-colors">{pt.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', pt.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400')}>
                      {pt.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 bg-amber-50 text-amber-600">
                      {formatPrice(pt.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    {pt.description && <span className="truncate">{pt.description}</span>}
                    {pt.testTool && <span className="flex items-center gap-1 shrink-0"><Wrench className="size-3" />{pt.testTool}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(pt) }} className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"><Pencil className="size-4" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(pt.id) }} className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"><Trash2 className="size-4" /></button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all"><ChevronRight className="size-4" /></div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center"><CreditCard className="size-4" /></div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">{editData ? 'Edit Tipe Paket' : 'Tipe Paket Baru'}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">{editData ? 'Perbarui informasi tipe paket.' : 'Tambah tipe paket baru (Dasar/Lengkap/Komprehensif).'}</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Tipe</Label>
                <Input placeholder="Misal: Paket Dasar" value={formName} onChange={(e) => { setFormName(e.target.value); setFormError('') }} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/10" />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea placeholder="Penjelasan singkat..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500/10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Harga (Rp)</Label>
                  <Input type="number" value={formPrice} onChange={(e) => setFormPrice(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/10" />
                  <p className="text-[10px] text-slate-400 font-medium">0 = Gratis</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Test Tool</Label>
                  <Input placeholder="Misal: DISC" value={formTestTool} onChange={(e) => setFormTestTool(e.target.value)} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/10" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Aktif</Label>
                <button type="button" onClick={() => setFormActive(!formActive)} className={cn('flex items-center gap-2 text-sm font-bold transition-colors', formActive ? 'text-teal-600' : 'text-slate-400')}>
                  {formActive ? <ToggleRight className="size-6" /> : <ToggleLeft className="size-6" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={createType.isPending || updateType.isPending} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95">
                {editData ? 'Simpan' : 'Tambah'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Tipe Paket" description="Apakah Anda yakin? Semua tes di dalamnya juga akan terhapus." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(dasbor)/admin/packages/[packageId]/child-packages/[childId]/page.tsx"
git commit -m "feat: add child package detail page — drill-down to package types"
```

---

### Task 9: Create Package Type Detail Page (Drill-down to Tests)

**Files:**
- Create: `src/app/(dasbor)/admin/packages/[packageId]/child-packages/[childId]/[typeId]/page.tsx`

- [ ] **Step 1: Create the package type detail page showing tests list**

This page shows package type info + list of tests under this package type. Click a test → navigate to `/admin/tests/[testId]`. Tests are fetched via `useTests()` and filtered client-side by `packageTypeId`.

```typescript
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  FileText,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { usePackageType, useTests, useCreateTest, useUpdateTest, useDeleteTest } from '@/features/admin/hooks'
import type { Test, ScoringType } from '@/features/admin/types'

function formatPrice(price: number) {
  if (price === 0) return 'Gratis'
  return `Rp ${price.toLocaleString('id-ID')}`
}

const accentColors = [
  'from-sky-400 to-sky-500',
  'from-fuchsia-400 to-fuchsia-500',
  'from-lime-400 to-lime-500',
  'from-orange-400 to-orange-500',
]

export default function PackageTypeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = params.packageId as string
  const childId = params.childId as string
  const typeId = params.typeId as string

  const { data: pkgType, isLoading: typeLoading, error: typeError } = usePackageType(typeId)
  const { data: allTests } = useTests()

  const tests = (allTests ?? []).filter((t) => t.packageTypeId === typeId)
  const activeCount = tests.filter((t) => t.isActive).length

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Test | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formScoringType, setFormScoringType] = useState<ScoringType>('END_OF_TEST')
  const [formOrder, setFormOrder] = useState(0)
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createTest = useCreateTest()
  const updateTest = useUpdateTest()
  const deleteTest = useDeleteTest()

  const filtered = tests.filter((t) => {
    return !search || t.name.toLowerCase().includes(search.toLowerCase()) || (t.description ?? '').toLowerCase().includes(search.toLowerCase())
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormScoringType('END_OF_TEST')
    setFormOrder(tests.length)
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (test: Test) => {
    setEditData(test)
    setFormName(test.name)
    setFormDesc(test.description ?? '')
    setFormScoringType(test.scoringType)
    setFormOrder(test.order)
    setFormActive(test.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama tes wajib diisi.'); return }
    if (editData) {
      updateTest.mutate(
        { id: editData.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, scoringType: formScoringType, order: formOrder, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createTest.mutate(
        { packageTypeId: typeId, name: formName.trim(), description: formDesc.trim() || undefined, scoringType: formScoringType, order: formOrder, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteTest.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (typeLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
      </div>
    )
  }

  if (typeError || !pkgType) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5"><CreditCard className="size-8 text-rose-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Tipe paket tidak ditemukan.</p>
          <Button onClick={() => router.push(`/admin/packages/${packageId}/child-packages/${childId}`)} className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button onClick={() => router.push(`/admin/packages/${packageId}/child-packages/${childId}`)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"><ArrowLeft className="size-4" /></div>
            <span className="text-sm font-bold">Kembali ke Tipe Paket</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shrink-0 shadow-lg"><CreditCard className="size-7 text-white" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', pkgType.isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-500/20 text-slate-300')}>
                    {pkgType.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-300">
                    {formatPrice(pkgType.price)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{pkgType.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{pkgType.description}</p>
              </div>
            </div>
            <Button size="lg" onClick={openCreate} className="bg-white text-slate-900 hover:bg-sky-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Tes
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-sky-500/30 flex items-center justify-center"><FileText className="size-5 text-sky-300" /></div>
              <div><p className="text-2xl font-black leading-none">{tests.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Tes</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-teal-300" /></div>
              <div><p className="text-2xl font-black leading-none">{activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center"><XCircle className="size-5 text-rose-300" /></div>
              <div><p className="text-2xl font-black leading-none">{tests.length - activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><CreditCard className="size-72" /></div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input placeholder="Cari tes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-500/10" />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-5"><FileText className="size-8 text-sky-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada tes.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.sort((a, b) => a.order - b.order).map((test, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div key={test.id} onClick={() => router.push(`/admin/tests/${test.id}`)} className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-2">
                  <span className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">{test.order + 1}</span>
                </div>
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-sky-600 transition-colors">{test.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', test.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400')}>
                      {test.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 bg-sky-50 text-sky-600">
                      {test.scoringType === 'IMMEDIATE' ? 'Langsung' : 'Akhir Tes'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{test.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(test) }} className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"><Pencil className="size-4" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(test.id) }} className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"><Trash2 className="size-4" /></button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all"><ChevronRight className="size-4" /></div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-sky-500 text-white flex items-center justify-center"><FileText className="size-4" /></div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">{editData ? 'Edit Tes' : 'Tes Baru'}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">{editData ? 'Perbarui informasi tes.' : 'Tambah tes baru.'}</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Tes</Label>
                <Input placeholder="Misal: Test IQ" value={formName} onChange={(e) => { setFormName(e.target.value); setFormError('') }} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-sky-500/10" />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea placeholder="Penjelasan singkat..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-sky-500/10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe Scoring</Label>
                  <Select value={formScoringType} onValueChange={(v) => setFormScoringType(v as ScoringType)}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 font-bold text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="END_OF_TEST">Akhir Tes</SelectItem>
                      <SelectItem value="IMMEDIATE">Langsung</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</Label>
                  <Input type="number" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-sky-500/10" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Aktif</Label>
                <button type="button" onClick={() => setFormActive(!formActive)} className={cn('flex items-center gap-2 text-sm font-bold transition-colors', formActive ? 'text-teal-600' : 'text-slate-400')}>
                  {formActive ? <ToggleRight className="size-6" /> : <ToggleLeft className="size-6" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={createTest.isPending || updateTest.isPending} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95">
                {editData ? 'Simpan' : 'Tambah'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Tes" description="Apakah Anda yakin? Semua sub-tes dan soal di dalamnya juga akan terhapus." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(dasbor)/admin/packages/[packageId]/child-packages/[childId]/[typeId]/page.tsx"
git commit -m "feat: add package type detail page — drill-down to tests"
```

---

### Task 10: Rewrite Test Detail Page (Drill-down to SubTests)

**Files:**
- Rewrite: `src/app/(dasbor)/admin/tests/[testId]/page.tsx`

- [ ] **Step 1: Rewrite test detail page to show subtests list with CRUD**

This page shows test info + list of subtests. Click a subtest → navigate to `/admin/tests/[testId]/subtests/[subtestId]`. SubTests are fetched via `useSubTests()` and filtered client-side by `testId`.

```typescript
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  Plus,
  Search,
  ChevronRight,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Layers,
  Clock,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { useTest, useSubTests, useCreateSubTest, useUpdateSubTest, useDeleteSubTest } from '@/features/admin/hooks'
import type { SubTest } from '@/features/admin/types'

const accentColors = [
  'from-violet-400 to-violet-500',
  'from-cyan-400 to-cyan-500',
  'from-pink-400 to-pink-500',
  'from-amber-400 to-amber-500',
]

export default function TestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string

  const { data: test, isLoading: testLoading, error: testError } = useTest(testId)
  const { data: allSubTests } = useSubTests()

  const subTests = (allSubTests ?? []).filter((s) => s.testId === testId)
  const activeCount = subTests.filter((s) => s.isActive).length

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<SubTest | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDuration, setFormDuration] = useState<number | ''>('')
  const [formOrder, setFormOrder] = useState(0)
  const [formActive, setFormActive] = useState(true)
  const [formError, setFormError] = useState('')

  const createSubTest = useCreateSubTest()
  const updateSubTest = useUpdateSubTest()
  const deleteSubTest = useDeleteSubTest()

  const filtered = subTests.filter((s) => {
    if (s.isDefault) return false
    return !search || s.name.toLowerCase().includes(search.toLowerCase()) || (s.description ?? '').toLowerCase().includes(search.toLowerCase())
  })

  const openCreate = () => {
    setEditData(null)
    setFormName('')
    setFormDesc('')
    setFormDuration('')
    setFormOrder(subTests.length)
    setFormActive(true)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (st: SubTest) => {
    setEditData(st)
    setFormName(st.name)
    setFormDesc(st.description ?? '')
    setFormDuration(st.duration ?? '')
    setFormOrder(st.order)
    setFormActive(st.isActive)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formName.trim()) { setFormError('Nama sub-tes wajib diisi.'); return }
    const duration = formDuration === '' ? undefined : Number(formDuration)
    if (editData) {
      updateSubTest.mutate(
        { id: editData.id, dto: { name: formName.trim(), description: formDesc.trim() || undefined, duration, order: formOrder, isActive: formActive } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createSubTest.mutate(
        { testId, name: formName.trim(), description: formDesc.trim() || undefined, duration, order: formOrder, isActive: formActive },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteSubTest.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  if (testLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
      </div>
    )
  }

  if (testError || !test) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5"><FileText className="size-8 text-rose-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Tes tidak ditemukan.</p>
          <Button onClick={() => router.back()} className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"><ArrowLeft className="size-4" /></div>
            <span className="text-sm font-bold">Kembali</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center shrink-0 shadow-lg"><FileText className="size-7 text-white" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', test.isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-500/20 text-slate-300')}>
                    {test.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/20 text-violet-300">
                    {test.scoringType === 'IMMEDIATE' ? 'Scoring Langsung' : 'Scoring Akhir'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{test.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{test.description}</p>
              </div>
            </div>
            <Button size="lg" onClick={openCreate} className="bg-white text-slate-900 hover:bg-violet-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Sub-Tes
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-violet-500/30 flex items-center justify-center"><Layers className="size-5 text-violet-300" /></div>
              <div><p className="text-2xl font-black leading-none">{subTests.filter(s => !s.isDefault).length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sub-Tes</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-teal-300" /></div>
              <div><p className="text-2xl font-black leading-none">{activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center"><XCircle className="size-5 text-rose-300" /></div>
              <div><p className="text-2xl font-black leading-none">{subTests.filter(s => !s.isDefault).length - activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><FileText className="size-72" /></div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input placeholder="Cari sub-tes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-violet-500/10" />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-5"><Layers className="size-8 text-violet-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada sub-tes.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.sort((a, b) => a.order - b.order).map((st, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div key={st.id} onClick={() => router.push(`/admin/tests/${testId}/subtests/${st.id}`)} className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-2">
                  <span className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">{st.order + 1}</span>
                </div>
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <Layers className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-violet-600 transition-colors">{st.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', st.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400')}>
                      {st.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    {st.description && <span className="truncate">{st.description}</span>}
                    {st.duration && <span className="flex items-center gap-1 shrink-0"><Clock className="size-3" />{st.duration}m</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(st) }} className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"><Pencil className="size-4" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(st.id) }} className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"><Trash2 className="size-4" /></button>
                  <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all"><ChevronRight className="size-4" /></div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[460px] p-0 border-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-violet-500 text-white flex items-center justify-center"><Layers className="size-4" /></div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">{editData ? 'Edit Sub-Tes' : 'Sub-Tes Baru'}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">{editData ? 'Perbarui informasi sub-tes.' : 'Tambah sub-tes baru.'}</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Sub-Tes</Label>
                <Input placeholder="Misal: Verbal" value={formName} onChange={(e) => { setFormName(e.target.value); setFormError('') }} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10" />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi</Label>
                <Textarea placeholder="Penjelasan singkat..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[70px] resize-none focus:bg-white focus:ring-2 focus:ring-violet-500/10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Durasi (Menit)</Label>
                  <Input type="number" placeholder="Opsional" value={formDuration} onChange={(e) => setFormDuration(e.target.value === '' ? '' : Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</Label>
                  <Input type="number" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm focus:bg-white focus:ring-2 focus:ring-violet-500/10" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Aktif</Label>
                <button type="button" onClick={() => setFormActive(!formActive)} className={cn('flex items-center gap-2 text-sm font-bold transition-colors', formActive ? 'text-teal-600' : 'text-slate-400')}>
                  {formActive ? <ToggleRight className="size-6" /> : <ToggleLeft className="size-6" />}
                  {formActive ? 'Aktif' : 'Nonaktif'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={createSubTest.isPending || updateSubTest.isPending} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95">
                {editData ? 'Simpan' : 'Tambah'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Sub-Tes" description="Apakah Anda yakin? Semua soal di dalamnya juga akan terhapus." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(dasbor)/admin/tests/[testId]/page.tsx"
git commit -m "feat: rewrite test detail page — drill-down to subtests"
```

---

### Task 11: Create SubTest Detail Page (Questions List with CRUD)

**Files:**
- Create: `src/app/(dasbor)/admin/tests/[testId]/subtests/[subtestId]/page.tsx`

- [ ] **Step 1: Create the subtest detail page showing questions list with inline create/edit**

This is the deepest drill-down level. Shows subtest info + list of questions. Questions are fetched via `useQuestions()` and filtered by `subTestId`. Create/edit dialog includes question type selector, options builder (for MC/Checkbox), and correctAnswer config (for Essay/Scale).

```typescript
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Layers,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  X,
  GripVertical,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ConfirmDialog } from '@/features/admin/components/Common/ConfirmDialog'
import { useSubTest, useQuestions, useCreateQuestion, useUpdateQuestion, useDeleteQuestion } from '@/features/admin/hooks'
import type { Question, QuestionType, QuestionOption } from '@/features/admin/types'

const typeLabels: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: 'Pilihan Ganda',
  CHECKBOX: 'Checkbox',
  SCALE_RATING: 'Skala Rating',
  ESSAY: 'Esai',
}

const typeColors: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: 'bg-blue-50 text-blue-600',
  CHECKBOX: 'bg-purple-50 text-purple-600',
  SCALE_RATING: 'bg-amber-50 text-amber-600',
  ESSAY: 'bg-emerald-50 text-emerald-600',
}

const accentColors = [
  'from-blue-400 to-blue-500',
  'from-purple-400 to-purple-500',
  'from-amber-400 to-amber-500',
  'from-emerald-400 to-emerald-500',
]

function emptyOption(order: number): Omit<QuestionOption, 'id'> {
  return { optionText: '', isCorrect: false, points: 0, order }
}

export default function SubTestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string
  const subtestId = params.subtestId as string

  const { data: subTest, isLoading: stLoading, error: stError } = useSubTest(subtestId)
  const { data: allQuestions } = useQuestions()

  const questions = (allQuestions ?? []).filter((q) => q.subTestId === subtestId).sort((a, b) => a.order - b.order)

  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editData, setEditData] = useState<Question | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Form state
  const [formType, setFormType] = useState<QuestionType>('MULTIPLE_CHOICE')
  const [formText, setFormText] = useState('')
  const [formOrder, setFormOrder] = useState(0)
  const [formPoints, setFormPoints] = useState(0)
  const [formOptions, setFormOptions] = useState<Omit<QuestionOption, 'id'>[]>([emptyOption(0), emptyOption(1)])
  const [formEssayKeywords, setFormEssayKeywords] = useState('')
  const [formMinScale, setFormMinScale] = useState(1)
  const [formMaxScale, setFormMaxScale] = useState(5)
  const [formError, setFormError] = useState('')

  const createQuestion = useCreateQuestion()
  const updateQuestion = useUpdateQuestion()
  const deleteQuestion = useDeleteQuestion()

  const filtered = questions.filter((q) => {
    return !search || q.questionText.toLowerCase().includes(search.toLowerCase())
  })

  const openCreate = () => {
    setEditData(null)
    setFormType('MULTIPLE_CHOICE')
    setFormText('')
    setFormOrder(questions.length)
    setFormPoints(0)
    setFormOptions([emptyOption(0), emptyOption(1)])
    setFormEssayKeywords('')
    setFormMinScale(1)
    setFormMaxScale(5)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (q: Question) => {
    setEditData(q)
    setFormType(q.questionType)
    setFormText(q.questionText)
    setFormOrder(q.order)
    setFormPoints(q.points)
    setFormOptions(q.options?.map(o => ({ optionText: o.optionText, isCorrect: o.isCorrect, points: o.points, order: o.order, imageUrl: o.imageUrl })) ?? [emptyOption(0), emptyOption(1)])
    setFormEssayKeywords(q.correctAnswer?.correctEssayKeywords?.join(', ') ?? '')
    setFormMinScale(q.correctAnswer?.minScaleValue ?? 1)
    setFormMaxScale(q.correctAnswer?.maxScaleValue ?? 5)
    setFormError('')
    setFormOpen(true)
  }

  const handleSubmit = () => {
    if (!formText.trim()) { setFormError('Teks soal wajib diisi.'); return }

    const needsOptions = formType === 'MULTIPLE_CHOICE' || formType === 'CHECKBOX'
    const validOptions = formOptions.filter(o => o.optionText.trim())
    if (needsOptions && validOptions.length < 2) { setFormError('Minimal 2 opsi jawaban.'); return }
    if (needsOptions && !validOptions.some(o => o.isCorrect)) { setFormError('Pilih minimal 1 jawaban benar.'); return }

    const options = needsOptions ? validOptions.map((o, i) => ({ ...o, order: i })) : undefined
    const correctAnswer = formType === 'ESSAY'
      ? { correctEssayKeywords: formEssayKeywords.split(',').map(k => k.trim()).filter(Boolean) }
      : formType === 'SCALE_RATING'
        ? { minScaleValue: formMinScale, maxScaleValue: formMaxScale }
        : undefined

    if (editData) {
      updateQuestion.mutate(
        { id: editData.id, dto: { questionType: formType, questionText: formText.trim(), order: formOrder, points: formPoints, options, correctAnswer } },
        { onSuccess: () => setFormOpen(false) },
      )
    } else {
      createQuestion.mutate(
        { subTestId: subtestId, questionType: formType, questionText: formText.trim(), order: formOrder, points: formPoints, options, correctAnswer },
        { onSuccess: () => setFormOpen(false) },
      )
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteQuestion.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
  }

  const addOption = () => setFormOptions([...formOptions, emptyOption(formOptions.length)])
  const removeOption = (idx: number) => setFormOptions(formOptions.filter((_, i) => i !== idx))
  const updateOption = (idx: number, field: string, value: string | boolean | number) => {
    setFormOptions(formOptions.map((o, i) => i === idx ? { ...o, [field]: value } : o))
  }

  if (stLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-44 rounded-[2.5rem]" />
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
      </div>
    )
  }

  if (stError || !subTest) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-5"><Layers className="size-8 text-rose-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Sub-tes tidak ditemukan.</p>
          <Button onClick={() => router.push(`/admin/tests/${testId}`)} className="mt-4 rounded-2xl h-12 px-8 font-black bg-slate-900 hover:bg-slate-800">
            <ArrowLeft className="size-4 mr-2" /> Kembali
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <button onClick={() => router.push(`/admin/tests/${testId}`)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"><ArrowLeft className="size-4" /></div>
            <span className="text-sm font-bold">Kembali ke Sub-Tes</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shrink-0 shadow-lg"><Layers className="size-7 text-white" /></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full', subTest.isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-500/20 text-slate-300')}>
                    {subTest.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                  {subTest.duration && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 flex items-center gap-1">
                      <Clock className="size-3" />{subTest.duration}m
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{subTest.name}</h1>
                <p className="text-slate-400 font-medium text-sm max-w-lg">{subTest.description}</p>
              </div>
            </div>
            <Button size="lg" onClick={openCreate} className="bg-white text-slate-900 hover:bg-blue-50 rounded-2xl h-14 px-8 font-black text-base shadow-xl transition-all active:scale-95 group shrink-0">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Tambah Soal
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-500/30 flex items-center justify-center"><HelpCircle className="size-5 text-blue-300" /></div>
              <div><p className="text-2xl font-black leading-none">{questions.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Soal</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-amber-300" /></div>
              <div><p className="text-2xl font-black leading-none">{questions.reduce((s, q) => s + q.points, 0)}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total Poin</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><HelpCircle className="size-72" /></div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input placeholder="Cari soal..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/10" />
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5"><HelpCircle className="size-8 text-blue-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Belum ada soal.</p>
          <p className="text-slate-400 font-medium text-sm">Klik tombol di atas untuk menambahkan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((q, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div key={q.id} className="group flex items-center gap-5 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-2">
                  <span className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">{q.order + 1}</span>
                </div>
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white', color)}>
                  <HelpCircle className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-sm font-black text-slate-900 truncate">{q.questionText}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', typeColors[q.questionType])}>
                      {typeLabels[q.questionType]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span>{q.points} poin</span>
                    {q.options && <span>{q.options.length} opsi</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(q)} className="size-9 rounded-xl bg-white text-indigo-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500"><Pencil className="size-4" /></button>
                  <button onClick={() => setDeleteId(q.id)} className="size-9 rounded-xl bg-white text-rose-400 border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"><Trash2 className="size-4" /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-[560px] max-h-[85vh] overflow-y-auto p-0 border-0 rounded-2xl bg-white shadow-2xl">
          <div className="px-6 pt-6 pb-3 sticky top-0 bg-white z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-9 rounded-xl bg-blue-500 text-white flex items-center justify-center"><HelpCircle className="size-4" /></div>
              <div>
                <DialogTitle className="text-base font-black text-slate-900">{editData ? 'Edit Soal' : 'Soal Baru'}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400 font-medium">{editData ? 'Perbarui soal.' : 'Tambah soal baru.'}</DialogDescription>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              {/* Question Type */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe Soal</Label>
                <Select value={formType} onValueChange={(v) => setFormType(v as QuestionType)}>
                  <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 font-bold text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MULTIPLE_CHOICE">Pilihan Ganda</SelectItem>
                    <SelectItem value="CHECKBOX">Checkbox (Multi-jawaban)</SelectItem>
                    <SelectItem value="SCALE_RATING">Skala Rating</SelectItem>
                    <SelectItem value="ESSAY">Esai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Question Text */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teks Soal</Label>
                <Textarea placeholder="Tulis pertanyaan di sini..." value={formText} onChange={(e) => { setFormText(e.target.value); setFormError('') }} className="rounded-xl bg-slate-50 border-slate-200 p-4 font-medium text-sm min-h-[80px] resize-none focus:bg-white focus:ring-2 focus:ring-blue-500/10" />
                {formError && <p className="text-rose-500 text-[10px] font-bold">{formError}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Urutan</Label>
                  <Input type="number" value={formOrder} onChange={(e) => setFormOrder(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Poin</Label>
                  <Input type="number" value={formPoints} onChange={(e) => setFormPoints(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm" />
                </div>
              </div>

              {/* OPTIONS for MC / Checkbox */}
              {(formType === 'MULTIPLE_CHOICE' || formType === 'CHECKBOX') && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Opsi Jawaban</Label>
                    <button type="button" onClick={addOption} className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1"><Plus className="size-3" />Tambah</button>
                  </div>
                  <div className="space-y-2">
                    {formOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-50 rounded-xl p-2">
                        <GripVertical className="size-4 text-slate-300 shrink-0" />
                        <div className="flex items-center gap-2 shrink-0">
                          <Checkbox checked={opt.isCorrect} onCheckedChange={(v) => {
                            if (formType === 'MULTIPLE_CHOICE') {
                              setFormOptions(formOptions.map((o, i) => ({ ...o, isCorrect: i === idx ? !!v : false })))
                            } else {
                              updateOption(idx, 'isCorrect', !!v)
                            }
                          }} />
                        </div>
                        <Input placeholder={`Opsi ${idx + 1}`} value={opt.optionText} onChange={(e) => updateOption(idx, 'optionText', e.target.value)} className="h-8 rounded-lg bg-white border-slate-200 px-3 font-medium text-sm flex-1" />
                        <Input type="number" placeholder="Poin" value={opt.points} onChange={(e) => updateOption(idx, 'points', Number(e.target.value))} className="h-8 w-16 rounded-lg bg-white border-slate-200 px-2 font-black text-xs text-center" />
                        {formOptions.length > 2 && (
                          <button type="button" onClick={() => removeOption(idx)} className="size-7 rounded-lg text-rose-400 hover:bg-rose-50 flex items-center justify-center shrink-0"><X className="size-3.5" /></button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Centang checkbox untuk menandai jawaban benar.</p>
                </div>
              )}

              {/* ESSAY config */}
              {formType === 'ESSAY' && (
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kata Kunci Jawaban (pisahkan koma)</Label>
                  <Input placeholder="keyword1, keyword2, keyword3" value={formEssayKeywords} onChange={(e) => setFormEssayKeywords(e.target.value)} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-medium text-sm" />
                </div>
              )}

              {/* SCALE RATING config */}
              {formType === 'SCALE_RATING' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nilai Min</Label>
                    <Input type="number" value={formMinScale} onChange={(e) => setFormMinScale(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nilai Max</Label>
                    <Input type="number" value={formMaxScale} onChange={(e) => setFormMaxScale(Number(e.target.value))} className="h-10 rounded-xl bg-slate-50 border-slate-200 px-4 font-black text-sm" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={createQuestion.isPending || updateQuestion.isPending} className="flex-1 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 font-black text-sm shadow-md transition-all active:scale-95">
                {editData ? 'Simpan' : 'Tambah Soal'}
              </Button>
              <Button type="button" variant="ghost" className="h-11 rounded-xl px-4 font-bold text-slate-400 text-sm" onClick={() => setFormOpen(false)}>Batal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Hapus Soal" description="Apakah Anda yakin ingin menghapus soal ini?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(dasbor)/admin/tests/[testId]/subtests/[subtestId]/page.tsx"
git commit -m "feat: add subtest detail page — questions list with full CRUD"
```

---

### Task 12: Rewrite Tests List Page and Remove Old Test Pages

**Files:**
- Rewrite: `src/app/(dasbor)/admin/tests/page.tsx`
- Delete: `src/app/(dasbor)/admin/tests/buat/` (if not already deleted in Task 1)

- [ ] **Step 1: Rewrite tests list page as a simple flat list of all tests**

This page shows all tests across all package types. It's a convenience view — the primary way to access tests is through the drill-down (Package → ChildPackage → PackageType → Tests). But having a flat list is useful for quick search.

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Search,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useTests } from '@/features/admin/hooks'

type FilterType = 'all' | 'active' | 'inactive'

const accentColors = [
  'from-sky-400 to-sky-500',
  'from-fuchsia-400 to-fuchsia-500',
  'from-lime-400 to-lime-500',
  'from-orange-400 to-orange-500',
  'from-indigo-400 to-indigo-500',
  'from-teal-400 to-teal-500',
]

export default function AdminTestsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  const { data: tests, isLoading } = useTests()

  const allTests = tests ?? []
  const activeCount = allTests.filter((t) => t.isActive).length
  const inactiveCount = allTests.filter((t) => !t.isActive).length

  const filtered = allTests.filter((t) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && t.isActive) ||
      (filter === 'inactive' && !t.isActive)
    const matchesSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || (t.description ?? '').toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Skeleton className="h-52 rounded-[2.5rem]" />
        <Skeleton className="h-11 rounded-xl" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 md:p-10 text-white">
        <div className="relative z-10">
          <p className="text-sky-300 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Manajemen</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1">Semua Tes.</h1>
          <p className="text-slate-400 font-medium text-sm">Daftar semua tes dari seluruh paket. Klik untuk melihat sub-tes.</p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-sky-500/30 flex items-center justify-center"><FileText className="size-5 text-sky-300" /></div>
              <div><p className="text-2xl font-black leading-none">{allTests.length}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Total</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-teal-500/30 flex items-center justify-center"><CheckCircle2 className="size-5 text-teal-300" /></div>
              <div><p className="text-2xl font-black leading-none">{activeCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aktif</p></div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-500/30 flex items-center justify-center"><XCircle className="size-5 text-rose-300" /></div>
              <div><p className="text-2xl font-black leading-none">{inactiveCount}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Nonaktif</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><FileText className="size-72" /></div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 gap-1">
          {([
            { key: 'all', label: 'Semua', count: allTests.length },
            { key: 'active', label: 'Aktif', count: activeCount },
            { key: 'inactive', label: 'Nonaktif', count: inactiveCount },
          ] as const).map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={cn('px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap', filter === f.key ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50')}>
              {f.label} <span className={cn('ml-1', filter === f.key ? 'text-slate-400' : 'text-slate-300')}>{f.count}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input placeholder="Cari tes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-11 bg-white border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-500/10" />
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-16 text-center flex flex-col items-center">
          <div className="size-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-5"><FileText className="size-8 text-sky-400" /></div>
          <p className="text-slate-900 font-black text-lg mb-1">Tidak ditemukan.</p>
          <p className="text-slate-400 font-medium text-sm">Coba ubah filter atau kata kunci pencarian.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {filtered.map((test, index) => {
            const color = accentColors[index % accentColors.length]
            return (
              <div key={test.id} onClick={() => router.push(`/admin/tests/${test.id}`)} className="group flex items-center gap-5 px-6 md:px-8 py-5 cursor-pointer hover:bg-slate-50/50 transition-all">
                <div className={cn('size-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-all group-hover:scale-105 group-hover:shadow-md', color)}>
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <h3 className="text-base font-black text-slate-900 truncate group-hover:text-sky-600 transition-colors">{test.name}</h3>
                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0', test.isActive ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400')}>
                      {test.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 bg-sky-50 text-sky-600">
                      {test.scoringType === 'IMMEDIATE' ? 'Langsung' : 'Akhir Tes'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium truncate">{test.description}</p>
                </div>
                <div className="size-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shrink-0">
                  <ChevronRight className="size-4" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(dasbor)/admin/tests/page.tsx"
git commit -m "feat: rewrite tests list page — flat list with filter and search"
```

---

### Task 13: Update Sidebar Navigation (if applicable)

**Files:**
- Check and update any sidebar/nav component that references old routes

- [ ] **Step 1: Search for sidebar navigation references**

```bash
grep -r "admin/tests/buat\|admin/packages.*publish\|TestWizard\|pertanyaan" src/app src/features src/components --include="*.tsx" --include="*.ts" -l
```

Fix any broken references found. The main admin nav items should be:
- `/admin` — Dashboard
- `/admin/packages` — Paket (drill-down entry point)
- `/admin/tests` — Semua Tes (flat list)
- Other existing items (analytics, participants, etc.) stay as-is

- [ ] **Step 2: Commit if changes were made**

```bash
git add -A
git commit -m "fix: update sidebar nav references for new admin structure"
```

---

### Task 14: Verify Build and Fix TypeScript Errors

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -50
```

- [ ] **Step 2: Fix any type errors found**

Common issues to expect:
- Old type imports in components that weren't rewritten (e.g. `Indicator`, `Section`, `ScoringRule`)
- Old hook imports (`usePublishTest`, `useUnpublishTest`, etc.)
- Old service imports

For each error, either update the import or remove the dead reference.

- [ ] **Step 3: Run build**

```bash
npm run build 2>&1 | tail -30
```

- [ ] **Step 4: Fix any build errors and commit**

```bash
git add -A
git commit -m "fix: resolve TypeScript errors after admin restructure"
```

---

### Task 15: Final Cleanup

- [ ] **Step 1: Remove any empty directories left behind**

```bash
find src/features/admin/components -type d -empty -delete 2>/dev/null
find src/app/api -type d -empty -delete 2>/dev/null
```

- [ ] **Step 2: Verify no references to deleted concepts remain**

```bash
grep -r "Indicator\|ScoringRule\|OptionMapping\|TestWizard\|PublishTab\|isPublished\|publish.*Test\|unpublish" src/features/admin src/app/\(dasbor\)/admin --include="*.tsx" --include="*.ts" -l
```

Should return empty. If not, fix remaining references.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup — remove empty dirs and stale references"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Delete dead code | ~30 files deleted |
| 2 | Rewrite types | 1 file |
| 3 | Rewrite services | 1 file |
| 4 | Rewrite hooks | 8 files |
| 5 | Rewrite schemas + barrel exports | 7 files |
| 6 | Rewrite packages list page | 1 file |
| 7 | Rewrite package detail → child packages | 1 file |
| 8 | Create child package detail → package types | 1 file (new) |
| 9 | Create package type detail → tests | 1 file (new) |
| 10 | Rewrite test detail → subtests | 1 file |
| 11 | Create subtest detail → questions | 1 file (new) |
| 12 | Rewrite tests list page | 1 file |
| 13 | Update sidebar navigation | 1-2 files |
| 14 | Verify build + fix TS errors | varies |
| 15 | Final cleanup | varies |

**Drill-down flow:**
```
/admin/packages → /admin/packages/[id] → /admin/packages/[id]/child-packages/[childId] → /admin/packages/[id]/child-packages/[childId]/[typeId] → /admin/tests/[testId] → /admin/tests/[testId]/subtests/[subtestId]
```
