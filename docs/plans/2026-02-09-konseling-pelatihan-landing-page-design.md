# Redesign Landing Page Konseling & Pelatihan

Tanggal: 2026-02-09
Tujuan: Samakan kualitas kedua landing page dengan psikotes — section lengkap, data terstruktur (constants/types), desain konsisten.

---

## 1. Arsitektur File

### Konseling

```
src/features/konseling/
├── components/
│   ├── index.ts                  ← update barrel exports
│   ├── konseling-hero.tsx        ← redesign
│   ├── konseling-services.tsx    ← redesign (grid + tab filter)
│   ├── konseling-process.tsx     ← baru
│   └── konseling-faq.tsx         ← baru
├── constants/
│   ├── index.ts                  ← baru
│   ├── services.constants.ts     ← data 3 layanan
│   ├── process.constants.ts      ← data 3 steps
│   └── faq.constants.ts          ← data 5 FAQ
├── types/
│   └── index.ts                  ← interface KonselingService, ProcessStep, FaqItem
```

### Pelatihan

```
src/features/pelatihan/
├── components/
│   ├── index.ts                  ← update barrel exports
│   ├── pelatihan-hero.tsx        ← redesign
│   ├── pelatihan-programs.tsx    ← redesign (grid + tab filter)
│   ├── pelatihan-process.tsx     ← baru
│   └── pelatihan-faq.tsx         ← baru
├── constants/
│   ├── index.ts                  ← baru
│   ├── programs.constants.ts     ← data 3 program
│   ├── process.constants.ts      ← data 3 steps
│   └── faq.constants.ts          ← data 5 FAQ
├── types/
│   └── index.ts                  ← interface PelatihanProgram, ProcessStep, FaqItem
```

### Page Composition

```tsx
// src/app/konseling/page.tsx
<KonselingHero />
<KonselingServices />
<KonselingProcess />
<KonselingFaq />

// src/app/pelatihan/page.tsx
<PelatihanHero />
<PelatihanPrograms />
<PelatihanProcess />
<PelatihanFaq />
```

---

## 2. Warna Tema

### Konseling — Indigo (deep, vibrant)

- Gradient hero: `indigo-800` via `indigo-700` to `indigo-500`
- Aksen: `indigo-600`, `indigo-500`
- Amber tetap untuk highlight (CTA button, underline, sparkle)
- Background section: `#faf5e4` (cream, sama dengan psikotes)

### Pelatihan — Orange (deep, vibrant)

- Gradient hero: `orange-800` via `orange-700` to `orange-500`
- Aksen: `orange-600`, `orange-500`
- Amber tetap untuk highlight
- Background section: `#faf5e4` (cream)

Prinsip: gradasi gelap-terang seperti psikotes (emerald-800 → emerald-500), warna vibrant tapi tidak mencolok.

---

## 3. Section Detail

### 3.1 Hero Section

Mengikuti pola `psikotes-hero.tsx`: grid 2 kolom, kiri konten + 4 benefit cards, kanan ilustrasi 3D.

#### Konseling Hero

- Badge: "Heal & Grow Together"
- Headline: `Konsultasi Profesional,` **`Hidupmu`** `Lebih Baik.`
- Subtitle: "Konsultasi profesional bersama psikolog berpengalaman untuk kehidupan yang lebih sehat dan bermakna."
- 4 Benefit cards (icon + label + desc):
  1. **Confidential** — Sesi privat dan aman (ShieldCheck)
  2. **Licensed Experts** — Psikolog klinis berlisensi (Award)
  3. **Personalized** — Pendekatan sesuai kebutuhanmu (Target)
  4. **Follow-up Care** — Dukungan berkelanjutan (HeartHandshake)
- CTA: "Mulai Konseling" → `#services`
- Info harga: "Harga Mulai" → **Rp150.000**
- Ilustrasi kanan: card mockup dengan chat/heart icon, floating emoji

#### Pelatihan Hero

- Badge: "Future-Ready Skills"
- Headline: `Tingkatkan Skillmu,` **`Raih Karir`** `Impian.`
- Subtitle: "Tingkatkan skill dan potensi diri melalui kelas dan webinar eksklusif bersama mentor terbaik."
- 4 Benefit cards:
  1. **Expert Mentors** — Mentor berpengalaman di bidangnya (Users)
  2. **Flexible Learning** — Belajar kapan saja, di mana saja (Clock)
  3. **Certified** — Sertifikat resmi setiap program (Award)
  4. **Community** — Bergabung dengan komunitas learner (Globe)
- CTA: "Lihat Program" → `#programs`
- Info harga: "Harga Mulai" → **Rp99.000**
- Ilustrasi kanan: card mockup dengan progress bars, floating emoji

### 3.2 Services/Programs Grid

Mengikuti pola `ServiceGrid` + `ServiceCard` dari psikotes. Re-use `ServiceCard` component dari `@/features/psikotes/components/service-card`.

#### Konseling Services

- Section badge: "Specialized Sessions"
- Heading: Layanan **Konseling**
- Tab filter: `semua` | `individu` | `pasangan` | `kelompok`
- 3 cards:
  1. **Konseling Individu** — Rp250.000, 60 min, tag "Individu"
  2. **Konseling Pasangan** — Rp350.000, 90 min, tag "Pasangan"
  3. **Konseling Kelompok** — Rp150.000, 90 min, tag "Kelompok"
