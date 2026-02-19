import {
  BookOpen,
  MessageSquare,
  GraduationCap,
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
  indigo: {
    gradient: 'from-konseling-50 to-violet-50',
    iconBg: 'bg-konseling-100',
    iconColor: 'text-konseling-600',
    subText: 'text-konseling-600',
    titleText: 'text-konseling-900',
    descText: 'text-konseling-700/70',
    glow: 'bg-konseling-300',
    ctaBg: 'bg-konseling-50',
    ctaBorder: 'border-konseling-200',
    hoverBorder: 'group-hover:border-konseling-300',
    hoverShadow: 'group-hover:shadow-konseling-200/40',
    wave: 'text-konseling-100',
  },
  orange: {
    gradient: 'from-pelatihan-50 to-accent-50',
    iconBg: 'bg-pelatihan-100',
    iconColor: 'text-pelatihan-600',
    subText: 'text-pelatihan-600',
    titleText: 'text-pelatihan-900',
    descText: 'text-pelatihan-700/70',
    glow: 'bg-pelatihan-300',
    ctaBg: 'bg-pelatihan-50',
    ctaBorder: 'border-pelatihan-200',
    hoverBorder: 'group-hover:border-pelatihan-300',
    hoverShadow: 'group-hover:shadow-pelatihan-200/40',
    wave: 'text-pelatihan-100',
  },
} as const

export type ThemeKey = keyof typeof THEME_STYLES

export const DESTINATION_CARDS = [
  {
    title: 'PSIKOTES',
    subtitle: 'Discover Yourself',
    description:
      'Tes potensi diri & asesmen karir profesional.',
    icon: BookOpen,
    href: '/psikotes',
    ctaLabel: 'Mulai Tes',
    theme: 'teal' as const,
  },
  {
    title: 'KONSELING',
    subtitle: 'Heal & Grow',
    description:
      'Konsultasi privat dengan psikolog klinis.',
    icon: MessageSquare,
    href: '/konseling',
    ctaLabel: 'Konsultasi',
    theme: 'indigo' as const,
  },
  {
    title: 'PELATIHAN',
    subtitle: 'Unlock Skills',
    description:
      'Webinar & mentoring skill masa depan.',
    icon: GraduationCap,
    href: '/pelatihan',
    ctaLabel: 'Lihat Program',
    theme: 'orange' as const,
  },
]

export type DestinationCard =
  (typeof DESTINATION_CARDS)[number]
