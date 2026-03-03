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
    theme: 'bg-white text-indigo-600 border-indigo-100',
    accent: 'text-indigo-500',
    gradient: 'from-indigo-500/20 to-indigo-700/20',
    content: {
      problem: 'Merasa lumpuh oleh trauma masa lalu, takut menghadapi hari esok, dan kehilangan jati diri.',
      product: 'Psikotes Kepribadian, & Konseling Personal.',
      solution: 'Lepaskan beban masa lalu, dan temukan kekuatan baru melalui asesmen akurat.',
      benefit: 'Lahir kembali sebagai sosok yang kuat, berani, dan sadar akan potensi sejatimu.'
    }
  },
  {
    id: 'relationship',
    title: 'Relationship',
    subtitle: 'Pasangan & Keluarga',
    icon: Heart,
    theme: 'bg-white text-rose-500 border-rose-100',
    accent: 'text-rose-400',
    gradient: 'from-rose-400/20 to-rose-600/20',
    content: {
      problem: 'Hubungan yang beracun, komunikasi yang mati, atau terjebak dalam trauma pasangan.',
      product: 'Asesmen Kecocokan Pasangan, & Konseling Keluarga.',
      solution: 'Bongkar dinamika hubunganmu, temukan solusi nyata untuk membangun keharmonisan.',
      benefit: 'Wujudkan hubungan yang sehat, damai, dan masa depan keluarga yang indah.'
    }
  },
  {
    id: 'professional',
    title: 'Karir & Bisnis',
    subtitle: 'Professional Path',
    icon: Briefcase,
    theme: 'bg-white text-amber-600 border-amber-100',
    accent: 'text-amber-500',
    gradient: 'from-amber-500/20 to-amber-700/20',
    content: {
      problem: 'Gagal memilih jurusan, karir yang macet, atau merasa salah tempat dalam pekerjaan.',
      product: 'Tes Minat Bakat, & Sertifikasi Praktisi Mental Health.',
      solution: 'Tentukan arah hidupmu secara presisi, berhenti membuang waktu di jalan yang salah.',
      benefit: 'Raih kesuksesan finansial tanpa mengorbankan kesehatan mentalmu.'
    }
  }
]
