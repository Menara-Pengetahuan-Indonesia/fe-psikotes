# Phase 2: Constants Extraction & Refactoring — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract semua inline constants dari component files, pindahkan misplaced constants files, standardisasi barrel exports, dan disambiguate duplicate types.

**Architecture:** Bottom-up, 1 concern per task per commit. Constants ke `constants/` folder, types ke `types/` folder. Barrel exports pakai explicit named exports. Verify `tsc --noEmit` setelah setiap task.

**Tech Stack:** TypeScript, Next.js App Router, path aliases (`@features/*`, `@shared/*`, `@/*`)

---

### Task 1: Pindahkan hero-constants.ts ke homepage/constants/

**Files:**
- Move: `src/features/homepage/components/hero-constants.ts` → `src/features/homepage/constants/hero.constants.ts`
- Create: `src/features/homepage/constants/index.ts`
- Modify: `src/features/homepage/components/homepage-hero.tsx`
- Modify: `src/features/homepage/components/destination-card.tsx`

**Step 1: Buat folder constants dan copy file**

```bash
mkdir -p src/features/homepage/constants
cp src/features/homepage/components/hero-constants.ts src/features/homepage/constants/hero.constants.ts
```

**Step 2: Buat barrel export**

```typescript
// src/features/homepage/constants/index.ts
export {
  THEME_STYLES,
  DESTINATION_CARDS,
  type ThemeKey,
  type DestinationCard,
} from './hero.constants'
```

**Step 3: Update import di homepage-hero.tsx**

Ganti:
```typescript
import { DESTINATION_CARDS, type ThemeKey } from './hero-constants'
```
Dengan:
```typescript
import { DESTINATION_CARDS, type ThemeKey } from '../constants'
```

**Step 4: Update import di destination-card.tsx**

Ganti:
```typescript
import { THEME_STYLES, type DestinationCard, type ThemeKey } from './hero-constants'
```
Dengan:
```typescript
import { THEME_STYLES, type DestinationCard, type ThemeKey } from '../constants'
```

**Step 5: Hapus file lama**

```bash
rm src/features/homepage/components/hero-constants.ts
```

**Step 6: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Tidak ada error

**Step 7: Commit**

```bash
git add src/features/homepage/
git commit -m "refactor: move hero constants to homepage/constants folder"
```

---

### Task 2: Pindahkan category-showcase-constants.ts ke psikotes/constants/

**Files:**
- Move: `src/features/psikotes/components/category-showcase-constants.ts` → `src/features/psikotes/constants/category-showcase.constants.ts`
- Modify: `src/features/psikotes/constants/index.ts`
- Modify: `src/features/psikotes/components/category-showcase.tsx`

