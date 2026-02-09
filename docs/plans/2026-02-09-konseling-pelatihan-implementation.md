# Konseling & Pelatihan Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign konseling and pelatihan landing pages to match psikotes quality — 4 sections each (Hero, Services/Programs Grid, Process, FAQ), data extracted to constants/types.

**Architecture:** Each feature gets types, constants, and 4 components. Hero follows psikotes-hero pattern (2-col grid, benefits, 3D illustration). Grid re-uses ServiceCard from psikotes with tab filter. Process is a new 3-step timeline. FAQ uses custom accordion matching psikotes-faq pattern.

**Tech Stack:** Next.js App Router, Tailwind CSS, shadcn/ui (Tabs), Lucide icons, cn() utility.

**Design doc:** `docs/plans/2026-02-09-konseling-pelatihan-landing-page-design.md`

---

### Task 1: Create types for both features

**Files:**
- Modify: `src/features/konseling/types/index.ts`
- Modify: `src/features/pelatihan/types/index.ts`

**Step 1: Write konseling types**

```ts
// src/features/konseling/types/index.ts
import type { LucideIcon } from 'lucide-react'

export interface KonselingService {
  title: string
  price: string
  tag: string
  description: string
  icon: LucideIcon
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export interface FaqItem {
  q: string
  a: string
}
```

**Step 2: Write pelatihan types**

```ts
// src/features/pelatihan/types/index.ts
import type { LucideIcon } from 'lucide-react'

export interface PelatihanProgram {
  title: string
  price: string
  tag: string
  description: string
  icon: LucideIcon
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export interface FaqItem {
  q: string
  a: string
}
```

**Step 3: Verify** — Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 4: Commit** — `git commit -m "feat(konseling,pelatihan): add types for services, process, FAQ"`

---

### Task 2: Create constants for konseling

**Files:**
- Create: `src/features/konseling/constants/services.constants.ts`
- Create: `src/features/konseling/constants/process.constants.ts`
- Create: `src/features/konseling/constants/faq.constants.ts`
- Create: `src/features/konseling/constants/index.ts`

**Step 1: Write services constants**

```ts
// src/features/konseling/constants/services.constants.ts
import { User, Users, HeartHandshake } from 'lucide-react'
import type { KonselingService } from '../types'

export const KONSELING_SERVICES: KonselingService[] = [
  {
    title: 'Konseling Individu',
    price: 'Rp250.000',
    tag: 'Individu',
    description: 'Sesi konseling pribadi bersama psikolog klinis untuk mengatasi masalah emosional, stres, dan pengembangan diri.',
    icon: User,
  },
  {
    title: 'Konseling Pasangan',
    price: 'Rp350.000',
    tag: 'Pasangan',
    description: 'Perkuat hubungan melalui sesi profesional bersama pasangan untuk komunikasi dan pemahaman yang lebih baik.',
    icon: HeartHandshake,
  },
  {
    title: 'Konseling Kelompok',
    price: 'Rp150.000',
    tag: 'Kelompok',
    description: 'Terapi kelompok terpandu untuk berbagi pengalaman dan belajar dari sesama peserta dengan isu serupa.',
    icon: Users,
  },
]
```

**Step 2: Write process constants**

```ts
// src/features/konseling/constants/process.constants.ts
import { ClipboardList, CalendarCheck, MessageCircle } from 'lucide-react'
import type { ProcessStep } from '../types'

export const KONSELING_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Pilih Layanan',
    description: 'Tentukan jenis konseling yang sesuai dengan kebutuhanmu: individu, pasangan, atau kelompok.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Jadwalkan Sesi',
    description: 'Pilih jadwal yang nyaman dan lakukan pembayaran secara online dengan mudah.',
    icon: CalendarCheck,
  },
  {
    number: '03',
    title: 'Mulai Konseling',
    description: 'Bertemu dengan psikolog profesional secara online atau tatap muka untuk sesi konselingmu.',
    icon: MessageCircle,
  },
]
```

**Step 3: Write FAQ constants**

