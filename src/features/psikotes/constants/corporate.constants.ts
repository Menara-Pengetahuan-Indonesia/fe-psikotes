import {
  TrendingUp, Building2, Crown, Rocket, Users, Briefcase,
  Handshake, Wrench, BarChart3, Bot
} from 'lucide-react'
import type { CorporateProduct, CorporateTierPricing } from '../types'

const CORPORATE_PRICING: CorporateTierPricing[] = [
  {
    tier: 'mandatory',
    label: 'Mandatory',
    description: 'Paket standar wajib untuk proses seleksi & asesmen',
  },
  {
    tier: 'comprehensive',
    label: 'Comprehensive',
    description: 'Paket menyeluruh dengan laporan mendalam & rekomendasi strategis',
  },
]

export const CORPORATE_PRODUCTS: CorporateProduct[] = [
  {
    id: 'corp-promosi-jabatan',
    slug: 'promosi-kenaikan-jabatan',
    title: 'Test untuk Promosi & Kenaikan Jabatan',
    description: 'Naik jabatan bukan hanya soal masa kerja, tapi soal kesiapan mental dan kompetensi baru. Asesmen ini membantu perusahaan memastikan bahwa kandidat yang dipromosikan memang memiliki kapasitas untuk memimpin, meminimalkan risiko "salah pilih" pemimpin.',
    icon: TrendingUp,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-branch-manager',
    slug: 'branch-manager-assessment',
    title: 'Branch Manager Assessment',
    description: 'Mengelola satu cabang sama dengan mengelola satu unit bisnis mandiri. Asesmen ini menggali kemampuan kandidat dalam mengelola operasional, mencapai target profit, hingga mitigasi risiko lokal. Pastikan setiap cabang dipimpin oleh sosok dengan mentalitas "pemilik bisnis."',
    icon: Building2,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-leadership-competency',
    slug: 'leadership-competency-assessment',
    title: 'Leadership Competency Assessment',
    description: 'Kepemimpinan yang efektif adalah mesin utama pertumbuhan organisasi. Asesmen ini membedah profil kepemimpinan secara mendalam, mulai dari cara mengambil keputusan di bawah tekanan hingga kemampuan menginspirasi tim.',
    icon: Crown,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-mt-mdp',
    slug: 'mt-mdp-assessment',
    title: 'MT & MDP Assessment',
    description: 'Management Trainee dan MDP adalah investasi jangka panjang. Asesmen ini menyaring talenta dengan resilience tinggi, learning agility, dan potensi kepemimpinan besar untuk ditempa menjadi eksekutif perusahaan di masa depan.',
    icon: Rocket,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-rekrutmen-staff',
    slug: 'recruitment-staff-level',
    title: 'Recruitment for Staff Level',
    description: 'Staf adalah tulang punggung operasional harian. Asesmen kami fokus pada kesesuaian keterampilan teknis, ketelitian, dan integritas kerja. Saring ribuan pelamar dengan cepat tanpa mengorbankan kualitas.',
    icon: Users,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-rekrutmen-eksekutif',
    slug: 'recruitment-executive-level',
    title: 'Recruitment for Executive Level',
    description: 'Mencari C-Level atau Direksi memerlukan pendekatan yang jauh lebih personal dan diskret. Asesmen eksekutif kami menggunakan metode in-depth interview dan simulasi strategis untuk membedah gaya kepemimpinan dan nilai-nilai pribadi kandidat.',
    icon: Briefcase,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-cultural-fit',
    slug: 'person-org-cultural-fit',
    title: 'Person, Organization & Cultural Fit',
    description: 'Karyawan yang pintar bisa berhenti jika tidak merasa "cocok" dengan budaya kantor. Asesmen ini mengukur sejauh mana nilai-nilai pribadi seseorang selaras dengan nilai-nilai perusahaan untuk meningkatkan retensi jangka panjang.',
    icon: Handshake,
    category: 'bisnis',
    callForDetail: true,
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-customized-assessment',
    slug: 'customized-competency-assessment',
    title: 'Customized Competency Based Assessment',
    description: 'Setiap industri punya tantangan unik yang tidak bisa diukur dengan tes standar. Asesmen ini kami rancang khusus (bespoke) sesuai dengan kamus kompetensi unik perusahaan Anda — perbankan, manufaktur, hingga teknologi.',
    icon: Wrench,
    category: 'bisnis',
    callForDetail: true,
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-org-audit-7s',
    slug: 'organization-audit-7s-mckinsey',
    title: 'Organization Audit based on 7S McKinsey',
    description: 'Audit ini adalah medical check-up total untuk kesehatan organisasi Anda. Menggunakan kerangka 7S McKinsey, kami membedah elemen internal mana yang saling mendukung atau justru saling menghambat pertumbuhan bisnis.',
    icon: BarChart3,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
  {
    id: 'corp-ai-readiness-audit',
    slug: 'digital-transformation-ai-readiness',
    title: 'Digital Transformation & Agentic AI Readiness Audit',
    description: 'Dunia berubah, apakah tim Anda sudah siap? Audit ini mengukur kesiapan organisasi dalam menghadapi transformasi digital dan integrasi AI — bukan hanya infrastruktur, tapi yang lebih penting: kesiapan mentalitas SDM.',
    icon: Bot,
    category: 'bisnis',
    pricing: CORPORATE_PRICING,
  },
]
