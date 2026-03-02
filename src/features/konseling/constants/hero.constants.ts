import { ShieldCheck, Award, Target, HeartHandshake } from 'lucide-react'

export const KONSELING_HERO_BENEFITS = [
  {
    label: 'Confidential',
    desc: 'Sesi privat dan aman',
    icon: ShieldCheck,
  },
  {
    label: 'Licensed Experts',
    desc: 'Psikolog klinis berlisensi',
    icon: Award,
  },
  {
    label: 'Personalized',
    desc: 'Pendekatan sesuai kebutuhanmu',
    icon: Target,
  },
  {
    label: 'Follow-up Care',
    desc: 'Dukungan berkelanjutan',
    icon: HeartHandshake,
  },
]

export const KONSELING_TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  individu: ['Individu'],
  pasangan: ['Pasangan'],
  kelompok: ['Kelompok'],
}
