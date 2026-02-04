import { Layout, FileText } from 'lucide-react'
import type { Service } from '../types'

export const SERVICES: Service[] = [
  {
    title: 'Psikotes Online Premium',
    price: 'Rp25.000',
    tag: 'Terpopuler',
    description: 'Analisis mendalam berbasis riset untuk hasil akurat.',
    icon: Layout
  },
  {
    title: 'Mentoring Satu Persen',
    price: 'Rp150.000',
    tag: 'Personal',
    description: 'Bimbingan intensif 1-on-1 dengan mentor terlatih.',
    icon: FileText
  },
  {
    title: 'Konseling Psikolog',
    price: 'Rp350.000',
    tag: 'Klinis',
    description: 'Sesi profesional bersama psikolog klinis berpengalaman.',
    icon: Layout
  },
  {
    title: 'Webinar Lifeskills',
    price: 'Gratis',
    tag: 'Edukasi',
    description: 'Belajar keterampilan hidup dasar secara interaktif.',
    icon: FileText
  },
  {
    title: 'Kelas Berlangganan',
    price: 'Rp99.000',
    tag: 'Premium',
    description: 'Akses ratusan materi video pengembangan diri.',
    icon: Layout
  },
  {
    title: 'Tes Karir & Minat Bakat',
    price: 'Rp45.000',
    tag: 'Karir',
    description: 'Temukan jalur karir yang sesuai dengan kepribadianmu.',
    icon: FileText
  }
]
