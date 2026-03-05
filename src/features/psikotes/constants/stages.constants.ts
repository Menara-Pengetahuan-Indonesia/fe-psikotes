import { Zap, CheckCircle2, TrendingUp, Box } from 'lucide-react'

export const TRANSFORMATION_STAGES = [
  {
    id: 1,
    title: 'Stage 1: Early Adult',
    ageRange: '20-27 Tahun',
    description: 'Fase krusial pencarian jati diri, kemandirian finansial, dan stabilitas emosional di awal kedewasaan.',
    colors: {
      primary: 'text-indigo-600',
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100',
      accent: 'bg-indigo-600',
    },
    sections: [
      {
        label: 'Tantangan Utama',
        icon: Zap,
        color: 'text-rose-500',
        items: [
          'Overthinking tentang masa depan',
          'Quarter-life crisis',
          'Toxic relationship / trust issue',
          'Sulit pasang boundaries',
          'Burnout kerja pertama',
          'FOMO & social comparison',
          'Bingung sebenarnya “aku ini siapa?”'
        ]
      },
      {
        label: 'Pendekatan Solusi',
        icon: CheckCircle2,
        color: 'text-emerald-500',
        items: [
          'Memetakan kondisi mental health secara objektif',
          'Memahami pola attachment & relasi',
          'Mengidentifikasi nilai hidup & arah karier',
          'Mengelola emosi & overthinking'
        ]
      },
      {
        label: 'Hasil Transformasi',
        icon: TrendingUp,
        color: 'text-amber-500',
        items: [
          'Lebih mengenal diri & kebutuhan pribadi',
          'Berani pasang batasan yang sehat',
          'Tidak mudah terseret relasi toxic',
          'Arah hidup & karier lebih jelas',
          'Lebih stabil secara emosional'
        ]
      },
      {
        label: 'Rekomendasi Layanan',
        icon: Box,
        color: 'text-primary-600',
        items: [
          'Psychological Assessment',
          'Attachment Style Assessment',
          'Online Counseling',
          'Personal Growth Roadmap™ (90 Days Plan)',
          'Progress Review System'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Stage 2: Emerging Stability',
    ageRange: '28-35 Tahun',
    description: 'Fase membangun fondasi kehidupan yang stabil, mematangkan hubungan, dan menyelaraskan ambisi karier dengan nilai pribadi.',
    colors: {
      primary: 'text-emerald-500',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
      accent: 'bg-emerald-500',
    },
    sections: [
      {
        label: 'Tantangan Utama',
        icon: Zap,
        color: 'text-rose-500',
        items: [
          'Tekanan menikah / tekanan keluarga',
          'Konflik pasangan berulang',
          'Cemburu & trust issue',
          'Burnout karier tapi takut resign',
          'Konflik kerja terbawa ke rumah',
          'Mulai merasa kehilangan diri sendiri'
        ]
      },
      {
        label: 'Pendekatan Solusi',
        icon: CheckCircle2,
        color: 'text-emerald-500',
        items: [
          'Memahami dinamika relasi secara objektif',
          'Mengelola konflik & komunikasi pasangan',
          'Mengatur ulang prioritas hidup & karier',
          'Meningkatkan emotional regulation'
        ]
      },
      {
        label: 'Hasil Transformasi',
        icon: TrendingUp,
        color: 'text-amber-500',
        items: [
          'Relasi lebih dewasa & aman',
          'Komunikasi lebih sehat',
          'Tidak lagi terjebak konflik yang sama',
          'Keputusan karier lebih matang',
          'Work-life balance lebih realistis'
        ]
      },
      {
        label: 'Rekomendasi Layanan',
        icon: Box,
        color: 'text-primary-600',
        items: [
          'Relationship Mapping Session',
          'Couple Hybrid Session',
          'Communication Pattern Analysis',
          'Career Psychological Assessment',
          'Hybrid Deep Session'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Stage 3: Established Life',
    ageRange: '36-45 Tahun',
    description: 'Fase mengelola tanggung jawab besar, menguatkan pengaruh (leadership), dan menemukan kembali makna hidup di puncak kematangan.',
    colors: {
      primary: 'text-amber-600',
      bg: 'bg-amber-50/50',
      border: 'border-amber-100',
      accent: 'bg-amber-600',
    },
    sections: [
      {
        label: 'Tantangan Utama',
        icon: Zap,
        color: 'text-rose-500',
        items: [
          'Burnout kronis',
          'Tekanan sebagai ibu/istri/profesional',
          'Konflik rumah tangga yang kompleks',
          'Leadership stress',
          'Merasa hidup berjalan autopilot',
          'Kehilangan makna & passion'
        ]
      },
      {
        label: 'Pendekatan Solusi',
        icon: CheckCircle2,
        color: 'text-emerald-500',
        items: [
          'Memetakan emotional capacity',
          'Mengelola tekanan peran ganda',
          'Menyusun ulang visi hidup',
          'Menguatkan mental clarity dalam keputusan besar'
        ]
      },
      {
        label: 'Hasil Transformasi',
        icon: TrendingUp,
        color: 'text-amber-500',
        items: [
          'Emosi lebih stabil dalam tekanan tinggi',
          'Leadership yang lebih sadar diri',
          'Rumah tangga lebih harmonis tanpa mengorbankan diri',
          'Kembali menemukan makna hidup',
          'Sustainable success tanpa menghancurkan mental'
        ]
      },
      {
        label: 'Rekomendasi Layanan',
        icon: Box,
        color: 'text-primary-600',
        items: [
          'Leadership Emotional Capacity Mapping',
          'Entrepreneur Mental Clarity Session',
          'Hybrid Intensive Strategy Session',
          'Online Follow-up System',
          'Long-term Progress Review'
        ]
      }
    ]
  }
]
