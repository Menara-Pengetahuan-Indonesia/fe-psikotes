# Phase 2: Refactoring — Constants Extraction, Barrel Exports, Type Cleanup

## Goal

Menyelesaikan refactoring yang dimulai di Phase 1. Phase 1 fokus pada admin question type constants dan pemindahan file level surface. Phase 2 menangani:
1. File constants yang masih di `components/` folder
2. Inline constants di TSX files yang perlu di-extract
3. Standardisasi barrel exports
4. Duplicate type cleanup
5. Fix failing tests

## Architecture Decisions

- **Approach:** Bottom-up, 1 file/concern per task, 1 commit per task
- **Constants pattern:** `src/features/<feature>/constants/<topic>.constants.ts`
- **Barrel export pattern:** Explicit named exports (bukan `export *` atau `export {}`)
- **Type naming:** Disambiguate duplicate names, keep domain context

## Scope

### Group A: Move Constants Files (3 tasks)
Move `.constants.ts` files from `components/` to proper `constants/` folder.

| Source | Target | Consumers |
|--------|--------|-----------|
| `homepage/components/hero-constants.ts` | `homepage/constants/hero.constants.ts` | homepage-hero.tsx, destination-card.tsx |
| `psikotes/components/category-showcase-constants.ts` | `psikotes/constants/category-showcase.constants.ts` | category-showcase.tsx |
| `psikotes/gratis/components/exam-constants.ts` | `psikotes/gratis/constants/exam.constants.ts` | exam-interface.tsx |

Note: `psikotes/components/curriculum-levels.ts` sudah punya versi di `psikotes/constants/philosophy.constants.ts` (CURRICULUM_LEVELS). File di components/ adalah versi detail dengan icons/colors — akan di-move juga.

### Group B: Extract Inline Constants (6 tasks)
Extract data arrays/objects dari TSX files ke constants folder per feature.

| Feature | Constants | Source Files |
|---------|-----------|-------------|
| **membership** | ECOSYSTEM_ITEMS, LITE_BENEFITS, PRO_BENEFITS, GATHERING_POINTS, MEMBERSHIP_FAQS | 4 TSX files |
| **general** | VALUES, SERVICES_OVERVIEW, STATS, CONTACT_INFO | 4 TSX files |
| **psikotes** | PILLARS, STEPS, CATEGORIES | 3 TSX files |
| **dashboard** | CATEGORY_CONFIG, CATEGORY_STYLE, FILTER_TABS, ROLE_LABELS | 3 TSX files |
| **konseling** | HERO_BENEFITS, TAB_FILTERS | 2 TSX files |
| **pelatihan** | HERO_BENEFITS, TAB_FILTERS | 2 TSX files |

### Group C: Standardize Barrel Exports (1 task)
Unified pattern: explicit named exports. No more `export {}`, `export *`.

### Group D: Disambiguate Duplicate Types (1 task)
- `Question` in `psikotes/constants/questions.constants.ts` → rename to `MockQuestion`
- `Question` in `psikotes/types/exam.types.ts` → rename to `ExamQuestion`
- `Question` in `admin/types/index.ts` → keep as `Question` (domain model)

### Group E: Fix Failing Tests (1 task)
Update `psikotes-hero.test.tsx` — tests check for content (benefits, price, CTA) that no longer exists after hero redesign.

### Group F: Final Verification (1 task)
`tsc --noEmit`, `eslint`, `vitest run`, build check.

## Total: ~14 tasks
