export type FaqItem = { q: string; a: string }

export type FaqTheme = {
  heroBg: string
  glowTop: string
  glowBottom: string
  ornamentPlus: string
  ornamentDiamond: string
  badgeBg: string
  badgeBorder: string
  badgeText: string
  accentWord: string
  ornamentSectionPlus: string
  ornamentSectionCircle: string
  ornamentSectionDiamond: string
  ornamentSectionRing: string
  activeBorder: string
  activeShadow: string
  activeRing: string
  activeIcon: string
  activeChevron: string
}

export type SectionFaqPageProps = {
  badge: string
  title: string
  accentWord: string
  subtitle: string
  faqs: FaqItem[]
  theme: FaqTheme
}
