import { cn } from '@/lib/utils'

import type { FaqTheme } from './section-faq-types'

export const EMERALD_FAQ: FaqTheme = {
  heroBg: cn(
    'bg-linear-to-b from-primary-700',
    'via-primary-600 to-primary-400',
  ),
  glowTop: 'bg-primary-900/20',
  glowBottom: 'bg-primary-300/20',
  ornamentPlus: 'text-primary-300/30',
  ornamentDiamond: 'text-white/10',
  badgeBg: 'bg-primary-600/50',
  badgeBorder: 'border-primary-300',
  badgeText: 'text-primary-50',
  accentWord: 'text-primary-950',
  ornamentSectionPlus: 'text-primary-800/20',
  ornamentSectionCircle: 'text-accent-500/20',
  ornamentSectionDiamond: 'text-primary-600/20',
  ornamentSectionRing: 'border-primary-800/15',
  activeBorder: 'border-primary-500',
  activeShadow: 'shadow-primary-900/5',
  activeRing: 'ring-primary-500/10',
  activeIcon: 'bg-primary-600 text-white',
  activeChevron: 'bg-primary-50 text-primary-600',
}

export const INDIGO_FAQ: FaqTheme = {
  heroBg: cn(
    'bg-linear-to-b from-konseling-700',
    'via-konseling-600 to-konseling-400',
  ),
  glowTop: 'bg-konseling-900/20',
  glowBottom: 'bg-konseling-300/20',
  ornamentPlus: 'text-konseling-300/30',
  ornamentDiamond: 'text-white/10',
  badgeBg: 'bg-konseling-600/50',
  badgeBorder: 'border-konseling-300',
  badgeText: 'text-konseling-50',
  accentWord: 'text-konseling-950',
  ornamentSectionPlus: 'text-konseling-800/20',
  ornamentSectionCircle: 'text-accent-500/20',
  ornamentSectionDiamond: 'text-konseling-600/20',
  ornamentSectionRing: 'border-konseling-800/15',
  activeBorder: 'border-konseling-500',
  activeShadow: 'shadow-konseling-900/5',
  activeRing: 'ring-konseling-500/10',
  activeIcon: 'bg-konseling-600 text-white',
  activeChevron: 'bg-konseling-50 text-konseling-600',
}

export const ORANGE_FAQ: FaqTheme = {
  heroBg: cn(
    'bg-linear-to-b from-pelatihan-700',
    'via-pelatihan-600 to-pelatihan-400',
  ),
  glowTop: 'bg-pelatihan-900/20',
  glowBottom: 'bg-pelatihan-300/20',
  ornamentPlus: 'text-pelatihan-300/30',
  ornamentDiamond: 'text-white/10',
  badgeBg: 'bg-pelatihan-600/50',
  badgeBorder: 'border-pelatihan-300',
  badgeText: 'text-pelatihan-50',
  accentWord: 'text-pelatihan-950',
  ornamentSectionPlus: 'text-pelatihan-800/20',
  ornamentSectionCircle: 'text-accent-500/20',
  ornamentSectionDiamond: 'text-pelatihan-600/20',
  ornamentSectionRing: 'border-pelatihan-800/15',
  activeBorder: 'border-pelatihan-500',
  activeShadow: 'shadow-pelatihan-900/5',
  activeRing: 'ring-pelatihan-500/10',
  activeIcon: 'bg-pelatihan-600 text-white',
  activeChevron: 'bg-pelatihan-50 text-pelatihan-600',
}
