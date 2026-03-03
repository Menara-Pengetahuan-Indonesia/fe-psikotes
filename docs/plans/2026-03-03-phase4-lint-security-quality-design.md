# Phase 4: Lint, Security & Code Quality — Design Document

**Date:** 2026-03-03
**Status:** Approved
**Approach:** Per-concern, quick wins first, then structural changes

---

## Problem Statement

Setelah Phase 1-3 (constants organization, extraction, domain cleanup), codebase sudah clean secara struktur. Tapi masih ada:

1. 26 ESLint errors + 39 warnings
2. 5 security vulnerabilities (next needs patch)
3. Broken lint script di package.json
4. Oversized files (QuestionFormWizard 734 lines, admin hooks 584 lines, dashboard page 343 lines)
5. Duplicate components (2x ExamInterface, 2x benefit-card)
6. 57 feature components pakai React hooks tanpa `'use client'` directive

## Architecture Decisions

- **Lint fixes** → autofix where possible, manual fix for unescaped entities and any types
- **Security** → patch next to 16.1.6, npm audit fix for rollup
- **File splitting** → extract sub-components, keep same public API
- **Duplicate consolidation** → keep the more complete version, update consumers
- **'use client'** → add to all components using useState/useEffect/useCallback/useRef

## Tasks Overview

| # | Concern | Effort | Risk |
|---|---------|--------|------|
| 1 | Fix lint script + remove backup file | Trivial | None |
| 2 | Patch security vulnerabilities | Low | Low — patch version |
| 3 | Fix unescaped entities (16 errors) | Low | None |
| 4 | Fix any types (6 errors) | Low | Low |
| 5 | Fix unused imports + hook deps | Low | Low |
| 6 | Split admin hooks barrel (584 lines) | Medium | Medium — many consumers |
| 7 | Split QuestionFormWizard (734 lines) | Medium | Medium — complex form |
| 8 | Split dashboard page (343 lines) | Low | Low |
| 9 | Consolidate duplicate components | Medium | Medium — different implementations |
| 10 | Add missing 'use client' directives | Low | None |
| 11 | Final verification | — | — |

## Success Criteria

- `npx eslint src/` → 0 errors, 0 warnings
- `npm audit` → 0 vulnerabilities
- `npx tsc --noEmit` → 0 errors
- `npx vitest run` → all tests pass
- No file >400 lines (except pure data constants files)
- No duplicate component implementations
- All hook-using components have 'use client'
