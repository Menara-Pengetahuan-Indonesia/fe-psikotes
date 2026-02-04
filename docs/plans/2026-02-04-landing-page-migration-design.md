# Landing Page Migration Design

**Date:** 2026-02-04
**Project:** FE Psikotes - TITIK MULA Migration
**Approach:** Bottom-Up Component-First Migration

---

## Overview

Memindahkan semua halaman (40+ pages) dari folder `psikotest-ipsi` ke struktur project baru dengan:
- Struktur folder yang rapi dan scalable
- Komponen reusable berbasis shadcn/ui
- Testing untuk setiap komponen
- Design monochrome modern minimalis yang konsisten
- TypeScript strict mode
- Code quality standards tinggi

## Requirements

### Scope
- ✅ **Semua 40+ halaman** dipindahkan
- ✅ Rename: `consultation` → `konseling`, `lifeskills` → `training`
- ✅ Branding: Tetap "TITIK MULA - Indonesian Life School"
- ✅ Routing: Ikut struktur lama dengan adjustment naming
- ✅ UI Library: shadcn/ui untuk semua components
- ✅ Design: Monochrome/grayscale modern minimalis (match existing)
- ✅ Testing: Vitest + Testing Library (no Playwright)

### Tech Stack
- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS 4
- shadcn/ui components
- React Hook Form + Zod
- Zustand (state management)
- React Query (data fetching)
- Vitest + Testing Library

---

## Architecture

### Folder Structure

```
fe-psikotes/
├── src/
│   ├── app/                    # Next.js App Router (routing only)
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── platform/
│   │   │   ├── page.tsx
│   │   │   └── psikotes/
│   │   │       ├── mahasiswa/
│   │   │       ├── perusahaan/
│   │   │       ├── kesehatan-mental/
│   │   │       ├── gratis/
│   │   │       └── premium/
│   │   ├── konseling/         # Dulu: consultation
│   │   ├── training/          # Dulu: lifeskills
│   │   └── membership/
│   │
│   ├── features/              # Feature modules (domain logic)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   ├── schemas/
│   │   │   └── constants/
│   │   ├── platform/
│   │   ├── psikotes/
│   │   │   ├── mahasiswa/
│   │   │   ├── perusahaan/
│   │   │   ├── kesehatan-mental/
│   │   │   ├── gratis/
│   │   │   ├── premium/
│   │   │   └── shared/       # Shared antar sub-features
│   │   ├── konseling/
│   │   ├── training/
│   │   └── membership/
│   │
│   ├── shared/                # Shared resources (2+ features)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── feedback/
│   │   │   └── typography/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── lib/
│   │   └── constants/
│   │
│   ├── components/            # shadcn/ui components
│   │   └── ui/
│   │
│   ├── lib/                   # Global utilities
│   ├── store/                 # Global zustand stores
│   └── styles/                # Global styles
```

### Design Principles

1. **Pages = Routing + Composition**
   - No business logic in pages
   - Import from features
   - Only composition & metadata

2. **Features = Domain Logic**
   - Self-contained modules
   - Business logic lives here
   - Feature-specific components, hooks, services

3. **Shared = Truly Shared**
   - Only if used in 2+ features
   - No feature-specific logic
   - Generic & reusable

4. **Bottom-Up Development**
   - Build components first
   - Then compose into pages
   - Ensures reusability & consistency

---

## Component Breakdown

### Shared Components (src/shared/components/)

**Layout Components:**
- `Section` - Wrapper dengan consistent spacing
- `Container` - Max-width container dengan responsive padding
- `PageHeader` - Header dengan badge, title, subtitle

**Card Components (shadcn-based):**
- `ServiceCard` - Card untuk service/product display
  - Variants: default, hover-lift, bordered, grayscale
  - Props: icon, title, description, price, tag, action
- `FeatureCard` - Card untuk feature highlights
  - Props: icon, title, description, variant

**Typography Components:**
- `TypingText` - Animated typing text (existing)
- `GradientText` - Text dengan gradient accents
- `SectionTitle` - Consistent section titles

