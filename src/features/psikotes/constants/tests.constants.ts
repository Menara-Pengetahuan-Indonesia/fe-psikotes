import {
  Compass,
  Brain,
  BookOpen,
  Building2,
  UserPlus,
  TrendingUp,
  Map,
  Smile,
  Activity,
  Heart,
  Users,
  Briefcase,
  Star,
  Gem,
  Zap,
} from 'lucide-react'

import type { PsikotesTest, CorporateTest } from '../types'

// ---------------------------------------------------------------------------
// Mahasiswa & Pelajar  (source: psikotest-ipsi/.../mahasiswa/page.tsx)
// ---------------------------------------------------------------------------
export const MAHASISWA_TESTS: PsikotesTest[] = [
  {
    id: 'mahasiswa-minat-bakat',
    slug: 'minat-bakat',
    title: 'Minat Bakat',
    tag: 'Career',
    icon: Compass,
    description:
      'Temukan potensi terpendam dan arah jurusan atau karir yang paling sesuai dengan kepribadian Anda.',
    users: '10k+ Peserta',
    duration: '45 Menit',
    price: 'Mulai Rp 75rb',
    category: 'mahasiswa',
  },
  {
    id: 'mahasiswa-intelegensi',
    slug: 'intelegensi',
    title: 'Intelegensi',
    tag: 'IQ Test',
    icon: Brain,
    description:
      'Ukur kapasitas kognitif dan kemampuan pemecahan masalah dengan standar alat tes psikologi terpercaya.',
    users: '15k+ Peserta',
    duration: '60 Menit',
    price: 'Mulai Rp 50rb',
    category: 'mahasiswa',
  },
  {
    id: 'mahasiswa-try-out',
    slug: 'try-out',
    title: 'Try Out (UTBK, DLL)',
    tag: 'Education',
    icon: BookOpen,
    description:
      'Persiapkan diri menembus universitas impian dengan simulasi ujian yang akurat dan pembahasan lengkap.',
    users: '50k+ Peserta',
    duration: '90 Menit',
    price: 'Mulai Rp 25rb',
    category: 'mahasiswa',
  },
  {
    id: 'mahasiswa-cpns',
    slug: 'cpns',
    title: 'CPNS',
    tag: 'Government',
    icon: Building2,
    description:
      'Latih kemampuan SKD (TWK, TIU, TKP) dengan soal-soal terupdate untuk persiapan seleksi ASN.',
    users: '25k+ Peserta',
    duration: '100 Menit',
    price: 'Mulai Rp 40rb',
    category: 'mahasiswa',
  },
]