```ts
// src/features/konseling/constants/faq.constants.ts
import type { FaqItem } from '../types'

export const KONSELING_FAQS: FaqItem[] = [
  {
    q: 'Apa itu konseling psikologi?',
    a: 'Konseling adalah proses profesional yang membantu Anda mengatasi masalah emosional, mental, dan relasional bersama psikolog berlisensi dalam lingkungan yang aman dan rahasia.',
  },
  {
    q: 'Siapa saja yang bisa mengikuti konseling?',
    a: 'Semua orang yang merasa butuh dukungan psikologis. Tidak harus memiliki gangguan mental berat — konseling juga bermanfaat untuk pengembangan diri dan manajemen stres.',
  },
  {
    q: 'Berapa lama durasi satu sesi konseling?',
    a: 'Konseling individu berlangsung sekitar 60 menit, sedangkan konseling pasangan dan kelompok sekitar 90 menit per sesi.',
  },
  {
    q: 'Apakah sesi konseling bersifat rahasia?',
    a: 'Ya, seluruh sesi dijamin kerahasiaannya sesuai kode etik psikolog profesional. Data dan percakapan Anda tidak akan dibagikan kepada pihak manapun.',
  },
  {
    q: 'Bagaimana cara membatalkan atau menjadwalkan ulang?',
    a: 'Anda dapat melakukan reschedule maksimal 24 jam sebelum jadwal sesi melalui dashboard atau menghubungi customer support kami.',
  },
]
```

**Step 4: Write barrel export**

```ts
// src/features/konseling/constants/index.ts
export { KONSELING_SERVICES } from './services.constants'
export { KONSELING_PROCESS } from './process.constants'
export { KONSELING_FAQS } from './faq.constants'
```

**Step 5: Verify** — Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit** — `git commit -m "feat(konseling): add constants for services, process, FAQ"`

---

### Task 3: Create constants for pelatihan

**Files:**
- Create: `src/features/pelatihan/constants/programs.constants.ts`
- Create: `src/features/pelatihan/constants/process.constants.ts`
- Create: `src/features/pelatihan/constants/faq.constants.ts`
- Create: `src/features/pelatihan/constants/index.ts`

**Step 1: Write programs constants**

```ts
// src/features/pelatihan/constants/programs.constants.ts
import { Video, BookOpen, UserCheck } from 'lucide-react'
import type { PelatihanProgram } from '../types'

export const PELATIHAN_PROGRAMS: PelatihanProgram[] = [
  {
    title: 'Program Webinar',
    price: 'Rp99.000',
    tag: 'Webinar',
    description: 'Webinar live interaktif setiap minggu bersama praktisi berpengalaman di bidang pengembangan diri dan karir.',
    icon: Video,
  },
  {
    title: 'Kelas Online',
    price: 'Rp199.000',
    tag: 'Kelas',
    description: 'Akses ratusan materi video on-demand untuk belajar kapan saja dengan kurikulum terstruktur.',
    icon: BookOpen,
  },
  {
    title: 'Mentoring Eksklusif',
    price: 'Rp499.000',
    tag: 'Mentoring',
    description: 'Bimbingan intensif 1-on-1 dengan mentor profesional untuk akselerasi pertumbuhan karirmu.',
    icon: UserCheck,
  },
]
```

**Step 2: Write process constants**

```ts
// src/features/pelatihan/constants/process.constants.ts
import { Search, CreditCard, GraduationCap } from 'lucide-react'
import type { ProcessStep } from '../types'

export const PELATIHAN_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Pilih Program',
    description: 'Jelajahi program webinar, kelas online, atau mentoring yang sesuai minatmu.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Daftar & Bayar',
    description: 'Registrasi mudah dan pembayaran aman melalui berbagai metode.',
    icon: CreditCard,
  },
  {
    number: '03',
    title: 'Mulai Belajar',
    description: 'Akses materi, ikuti sesi live, dan dapatkan sertifikat setelah menyelesaikan program.',
    icon: GraduationCap,
  },
]
```

**Step 3: Write FAQ constants**

```ts
// src/features/pelatihan/constants/faq.constants.ts
import type { FaqItem } from '../types'

export const PELATIHAN_FAQS: FaqItem[] = [
  {
    q: 'Apa saja format pelatihan yang tersedia?',
    a: 'Kami menyediakan tiga format: webinar live interaktif, kelas online on-demand yang bisa diakses kapan saja, dan mentoring 1-on-1 dengan mentor berpengalaman.',
  },
  {
    q: 'Apakah ada sertifikat setelah mengikuti program?',
    a: 'Ya, setiap program memberikan sertifikat digital resmi setelah Anda menyelesaikan seluruh materi dan evaluasi.',
  },
  {
    q: 'Berapa lama akses materi kelas online?',
    a: 'Akses seumur hidup. Setelah pembelian, Anda dapat mengulang materi kapan saja tanpa batas waktu.',
  },
  {
    q: 'Apakah ada program gratis?',
    a: 'Beberapa webinar tersedia secara gratis. Cek jadwal terbaru di halaman program untuk informasi lebih lanjut.',
  },
  {
    q: 'Bagaimana cara mendaftar mentoring eksklusif?',
    a: 'Pilih slot mentoring yang tersedia, lakukan pembayaran, dan mentor akan menghubungi Anda dalam 1x24 jam untuk menjadwalkan sesi pertama.',
  },
]
```

