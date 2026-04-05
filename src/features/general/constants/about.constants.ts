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
  {
    icon: ShieldCheck,
    title: 'Profesional',
    desc: 'Standar etika profesi tertinggi.',
  },
  {
    icon: Trophy,
    title: 'Terpercaya',
    desc: 'Didukung psikolog berlisensi.',
  },
  {
    icon: Lightbulb,
    title: 'Inovatif',
    desc: 'Metode asesmen modern.',
  },
  {
    icon: Heart,
    title: 'Inklusif',
    desc: 'Untuk semua kalangan.',
  },
  {
    icon: Rocket,
    title: 'Berdampak',
    desc: 'Hasil nyata dan terukur.',
  },
  {
    icon: Handshake,
    title: 'Kolaboratif',
    desc: 'Bersama institusi & perusahaan.',
  },
] as const

export const SERVICES_OVERVIEW = [
  {
    icon: Brain,
    title: 'Psikotes Online',
    desc:
      'Asesmen psikologi terstandar dengan'
      + ' hasil real-time dan laporan'
      + ' komprehensif.',
    color: 'bg-primary-600',
    lightBg: 'bg-primary-50',
    lightText: 'text-primary-600',
  },
] as const

export const STATS = [
  { value: '50K+', label: 'Pengguna Aktif' },
  { value: '200+', label: 'Tes Tersedia' },
  { value: '50+', label: 'Psikolog Berlisensi' },
  { value: '98%', label: 'Tingkat Kepuasan' },
] as const
