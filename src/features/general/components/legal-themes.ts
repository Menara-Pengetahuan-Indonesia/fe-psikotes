import { cn } from '@/lib/utils'

import { LegalTheme } from './legal-types'

export const EMERALD_LEGAL: LegalTheme = {
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
  numberBg: 'bg-primary-600',
  numberText: 'text-white',
  cardBorder: 'hover:border-primary-200',
  cardShadow: 'shadow-primary-900/5',
}
