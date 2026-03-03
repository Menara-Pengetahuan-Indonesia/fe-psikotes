import {
  Search,
  MessageSquare,
  GraduationCap,
  Users,
} from 'lucide-react'

export const TRANSFORMATION_STEPS = [
  {
    id: 'pemetaan',
    title: 'Bedah Akurat Dirimu',
    description: 'Hentikan tebak-tebakan, gunakan baseline psikotes profesional untuk melihat siapa kamu sebenarnya.',
    icon: Search,
    color: 'bg-primary-800 text-primary-50',
  },
  {
    id: 'konsultasi',
    title: 'Tuntaskan Akar Masalah',
    description: 'Urai benang kusut masalahmu bersama ahli, temukan langkah nyata untuk berhenti merasa stuck.',
    icon: MessageSquare,
    color: 'bg-accent-500 text-white',
  },
  {
    id: 'masa-depan',
    title: 'Kuasai Masa Depan',
    description: 'Pelatihan Mental Health, & Sertifikasi Praktisi untuk memegang kendali penuh atas karir dan hidupmu.',
    icon: GraduationCap,
    color: 'bg-primary-600 text-white',
  },
  {
    id: 'komunitas',
    title: 'Jadilah Cahaya Solusi',
    description: 'Berdampaklah bagi orang lain, bergabung sebagai Life Coach, & Psikolog profesional yang tersertifikasi.',
    icon: Users,
    color: 'bg-accent-600 text-white',
  }
]