**Step 1: Copy file ke constants/**

```bash
cp src/features/psikotes/components/category-showcase-constants.ts src/features/psikotes/constants/category-showcase.constants.ts
```

**Step 2: Tambahkan ke barrel export**

Tambahkan di `src/features/psikotes/constants/index.ts`:
```typescript
export {
  PILL_COLORS,
  ROWS,
  MARQUEE_CSS,
  SEP_ICONS,
  type Pill,
} from './category-showcase.constants'
```

**Step 3: Update import di category-showcase.tsx**

Ganti:
```typescript
import { type Pill, PILL_COLORS, ROWS, MARQUEE_CSS, SEP_ICONS } from './category-showcase-constants'
```
Dengan:
```typescript
import { type Pill, PILL_COLORS, ROWS, MARQUEE_CSS, SEP_ICONS } from '../constants'
```

**Step 4: Hapus file lama**

```bash
rm src/features/psikotes/components/category-showcase-constants.ts
```

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add src/features/psikotes/
git commit -m "refactor: move category-showcase constants to psikotes/constants folder"
```

---

### Task 3: Pindahkan curriculum-levels.ts ke psikotes/constants/

**Files:**
- Move: `src/features/psikotes/components/curriculum-levels.ts` → `src/features/psikotes/constants/curriculum-levels.constants.ts`
- Modify: `src/features/psikotes/constants/index.ts`
- Modify: `src/features/psikotes/components/curriculum-pyramid.tsx`
- Modify: `src/features/psikotes/components/pyramid-level-item.tsx`

**Step 1: Copy file**

```bash
cp src/features/psikotes/components/curriculum-levels.ts src/features/psikotes/constants/curriculum-levels.constants.ts
```

**Step 2: Tambahkan ke barrel export**

Tambahkan di `src/features/psikotes/constants/index.ts`:
```typescript
export { LEVELS, type Level } from './curriculum-levels.constants'
```

**Step 3: Update imports di consumer files**

`curriculum-pyramid.tsx` — ganti:
```typescript
import { LEVELS } from './curriculum-levels'
```
Dengan:
```typescript
import { LEVELS } from '../constants'
```

`pyramid-level-item.tsx` — ganti:
```typescript
import type { Level } from './curriculum-levels'
```
Dengan:
```typescript
import type { Level } from '../constants'
```

**Step 4: Hapus file lama**

```bash
rm src/features/psikotes/components/curriculum-levels.ts
```

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add src/features/psikotes/
git commit -m "refactor: move curriculum-levels constants to psikotes/constants folder"
```

---

### Task 4: Pindahkan exam-constants.ts ke psikotes/gratis/constants/

**Files:**
- Move: `src/features/psikotes/gratis/components/exam-constants.ts` → `src/features/psikotes/gratis/constants/exam.constants.ts`
- Create: `src/features/psikotes/gratis/constants/index.ts`
- Modify: `src/features/psikotes/gratis/components/exam-interface.tsx`

**Step 1: Buat folder dan copy file**

```bash
mkdir -p src/features/psikotes/gratis/constants
cp src/features/psikotes/gratis/components/exam-constants.ts src/features/psikotes/gratis/constants/exam.constants.ts
```

**Step 2: Buat barrel export**

```typescript
// src/features/psikotes/gratis/constants/index.ts
export { MOCK_QUESTIONS } from './exam.constants'
```

**Step 3: Update import di exam-interface.tsx**

Ganti:
```typescript
import { MOCK_QUESTIONS } from './exam-constants'
```
Dengan:
```typescript
import { MOCK_QUESTIONS } from '../constants'
```

**Step 4: Hapus file lama**

```bash
rm src/features/psikotes/gratis/components/exam-constants.ts
```

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add src/features/psikotes/gratis/
git commit -m "refactor: move exam constants to psikotes/gratis/constants folder"
```

---

### Task 5: Extract membership inline constants

**Files:**
- Create: `src/features/membership/constants/membership.constants.ts`
- Create: `src/features/membership/constants/index.ts`
- Modify: `src/features/membership/components/ecosystem-section.tsx` (remove lines 4-41)
- Modify: `src/features/membership/components/pricing-section.tsx` (remove lines 3-17)
- Modify: `src/features/membership/components/gathering-section.tsx` (remove lines 3-7)
- Modify: `src/features/membership/components/membership-faq.tsx` (remove lines 7-24)

**Step 1: Buat constants file**

Buat `src/features/membership/constants/membership.constants.ts` — pindahkan SEMUA constants dari 4 component files ke sini. Pastikan import icons yang dibutuhkan (Star, Video, Users, PlayCircle, Shield, Zap dari lucide-react).

Isi file:
```typescript
import { Star, Video, Users, PlayCircle, Shield, Zap } from 'lucide-react'

export const ECOSYSTEM_ITEMS = [
  {
    icon: Star,
    title: 'Akses Psikotes Premium',
    description: 'Nikmati akses gratis ke berbagai tes psikologi berbayar setiap bulannya.',
    theme: 'indigo'
  },
  {
    icon: Video,
    title: 'Webinar Eksklusif',
    description: 'Belajar langsung dari pakar psikologi dan pengembangan diri setiap minggu.',
    theme: 'amber'
  },
  {
    icon: Users,
    title: 'Networking Session',
    description: 'Perluas jejaringmu dengan ribuan individu yang memiliki mindset bertumbuh.',
    theme: 'teal'
  },
  {
    icon: PlayCircle,
    title: 'Library Materi',
    description: 'Akses ribuan video, e-book, dan worksheet pengembangan diri.',
    theme: 'sky'
  },
  {
    icon: Shield,
    title: 'Konseling Diskon',
    description: 'Potongan harga khusus untuk sesi konseling dengan psikolog profesional.',
    theme: 'rose'
  },
  {
    icon: Zap,
    title: 'Challenge Bulanan',
    description: 'Ikuti tantangan pengembangan diri untuk membangun kebiasaan positif.',
    theme: 'indigo'
  },
]

export const LITE_BENEFITS = [
  'Akses Komunitas Telegram',
  '1x Webinar Bulanan',
  'Diskon 10% Layanan Bermoela',
  'Update Event Terbaru',
]

export const PRO_BENEFITS = [
  'Akses Komunitas Exclusive',
  'Weekly Premium Webinar',
  'Akses 50+ Psikotes Premium',
  'Diskon 30% Konseling Psikolog',
  'Rekaman Webinar Unlimited',
  'Priority Customer Support',
]

export const GATHERING_POINTS = [
  'Dipandu oleh Community Manager berpengalaman',
  'Topik diskusi yang relevan dengan kehidupan sehari-hari',
  'Sesi tanya jawab interaktif & ruang berbagi aman',
]

export const MEMBERSHIP_FAQS = [
  {
    q: 'Apakah membership bisa dibatalkan kapan saja?',
    a: 'Ya, membership bersifat fleksibel. Anda dapat membatalkan perpanjangan otomatis kapan saja melalui dashboard member area tanpa denda.',
  },
  {
    q: 'Bagaimana cara mengakses webinar mingguan?',
    a: 'Link webinar akan dikirimkan melalui email dan grup komunitas H-1 sebelum acara dimulai. Anda juga bisa mengakses rekaman di member area.',
  },
  {
    q: 'Apakah ada grup diskusi khusus?',
    a: 'Tentu! Member Pro akan mendapatkan akses ke Circle Group eksklusif berdasarkan minat (Karir, Relationship, Self-Development) yang dipandu mentor.',
  },
  {
    q: 'Apa bedanya Lite dan Pro?',
    a: 'Lite cocok untuk pemula dengan akses dasar webinar bulanan. Pro memberikan akses penuh ke seluruh ekosistem, termasuk tes premium gratis dan webinar mingguan.',
  },
]
```

**Step 2: Buat barrel export**

```typescript
// src/features/membership/constants/index.ts
export {
  ECOSYSTEM_ITEMS,
  LITE_BENEFITS,
  PRO_BENEFITS,
  GATHERING_POINTS,
  MEMBERSHIP_FAQS,
} from './membership.constants'
```

**Step 3: Update imports di 4 component files**

`ecosystem-section.tsx` — hapus definisi ECOSYSTEM_ITEMS (line 4-41), hapus icon imports yang sudah pindah, tambahkan:
```typescript
import { ECOSYSTEM_ITEMS } from '../constants'
```

`pricing-section.tsx` — hapus LITE_BENEFITS dan PRO_BENEFITS (line 3-17), tambahkan:
```typescript
import { LITE_BENEFITS, PRO_BENEFITS } from '../constants'
```

`gathering-section.tsx` — hapus GATHERING_POINTS (line 3-7), tambahkan:
```typescript
import { GATHERING_POINTS } from '../constants'
```

`membership-faq.tsx` — hapus MEMBERSHIP_FAQS (line 7-24), tambahkan:
```typescript
import { MEMBERSHIP_FAQS } from '../constants'
```

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/membership/
git commit -m "refactor: extract membership inline constants to constants folder"
```

---

### Task 6: Extract general (about/contact) inline constants

**Files:**
- Create: `src/features/general/constants/about.constants.ts`
- Create: `src/features/general/constants/contact.constants.ts`
- Modify: `src/features/general/constants/index.ts`
- Modify: `src/features/general/components/about-values-section.tsx` (remove lines 14-45)
- Modify: `src/features/general/components/about-services-section.tsx` (remove lines 12-44)
- Modify: `src/features/general/components/about-stats-section.tsx` (remove lines 3-8)
- Modify: `src/features/general/components/contact-hero-section.tsx` (remove lines 14-43)

**Step 1: Buat about.constants.ts**

Pindahkan VALUES, SERVICES_OVERVIEW, STATS dari 3 about component files. Pastikan import icons yang dibutuhkan.

```typescript
// src/features/general/constants/about.constants.ts
import {
  ShieldCheck,
  Trophy,
  Lightbulb,
  Heart,
  Rocket,
  Handshake,
  Brain,
  HeartHandshake,
  GraduationCap,
} from 'lucide-react'

export const VALUES = [
  { icon: ShieldCheck, title: 'Profesional', desc: 'Standar etika profesi tertinggi.' },
  { icon: Trophy, title: 'Terpercaya', desc: 'Didukung psikolog berlisensi.' },
  { icon: Lightbulb, title: 'Inovatif', desc: 'Metode asesmen modern.' },
  { icon: Heart, title: 'Inklusif', desc: 'Untuk semua kalangan.' },
  { icon: Rocket, title: 'Berdampak', desc: 'Hasil nyata dan terukur.' },
  { icon: Handshake, title: 'Kolaboratif', desc: 'Bersama institusi & perusahaan.' },
] as const

export const SERVICES_OVERVIEW = [
  {
    icon: Brain,
    title: 'Psikotes Online',
    desc: 'Asesmen psikologi terstandar dengan hasil real-time dan laporan komprehensif.',
    color: 'bg-primary-600',
    lightBg: 'bg-primary-50',
    lightText: 'text-primary-600',
  },
  {
    icon: HeartHandshake,
    title: 'Konseling',
    desc: 'Sesi konseling profesional bersama psikolog berlisensi secara daring.',
    color: 'bg-konseling-600',
    lightBg: 'bg-konseling-50',
    lightText: 'text-konseling-600',
  },
  {
    icon: GraduationCap,
    title: 'Pelatihan',
    desc: 'Program pengembangan diri melalui webinar, kelas, dan mentoring.',
    color: 'bg-pelatihan-600',
    lightBg: 'bg-pelatihan-50',
    lightText: 'text-pelatihan-600',
  },
] as const

export const STATS = [
  { value: '50K+', label: 'Pengguna Aktif' },
  { value: '200+', label: 'Tes Tersedia' },
  { value: '50+', label: 'Psikolog Berlisensi' },
  { value: '98%', label: 'Tingkat Kepuasan' },
] as const
```

**Step 2: Buat contact.constants.ts**

```typescript
// src/features/general/constants/contact.constants.ts
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@bermoela.com',
    desc: 'Respon dalam 1x24 jam kerja',
    href: 'mailto:info@bermoela.com',
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+62 812-3456-7890',
    desc: 'Senin - Jumat, 09:00 - 17:00',
    href: 'tel:+6281234567890',
  },
  {
    icon: MapPin,
    title: 'Kantor',
    value: 'Jakarta, Indonesia',
    desc: 'Kunjungan dengan janji temu',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    value: 'Sen - Jum, 09:00 - 17:00',
    desc: 'Layanan online 24/7',
    href: '#',
  },
]
```

**Step 3: Update barrel export**

Tambahkan di `src/features/general/constants/index.ts`:
```typescript
export { VALUES, SERVICES_OVERVIEW, STATS } from './about.constants'
export { CONTACT_INFO } from './contact.constants'
```

**Step 4: Update imports di 4 component files**

Setiap file: hapus definisi lokal + icon imports yang sudah pindah, tambahkan import dari `'../constants'`.

**Step 5: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 6: Commit**

```bash
git add src/features/general/
git commit -m "refactor: extract about and contact inline constants to constants folder"
```

---

### Task 7: Extract psikotes inline constants (PILLARS, STEPS, CATEGORIES)

**Files:**
- Create: `src/features/psikotes/constants/pillars.constants.ts`
- Create: `src/features/psikotes/constants/transformation.constants.ts`
- Create: `src/features/psikotes/constants/category-nav.constants.ts`
- Modify: `src/features/psikotes/constants/index.ts`
- Modify: `src/features/psikotes/components/psikotes-pillars.tsx` (remove lines 22-107)
- Modify: `src/features/psikotes/components/psikotes-transformation-map.tsx` (remove lines 13-42)
- Modify: `src/features/psikotes/components/psikotes-category-nav.tsx` (remove lines 19-65)

**Step 1: Buat 3 constants files**

Pindahkan PILLARS, STEPS, dan CATEGORIES masing-masing ke file sendiri. Pastikan include icon imports yang dibutuhkan.

`pillars.constants.ts` — berisi array PILLARS (4 items) dengan icons Search, MessageSquare, GraduationCap, Users
`transformation.constants.ts` — berisi array STEPS (4 items) dengan icons Search, MessageSquare, GraduationCap, Users
`category-nav.constants.ts` — berisi array CATEGORIES (3 items) dengan icons User, Heart, Briefcase

**Step 2: Tambahkan ke barrel export**

```typescript
export { PILLARS } from './pillars.constants'
export { TRANSFORMATION_STEPS } from './transformation.constants'
export { NAV_CATEGORIES } from './category-nav.constants'
```

Catatan: rename STEPS → TRANSFORMATION_STEPS dan CATEGORIES → NAV_CATEGORIES untuk menghindari naming collision.

**Step 3: Update imports di 3 component files**

Setiap file: hapus definisi lokal + icon imports yang sudah pindah, tambahkan import dari `'../constants'`. Update variable name jika di-rename.

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/psikotes/
git commit -m "refactor: extract psikotes pillars, transformation, and category-nav constants"
```

---

### Task 8: Extract dashboard inline constants

**Files:**
- Create: `src/features/dashboard/constants/category-styles.constants.ts`
- Modify: `src/features/dashboard/constants/index.ts`
- Modify: `src/features/dashboard/components/test-results.tsx` (remove lines 13-21)
- Modify: `src/features/dashboard/components/my-tests.tsx` (remove lines 17-40)

**Step 1: Buat constants file**

```typescript
// src/features/dashboard/constants/category-styles.constants.ts
import type { TestCategory } from '../types'

export const CATEGORY_CONFIG: Record<
  TestCategory,
  { bg: string; text: string; border: string; iconColor: string }
> = {
  gratis: { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-100', iconColor: 'text-primary-500' },
  premium: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', iconColor: 'text-violet-500' },
  mahasiswa: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', iconColor: 'text-sky-500' },
  perusahaan: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', iconColor: 'text-orange-500' },
  'kesehatan-mental': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100', iconColor: 'text-rose-500' },
}

export const CATEGORY_STYLE: Record<
  TestCategory,
  { bg: string; text: string; border: string }
> = {
  gratis: { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-100' },
  premium: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100' },
  mahasiswa: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100' },
  perusahaan: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
  'kesehatan-mental': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
}

export type FilterTab = TestCategory | 'semua'

export const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'semua', label: 'Semua Kategori' },
  { value: 'gratis', label: 'Gratis' },
  { value: 'premium', label: 'Premium' },
  { value: 'mahasiswa', label: 'Mahasiswa' },
  { value: 'perusahaan', label: 'Perusahaan' },
  { value: 'kesehatan-mental', label: 'Kesehatan Mental' },
]
```

Catatan: cek apakah `TestCategory` ada di `dashboard/types/` — jika tidak (karena types/index.ts kosong), cek apakah didefinisikan inline di component files. Jika ya, pindahkan type ke `dashboard/types/index.ts` terlebih dahulu.

**Step 2: Update barrel export**

Tambahkan di `src/features/dashboard/constants/index.ts`:
```typescript
export {
  CATEGORY_CONFIG,
  CATEGORY_STYLE,
  FILTER_TABS,
  type FilterTab,
} from './category-styles.constants'
```

**Step 3: Update imports di component files**

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/dashboard/
git commit -m "refactor: extract dashboard category styles and filter constants"
```

---

### Task 9: Extract konseling inline constants

**Files:**
- Create: `src/features/konseling/constants/hero.constants.ts`
- Modify: `src/features/konseling/constants/index.ts`
- Modify: `src/features/konseling/components/konseling-hero.tsx` (remove lines 17-38)
- Modify: `src/features/konseling/components/konseling-services.tsx` (remove lines 17-22)

**Step 1: Buat hero.constants.ts**

Pindahkan HERO_BENEFITS (4 items, icons ShieldCheck, Award, Target, HeartHandshake) dan TAB_FILTERS.

```typescript
// src/features/konseling/constants/hero.constants.ts
import { ShieldCheck, Award, Target, HeartHandshake } from 'lucide-react'

export const KONSELING_HERO_BENEFITS = [
  { label: 'Confidential', desc: 'Sesi privat dan aman', icon: ShieldCheck },
  { label: 'Licensed Experts', desc: 'Psikolog klinis berlisensi', icon: Award },
  { label: 'Personalized', desc: 'Pendekatan sesuai kebutuhanmu', icon: Target },
  { label: 'Follow-up Care', desc: 'Dukungan berkelanjutan', icon: HeartHandshake },
]

export const KONSELING_TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  individu: ['Individu'],
  pasangan: ['Pasangan'],
  kelompok: ['Kelompok'],
}
```

Catatan: rename HERO_BENEFITS → KONSELING_HERO_BENEFITS dan TAB_FILTERS → KONSELING_TAB_FILTERS agar tidak clash saat di-export.

**Step 2: Tambahkan ke barrel export**

Tambahkan di `src/features/konseling/constants/index.ts`:
```typescript
export { KONSELING_HERO_BENEFITS, KONSELING_TAB_FILTERS } from './hero.constants'
```

**Step 3: Update imports di component files**

`konseling-hero.tsx` — hapus definisi HERO_BENEFITS + icon imports yang pindah, tambahkan:
```typescript
import { KONSELING_HERO_BENEFITS } from '../constants'
```
Lalu rename usage: `HERO_BENEFITS` → `KONSELING_HERO_BENEFITS`

`konseling-services.tsx` — hapus TAB_FILTERS, tambahkan:
```typescript
import { KONSELING_TAB_FILTERS } from '../constants'
```
Lalu rename usage: `TAB_FILTERS` → `KONSELING_TAB_FILTERS`

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/konseling/
git commit -m "refactor: extract konseling hero benefits and tab filter constants"
```

---

### Task 10: Extract pelatihan inline constants

**Files:**
- Create: `src/features/pelatihan/constants/hero.constants.ts`
- Modify: `src/features/pelatihan/constants/index.ts`
- Modify: `src/features/pelatihan/components/pelatihan-hero.tsx` (remove lines 17-38)
- Modify: `src/features/pelatihan/components/pelatihan-programs.tsx` (remove lines 18-23)

**Step 1: Buat hero.constants.ts**

```typescript
// src/features/pelatihan/constants/hero.constants.ts
import { Users, Clock, Award, Globe } from 'lucide-react'

export const PELATIHAN_HERO_BENEFITS = [
  { label: 'Expert Mentors', desc: 'Mentor berpengalaman di bidangnya', icon: Users },
  { label: 'Flexible Learning', desc: 'Belajar kapan saja, di mana saja', icon: Clock },
  { label: 'Certified', desc: 'Sertifikat resmi setiap program', icon: Award },
  { label: 'Community', desc: 'Bergabung dengan komunitas learner', icon: Globe },
]

export const PELATIHAN_TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  webinar: ['Webinar'],
  kelas: ['Kelas'],
  mentoring: ['Mentoring'],
}
```

**Step 2: Tambahkan ke barrel export**

Tambahkan di `src/features/pelatihan/constants/index.ts`:
```typescript
export { PELATIHAN_HERO_BENEFITS, PELATIHAN_TAB_FILTERS } from './hero.constants'
```

**Step 3: Update imports di component files**

Same pattern as Task 9 — rename usage.

**Step 4: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 5: Commit**

```bash
git add src/features/pelatihan/
git commit -m "refactor: extract pelatihan hero benefits and tab filter constants"
```

---

### Task 11: Disambiguate duplicate Question types

**Files:**
- Modify: `src/features/psikotes/constants/questions.constants.ts` (rename `Question` → `MockQuestion`)
- Modify: `src/features/psikotes/constants/index.ts` (update export)
- Modify: `src/features/psikotes/types/exam.types.ts` (rename `Question` → `ExamQuestion`)
- Modify: `src/features/psikotes/types/index.ts` (update export)
- Modify: semua consumer files yang import type ini

**Step 1: Rename di questions.constants.ts**

Ganti `export interface Question` menjadi `export interface MockQuestion`.

**Step 2: Update barrel export di constants/index.ts**

Ganti:
```typescript
export type { Question } from './questions.constants'
```
Menjadi:
```typescript
export type { MockQuestion } from './questions.constants'
```

**Step 3: Update consumer files**

Cari semua file yang import `Question` dari `'@/features/psikotes/constants'` atau `'../constants'` dan ganti ke `MockQuestion`.

File yang perlu diupdate (cari dengan grep):
- `src/features/psikotes/gratis/constants/exam.constants.ts` — `import type { Question }` → `import type { MockQuestion }`
- `src/features/psikotes/constants/questions.constants.ts` — QUESTIONS_MAP type annotation

**Step 4: Rename di exam.types.ts**

Ganti `export interface Question` menjadi `export interface ExamQuestion`. Update juga `Section.questions: Question[]` → `Section.questions: ExamQuestion[]`.

**Step 5: Update consumers of ExamQuestion**

Cari semua file yang import `Question` dari `'../types'` atau `'@/features/psikotes/types'` dalam konteks exam dan ganti.

**Step 6: Admin Question type stays as-is**

`admin/types/index.ts` → `Question` tetap (ini domain model utama).

**Step 7: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 8: Commit**

```bash
git add src/features/psikotes/ src/features/admin/
git commit -m "refactor: disambiguate Question types (MockQuestion, ExamQuestion, Question)"
```

---

### Task 12: Standardisasi barrel exports

**Files:**
- Modify: `src/features/admin/index.ts`
- Modify: `src/features/dashboard/index.ts`
- Modify: `src/features/psikotes/index.ts`
- Modify: `src/features/konseling/index.ts`
- Modify: `src/features/pelatihan/index.ts`
- Modify: `src/features/membership/index.ts`
- Modify: `src/features/homepage/index.ts`
- Create: `src/features/general/index.ts` (belum ada)

**Standard pattern (ikuti auth/index.ts):**

```typescript
// Explicit named exports — no `export *`, no `export {}`
export type { TypeA, TypeB } from './types'
export { hookA } from './hooks'
export { serviceA } from './services'
export { ComponentA, ComponentB } from './components'
export { CONSTANT_A } from './constants'
```

**Step 1: Update setiap feature index.ts**

Untuk setiap file:
- Ganti `export * from './types'` → explicit named type exports
- Ganti `export * from './components'` → explicit named component exports
- Hapus `export {} from './hooks'` dan `export {} from './services'` (placeholder kosong)
- Tambahkan constants exports jika ada

**Step 2: Buat general/index.ts**

```typescript
export { BENEFITS, POSITIONS } from './constants'
export { VALUES, SERVICES_OVERVIEW, STATS } from './constants'
export { CONTACT_INFO } from './constants'
```

**Step 3: Verifikasi**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`

**Step 4: Commit**

```bash
git add src/features/*/index.ts
git commit -m "refactor: standardize barrel exports to explicit named pattern"
```

---

### Task 13: Fix failing psikotes-hero tests

**Files:**
- Modify: `src/tests/component/psikotes-hero.test.tsx`

**Step 1: Baca current hero component**

Baca `src/features/psikotes/components/psikotes-hero.tsx` untuk memahami current content.

**Step 2: Update tests**

Current hero TIDAK lagi menampilkan: philosophy items, price "Rp25.000", atau "Mulai Tes" CTA link.

Current hero menampilkan: "The New You Transformation" badge, heading text, PsikotesDiagnostic component, "Semua bisa bermula dari sini".

Update tests sesuai actual content:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PsikotesHero } from '@/features/psikotes/components'

describe('PsikotesHero', () => {
  it('renders hero heading', () => {
    render(<PsikotesHero />)
    expect(screen.getByText(/Mental Health untuk Tumbuh/i)).toBeInTheDocument()
  })

  it('renders transformation badge', () => {
    render(<PsikotesHero />)
    expect(screen.getByText(/The New You Transformation/i)).toBeInTheDocument()
  })

  it('renders footer text', () => {
    render(<PsikotesHero />)
    expect(screen.getByText(/Semua bisa/i)).toBeInTheDocument()
  })
})
```

