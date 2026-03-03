import { LegalContentSection } from './legal-content-section'
import { LegalHeroSection } from './legal-hero-section'
import type { LegalPageProps } from '../types'

export { EMERALD_LEGAL, INDIGO_LEGAL, ORANGE_LEGAL } from '../constants'
export type { LegalSection, LegalTheme, LegalPageProps } from '../types'

export function LegalPage({
  badge,
  title,
  accentWord,
  subtitle,
  sections,
  theme,
}: LegalPageProps) {
  return (
    <main>
      <LegalHeroSection
        badge={badge}
        title={title}
        accentWord={accentWord}
        subtitle={subtitle}
        theme={theme}
      />
      <LegalContentSection
        sections={sections}
        theme={theme}
      />
    </main>
  )
}
