import {
  Search,
  MessageSquare,
  GraduationCap,
  Users,
} from 'lucide-react'

export const PILLARS = [
  {
    id: 'pemetaan',
    title: 'Kenali Dirimu (Pemetaan Diri)',
    subtitle: 'Baseline & Titik Awal',
    description: 'Tanpa kesadaran tidak mungkin ada perubahan. Pahami area yang kurang dan area yang sudah bagus.',
    icon: Search,
    color: 'bg-primary-100 text-primary-600',
    accentColor: 'text-primary-500',
    theme: {
      bg: 'bg-primary-600',
      text: 'text-primary-100',
      accent: 'bg-accent-400',
      shadow: 'shadow-primary-900/20'
    },
    detail: {
      problem: 'Merasa stuck, tidak tahu arah, atau bingung dengan potensi diri sendiri.',
      product: 'Asesmen & Psikotes Profesional (Bermula Assessment).',
      solution: 'Melakukan pemetaan diri secara akurat berdasarkan riset psikologi.',
      benefit: 'Memiliki baseline yang jelas untuk merancang masa depan.'
    }
  },
  {
    id: 'konsultasi',
    title: 'Kenali Hidupmu (Konsultasi)',
    subtitle: 'Pahami Harus Bagaimana',
    description: 'Konsultasikan hasil tes dengan ahlinya sehingga kamu paham langkah nyata yang harus diambil.',
    icon: MessageSquare,
    color: 'bg-indigo-100 text-indigo-600',
    accentColor: 'text-indigo-500',
    theme: {
      bg: 'bg-indigo-900',
      text: 'text-indigo-100',
      accent: 'bg-rose-400',
      shadow: 'shadow-indigo-900/20'
    },
    detail: {
      problem: 'Sudah tahu masalahnya, tapi tidak tahu cara mengurainya secara tuntas.',
      product: 'Layanan Konseling & Konsultasi Ahli.',
      solution: 'Sesi privat dengan psikolog profesional untuk mendapatkan panduan personal.',
      benefit: 'Ketenangan pikiran dan strategi hidup yang lebih terarah.'
    }
  },
  {
    id: 'pelatihan',
    title: 'Rancang Masa Depan (Pelatihan)',
    subtitle: 'Tumbuh & Sukses',
    description: 'Tingkatkan kemampuanmu dalam bidang mental health. Bukan sekadar bertahan, tapi benar-benar berkembang.',
    icon: GraduationCap,
    color: 'bg-amber-100 text-amber-600',
    accentColor: 'text-amber-500',
    theme: {
      bg: 'bg-amber-500',
      text: 'text-amber-50',
      accent: 'bg-white',
      shadow: 'shadow-amber-900/20'
    },
    detail: {
      problem: 'Kurangnya skill untuk menghadapi tekanan atau ingin mendalami bidang psikologi.',
      product: 'Pelatihan Mental Health & Sertifikasi Praktisi.',
      solution: 'Belajar metode praktis untuk tumbuh kuat dan sukses di era penuh tekanan.',
      benefit: 'Menjadi pribadi yang berdaya dan memiliki sertifikasi kompetensi.'
    }
  },
  {
    id: 'komunitas',
    title: 'Kenali Masa Depanmu (Komunitas)',
    subtitle: 'Berikan Solusi Bagi Lainnya',
    description: 'Bergabunglah menjadi bagian dari solusi. Jadilah mental health practitioner and bantu sesama.',
    icon: Users,
    color: 'bg-primary-100 text-primary-600',
    accentColor: 'text-primary-500',
    theme: {
      bg: 'bg-primary-800',
      text: 'text-primary-100',
      accent: 'bg-accent-400',
      shadow: 'shadow-primary-950/30'
    },
    detail: {
      problem: 'Ingin berkontribusi lebih luas namun tidak memiliki wadah atau komunitas.',
      product: 'Join BERMOELA sebagai Life Coach & Psikolog Tersertifikasi.',
      solution: 'Bergabung dalam ekosistem profesional untuk memberikan dampak positif.',
      benefit: 'Masa depan yang indah dengan karir yang bermakna bagi orang lain.'
    }
  }
]
