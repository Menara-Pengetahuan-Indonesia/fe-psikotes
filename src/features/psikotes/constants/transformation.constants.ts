import {
  Search,
  MessageSquare,
  GraduationCap,
  Users,
} from 'lucide-react'

export const TRANSFORMATION_STEPS = [
  {
    id: 'pemetaan',
    title: 'Pemetaan Diri',
    description: 'Assessment & Psikotes Profesional sebagai baseline perubahanmu.',
    icon: Search,
    color: 'bg-primary-800 text-primary-50',
  },
  {
    id: 'konsultasi',
    title: 'Konsultasi & Layanan',
    description: 'Pahami langkah nyata yang harus diambil bersama para ahli.',
    icon: MessageSquare,
    color: 'bg-accent-500 text-white',
  },
  {
    id: 'masa-depan',
    title: 'Masa Depan',
    description: 'Pelatihan Mental Health & Sertifikasi Praktisi untuk tumbuh sukses.',
    icon: GraduationCap,
    color: 'bg-primary-600 text-white',
  },
  {
    id: 'komunitas',
    title: 'Bergabung Komunitas',
    description: 'Join BERMOELA sebagai Life Coach & Psikolog tersertifikasi.',
    icon: Users,
    color: 'bg-accent-600 text-white',
  }
]