**Step 3: Run tests**

Run: `npx vitest run src/tests/component/psikotes-hero.test.tsx --reporter=verbose`
Expected: All tests passing

**Step 4: Commit**

```bash
git add src/tests/component/psikotes-hero.test.tsx
git commit -m "fix: update psikotes-hero tests to match redesigned component"
```

---

### Task 14: Verifikasi akhir — typecheck, lint, test, build

**Step 1: Type check**

Run: `npx tsc --noEmit --pretty`
Expected: 0 errors

**Step 2: Lint**

Run: `npx eslint src/features/ src/shared/ --no-error-on-unmatched-pattern 2>&1 | tail -20`
Expected: 0 errors (atau hanya warnings)

**Step 3: Run all tests**

Run: `npx vitest run --reporter=verbose 2>&1 | tail -30`
Expected: Semua test pass (0 failures)

**Step 4: Build check**

Run: `npx next build 2>&1 | tail -20`
Expected: Build succeeds

**Step 5: Commit final jika ada fix**

```bash
git add -A
git commit -m "refactor: phase 2 final verification and fixes"
```

---

## Success Criteria

- ✅ Tidak ada file `.constants.ts` di `components/` folder
- ✅ Tidak ada data arrays/objects inline di TSX files (kecuali style helpers)
- ✅ Semua barrel exports pakai explicit named pattern
- ✅ Tidak ada duplicate `Question` type name
- ✅ Semua tests pass (0 failures)
- ✅ TypeScript strict mode pass
- ✅ Build succeeds