**Step 4: Write barrel export**

```ts
// src/features/pelatihan/constants/index.ts
export { PELATIHAN_PROGRAMS } from './programs.constants'
export { PELATIHAN_PROCESS } from './process.constants'
export { PELATIHAN_FAQS } from './faq.constants'
```

**Step 5: Verify** — Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit** — `git commit -m "feat(pelatihan): add constants for programs, process, FAQ"`

---

### Task 4: Redesign KonselingHero

**Files:**
- Modify: `src/features/konseling/components/konseling-hero.tsx`

**Reference:** `src/features/psikotes/components/psikotes-hero.tsx`

**Implementation:** Follow exact psikotes-hero structure but with:
- Gradient: `from-indigo-800 via-indigo-700 to-indigo-500`
- Ambient glows: `indigo-900/20`, `indigo-300/20`
- Plus ornaments: `indigo-300/30`, `amber-300/20`
- Hexagon/Diamond: `white/10`, `amber-200/10`
- 3D spheres: `indigo-500/20 to indigo-800/20`, `amber-300/10 to amber-600/10`
- Glass shard: same as psikotes
- Badge: `bg-indigo-700/50 border-indigo-400` text "Heal & Grow Together"
- Title: "Konsultasi Profesional," + amber-300 "Hidupmu" + "Lebih Baik."
- Subtitle: "Konsultasi profesional bersama psikolog berpengalaman untuk kehidupan yang lebih sehat dan bermakna."
- 4 benefits: Confidential (ShieldCheck), Licensed Experts (Award), Personalized (Target), Follow-up Care (HeartHandshake)
- Benefit card: `bg-indigo-700/40 border-indigo-500/30 hover:bg-indigo-700/60 hover:shadow-indigo-900/20`
- CTA: "Mulai Konseling" → `#services`, price "Rp150.000"
- CTA divider: `bg-indigo-500/50`, price label: `text-indigo-200`
- Illustration: same card structure, border `indigo-500/20`, header bg `indigo-50`, stat colors `indigo-600`, emoji: 💬 🤝 💙
- Floating assets: `bg-indigo-400` rounded card, `bg-amber-400` circle, `bg-sky-400` square
- Ripple borders: `white/20`, `white/10`

**Step 1: Rewrite konseling-hero.tsx** — Full component following above spec.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(konseling): redesign hero with indigo theme"`

---

### Task 5: Redesign PelatihanHero

**Files:**
- Modify: `src/features/pelatihan/components/pelatihan-hero.tsx`

**Reference:** Same as Task 4 but with orange theme.

**Implementation:**
- Gradient: `from-orange-800 via-orange-700 to-orange-500`
- Ambient glows: `orange-900/20`, `orange-300/20`
- Plus ornaments: `orange-300/30`, `amber-300/20`
- Badge: `bg-orange-700/50 border-orange-400` text "Future-Ready Skills"
- Title: "Tingkatkan Skillmu," + amber-300 "Raih Karir" + "Impian."
- Subtitle: "Tingkatkan skill dan potensi diri melalui kelas dan webinar eksklusif bersama mentor terbaik."
- 4 benefits: Expert Mentors (Users), Flexible Learning (Clock), Certified (Award), Community (Globe)
- Benefit card: `bg-orange-700/40 border-orange-500/30 hover:bg-orange-700/60 hover:shadow-orange-900/20`
- CTA: "Lihat Program" → `#programs`, price "Rp99.000"
- CTA divider: `bg-orange-500/50`, price label: `text-orange-200`
- Illustration: border `orange-500/20`, header bg `orange-50`, stat colors `orange-600`, progress bars orange, emoji: 📚 🎓 ⭐
- Floating assets: `bg-orange-400`, `bg-amber-400`, `bg-sky-400`

**Step 1: Rewrite pelatihan-hero.tsx** — Full component following above spec.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(pelatihan): redesign hero with orange theme"`

---

### Task 6: Redesign KonselingServices with tab filter

