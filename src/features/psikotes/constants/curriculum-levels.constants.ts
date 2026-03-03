import {
  type LucideIcon,
  Trophy,
  Shield,
  Zap,
  Heart,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type Level = {
  level: number
  label: string
  tagline: string
  desc: string
  icon: LucideIcon
  bg: string
  glow: string
  depth: string
  pill: string
  iconBg: string
  cardBg: string
  cardBorder: string
  width: string
}

export const LEVELS: Level[] = [
  {
    level: 1,
    label: 'Self Mastery',
    tagline: 'Kenali titik mulamu',
    desc:
      'Fondasi utama untuk menjadi "The New You". Di level ini,'
      + ' kamu akan mengenali kekuatan,'
      + ' kelemahan, dan pola pikir yang'
      + ' membentuk siapa dirimu. Melalui pemetaan'
      + ' mendalam, kamu mendapatkan baseline'
      + ' diri yang jelas sebagai langkah'
      + ' awal transformasi.',
    icon: User,
    bg: 'bg-accent-500',
    glow: 'shadow-accent-500/40',
    depth:
      'border-b-[6px] border-accent-700',
    pill: cn(
      'bg-accent-500',
      'shadow-lg shadow-accent-600/30',
    ),
    iconBg: 'bg-accent-600',
    cardBg: 'bg-accent-500/10',
    cardBorder: 'border-accent-500/20',
    width: 'w-full',
  },
  {
    level: 2,
    label: 'Core Stability',
    tagline: 'Mental Health yang kokoh',
    desc:
      'Membangun daya juang mental dan'
      + ' emosional yang kokoh. Level ini'
      + ' fokus pada ketahanan diri,'
      + ' dan kemampuan'
      + ' menghadapi tekanan. Kamu akan'
      + ' belajar melepaskan kendala masa lalu'
      + ' di tengah tantangan hidup.',
    icon: Shield,
    bg: 'bg-red-500',
    glow: 'shadow-red-500/40',
    depth:
      'border-b-[6px] border-red-700',
    pill: cn(
      'bg-red-500',
      'shadow-lg shadow-red-600/30',
    ),
    iconBg: 'bg-red-600',
    cardBg: 'bg-red-500/10',
    cardBorder: 'border-red-500/20',
    width: 'w-[90%] md:w-[88%]',
  },
  {
    level: 3,
    label: 'Action & Habits',
    tagline:
      'Tumbuh konsisten setiap hari',
    desc:
      'Mengubah kesadaran diri menjadi'
      + ' aksi nyata. Di level ini, kamu'
      + ' akan membangun kebiasaan positif'
      + ' untuk tumbuh satu persen lebih baik'
      + ' setiap harinya, memastikan langkahmu'
      + ' menuju masa depan yang indah.',
    icon: Zap,
    bg: 'bg-primary-500',
    glow: 'shadow-primary-500/40',
    depth:
      'border-b-[6px] border-primary-700',
    pill: cn(
      'bg-primary-500',
      'shadow-lg shadow-primary-600/30',
    ),
    iconBg: 'bg-primary-600',
    cardBg: 'bg-primary-500/10',
    cardBorder: 'border-primary-500/20',
    width: 'w-[80%] md:w-[74%]',
  },
  {
    level: 4,
    label: 'Social Intelligence',
    tagline: 'Mempengaruhi & Berdaya',
    desc:
      'Mengembangkan kemampuan'
      + ' interpersonal dan kepemimpinan.'
      + ' Level ini membantu kamu menjadi'
      + ' wanita independen yang mampu'
      + ' memberikan solusi dan inspirasi'
      + ' bagi orang di sekitarmu.',
    icon: Heart,
    bg: 'bg-purple-500',
    glow: 'shadow-purple-500/40',
    depth:
      'border-b-[6px] border-purple-700',
    pill: cn(
      'bg-purple-500',
      'shadow-lg shadow-purple-600/30',
    ),
    iconBg: 'bg-purple-600',
    cardBg: 'bg-purple-500/10',
    cardBorder: 'border-purple-500/20',
    width: 'w-[70%] md:w-[62%]',
  },
  {
    level: 5,
    label: 'Legacy & Impact',
    tagline:
      'Sukses & berdampak nyata',
    desc:
      'Puncak dari perjalanan'
      + ' transformasi. Di level ini,'
      + ' kamu tidak hanya sukses untuk'
      + ' diri sendiri, tetapi menjadi'
      + ' penentu masa depan yang cerah'
      + ' bagi lingkungan sebagai praktisi'
      + ' Mental Health yang diakui.',
    icon: Trophy,
    bg: 'bg-slate-700',
    glow: 'shadow-slate-700/40',
    depth:
      'border-b-[6px] border-slate-900',
    pill: cn(
      'bg-slate-700',
      'shadow-lg shadow-slate-800/30',
    ),
    iconBg: 'bg-slate-800',
    cardBg: 'bg-slate-700/10',
    cardBorder: 'border-slate-500/20',
    width: 'w-[60%] md:w-[50%]',
  },
]
