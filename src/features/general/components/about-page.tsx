import { AboutHeroSection } from './about-hero-section'
import { AboutStatsSection } from './about-stats-section'
import {
  AboutMissionVisionSection,
} from './about-mission-vision-section'
import {
  AboutServicesSection,
} from './about-services-section'
import {
  AboutValuesSection,
} from './about-values-section'
import {
  AboutTeamCtaSection,
} from './about-team-cta-section'

export function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <AboutStatsSection />
      <AboutMissionVisionSection />
      <AboutServicesSection />
      <AboutValuesSection />
      <AboutTeamCtaSection />
    </main>
  )
}