**Feedback Components:**
- `LoadingSpinner` - Loading states
- `ErrorMessage` - Error display
- `EmptyState` - Empty data state

### Feature-Specific Components

**Platform (src/features/platform/components/):**
- `PlatformHero` - Hero section dengan stats & illustration
- `PhilosophySection` - Philosophy items dengan image
- `CurriculumPyramid` - Monochrome pyramid visualization
- `ServiceGrid` - Grid of services dengan tabs

**Auth (src/features/auth/components/):**
- `LoginForm` - Login form dengan validation
- `RegisterForm` - Register form
- `PasswordInput` - Input dengan show/hide toggle
- `SocialLoginButton` - Google login button

**Psikotes Shared (src/features/psikotes/shared/components/):**
- `TestCard` - Card untuk test listing
- `TestCategoryCard` - Category selection card
- `TestForm` - Reusable form wrapper
- `TestResultCard` - Result display card
- `PaymentCard` - Payment info card

**Psikotes Sub-features:**
- Mahasiswa: MinatBakatForm, CPNSForm, IntelegensiForm, TryOutForm
- Perusahaan: RekrutmenAssessment, KarirPlanningForm, JabatanAssessment
- Kesehatan Mental: MentalHealthForm, KepribadianForm, RelationshipForm
- Gratis/Premium: TestListingCard, ExamInterface, ResultDisplay

**Konseling & Training:**
- Feature-specific components untuk masing-masing halaman

**Membership:**
- BenefitCard, PaymentCard, MembershipPlanCard

---

## Migration Strategy (Bottom-Up)

### Phase 1: Foundation (Week 1)

**Goals:** Setup foundation & shared components

**Tasks:**
1. **shadcn/ui Setup**
   - Install missing components: Dialog, Tabs, Badge, Separator, Skeleton, Dropdown Menu, Select, Checkbox, Radio Group
   - Customize theme untuk monochrome design
   - Setup Tailwind config (grayscale colors, border radius, shadows)

2. **Shared Components**
   - Layout: Section, Container, PageHeader
   - Cards: ServiceCard, FeatureCard (wrapping shadcn Card)
   - Typography: TypingText (existing), GradientText, SectionTitle
   - Feedback: LoadingSpinner, ErrorMessage, EmptyState

3. **Testing**
   - Unit test untuk setiap shared component
   - Target: 80% coverage untuk shared components

**Deliverables:**
- ✅ shadcn components installed & configured
- ✅ All shared components dengan tests
- ✅ Storybook/docs (optional)

---

### Phase 2: Feature Components (Week 2-3)

**Goals:** Build feature-specific components dengan business logic

#### 2.1 Auth Feature (Priority 1)

**Components:**
- LoginForm (email, password, validation, submission)
- RegisterForm (name, email, password, confirm password)
- PasswordInput (show/hide toggle)
- SocialLoginButton (Google OAuth)

**Services:**
- `auth.service.ts` - API calls (login, register, logout, getCurrentUser)

**Store:**
- `auth.store.ts` (Zustand) - User state, isAuthenticated, login/logout actions

**Schemas:**
- `login.schema.ts` (Zod) - Email & password validation
- `register.schema.ts` (Zod) - Registration validation

**Testing:**
- Form validation tests
- Submission flow tests
- Error handling tests
- Store tests

#### 2.2 Platform Feature (Priority 2)

**Components:**
- PlatformHero - Hero dengan illustration, stats, CTA
- PhilosophySection - Philosophy items dengan image/graphic
- CurriculumPyramid - Monochrome pyramid visualization (5 levels)
- ServiceGrid - Grid of services dengan filter tabs

**Constants:**
- `services.constants.ts` - Services data (title, price, tag, desc)
- `philosophy.constants.ts` - Philosophy items
- `curriculum.constants.ts` - Curriculum levels

**Types:**
- `platform.types.ts` - Service, Philosophy, CurriculumLevel types