**Files:**
- Modify: `src/features/konseling/components/konseling-services.tsx`

**Reference:** `src/features/psikotes/components/service-grid.tsx`

**Implementation:** Follow ServiceGrid pattern but:
- Import `ServiceCard` from `@/features/psikotes/components/service-card`
- Import `KONSELING_SERVICES` from constants
- `id="services"` on section for anchor link
- Tab filters: `{ semua: [], individu: ['Individu'], pasangan: ['Pasangan'], kelompok: ['Kelompok'] }`
- Badge icon color: `text-indigo-600` (Grid icon)
- Badge text: "Specialized Sessions"
- Heading: `Layanan` + indigo-600 span `Konseling`
- Subtitle: "Pilih jenis konseling yang sesuai untuk kebutuhan dan kenyamananmu."
- Tab active: `data-[state=active]:bg-indigo-600`
- Tab hover: `hover:text-indigo-700`
- Ornament colors: `indigo-600/20` for Plus, `indigo-600/10` for Hexagon
- Ambient glow: indigo-tinted radial gradients (`#e0e7ff`, `#c7d2fe`)
- actionLabel: "Mulai Konseling"

**Step 1: Rewrite konseling-services.tsx** — Full component.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(konseling): redesign services grid with tab filter"`

---

### Task 7: Redesign PelatihanPrograms with tab filter

**Files:**
- Modify: `src/features/pelatihan/components/pelatihan-programs.tsx`

**Reference:** Same as Task 6 but orange theme.

**Implementation:**
- Import `PELATIHAN_PROGRAMS` from constants
- `id="programs"` on section
- Tab filters: `{ semua: [], webinar: ['Webinar'], kelas: ['Kelas'], mentoring: ['Mentoring'] }`
- Badge icon color: `text-orange-600`
- Badge text: "Featured Programs"
- Heading: `Program` + orange-600 span `Tersedia`
- Subtitle: "Pilih program pengembangan diri yang sesuai dengan minat dan tujuanmu."
- Tab active: `data-[state=active]:bg-orange-600`
- Tab hover: `hover:text-orange-700`
- Ornament colors: `orange-600/20`, `orange-600/10`
- Ambient glow: orange-tinted (`#ffedd5`, `#fed7aa`)
- actionLabel: "Daftar Sekarang"

**Step 1: Rewrite pelatihan-programs.tsx** — Full component.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(pelatihan): redesign programs grid with tab filter"`

---

### Task 8: Create KonselingProcess

**Files:**
- Create: `src/features/konseling/components/konseling-process.tsx`

**Implementation:** 3-step horizontal timeline, background cream `#faf5e4`.
- `id="process"` on section (optional anchor)
- Badge: "How It Works" with `text-indigo-600` Sparkles icon
- Heading: `Alur` + indigo-600 span `Konseling`
- Subtitle: "Tiga langkah mudah untuk memulai sesi konselingmu."
- 3 cards in a grid `md:grid-cols-3`
- Each card: numbered step (large `text-indigo-600`), icon in `bg-indigo-50 text-indigo-600` circle, title, description
- Between cards on desktop: connector line (dashed border or pseudo-element)
- Ornaments: Plus, Diamond in indigo tones
- Data from `KONSELING_PROCESS` constant

**Step 1: Write konseling-process.tsx** — Full component.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(konseling): add process timeline section"`

---

### Task 9: Create PelatihanProcess

**Files:**
- Create: `src/features/pelatihan/components/pelatihan-process.tsx`

**Implementation:** Same as Task 8 but orange theme.
- Badge: "How It Works" with `text-orange-600` Sparkles icon
- Heading: `Alur` + orange-600 span `Pelatihan`
- Subtitle: "Tiga langkah mudah untuk memulai program pelatihanmu."
- Step number color: `text-orange-600`
- Icon circle: `bg-orange-50 text-orange-600`
- Ornaments in orange tones
- Data from `PELATIHAN_PROCESS` constant

**Step 1: Write pelatihan-process.tsx** — Full component.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(pelatihan): add process timeline section"`

---

### Task 10: Create KonselingFaq

**Files:**
- Create: `src/features/konseling/components/konseling-faq.tsx`

**Reference:** `src/features/psikotes/components/psikotes-faq.tsx`