- Hover aksen: indigo

#### Pelatihan Programs

- Section badge: "Featured Programs"
- Heading: Program **Tersedia**
- Tab filter: `semua` | `webinar` | `kelas` | `mentoring`
- 3 cards:
  1. **Program Webinar** — Rp99.000, Setiap Minggu, tag "Webinar"
  2. **Kelas Online** — Rp199.000, Akses Seumur Hidup, tag "Kelas"
  3. **Mentoring Eksklusif** — Rp499.000, Fleksibel, tag "Mentoring"
- Hover aksen: orange

### 3.3 Process / Alur Kerja Section

Timeline horizontal (mobile: vertikal), 3 numbered steps, background cream. Data dari constants.

#### Konseling Process

- Section badge: "How It Works"
- Heading: Alur **Konseling**
- Steps:
  1. **Pilih Layanan** (01) — "Tentukan jenis konseling yang sesuai dengan kebutuhanmu: individu, pasangan, atau kelompok."
  2. **Jadwalkan Sesi** (02) — "Pilih jadwal yang nyaman dan lakukan pembayaran secara online dengan mudah."
  3. **Mulai Konseling** (03) — "Bertemu dengan psikolog profesional secara online atau tatap muka untuk sesi konselingmu."
- Warna aksen: indigo

#### Pelatihan Process

- Section badge: "How It Works"
- Heading: Alur **Pelatihan**
- Steps:
  1. **Pilih Program** (01) — "Jelajahi program webinar, kelas online, atau mentoring yang sesuai minatmu."
  2. **Daftar & Bayar** (02) — "Registrasi mudah dan pembayaran aman melalui berbagai metode."
  3. **Mulai Belajar** (03) — "Akses materi, ikuti sesi live, dan dapatkan sertifikat setelah menyelesaikan program."
- Warna aksen: orange

### 3.4 FAQ Section

shadcn/ui `Accordion` component. Background cream, centered layout.

#### Konseling FAQ (5 items)

1. **Apa itu konseling psikologi?** — Konseling adalah proses profesional yang membantu Anda mengatasi masalah emosional, mental, dan relasional bersama psikolog berlisensi dalam lingkungan yang aman dan rahasia.
2. **Siapa saja yang bisa mengikuti konseling?** — Semua orang yang merasa butuh dukungan psikologis. Tidak harus memiliki gangguan mental berat — konseling juga bermanfaat untuk pengembangan diri dan manajemen stres.
3. **Berapa lama durasi satu sesi konseling?** — Konseling individu berlangsung sekitar 60 menit, sedangkan konseling pasangan dan kelompok sekitar 90 menit per sesi.
4. **Apakah sesi konseling bersifat rahasia?** — Ya, seluruh sesi dijamin kerahasiaannya sesuai kode etik psikolog profesional. Data dan percakapan Anda tidak akan dibagikan kepada pihak manapun.
5. **Bagaimana cara membatalkan atau menjadwalkan ulang?** — Anda dapat melakukan reschedule maksimal 24 jam sebelum jadwal sesi melalui dashboard atau menghubungi customer support kami.

#### Pelatihan FAQ (5 items)

1. **Apa saja format pelatihan yang tersedia?** — Kami menyediakan tiga format: webinar live interaktif, kelas online on-demand yang bisa diakses kapan saja, dan mentoring 1-on-1 dengan mentor berpengalaman.
2. **Apakah ada sertifikat setelah mengikuti program?** — Ya, setiap program memberikan sertifikat digital resmi setelah Anda menyelesaikan seluruh materi dan evaluasi.
3. **Berapa lama akses materi kelas online?** — Akses seumur hidup. Setelah pembelian, Anda dapat mengulang materi kapan saja tanpa batas waktu.
4. **Apakah ada program gratis?** — Beberapa webinar tersedia secara gratis. Cek jadwal terbaru di halaman program untuk informasi lebih lanjut.
5. **Bagaimana cara mendaftar mentoring eksklusif?** — Pilih slot mentoring yang tersedia, lakukan pembayaran, dan mentor akan menghubungi Anda dalam 1x24 jam untuk menjadwalkan sesi pertama.

---

## 4. Komponen yang Di-reuse

- `ServiceCard` dari `@/features/psikotes/components/service-card` — untuk grid layanan/program
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` dari shadcn/ui — untuk tab filter
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` dari shadcn/ui — untuk FAQ
- Ornamen dekoratif (Plus, Hexagon, Diamond dari lucide-react) — konsisten dengan psikotes
- `cn()` dari `@/lib/utils` — Tailwind class composition

---

## 5. Implementation Order

1. **Types** — buat interface untuk kedua fitur
2. **Constants** — buat data files (services, programs, process, FAQ)
3. **Hero** — redesign kedua hero components
4. **Services/Programs Grid** — redesign dengan tab filter
5. **Process** — buat komponen baru
6. **FAQ** — buat komponen baru
7. **Page** — update page.tsx untuk compose semua section
8. **Barrel exports** — update index.ts di components dan constants
9. **Lint & build check**
10. **Test & push**