**Testing:**
- Component rendering tests
- Interaction tests (tabs, hover effects)
- Data display tests

#### 2.3 Psikotes Shared (Priority 3)

**Components:**
- TestCard - Display test info (title, desc, price, tag)
- TestCategoryCard - Category selection (Mahasiswa, Perusahaan, etc)
- TestForm - Reusable form wrapper untuk semua tests
- TestResultCard - Display hasil test
- PaymentCard - Payment information

**Types:**
- `test.types.ts` - Test, TestCategory, TestResult, Answer types

**Schemas:**
- `test.schema.ts` - Common test validation schemas

**Testing:**
- Card variants tests
- Form validation tests
- Data binding tests

---

### Phase 3: Domain Features (Week 4-6)

**Goals:** Implement semua domain-specific features

#### 3.1 Psikotes Mahasiswa

**Pages & Forms:**
1. Minat Bakat Test - Form untuk test minat bakat
2. CPNS Test - Form untuk CPNS preparation test
3. Try-Out Test - Form untuk try-out test
4. Intelegensi Test - Form untuk test intelegensi

**Services:**
- `mahasiswa.service.ts` - API untuk mahasiswa tests

**Store:**
- `test.store.ts` - Test progress, current question, answers, timer

**Testing:**
- Form submission tests
- Progress tracking tests
- Timer functionality tests

#### 3.2 Psikotes Perusahaan

**Pages & Assessments:**
1. Rekrutmen - Assessment untuk rekrutmen karyawan
2. Perencanaan Karir - Form untuk career planning assessment
3. Kenaikan Jabatan - Assessment untuk promosi

**Similar structure:** services, store, testing

#### 3.3 Psikotes Kesehatan Mental

**Pages:**
1. Mental Health Test
2. Kepribadian Test
3. Relationship Test

**Similar structure:** services, store, testing

#### 3.4 Psikotes Gratis & Premium

**Pages:**
- Listing pages (free tests, premium tests)
- Test detail pages with dynamic routing `[slug]`
- Exam interface (`[slug]/exam`)
- Result page (`[slug]/result`)

**Services:**
- `gratis.service.ts` - Free tests API
- `premium.service.ts` - Premium tests API

#### 3.5 Konseling & Training

**Konseling:**
- Konseling landing page
- Service cards
- Booking/contact form (if applicable)

**Training:**
- Training landing page
- Program cards
- Registration/interest form

#### 3.6 Membership

**Pages:**
- Membership benefits page
- Benefit cards
- Pricing plans
- Payment integration

---

### Phase 4: Pages Assembly (Week 7)

**Goals:** Assemble pages using built components

**Tasks:**
1. Create all page files in `src/app/`
2. Import & compose components from features
3. Add metadata & SEO
4. Add loading states
5. Add error boundaries
6. Final integration testing

**Pages to create:**
- Homepage (`/`)
- Login (`/login`)
- Register (`/register`)
- Platform (`/platform`)
- Konseling (`/konseling`)
- Training (`/training`)
- All Psikotes pages (40+ routes)
- Membership pages

**Testing:**
- Page rendering tests
- Navigation tests
- SEO/metadata tests

---

## Data Flow & State Management

### State Layers

**1. Local State (useState)**
- UI-only state (modals, dropdowns, tabs)
- Form inputs (controlled by react-hook-form)
- Component-specific toggles

**2. Feature Store (Zustand)**
- Test progress (current question, answers, timer)
- Multi-step form state
- Feature-specific UI state

**3. Global Store (Zustand)**
- Auth state (user, isAuthenticated)
- Global UI state (theme, notifications)

**4. Server State (React Query)**
- API data fetching & caching
- Mutations (create, update, delete)
- Background refetching

### API Integration Pattern

