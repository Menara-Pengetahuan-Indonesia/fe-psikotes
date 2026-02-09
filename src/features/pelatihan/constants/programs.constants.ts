import { Video, BookOpen, UserCheck } from 'lucide-react'
import type { PelatihanProgram } from '../types'

export const PELATIHAN_PROGRAMS: PelatihanProgram[] = [
  {
    title: 'Program Webinar',
    price: 'Rp99.000',
    tag: 'Webinar',
    description: 'Webinar live interaktif setiap minggu bersama praktisi berpengalaman di bidang pengembangan diri dan karir.',
    icon: Video,
  },
  {
    title: 'Kelas Online',
    price: 'Rp199.000',
    tag: 'Kelas',
    description: 'Akses ratusan materi video on-demand untuk belajar kapan saja dengan kurikulum terstruktur.',
    icon: BookOpen,
  },
  {
    title: 'Mentoring Eksklusif',
    price: 'Rp499.000',
    tag: 'Mentoring',
    description: 'Bimbingan intensif 1-on-1 dengan mentor profesional untuk akselerasi pertumbuhan karirmu.',
    icon: UserCheck,
  },
]
