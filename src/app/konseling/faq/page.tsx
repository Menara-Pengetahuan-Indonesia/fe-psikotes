import {
  SectionFaqPage,
  INDIGO_FAQ,
} from '@/features/general/components'
import {
  KONSELING_FAQS,
} from '@/features/konseling/constants'

export default function KonselingFaqPage() {
  return (
    <SectionFaqPage
      badge="Konseling"
      title="Pertanyaan"
      accentWord="Umum"
      subtitle="Temukan jawaban seputar layanan Konseling BERMOELA."
      faqs={KONSELING_FAQS}
      theme={INDIGO_FAQ}
    />
  )
}
