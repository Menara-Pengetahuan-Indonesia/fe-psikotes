# Phases 3–4: Domain Features & Pages Assembly

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Complete all remaining feature components and assemble every page from the original `psikotest-ipsi/` source into the new structure.

**Architecture:** Bottom-up continuation. Each task produces one or more feature components + their constants. Final task assembles all `src/app/` page files by composing the feature components. Tests are deferred to a dedicated final task.

**Tech Stack:** Next.js 16, TypeScript strict, Tailwind CSS 4, shadcn/ui, lucide-react icons. All data constants are extracted into typed arrays — no inline data in components.

**Testing policy:** No test files per task. One final task (Task 38) adds critical-path tests before merge.

**Source reference:** All original page content lives in `/home/deska/Desktop/fe-psikotes/psikotest-ipsi/app/`. Each task notes which source file(s) to reference.

---

## Task 25: Platform Components

**Source:** `psikotest-ipsi/app/platform/page.tsx`

**Context:** The platform constants (SERVICES, PHILOSOPHY_ITEMS, CURRICULUM_LEVELS) already exist at `src/features/platform/constants/`. These 4 components consume that data.

**Files to create:**
- `src/features/platform/components/platform-hero.tsx`
- `src/features/platform/components/philosophy-section.tsx`
- `src/features/platform/components/curriculum-pyramid.tsx`
- `src/features/platform/components/service-grid.tsx`
- `src/features/platform/components/index.ts`

### platform-hero.tsx
Dark-theme hero section.
```tsx
'use client'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const HERO_BENEFITS = [
  { label: 'Analisis Mendalam', desc: 'Tes berbasis riset psikologi profesional' },
  { label: 'Rekomendasi Personal', desc: 'Langkah praktis sesuai hasil tesmu' },
  { label: 'Akses Mudah', desc: 'Online, kapan saja dan di mana saja' },
  { label: 'Laporan Detail', desc: 'Insight lengkap yang mudah dipahami' },
]

export function PlatformHero() {
  return (
    <section className="bg-slate-900 text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
              Kenali Dirimu,<br />
              <span className="text-slate-400">Temukan Potensi Terbaikmu</span>
            </h1>
            <ul className="space-y-4">
              {HERO_BENEFITS.map((b) => (
                <li key={b.label} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{b.label}</p>
                    <p className="text-slate-400 text-sm">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <p className="text-slate-400 text-sm">Mulai Dari</p>
              <p className="text-3xl font-black">Rp25.000</p>
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/platform/psikotes/premium">Lihat Psikotes Premium</Link>
            </Button>
          </div>
          {/* Illustration placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-80 h-80 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <p className="text-slate-600 text-sm">Illustration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### philosophy-section.tsx
```tsx
import { PHILOSOPHY_ITEMS } from '../constants'

export function PhilosophySection() {
  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              Achieving and Maintaining<br />The Good Life
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {PHILOSOPHY_ITEMS.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Image placeholder */}
          <div className="hidden lg:block">
            <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### curriculum-pyramid.tsx
```tsx
import { CURRICULUM_LEVELS } from '../constants'

export function CurriculumPyramid() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Kurikulum Pertumbuhan</h2>
          <p className="text-slate-500">Lima tingkatan pengembangan diri dari fondasi hingga dampak sosial</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {CURRICULUM_LEVELS.map((level) => (
            <div key={level.level} className={`${level.width} ${level.background} rounded-xl px-6 py-3 flex items-center justify-between transition-all hover:scale-105`}>
              <span className="text-xs font-bold opacity-70">Level {level.level}</span>
              <span className="font-bold">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### service-grid.tsx
```tsx
'use client'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ServiceCard } from '@/shared/components'
import { SERVICES } from '../constants'

const TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  psikotes: ['Terpopuler', 'Karir'],
  konseling: ['Klinis', 'Personal'],
}

