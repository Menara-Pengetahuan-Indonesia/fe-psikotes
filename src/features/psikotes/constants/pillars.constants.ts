import {
  Search,
  MessageSquare,
  GraduationCap,
  Users,
} from 'lucide-react'

export const PILLARS = [
  {
    id: 'pemetaan',
    title: 'Hentikan Kebingungan (Pemetaan)',
    subtitle: 'Wajah Asli Dirimu',
    description: 'Berhenti meraba-raba kegelapan. Sadari area yang membuatmu gagal, dan perkuat apa yang sudah bagus.',
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
      problem: 'Stagnan tanpa arah, bingung dengan potensi diri, dan takut salah melangkah.',
      product: 'Psikotes Profesional "Bermula Assessment".',
      solution: 'Bedah tuntas kondisi mentalmu secara akurat, berbasis riset psikologi.',
      benefit: 'Dapatkan kompas hidup yang presisi, untuk kuasai masa depanmu.'
    }
  },
  {
    id: 'konsultasi',
    title: 'Urai Benang Kusut (Konsultasi)',
    subtitle: 'Tuntaskan Sekarang',
    description: 'Bongkar hasil tesmu bersama ahlinya. Jangan biarkan masalah mengendap tanpa solusi nyata.',
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
      problem: 'Tahu masalahnya, tapi tidak tahu cara mencabut akarnya secara tuntas.',
      product: 'Konseling Privat & Konsultasi Ahli.',
      solution: 'Sesi khusus bersama psikolog, untuk merancang strategi hidup personalmu.',
      benefit: 'Ketenangan batin, dan hilangnya keraguan dalam setiap keputusanmu.'
    }
  },
  {
    id: 'pelatihan',
    title: 'Kuasai Skill (Pelatihan)',
    subtitle: 'Tumbuh & Taklukkan',
    description: 'Jangan cuma bertahan hidup. Kuasai skill mental health untuk tumbuh kuat di tengah tekanan.',
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
      problem: 'Lumpuh di bawah tekanan, atau ingin mendalami ilmu psikologi yang aplikatif.',
      product: 'Pelatihan Mental Health, & Sertifikasi Praktisi.',
      solution: 'Belajar metode praktis, untuk tumbuh tangguh, dan sukses di era penuh tekanan.',
      benefit: 'Sertifikasi kompetensi, dan mental baja yang siap menghadapi apa pun.'
    }
  },
  {
    id: 'komunitas',
    title: 'Jadilah Solusi (Komunitas)',
    subtitle: 'Berdampak Bagi Sesama',
    description: 'Jangan simpan perubahanmu sendiri. Bergabunglah dan jadilah penolong bagi orang lain.',
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
      problem: 'Ingin memberi arti bagi hidup orang lain, namun bingung cara memulainya.',
      product: 'Sertifikasi Life Coach, & Psikolog BERMOELA.',
      solution: 'Masuk dalam ekosistem profesional, untuk memberikan dampak positif luas.',
      benefit: 'Karir yang bermakna, dan kebanggaan menjadi pahlawan bagi sesama.'
    }
  }
]
