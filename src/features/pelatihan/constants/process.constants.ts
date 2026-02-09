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
