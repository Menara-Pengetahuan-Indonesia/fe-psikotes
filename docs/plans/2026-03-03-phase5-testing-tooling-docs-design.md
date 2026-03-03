# Phase 5: Testing, Tooling & Documentation — Design Document

**Date:** 2026-03-03
**Status:** Approved

---

## Problem Statement

Setelah Phase 1-4, codebase clean secara struktur dan lint. Tapi:
- Test coverage ~9% (14/155 components)
- No bundle analyzer untuk visibility bundle size
- README masih boilerplate create-next-app
- 2 `<img>` tags di admin yang harusnya pakai next/image

## Scope

1. **Test coverage (critical path)** — ~20-30 tests baru untuk shared layout, auth, dashboard, admin, psikotes, hooks
2. **Bundle analyzer** — Install @next/bundle-analyzer, setup script
3. **README** — Replace boilerplate dengan real project docs
4. **next/image** — Replace 2 `<img>` tags di admin components

## Tasks Overview

| # | Concern | Effort |
|---|---------|--------|
| 1 | Bundle analyzer setup | Trivial |
| 2 | next/image adoption (2 img tags) | Low |
| 3 | README update | Low |
| 4 | Tests: shared layout (navbar, footer, breadcrumb) | Medium |
| 5 | Tests: auth (forgot-password, auth-guard) | Medium |
| 6 | Tests: dashboard (user-dashboard, admin-dashboard, sidebar-nav) | Medium |
| 7 | Tests: admin (QuestionList, QuestionFormWizard basics) | Medium |
| 8 | Tests: psikotes (diagnostic, category-showcase, ExamInterface) | Medium |
| 9 | Tests: hooks (useExamState) | Medium |
| 10 | Final verification | — |

## Success Criteria

- Test count: 91 → ~120+ tests
- Bundle analyzer working via `npm run analyze`
- README has real project documentation
- 0 `<img>` tags (all replaced with next/image)
- All existing + new tests pass