**Implementation:** Follow exact PsikotesFaq pattern but:
- Import `KONSELING_FAQS` from constants
- Ornament colors: `indigo-800/20` Plus, `amber-500/20` Circle, `indigo-600/20` Diamond, border `indigo-800/15`
- Badge: `text-indigo-600 fill-indigo-600` Sparkles, text "Help Center"
- Heading: `Pertanyaan` + indigo-600 span `Umum`, underline `text-indigo-500/30`
- Open state: `border-indigo-500 shadow-indigo-900/5 ring-indigo-500/10`
- Icon open bg: `bg-indigo-600 text-white`
- Chevron open: `bg-indigo-50 text-indigo-600`
- `'use client'` directive at top

**Step 1: Write konseling-faq.tsx** — Full component.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(konseling): add FAQ section"`

---

### Task 11: Create PelatihanFaq

**Files:**
- Create: `src/features/pelatihan/components/pelatihan-faq.tsx`

**Implementation:** Same as Task 10 but orange theme:
- Import `PELATIHAN_FAQS` from constants
- Ornament colors: `orange-800/20` Plus, `amber-500/20` Circle, `orange-600/20` Diamond, border `orange-800/15`
- Badge: `text-orange-600 fill-orange-600`
- Heading span: orange-600, underline `text-orange-500/30`
- Open state: `border-orange-500 shadow-orange-900/5 ring-orange-500/10`
- Icon open bg: `bg-orange-600 text-white`
- Chevron open: `bg-orange-50 text-orange-600`

**Step 1: Write pelatihan-faq.tsx** — Full component.

**Step 2: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 3: Commit** — `git commit -m "feat(pelatihan): add FAQ section"`

---

### Task 12: Update barrel exports and pages

**Files:**
- Modify: `src/features/konseling/components/index.ts`
- Modify: `src/features/pelatihan/components/index.ts`
- Modify: `src/app/konseling/page.tsx`
- Modify: `src/app/pelatihan/page.tsx`

**Step 1: Update konseling barrel exports**

```ts
// src/features/konseling/components/index.ts
export { KonselingHero } from './konseling-hero'
export { KonselingServices } from './konseling-services'
export { KonselingProcess } from './konseling-process'
export { KonselingFaq } from './konseling-faq'
```

**Step 2: Update pelatihan barrel exports**

```ts
// src/features/pelatihan/components/index.ts
export { PelatihanHero } from './pelatihan-hero'
export { PelatihanPrograms } from './pelatihan-programs'
export { PelatihanProcess } from './pelatihan-process'
export { PelatihanFaq } from './pelatihan-faq'
```

**Step 3: Update konseling page**

```tsx
// src/app/konseling/page.tsx
import type { Metadata } from 'next'

import {
  KonselingHero,
  KonselingServices,
  KonselingProcess,
  KonselingFaq,
} from '@/features/konseling/components'

export const metadata: Metadata = {
  title: 'Konseling — BERMOELA',
  description: 'Dapatkan dukungan profesional dari psikolog berpengalaman melalui sesi konseling individu dan pasangan.',
}

export default function KonselingPage() {
  return (
    <main>
      <KonselingHero />
      <KonselingServices />
      <KonselingProcess />
      <KonselingFaq />
    </main>
  )
}
```

**Step 4: Update pelatihan page**

```tsx
// src/app/pelatihan/page.tsx
import type { Metadata } from 'next'

import {
  PelatihanHero,
  PelatihanPrograms,
  PelatihanProcess,
  PelatihanFaq,
} from '@/features/pelatihan/components'

export const metadata: Metadata = {
  title: 'Pelatihan — BERMOELA',
  description: 'Tingkatkan keterampilan dan pengetahuan Anda melalui program pelatihan, webinar, dan mentoring berkualitas.',
}

export default function PelatihanPage() {
  return (
    <main>
      <PelatihanHero />
      <PelatihanPrograms />
      <PelatihanProcess />
      <PelatihanFaq />
    </main>
  )
}
```

**Step 5: Verify** — Run: `npx next build 2>&1 | tail -5`

**Step 6: Commit** — `git commit -m "feat: update pages and barrel exports for konseling & pelatihan"`

---

### Task 13: Lint, build, test, push

**Step 1: Run lint** — `npx eslint src/features/konseling/ src/features/pelatihan/ src/app/konseling/ src/app/pelatihan/`

**Step 2: Fix any lint errors**

**Step 3: Run full build** — `npx next build`

**Step 4: Run tests** — `npx vitest run`

**Step 5: Final commit if lint fixes needed** — `git commit -m "fix: resolve lint issues in konseling & pelatihan"`

**Step 6: Push** — `git push origin development`
