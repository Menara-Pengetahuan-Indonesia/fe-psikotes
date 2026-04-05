import { cn } from '@/lib/utils'

import type { FaqTheme } from '../types'

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
