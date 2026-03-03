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
// Mahasiswa & Pelajar
// ---------------------------------------------------------------------------
export const MAHASISWA_TESTS: PsikotesTest[] = [
  {
    id: 'mahasiswa-minat-bakat',
    slug: 'minat-bakat',
    title: 'Minat Bakat (Titik Mula)',
    tag: 'Career',
    icon: Compass,
    description:
      'Temukan potensi terpendam dan arah karir yang membuatmu benar-benar tumbuh dan sukses.',
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
      'Ukur kapasitas kognitif sebagai baseline untuk merancang masa depan yang lebih cerah.',
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
      'Persiapkan dirimu menembus universitas impian untuk menjadi penentu masa depanmu sendiri.',
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
      'Latih kemampuanmu untuk meraih posisi di instansi pemerintahan dan berbakti bagi negeri.',
    users: '25k+ Peserta',
    duration: '100 Menit',
    price: 'Mulai Rp 40rb',
    category: 'mahasiswa',
  },
]

// ---------------------------------------------------------------------------
// Perusahaan / Corporate
// ---------------------------------------------------------------------------
export const PERUSAHAAN_TESTS: CorporateTest[] = [
  {
    id: 'perusahaan-rekrutmen',
    slug: 'rekrutmen',
    title: 'Rekrutmen',
    tag: 'Hiring',
    icon: UserPlus,
    description:
      'Temukan talenta yang tidak hanya sekadar bertahan, tapi mampu tumbuh dan sukses bersama perusahaan.',
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
      'Evaluasi potensi kepemimpinan untuk memastikan timmu berkembang dengan sehat dan berdaya juang.',
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
      'Bantu tim merancang jalur karir yang selaras dengan "The New You" dalam konteks profesional.',
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
// Mental Health
// ---------------------------------------------------------------------------
export const KESEHATAN_MENTAL_TESTS: PsikotesTest[] = [
  {
    id: 'kesehatan-mental-kepribadian',
    slug: 'kepribadian',
    title: 'Kepribadian (The New You)',
    tag: 'Personality',
    icon: Smile,
    description:
      'Lepaskan diri dari kendala masa lalu dan kenali jati dirimu yang baru untuk hidup yang lebih indah.',
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
      'Bukan hanya baik-baik saja, tapi benar-benar berkembang dan sukses di era penuh tekanan.',
    users: '8k+ Peserta',
    duration: '20 Menit',
    price: 'Mulai Rp 60rb',
    category: 'kesehatan-mental',
    subCategory: 'Mental Health',
  },
  {
    id: 'kesehatan-mental-relationship',
    slug: 'relationship',
    title: 'Relationship (Kenali Pasanganmu)',
    tag: 'Couples',
    icon: Heart,
    description:
      'Bangun hubungan yang indah dan masa depan yang sukses bersama pasangan pilihanmu.',
    users: '5k+ Pasangan',
    duration: '40 Menit',
    price: 'Mulai Rp 90rb',
    category: 'kesehatan-mental',
    subCategory: 'Hubungan',
  },
]

// ---------------------------------------------------------------------------
// Gratis
// ---------------------------------------------------------------------------
export const GRATIS_TESTS: PsikotesTest[] = [
  {
    id: 'gratis-tes-kepribadian-mbti',
    slug: 'tes-kepribadian-mbti',
    title: 'Tes Kepribadian MBTI',
    tag: 'Kepribadian',
    icon: Users,
    description:
      'Titik awal untuk mengenal bagaimana caramu berinteraksi dengan dunia.',
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
      'Optimalkan cara belajarmu untuk tumbuh satu persen lebih baik setiap harinya.',
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
      'Ukur seberapa kuat daya juangmu dalam mengelola emosi diri sendiri.',
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
      'Temukan rekomendasi karir yang sukses dan sesuai dengan minat potensimu.',
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
      'Kenali cara kamu memberi kasih sayang untuk masa depan hubungan yang indah.',
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
    tag: 'Mental Health',
    icon: Brain,
    description:
      'Cek tingkat stresmu dan temukan cara untuk tetap berdaya di era tekanan.',
    users: '450rb+',
    duration: '12 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Mental Health',
  },
  {
    id: 'gratis-tes-burnout-kerja',
    slug: 'tes-burnout-kerja',
    title: 'Tes Burnout Kerja',
    tag: 'Karir',
    icon: Briefcase,
    description:
      'Apakah beban kerjamu menghambat pertumbuhanmu? Cek kondisimu sekarang.',
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
      'Analisis baseline hubunganmu untuk berkembang kuat bersama pasangan.',
    users: '1.5jt+',
    duration: '20 Menit',
    price: null,
    category: 'gratis',
    subCategory: 'Hubungan',
  },
]

// ---------------------------------------------------------------------------
// Premium
// ---------------------------------------------------------------------------
export const PREMIUM_TESTS: PsikotesTest[] = [
  {
    id: 'premium-tes-iq-profesional',
    slug: 'tes-iq-profesional',
    title: 'Tes IQ Profesional',
    tag: 'Intelligence',
    icon: Brain,
    description:
      'Ukur kapasitas kognitifmu secara akurat sebagai penentu masa depanmu sendiri.',
    users: '15k+',
    duration: '45 Menit',
    price: 'Rp125.000',
    category: 'premium',
    subCategory: 'Intelligence',
  },
  {
    id: 'premium-minat-bakat-komprehensif',
    slug: 'minat-bakat-komprehensif',
    title: 'Minat Bakat (Full Profile)',
    tag: 'Karir & Studi',
    icon: Briefcase,
    description:
      'Laporan detail untuk merancang jalur sukses yang selaras dengan jati dirimu.',
    users: '8.5k+',
    duration: '60 Menit',
    price: 'Rp199.000',
    category: 'premium',
    subCategory: 'Karir & Studi',
  },
  {
    id: 'premium-tes-kesehatan-mental-lengkap',
    slug: 'tes-kesehatan-mental-lengkap',
    title: 'Tes Mental Health Lengkap',
    tag: 'Klinis',
    icon: Zap,
    description:
      'Screening mendalam untuk memastikanmu tumbuh kuat dan sukses di era tekanan.',
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
      'Asesmen standar klinis untuk melepaskan diri dari kendala mental terdahulu.',
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
      'Kenali gaya kepemimpinanmu untuk menjadi penentu masa depan dalam bisnis.',
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
      'Evaluasi kesiapanmu untuk membangun masa depan hubungan yang indah dan bermakna.',
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
      'Simulasi presisi untuk memastikan langkah suksesmu menuju universitas impian.',
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
      'Analisis mendalam untuk pengembangan diri menuju "The New You" yang utuh.',
    users: '30k+',
    duration: '40 Menit',
    price: 'Rp149.000',
    category: 'premium',
    subCategory: 'Kepribadian',
  },
]
