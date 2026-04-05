import {
  BookOpen,
} from 'lucide-react'

export const THEME_STYLES = {
  teal: {
    gradient: 'from-primary-50 to-teal-50',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-600',
    subText: 'text-primary-600',
    titleText: 'text-primary-900',
    descText: 'text-primary-700/70',
    glow: 'bg-primary-300',
    ctaBg: 'bg-primary-50',
    ctaBorder: 'border-primary-200',
    hoverBorder: 'group-hover:border-primary-300',
    hoverShadow: 'group-hover:shadow-primary-200/40',
    wave: 'text-primary-100',
  },
} as const

export type ThemeKey = keyof typeof THEME_STYLES

export const DESTINATION_CARDS = [
  {
    title: 'PSIKOTES & ASESMEN',
    subtitle: 'MULAI TES',
    description:
      'Psikotes, assessment, dan tryout untuk membantu memahami kondisi mental, potensi diri, serta arah karir dan kehidupan.',
    icon: BookOpen,
    href: '/psikotes',
    ctaLabel: 'Mulai Tes',
    theme: 'teal' as const,
  },
]

export type DestinationCard =
  (typeof DESTINATION_CARDS)[number]

export const DIAGNOSTIC_FLOW = {
  step1: {
    question: 'Apa yang ingin kamu perbaiki hari ini?',
    options: [
      { id: 'mental', label: 'Mental Health', next: 'mental_step2' },
      { id: 'relasi', label: 'Relationship', next: 'relasi_step2' },
      { id: 'karir', label: 'Career/Business', next: 'karir_step2' },
      { id: 'yakin', label: 'Lainnya', next: 'generic_step2' },
    ],
  },
  manual_input: {
    question: 'Kami memahami perasaanmu. Mari lanjutkan sedikit lagi.',
    options: [
      { id: 'lanjut', label: 'Lanjutkan Analisis', next: 'intensity' },
      { id: 'reset', label: 'Ubah Cerita', next: 'step1' },
    ],
  },
  mental_step2: {
    question: 'Apa yang paling sering kamu rasakan?',
    options: [
      { id: 'cemas', label: 'Cemas', next: 'intensity' },
      { id: 'overthinking', label: 'Overthinking', next: 'intensity' },
      { id: 'tidur', label: 'Sulit tidur', next: 'intensity' },
      { id: 'lelah', label: 'Lelah emosional', next: 'intensity' },
    ],
  },
  relasi_step2: {
    question: 'Bagian mana yang paling menantang?',
    options: [
      { id: 'komunikasi', label: 'Komunikasi', next: 'intensity' },
      { id: 'konflik', label: 'Konflik pasangan', next: 'intensity' },
      { id: 'keluarga', label: 'Dinamika keluarga', next: 'intensity' },
      { id: 'sosial', label: 'Relasi sosial', next: 'intensity' },
    ],
  },
  karir_step2: {
    question: 'Apa fokus utamamu saat ini?',
    options: [
      { id: 'burnout', label: 'Stres kerja / Burnout', next: 'intensity' },
      { id: 'tujuan', label: 'Arah karir & Potensi', next: 'intensity' },
      { id: 'performa', label: 'Performa & Produktivitas', next: 'intensity' },
      { id: 'bisnis', label: 'Strategi Bisnis', next: 'intensity' },
    ],
  },
  generic_step2: {
    question: 'Apa yang saat ini paling mengganggu pikiranmu?',
    options: [
      { id: 'perasaan', label: 'Perasaan tidak menentu', next: 'intensity' },
      { id: 'keputusan', label: 'Sulit ambil keputusan', next: 'intensity' },
      { id: 'motivasi', label: 'Kehilangan motivasi', next: 'intensity' },
      { id: 'lainnya', label: 'Lainnya', next: 'intensity' },
    ],
  },
  intensity: {
    question: 'Seberapa berat kondisi ini?',
    options: [
      { id: 'ringan', label: 'Ringan', next: 'result' },
      { id: 'sedang', label: 'Sedang', next: 'result' },
      { id: 'berat', label: 'Berat', next: 'result' },
    ],
  },
} as const

export type DiagnosticStepKey = keyof typeof DIAGNOSTIC_FLOW | 'result'
