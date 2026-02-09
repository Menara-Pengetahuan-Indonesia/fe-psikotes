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
