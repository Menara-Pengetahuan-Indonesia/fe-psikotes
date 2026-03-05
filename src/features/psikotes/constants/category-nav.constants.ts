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
    items: [
      {
        problem: 'Overthinking & burnout',
        product: 'Psychological Assessment',
        solution: 'Memahami pola emosi & pola pikir secara menyeluruh',
        benefit: '-'
      },
      {
        problem: 'Quarter-life / mid-life confusion',
        product: 'Online Counseling',
        solution: 'Menemukan akar masalah, bukan hanya meredakan gejala',
        benefit: '-'
      },
      {
        problem: 'Emosi tidak stabil',
        product: 'Hybrid Deep Session',
        solution: 'Memiliki rencana perkembangan 90 hari yang jelas',
        benefit: '-'
      },
      {
        problem: 'Merasa “capek tapi tidak tahu kenapa”',
        product: 'Personal Growth Roadmap™',
        solution: 'Emosi lebih stabil di tengah tekanan',
        benefit: '-'
      },
      {
        problem: 'Sudah coba curhat, tapi tidak ada arah',
        product: 'Progress Review System',
        solution: 'Mental clarity untuk mengambil keputusan penting',
        benefit: '-'
      }
    ]
  },
  {
    id: 'relationship',
    title: 'Relationship',
    subtitle: 'Pasangan & Keluarga',
    icon: Heart,
    theme: 'bg-white text-rose-500 border-rose-100',
    accent: 'text-rose-400',
    gradient: 'from-rose-400/20 to-rose-600/20',
    items: [
      {
        problem: 'Konflik yang terus berulang.',
        product: 'Relationship Mapping Session',
        solution: 'Memahami dinamika hubungan secara objektif',
        benefit: '-'
      },
      {
        problem: 'Komunikasi terasa tidak pernah benar-benar nyambung.',
        product: 'Attachment Style Assessment',
        solution: 'Mengidentifikasi pola konflik dan memutuskannya',
        benefit: '-'
      },
      {
        problem: 'Cemburu, trust issue, overthinking berlebihan.',
        product: 'Couple Hybrid Session',
        solution: 'Komunikasi lebih dewasa & terarah',
        benefit: '-'
      },
      {
        problem: 'Sulit mengatakan “tidak”.',
        product: 'Communication Pattern Analysis',
        solution: 'Relasi yang lebih aman dan sehat',
        benefit: '-'
      },
      {
        problem: 'Terjebak ekspektasi keluarga & peran sosial.',
        product: 'Integrated Individual + Couple Plan',
        solution: 'Harmoni tanpa kehilangan jati diri',
        benefit: '-'
      }
    ]
  },
  {
    id: 'professional',
    title: 'Karir & Bisnis',
    subtitle: 'Professional Path',
    icon: Briefcase,
    theme: 'bg-white text-amber-600 border-amber-100',
    accent: 'text-amber-500',
    gradient: 'from-amber-500/20 to-amber-700/20',
    items: [
      {
        problem: 'Burnout berkepanjangan.',
        product: 'Career Psychological Assessment',
        solution: 'Keputusan karier lebih matang dan sadar diri',
        benefit: '-'
      },
      {
        problem: 'Bingung arah karier selanjutnya.',
        product: 'Entrepreneur Mental Clarity Session',
        solution: 'Emosi tetap stabil di situasi tekanan tinggi',
        benefit: '-'
      },
      {
        problem: 'Stres membangun atau mengembangkan bisnis.',
        product: 'Leadership Emotional Capacity Mapping',
        solution: 'Leadership yang lebih reflektif dan terkendali',
        benefit: '-'
      },
      {
        problem: 'Masalah kerja terbawa ke rumah.',
        product: 'Online Follow-up System',
        solution: 'Bisnis berkembang tanpa mengorbankan kesehatan mental',
        benefit: '-'
      },
      {
        problem: 'Takut mengambil keputusan besar.',
        product: 'Hybrid Intensive Strategy Session',
        solution: 'Work-life integration yang lebih sehat and realistis',
        benefit: '-'
      }
    ]
  }
]