```tsx
// 1. Service - Pure API calls
export const testService = {
  getTest: (id: string) => api.get(`/tests/${id}`),
  submitTest: (data) => api.post('/tests/submit', data)
}

// 2. React Query Hook - Data fetching & caching
export function useTest(id: string) {
  return useQuery({
    queryKey: ['test', id],
    queryFn: () => testService.getTest(id)
  })
}

// 3. Component - UI logic
export function TestPage({ testId }) {
  const { data: test, isLoading } = useTest(testId)
  const { answers, setAnswer } = useTestStore()
  // Render UI
}
```

---

## Testing Strategy

### Coverage Requirements
- **Minimum 70%** overall coverage
- **80%** for shared components
- **60%** for feature components
- **90%** for utilities & helpers

### Test Types
1. **Unit Tests** - All shared components, hooks, utils
2. **Integration Tests** - Feature components dengan business logic
3. **No E2E** - Playwright disabled

### Test Co-location
Tests live next to the code:
```
src/features/auth/
├── components/
│   ├── login-form.tsx
│   └── login-form.test.tsx
```

---

## Design System

### Typography Scale
- H1: `text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter`
- H2: `text-4xl md:text-5xl font-black tracking-tight`
- H3: `text-2xl md:text-3xl font-bold tracking-tight`
- Badge: `text-[10px] font-bold uppercase tracking-[0.2em]`

### Spacing System
- Section: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-6`
- Grid gap: `gap-6 md:gap-8`
- Card padding: `p-6 md:p-8`

### Border Radius
- xl: `1rem` (16px)
- 2xl: `1.5rem` (24px)
- 3xl: `2rem` (32px)
- 4xl: `3rem` (48px)

### Shadows
- Soft: `0 2px 8px rgba(0, 0, 0, 0.04)`
- Soft-lg: `0 4px 16px rgba(0, 0, 0, 0.06)`
- Soft-xl: `0 8px 24px rgba(0, 0, 0, 0.08)`

### Color Palette
**Note:** Detailed color system (semantic naming: primary, secondary, accent, etc.) akan di-setup di Phase 1. Design menggunakan monochrome grayscale sebagai base.

---

## Success Criteria

### Functional
- ✅ All 40+ pages migrated & functional
- ✅ Routing works correctly (consultation → konseling, lifeskills → training)
- ✅ Forms validation works (Zod schemas)
- ✅ All tests pass
- ✅ Build succeeds without errors

### Quality
- ✅ Coverage ≥ 70%
- ✅ TypeScript strict mode compliant (no `any`)
- ✅ ESLint passes
- ✅ Code follows CODING_GUIDELINES.md
- ✅ Components < 250 lines
- ✅ Proper component decomposition

### Design
- ✅ Monochrome design consistent across all pages
- ✅ Responsive on mobile, tablet, desktop
- ✅ Accessibility (keyboard navigation, ARIA labels)
- ✅ Loading states for async operations
- ✅ Error states with proper messages

### Performance
- ✅ Main bundle < 200KB (gzipped)
- ✅ LCP < 2.5s
- ✅ No unnecessary re-renders
- ✅ Proper code splitting

---

## Risks & Mitigations

### Risk 1: Scope Creep
**Mitigation:** Strict adherence to design document. No new features during migration.

### Risk 2: Design Inconsistency
**Mitigation:** Shared components + design tokens. Regular visual review.

### Risk 3: Testing Coverage Drop
**Mitigation:** Pre-commit hooks block commits if coverage drops below threshold.

### Risk 4: Breaking Changes
**Mitigation:** Thorough testing of each phase before moving to next.

---

## Timeline Summary

- **Week 1:** Foundation (shadcn setup, shared components)
- **Week 2-3:** Feature components (Auth, Platform, Psikotes Shared)
- **Week 4-6:** Domain features (All psikotes sub-features, konseling, training, membership)
- **Week 7:** Pages assembly & final integration

**Total:** ~7 weeks

---

## Next Steps

1. ✅ Design approved
2. Setup git worktree for isolated development
3. Write detailed implementation plan (step-by-step)
4. Start Phase 1: Foundation

---

**Approved by:** User
**Date:** 2026-02-04
