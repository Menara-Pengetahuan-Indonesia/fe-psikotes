# Phase 3: Domain Cleanup & Consolidation — Design Document

**Date:** 2026-03-03
**Status:** Approved
**Approach:** Per-concern, bottom-up, 1 commit per task

---

## Problem Statement

Setelah Phase 1 (constants file organization) dan Phase 2 (constants extraction & refactoring), masih ada 8 concern yang perlu di-address:

1. Duplicate types — `FaqItem` (4x), `ActivityLogEntry` (3x), `NavItem` (2x), `QuestionType` (2x)
2. ~10 inline constants masih di component files
3. Misplaced files — 3 components bocor di `src/app/`, 4 type/theme files di `general/components/`
4. 6 empty barrel files (`export {}`)
5. Remaining `export *` di admin/schemas, dashboard/components, dashboard/constants, shared/types
6. 3 TS errors di `QuestionFormWizard.tsx`
7. 4 TODO comments sisa refactoring sebelumnya
8. Empty placeholder dirs (`shared/lib/`, dashboard hooks/services, psikotes services)

## Architecture Decisions

- **Duplicate types** → consolidate ke level paling shared. `FaqItem` ke `shared/types/` karena dipakai 4+ features. `ActivityLogEntry` ke `psikotes/types/` karena hanya dipakai di psikotes. `NavItem` ke `dashboard/types/`. `QuestionType` ke `admin/types/`.
- **Empty barrels** → delete file + empty parent dir jika tidak ada file lain.
- **Misplaced app files** → move ke features layer, update imports di page files.
- **`export *`** → convert ke explicit named exports (consistent dengan Phase 2 Task 12).

## Tasks Overview

| # | Concern | Files affected | Risk |
|---|---------|---------------|------|
| 1 | Consolidate duplicate types | ~15 files | Medium — banyak consumer |
| 2 | Extract psikotes sub-feature inline constants | ~10 files | Low |
| 3 | Extract admin + psikotes inline constants | ~3 files | Low |
| 4 | Move misplaced files | ~10 files | Medium — app/ imports |
| 5 | Clean up empty barrels | ~8 files | Low |
| 6 | Convert remaining `export *` | ~4 files | Low |
| 7 | Fix QuestionFormWizard TS errors | 1-2 files | Low |
| 8 | Resolve TODOs & remove empty placeholders | ~5 files | Low |
| 9 | Final verification | 0 files | — |

## Success Criteria

- `npx tsc --noEmit` → 0 errors
- `npx vitest run` → all tests pass
- No duplicate type definitions across features
- No inline constants in component files
- No files in `src/app/` that aren't page/layout/route files
- No empty barrel files or placeholder dirs
- All barrel exports use explicit named pattern
