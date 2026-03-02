import {
  User,
  Heart,
  Briefcase,
} from 'lucide-react'

export const NAV_CATEGORIES = [
  {
    id: 'personal',
    title: 'Diri Sendiri',
    subtitle: 'Personal Growth',
    icon: User,
    theme: 'bg-white text-primary-600 border-primary-100',
    accent: 'text-primary-500',
    gradient: 'from-primary-600 to-primary-800',
    content: {
      problem: 'Merasa stuck dengan trauma masa lalu, cemas akan masa depan, atau tidak kenal potensi diri.',
      product: 'Psikotes Kepribadian & Konseling Personal.',
      solution: 'Melepaskan kendala masa lalu melalui pemetaan mental health yang akurat.',
      benefit: 'Menjadi "The New You" yang sadar, kuat, dan siap tumbuh secara optimal.'
    }
  },
  {
    id: 'relationship',
    title: 'Relationship',
    subtitle: 'Pasangan & Keluarga',
    icon: Heart,
    theme: 'bg-white text-rose-600 border-rose-100',
    accent: 'text-rose-500',
    gradient: 'from-rose-500 to-rose-700',
    content: {
      problem: 'Sering konflik dengan pasangan, sulit berkomunikasi, atau trauma dalam hubungan.',
      product: 'Asesmen Kecocokan Pasangan & Konseling Keluarga.',
      solution: 'Kenali pasangan dan dinamika hubunganmu untuk membangun harmoni.',
      benefit: 'Membangun hubungan yang sehat dan masa depan keluarga yang indah.'
    }
  },
  {
    id: 'professional',
    title: 'Karir & Bisnis',
    subtitle: 'Professional Path',
    icon: Briefcase,
    theme: 'bg-white text-amber-600 border-amber-100',
    accent: 'text-amber-500',
    gradient: 'from-amber-500 to-amber-700',
    content: {
      problem: 'Salah jurusan, stagnan di karir, atau kesulitan memimpin tim dalam bisnis.',
      product: 'Tes Minat Bakat & Sertifikasi Praktisi Mental Health.',
      solution: 'Tentukan arah hidupmu secara presisi baik untuk diri maupun bisnis.',
      benefit: 'Mencapai kesuksesan finansial tanpa mengorbankan kesehatan mental.'
    }
  }
]