// ---------------------------------------------------------------------------
// Perusahaan / Corporate  (source: psikotest-ipsi/.../perusahaan/page.tsx)
// ---------------------------------------------------------------------------
export const PERUSAHAAN_TESTS: CorporateTest[] = [
  {
    id: 'perusahaan-rekrutmen',
    slug: 'rekrutmen',
    title: 'Rekrutmen',
    tag: 'Hiring',
    icon: UserPlus,
    description:
      'Solusi psikotes komprehensif untuk menyeleksi kandidat terbaik yang sesuai dengan budaya dan kebutuhan perusahaan.',
    users: '500+ Perusahaan',
    duration: 'Fleksibel',
    price: 'Mulai Rp 150rb',
    category: 'perusahaan',
    features: [
      { label: 'Screening Awal' },
      { label: 'Interview Guide' },
      { label: 'Culture Fit' },
    ],
  },
  {
    id: 'perusahaan-kenaikan-jabatan',
    slug: 'kenaikan-jabatan',
    title: 'Kenaikan Jabatan',
    tag: 'Promotion',
    icon: TrendingUp,
    description:
      'Evaluasi potensi karyawan untuk posisi kepemimpinan dan tanggung jawab yang lebih besar.',
    users: '200+ Perusahaan',
    duration: '60 Menit',
    price: 'Mulai Rp 250rb',
    category: 'perusahaan',
    features: [
      { label: 'Leadership Potential' },
      { label: 'Competency Mapping' },
      { label: 'Performance Review' },
    ],
  },
  {
    id: 'perusahaan-perencanaan-karir',
    slug: 'perencanaan-karir',
    title: 'Perencanaan Karir',
    tag: 'Development',
    icon: Map,
    description:
      'Bantu karyawan merancang jalur karir yang jelas dan selaras dengan tujuan jangka panjang perusahaan.',
    users: '150+ Perusahaan',
    duration: '45 Menit',
    price: 'Mulai Rp 200rb',
    category: 'perusahaan',
    features: [
      { label: 'Career Coaching' },
      { label: 'Skill Gap Analysis' },
      { label: 'Growth Plan' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Kesehatan Mental  (source: psikotest-ipsi/.../kesehatan-mental/page.tsx)
// ---------------------------------------------------------------------------
export const KESEHATAN_MENTAL_TESTS: PsikotesTest[] = [
  {
    id: 'kesehatan-mental-kepribadian',
    slug: 'kepribadian',
    title: 'Kepribadian',
    tag: 'Personality',
    icon: Smile,
    description:
      'Kenali diri Anda lebih dalam melalui asesmen kepribadian yang komprehensif untuk pengembangan diri yang lebih baik.',
    users: '12k+ Peserta',
    duration: '30 Menit',
    price: 'Mulai Rp 50rb',
    category: 'kesehatan-mental',
    subCategory: 'Kepribadian',
  },
  {
    id: 'kesehatan-mental-mental-health',
    slug: 'mental-health',
    title: 'Mental Health, Stress & Anxiety',
    tag: 'Well-being',
    icon: Activity,
    description:
      'Deteksi dini tingkat stres, kecemasan, dan depresi untuk menjaga kesehatan mental yang optimal.',
    users: '8k+ Peserta',
    duration: '20 Menit',
    price: 'Mulai Rp 60rb',
    category: 'kesehatan-mental',
    subCategory: 'Kesehatan Mental',
  },
  {
    id: 'kesehatan-mental-relationship',
    slug: 'relationship',
    title: 'Relationship',
    tag: 'Couples',
    icon: Heart,
    description:
      'Pahami dinamika hubungan Anda dengan pasangan, gaya komunikasi, dan bahasa cinta untuk hubungan yang lebih harmonis.',
    users: '5k+ Pasangan',
    duration: '40 Menit',
    price: 'Mulai Rp 90rb',
    category: 'kesehatan-mental',
    subCategory: 'Hubungan',
  },
]

// ---------------------------------------------------------------------------
// Gratis  (source: psikotest-ipsi/.../gratis/page.tsx)
// ---------------------------------------------------------------------------
export const GRATIS_TESTS: PsikotesTest[] = [
  {
    id: 'gratis-tes-kepribadian-mbti',
    slug: 'tes-kepribadian-mbti',
    title: 'Tes Kepribadian MBTI',
    tag: 'Kepribadian',
    icon: Users,
    description:
      'Cari tahu tipe kepribadianmu dan bagaimana caramu berinteraksi dengan dunia.',
    users: '1.2jt+',
    duration: '15 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Kepribadian',
  },
  {
    id: 'gratis-tes-gaya-belajar',
    slug: 'tes-gaya-belajar',
    title: 'Tes Gaya Belajar',
    tag: 'Edukasi',
    icon: Brain,
    description:
      'Optimalkan cara belajarmu dengan mengetahui metode belajar yang paling efektif.',
    users: '850rb+',
    duration: '10 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Edukasi',
  },
  {
    id: 'gratis-tes-kecerdasan-emosional',
    slug: 'tes-kecerdasan-emosional',
    title: 'Tes Kecerdasan Emosional',
    tag: 'Kepribadian',
    icon: Heart,
    description:
      'Ukur seberapa baik kamu dalam mengenal dan mengelola emosi diri sendiri.',
    users: '500rb+',
    duration: '20 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Kepribadian',
  },
  {
    id: 'gratis-tes-minat-karir',
    slug: 'tes-minat-karir',
    title: 'Tes Minat Karir',
    tag: 'Karir',
    icon: Briefcase,
    description:
      'Temukan rekomendasi karir yang sesuai dengan minat dan potensimu.',
    users: '920rb+',
    duration: '25 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Karir',
  },
  {
    id: 'gratis-tes-love-language',
    slug: 'tes-love-language',
    title: 'Tes Love Language',
    tag: 'Hubungan',
    icon: Heart,
    description:
      'Kenali cara kamu memberi dan menerima kasih sayang dalam hubungan.',
    users: '2.5jt+',
    duration: '10 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Hubungan',
  },
  {
    id: 'gratis-tes-stress-level',
    slug: 'tes-stress-level',
    title: 'Tes Stress Level',
    tag: 'Kesehatan Mental',
    icon: Brain,
    description:
      'Cek tingkat stresmu saat ini dan dapatkan tips untuk mengelolanya.',
    users: '450rb+',
    duration: '12 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Kesehatan Mental',
  },
  {
    id: 'gratis-tes-burnout-kerja',
    slug: 'tes-burnout-kerja',
    title: 'Tes Burnout Kerja',
    tag: 'Karir',
    icon: Briefcase,
    description:
      'Apakah kamu mengalami kelelahan kerja? Cek kondisimu sekarang.',
    users: '320rb+',
    duration: '15 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Karir',
  },
  {
    id: 'gratis-tes-kecocokan-pasangan',
    slug: 'tes-kecocokan-pasangan',
    title: 'Tes Kecocokan Pasangan',
    tag: 'Hubungan',
    icon: Users,
    description:
      'Analisis kecocokan hubunganmu berdasarkan aspek psikologis.',
    users: '1.5jt+',
    duration: '20 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Hubungan',
  },
]

// ---------------------------------------------------------------------------
// Premium  (source: psikotest-ipsi/.../premium/page.tsx)
// ---------------------------------------------------------------------------
export const PREMIUM_TESTS: PsikotesTest[] = [
  {
    id: 'premium-tes-iq-profesional',
    slug: 'tes-iq-profesional',
    title: 'Tes IQ Profesional',
    tag: 'Intelligence',
    icon: Brain,
    description:
      'Ukur tingkat kecerdasan intelektualmu dengan standar internasional (CFIT/IST).',
    users: '15k+',
    duration: '45 Menit',
    price: 'Rp125.000',
    category: 'premium',
    subCategory: 'Intelligence',
  },
  {
    id: 'premium-minat-bakat-komprehensif',
    slug: 'minat-bakat-komprehensif',
    title: 'Minat Bakat Komprehensif',
    tag: 'Karir & Studi',
    icon: Briefcase,
    description:
      'Laporan detail 30+ halaman tentang potensi karir dan jurusan kuliah yang paling cocok.',
    users: '8.5k+',
    duration: '60 Menit',
    price: 'Rp199.000',
    category: 'premium',
    subCategory: 'Karir & Studi',
  },
  {
    id: 'premium-tes-kesehatan-mental-lengkap',
    slug: 'tes-kesehatan-mental-lengkap',
    title: 'Tes Kesehatan Mental Lengkap',
    tag: 'Klinis',
    icon: Zap,
    description:
      'Screening mendalam untuk depresi, kecemasan, dan stress dengan validasi psikolog.',
    users: '12k+',
    duration: '40 Menit',
    price: 'Rp150.000',
    category: 'premium',
    subCategory: 'Klinis',
  },
  {
    id: 'premium-mmpi-2-screening',
    slug: 'mmpi-2-screening',
    title: 'MMPI-2 Screening',
    tag: 'Kepribadian',
    icon: Users,
    description:
      'Tes kepribadian standar klinis yang digunakan untuk seleksi kerja dan diagnosis.',
    users: '5k+',
    duration: '90 Menit',
    price: 'Rp250.000',
    category: 'premium',
    subCategory: 'Kepribadian',
  },
  {
    id: 'premium-leadership-style-analysis',
    slug: 'leadership-style-analysis',
    title: 'Leadership Style Analysis',
    tag: 'Karir',
    icon: Star,
    description:
      'Kenali gaya kepemimpinanmu untuk meningkatkan performa manajerial.',
    users: '20k+',
    duration: '30 Menit',
    price: 'Rp99.000',
    category: 'premium',
    subCategory: 'Karir',
  },
  {
    id: 'premium-tes-kesiapan-nikah',
    slug: 'tes-kesiapan-nikah',
    title: 'Tes Kesiapan Nikah',
    tag: 'Hubungan',
    icon: Gem,
    description:
      'Evaluasi kesiapan mental dan emosional kamu dan pasangan sebelum menikah.',
    users: '9k+',
    duration: '50 Menit',
    price: 'Rp175.000',
    category: 'premium',
    subCategory: 'Hubungan',
  },
  {
    id: 'premium-tes-potensi-akademik-tpa',
    slug: 'tes-potensi-akademik-tpa',
    title: 'Tes Potensi Akademik (TPA)',
    tag: 'Edukasi',
    icon: Brain,
    description:
      'Simulasi TPA untuk persiapan masuk perguruan tinggi atau CPNS.',
    users: '45k+',
    duration: '60 Menit',
    price: 'Rp75.000',
    category: 'premium',
    subCategory: 'Edukasi',
  },
  {
    id: 'premium-full-personality-profile',
    slug: 'full-personality-profile',
    title: 'Full Personality Profile',
    tag: 'Kepribadian',
    icon: Users,
    description:
      'Analisis kepribadian Big Five secara mendalam untuk pengembangan diri.',
    users: '30k+',
    duration: '40 Menit',
    price: 'Rp149.000',
    category: 'premium',
    subCategory: 'Kepribadian',
  },
]
