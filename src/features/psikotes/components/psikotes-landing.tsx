import { PsikotesHeader } from './psikotes-header'
import { PsikotesHero } from './psikotes-hero'
import { PsikotesCategoryList } from './psikotes-category-list'
import { PsikotesFlow } from './psikotes-flow'
import { PsikotesResultPreview } from './psikotes-result-preview'
import { PsikotesTrust } from './psikotes-trust'
import { PsikotesCTA } from './psikotes-cta'
import { PsikotesFooter } from './psikotes-footer'

export function PsikotesLanding() {
  return (
    <>
      <PsikotesHeader />
      <main>
        <PsikotesHero />
        <PsikotesCategoryList />
        <PsikotesFlow />
        <PsikotesResultPreview />
        <PsikotesTrust />
        <PsikotesCTA />
      </main>
      <PsikotesFooter />
    </>
  )
}