export function ServiceGrid() {
  const filtered = (tab: string) =>
    TAB_FILTERS[tab]?.length === 0 ? SERVICES : SERVICES.filter((s) => TAB_FILTERS[tab]?.includes(s.tag))

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Layanan Kami</h2>
          <p className="text-slate-500">Pilih layanan yang sesuai dengan kebutuhanmu</p>
        </div>
        <Tabs defaultValue="semua" className="w-full">
          <TabsList className="mx-auto flex justify-center mb-8">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="psikotes">Psikotes</TabsTrigger>
            <TabsTrigger value="konseling">Konseling</TabsTrigger>
          </TabsList>
          {Object.keys(TAB_FILTERS).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered(tab).map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    tag={service.tag}
                    icon={service.icon}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
```

### index.ts
```ts
export { PlatformHero } from './platform-hero'
export { PhilosophySection } from './philosophy-section'
export { CurriculumPyramid } from './curriculum-pyramid'
export { ServiceGrid } from './service-grid'
```

**Commit:**
```bash
git add src/features/platform/components/
git commit -m "feat(platform): add PlatformHero, PhilosophySection, CurriculumPyramid, ServiceGrid

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 26: Platform Layout (Navbar, Footer, PromoBanner)

**Source:** `psikotest-ipsi/app/platform/layout.tsx`

**Files to create:**
- `src/features/platform/components/promo-banner.tsx`
- `src/features/platform/components/platform-navbar.tsx`
- `src/features/platform/components/platform-footer.tsx`

Update `src/features/platform/components/index.ts` to export these.

### promo-banner.tsx
```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function PromoBanner() {
  const [time, setTime] = useState({ h: 8, m: 40, s: 48 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s -= 1
        if (s < 0) { s = 59; m -= 1 }
        if (m < 0) { m = 59; h -= 1 }
        if (h < 0) return prev // expired
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="bg-yellow-400 text-slate-900 text-center py-2 px-4 text-sm font-semibold">
      <span>Diskon s/d 50% Psikotes Online Premium — </span>
      <span className="font-black">Berakhir dalam {pad(time.h)}:{pad(time.m)}:{pad(time.s)}</span>
      <span> — </span>
      <Link href="/platform/psikotes/premium" className="underline hover:no-underline ml-1">Klaim Sekarang</Link>
    </div>
  )
}
```

### platform-navbar.tsx
Sticky scroll-aware nav with dropdown menus. Mobile hamburger menu.
```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  {
    label: 'Psikotes',
    children: [
      { label: 'Perusahaan', href: '/platform/psikotes/perusahaan' },
      { label: 'Mahasiswa & Pelajar', href: '/platform/psikotes/mahasiswa' },
      { label: 'Kesehatan Mental', href: '/platform/psikotes/kesehatan-mental' },
      { label: 'Premium', href: '/platform/psikotes/premium' },
      { label: 'Gratis', href: '/platform/psikotes/gratis' },
    ],
  },
  {
    label: 'Training',
    children: [
      { label: 'Program Training', href: '/training' },
      { label: 'Jadwal Training', href: '/training' },
      { label: 'Mentoring Eksklusif', href: '/training' },
    ],
  },
  {
    label: 'Konseling',
    children: [
      { label: 'Konseling Individu', href: '/konseling' },
      { label: 'Konseling Pasangan', href: '/konseling' },
    ],
  },
  { label: 'Blog', href: '/blog', children: [] },
]

export function PlatformNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black">T</span>
            <span className="font-black text-slate-900 text-lg tracking-tighter">TITIK MULA<span className="text-indigo-600">.</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                  {item.label}
                  {item.children.length > 0 && <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                </button>
                {item.children.length > 0 && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild><Link href="/login">Masuk</Link></Button>
            <Button asChild><Link href="/register">Join Member</Link></Button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button className="w-full text-left font-semibold text-slate-800" onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}>
                {item.label}
              </button>
              {activeDropdown === item.label && item.children.map((child) => (
                <Link key={child.label} href={child.href} className="block pl-4 py-1 text-sm text-slate-500">{child.label}</Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
            <Button variant="outline" asChild><Link href="/login">Masuk</Link></Button>
            <Button asChild><Link href="/register">Join Member</Link></Button>
          </div>
        </div>
      )}
    </nav>
  )
}
```

### platform-footer.tsx
```tsx
import Link from 'next/link'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

const FOOTER_COLS = [
  {
    heading: 'Program',
    links: [
      { label: 'Psikotes Premium', href: '/platform/psikotes/premium' },
      { label: 'Konseling', href: '/konseling' },
      { label: 'Training', href: '/training' },
      { label: 'Membership', href: '/platform/membership/benefit' },
    ],
  },
  {
    heading: 'Layanan',
    links: [
      { label: 'Psikotes Gratis', href: '/platform/psikotes/gratis' },
      { label: 'Mentoring', href: '/training' },
      { label: 'Webinar', href: '/training' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Tentang',
    links: [
      { label: 'Tentang Kami', href: '/' },
      { label: 'Kebijakan Privasi', href: '/' },
      { label: 'Syarat & Ketentuan', href: '/' },
      { label: 'Hubungi Kami', href: '/' },
    ],
  },
]

export function PlatformFooter() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tighter">TITIK MULA<span className="text-indigo-400">.</span></h3>
            <p className="text-slate-400 text-sm leading-relaxed">Platform pengembangan diri terpadu berbasis riset psikologi profesional.</p>
          </div>
          {/* Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 TITIK MULA. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-slate-500 hover:text-white"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-slate-500 hover:text-white"><Linkedin className="h-5 w-5" /></Link>
            <Link href="#" className="text-slate-500 hover:text-white"><Youtube className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Commit:**
```bash
git add src/features/platform/components/
git commit -m "feat(platform): add PromoBanner, PlatformNavbar, PlatformFooter

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 27: Psikotes Types & Shared Components

**Context:** These types and components are reused across all psikotes sub-features (mahasiswa, perusahaan, kesehatan-mental, gratis, premium).

**Files to create:**
- `src/features/psikotes/types/psikotes.types.ts`
- `src/features/psikotes/types/index.ts`
- `src/features/psikotes/constants/tests.constants.ts`
- `src/features/psikotes/constants/index.ts`
- `src/features/psikotes/components/test-category-card.tsx`
- `src/features/psikotes/components/test-listing-card.tsx`
- `src/features/psikotes/components/index.ts`

### psikotes.types.ts
```typescript
import type { LucideIcon } from 'lucide-react'

export interface PsikotesTest {
  id: string
  slug: string
  title: string
  tag: string
  icon: LucideIcon
  description: string
  users: string
  duration: string
  price: string | null  // null = gratis
  category: string      // 'mahasiswa' | 'perusahaan' | 'kesehatan-mental' | 'gratis' | 'premium'
  subCategory?: string  // e.g. 'Kepribadian' | 'Karir' | 'Hubungan'
}

export interface TestFeature {
  label: string
}

export interface CorporateTest extends PsikotesTest {
  features: TestFeature[]
}
```

### tests.constants.ts
All test data arrays extracted from the source pages. Include:
- `MAHASISWA_TESTS` (4 items)
- `PERUSAHAAN_TESTS` (3 items — uses CorporateTest with features)
- `KESEHATAN_MENTAL_TESTS` (3 items)
- `GRATIS_TESTS` (8 items)
- `PREMIUM_TESTS` (8 items)

Use icons from lucide-react: `Compass`, `Brain`, `BookOpen`, `Building2`, `UserPlus`, `TrendingUp`, `Map`, `Smile`, `Activity`, `Heart`, `Users`, `Briefcase`, `Star`, `Gem`, `Zap`.

### test-category-card.tsx
Card used on mahasiswa/perusahaan/kesehatan-mental overview pages. Shows: number badge, icon, title, description, stats (users, duration, price), CTA link.

### test-listing-card.tsx
Card used on gratis/premium listing pages. Shows: icon, category tag, title, description, users, duration, price (if premium), CTA button.

**Commit:**
```bash
git add src/features/psikotes/
git commit -m "feat(psikotes): add shared types, constants, and reusable test cards

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 28: Psikotes Mahasiswa Components

**Source:** `psikotest-ipsi/app/platform/psikotes/mahasiswa/page.tsx` and `minat-bakat/page.tsx`

**Files to create:**
- `src/features/psikotes/mahasiswa/components/mahasiswa-overview.tsx` — header + grid of TestCategoryCards
- `src/features/psikotes/mahasiswa/components/test-detail.tsx` — reusable detail page layout (dark hero, aspects, pricing card, FAQ)
- `src/features/psikotes/mahasiswa/components/index.ts`

The `test-detail.tsx` component is designed to be reusable for all 4 mahasiswa tests. It accepts props: `title`, `badge`, `description`, `duration`, `participants`, `aspects` (array of sections), `price`, `originalPrice`.

**Commit:**
```bash
git add src/features/psikotes/mahasiswa/
git commit -m "feat(psikotes/mahasiswa): add overview and test detail components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 29: Psikotes Perusahaan Components

**Source:** `psikotest-ipsi/app/platform/psikotes/perusahaan/page.tsx`

**Files to create:**
- `src/features/psikotes/perusahaan/components/perusahaan-overview.tsx` — header + grid using TestCategoryCards with feature tags
- `src/features/psikotes/perusahaan/components/index.ts`

Reuses `TestCategoryCard` from psikotes shared. Corporate cards additionally show a "Features" list below stats.

**Commit:**
```bash
git add src/features/psikotes/perusahaan/
git commit -m "feat(psikotes/perusahaan): add corporate overview component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 30: Psikotes Kesehatan Mental Components

**Source:** `psikotest-ipsi/app/platform/psikotes/kesehatan-mental/page.tsx`

**Files to create:**
- `src/features/psikotes/kesehatan-mental/components/mental-health-overview.tsx`
- `src/features/psikotes/kesehatan-mental/components/index.ts`

Same pattern as mahasiswa/perusahaan overview, using `KESEHATAN_MENTAL_TESTS` constants.

**Commit:**
```bash
git add src/features/psikotes/kesehatan-mental/
git commit -m "feat(psikotes/kesehatan-mental): add mental health overview component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 31: Psikotes Gratis Components

**Source:** `psikotest-ipsi/app/platform/psikotes/gratis/page.tsx`, `[slug]/page.tsx`, `[slug]/exam/page.tsx`, `[slug]/result/page.tsx`

**Files to create:**
- `src/features/psikotes/gratis/components/gratis-listing.tsx` — search bar, filter tabs, test grid with "Load More"
- `src/features/psikotes/gratis/components/test-detail-page.tsx` — banner, instructions, disclaimer, CTAs
- `src/features/psikotes/gratis/components/exam-interface.tsx` — progress bar, question display, answer selection, nav buttons, submit modal
- `src/features/psikotes/gratis/components/result-display.tsx` — result card, premium upsell, community section, suggested tests
- `src/features/psikotes/gratis/components/index.ts`

Note: `exam-interface.tsx` uses mock question data (3 questions) as a placeholder. The disclaimer section (crisis helpline numbers 119/112) must appear on detail and result pages.

**Commit:**
```bash
git add src/features/psikotes/gratis/
git commit -m "feat(psikotes/gratis): add listing, detail, exam, and result components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 32: Psikotes Premium Components

**Source:** `psikotest-ipsi/app/platform/psikotes/premium/page.tsx`

**Files to create:**
- `src/features/psikotes/premium/components/premium-listing.tsx` — dark header, search, filter tabs, test grid
- `src/features/psikotes/premium/components/guarantee-section.tsx` — "Jaminan Kepuasan 100%" block
- `src/features/psikotes/premium/components/testimonials.tsx` — 3-card testimonial grid
- `src/features/psikotes/premium/components/faq-accordion.tsx` — reusable FAQ with 4 questions (uses shadcn Accordion or native details)
- `src/features/psikotes/premium/components/index.ts`

**Commit:**
```bash
git add src/features/psikotes/premium/
git commit -m "feat(psikotes/premium): add premium listing, guarantee, testimonials, FAQ

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 33: Konseling & Training Components

**Source:** `psikotest-ipsi/app/consultation/page.tsx`, `psikotest-ipsi/app/lifeskills/page.tsx`

Both source pages are currently "under development" stubs. Build proper landing pages with placeholder content following the monochrome design.

**Files to create:**
- `src/features/konseling/components/konseling-hero.tsx` — hero with MessageSquare icon, title, subtitle, CTA
- `src/features/konseling/components/konseling-services.tsx` — grid of service cards (Individu, Pasangan, etc.)
- `src/features/konseling/components/index.ts`
- `src/features/training/components/training-hero.tsx` — hero with GraduationCap icon
- `src/features/training/components/training-programs.tsx` — grid of program cards (Webinar, Kelas, Mentoring)
- `src/features/training/components/index.ts`

**Commit:**
```bash
git add src/features/konseling/ src/features/training/
git commit -m "feat: add Konseling and Training landing page components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 34: Membership Components

**Source:** `psikotest-ipsi/app/platform/membership/benefit/page.tsx`

**Files to create:**
- `src/features/membership/components/membership-hero.tsx` — hero with community card mockup
- `src/features/membership/components/ecosystem-section.tsx` — "Bukan Sekadar Komunitas" with 6 benefit cards
- `src/features/membership/components/gathering-section.tsx` — video placeholder + content
- `src/features/membership/components/pricing-section.tsx` — Lite vs Pro cards (Pro is featured/"Most Popular")
- `src/features/membership/components/membership-faq.tsx` — 4 FAQ items
- `src/features/membership/components/index.ts`

**Commit:**
```bash
git add src/features/membership/
git commit -m "feat(membership): add hero, ecosystem, gathering, pricing, FAQ components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 35: Payment Components

**Source:** `psikotest-ipsi/app/platform/pembayaran/page.tsx`, `status/page.tsx`

**Files to create:**
- `src/features/payment/types/payment.types.ts`
- `src/features/payment/constants/payment.constants.ts` — payment categories, methods, product prices
- `src/features/payment/components/payment-method-selector.tsx` — accordion of 4 categories with selectable methods
- `src/features/payment/components/order-summary.tsx` — sticky order card with promo code input
- `src/features/payment/components/payment-status.tsx` — timer countdown, QR/VA display, instructions, success modal
- `src/features/payment/components/index.ts`

**Commit:**
```bash
git add src/features/payment/
git commit -m "feat(payment): add payment method selector, order summary, payment status

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 36: Homepage Components

**Source:** `psikotest-ipsi/app/page.tsx`

**Files to create:**
- `src/features/homepage/components/homepage-hero.tsx` — "Mau kemana?" section with 3 destination cards
- `src/features/homepage/components/index.ts`

The 3 cards:
1. TITIK MULA — links to `/platform`
2. LIFE CONSULTATION — links to `/konseling`
3. LIFESKILLS — links to `/training`

Each card has: title, description, icon, CTA link.

**Commit:**
```bash
git add src/features/homepage/
git commit -m "feat(homepage): add homepage hero with destination cards

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 37: Pages Assembly

**Context:** All feature components are built. Wire them into Next.js App Router page files. Pages are routing + composition only — no business logic.

**Files to create/modify:**

```
src/app/
├── page.tsx                                    — Homepage
├── layout.tsx                                  — Root layout (already exists, verify)
├── login/page.tsx                              — LoginForm
├── register/page.tsx                           — RegisterForm
├── platform/
│   ├── layout.tsx                              — PromoBanner + PlatformNavbar + PlatformFooter wrapper
│   ├── page.tsx                                — PlatformHero + PhilosophySection + CurriculumPyramid + ServiceGrid
│   ├── pembayaran/
│   │   ├── page.tsx                            — PaymentMethodSelector + OrderSummary
│   │   └── status/page.tsx                     — PaymentStatus
│   ├── membership/
│   │   └── benefit/page.tsx                    — MembershipHero + EcosystemSection + GatheringSection + PricingSection + MembershipFaq
│   └── psikotes/
│       ├── mahasiswa/
│       │   ├── page.tsx                        — MahasiswaOverview
│       │   ├── minat-bakat/page.tsx            — TestDetail (minat bakat props)
│       │   ├── minat-bakat/form/page.tsx       — ExamInterface (placeholder)
│       │   ├── intelegensi/page.tsx            — TestDetail (intelegensi props)
│       │   ├── intelegensi/form/page.tsx       — ExamInterface
│       │   ├── try-out/page.tsx                — TestDetail (try-out props)
│       │   ├── try-out/form/page.tsx           — ExamInterface
│       │   ├── cpns/page.tsx                   — TestDetail (cpns props)
│       │   └── cpns/form/page.tsx              — ExamInterface
│       ├── perusahaan/
│       │   ├── page.tsx                        — PerusahaanOverview
│       │   ├── rekrutmen/page.tsx              — TestDetail (rekrutmen props)
│       │   ├── rekrutmen/asesmen/page.tsx      — ExamInterface
│       │   ├── kenaikan-jabatan/page.tsx       — TestDetail
│       │   ├── kenaikan-jabatan/asesmen/page.tsx — ExamInterface
│       │   ├── perencanaan-karir/page.tsx      — TestDetail
│       │   └── perencanaan-karir/asesmen/page.tsx — ExamInterface
│       ├── kesehatan-mental/
│       │   ├── page.tsx                        — MentalHealthOverview
│       │   ├── kepribadian/page.tsx            — TestDetail
│       │   ├── kepribadian/form/page.tsx       — ExamInterface
│       │   ├── mental-health/page.tsx          — TestDetail
│       │   ├── mental-health/form/page.tsx     — ExamInterface
│       │   ├── relationship/page.tsx           — TestDetail
│       │   └── relationship/form/page.tsx      — ExamInterface
│       ├── gratis/
│       │   ├── page.tsx                        — GratisListing
│       │   └── [slug]/
│       │       ├── page.tsx                    — TestDetailPage
│       │       ├── exam/page.tsx               — ExamInterface
│       │       └── result/page.tsx             — ResultDisplay
│       └── premium/
│           ├── page.tsx                        — PremiumListing + GuaranteeSection + Testimonials + FAQ
│           └── [slug]/page.tsx                 — TestDetailPage (premium variant)
├── konseling/page.tsx                          — KonselingHero + KonselingServices
└── training/page.tsx                           — TrainingHero + TrainingPrograms
```

Each page file follows this pattern:
```tsx
import { ComponentA } from '@/features/feature/components'

export default function PageName() {
  return (
    <main>
      <ComponentA />
    </main>
  )
}
```

Add `export const metadata` for page title/description on each page.

The `platform/layout.tsx` wraps children with PromoBanner, PlatformNavbar at top and PlatformFooter at bottom.

**Commit:**
```bash
git add src/app/
git commit -m "feat: assemble all pages — wire feature components into App Router

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 38: Final Tests & Cleanup

**Context:** Tests were deferred. Now add critical-path tests and run full verification.

**Tests to write:**
1. `src/tests/component/platform-hero.test.tsx` — renders benefits, pricing text, CTA link
2. `src/tests/component/service-grid.test.tsx` — renders all services, tab filtering works
3. `src/tests/component/test-category-card.test.tsx` — renders all props correctly
4. `src/tests/component/exam-interface.test.tsx` — question navigation, answer selection, submit modal
5. `src/tests/component/pricing-section.test.tsx` — renders both plans, Pro is featured

**Final verification steps:**
```bash
npm test                    # all tests pass
npm run build               # build succeeds
npm run lint                # no errors in src/
npx tsc --noEmit            # no type errors
```

**Commit:**
```bash
git add src/tests/
git commit -m "test: add critical-path tests for Phase 3-4 components

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Success Criteria

- All 40+ pages assembled and buildable
- `npm run build` succeeds
- `npm test` passes (all tests)
- Zero TypeScript errors
- Zero lint errors in `src/`
- Routing: `consultation` → `konseling`, `lifeskills` → `training`
- Branding: "TITIK MULA" consistent
- All data extracted into typed constants
