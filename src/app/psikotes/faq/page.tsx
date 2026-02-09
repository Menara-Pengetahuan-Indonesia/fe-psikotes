import {
  SectionFaqPage,
  EMERALD_FAQ,
} from '@/features/general/components'
import {
  PSIKOTES_FAQS,
} from '@/features/psikotes/constants'

export default function PsikotesFaqPage() {
  return (
    <SectionFaqPage
      badge="Psikotes"
      title="Pertanyaan"
      accentWord="Umum"
      subtitle="Temukan jawaban seputar layanan Psikotes Online BERMOELA."
      faqs={PSIKOTES_FAQS}
      theme={EMERALD_FAQ}
    />
  )
}
