import { LegalContentSection } from './legal-content-section'
import { LegalHeroSection } from './legal-hero-section'
import { LegalPageProps } from './legal-types'

export { EMERALD_LEGAL, INDIGO_LEGAL, ORANGE_LEGAL } from './legal-themes'
export type { LegalSection, LegalTheme, LegalPageProps } from './legal-types'

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
