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
    tagline: 'Kenali diri secara mendalam',
    desc:
      'Fondasi utama dalam perjalanan'
      + ' pengembangan diri. Di level ini,'
      + ' kamu akan mengenali kekuatan,'
      + ' kelemahan, pola pikir, dan'
      + ' nilai-nilai yang membentuk'
      + ' siapa dirimu. Melalui asesmen'
      + ' mendalam, kamu mendapatkan peta'
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
    tagline: 'Fondasi mental yang kokoh',
    desc:
      'Membangun fondasi mental dan'
      + ' emosional yang kokoh. Level ini'
      + ' fokus pada ketahanan diri,'
      + ' manajemen stres, dan kemampuan'
      + ' menghadapi tekanan. Kamu akan'
      + ' belajar menjaga keseimbangan'
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
      'Kebiasaan positif & konsisten',
    desc:
      'Mengubah pemahaman diri menjadi'
      + ' aksi nyata. Di level ini, kamu'
      + ' akan membangun kebiasaan positif'
      + ' yang konsisten, menetapkan'
      + ' tujuan terukur, dan'
      + ' mengembangkan disiplin diri'
      + ' untuk mencapai potensi maksimal.',
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
    tagline: 'Memimpin & mempengaruhi',
    desc:
      'Mengembangkan kemampuan'
      + ' interpersonal dan kepemimpinan.'
      + ' Level ini membantu kamu memahami'
      + ' dinamika sosial, membangun'
      + ' relasi bermakna, serta'
      + ' mempengaruhi dan menginspirasi'
      + ' orang di sekitarmu.',
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
      'Dampak bermakna bagi sekitar',
    desc:
      'Puncak dari perjalanan'
      + ' pengembangan diri. Di level ini,'
      + ' kamu tidak hanya bertumbuh untuk'
      + ' diri sendiri, tetapi menciptakan'
      + ' dampak positif bagi lingkungan'
      + ' dan masyarakat. Menjadi pemimpin'
      + ' yang meninggalkan warisan'
      + ' bermakna.',
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
