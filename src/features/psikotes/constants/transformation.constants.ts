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
    description: 'Mulai dengan assessment & psikotes profesional untuk memahami pola pikir, emosi, dan potensi dirimu sebagai langkah awal perubahan',
    icon: Search,
    color: 'bg-emerald-500 text-white',
  },
  {
    id: 'konsultasi',
    title: 'Konsultasi & Layanan',
    description: 'Pahami langkah nyata yang harus diambil bersama para ahli.',
    icon: MessageSquare,
    color: 'bg-amber-400 text-white',
  },
  {
    id: 'masa-depan',
    title: 'Masa Depan',
    description: 'Ikuti program pengembangan untuk memperkuat mental health dan meningkatkan kapasitas dirimu dalam hidup maupun karier',
    icon: GraduationCap,
    color: 'bg-sky-500 text-white',
  },
  {
    id: 'komunitas',
    title: 'Bergabung Komunitas',
    description: 'Terhubung dengan komunitas dan praktisi yang saling mendukung dalam proses pemulihan dan pertumbuhan',
    icon: Users,
    color: 'bg-amber-500 text-white',
  }
]
