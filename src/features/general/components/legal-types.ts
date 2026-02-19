export type LegalSection = {
  title: string
  content: string
}

export type LegalTheme = {
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
  numberBg: string
  numberText: string
  cardBorder: string
  cardShadow: string
}

export type LegalPageProps = {
  badge: string
  title: string
  accentWord: string
  subtitle: string
  sections: LegalSection[]
  theme: LegalTheme
}
