import {
  SectionFaqPage,
  ORANGE_FAQ,
} from '@/features/general/components'
import {
  PELATIHAN_FAQS,
} from '@/features/pelatihan/constants'

export default function PelatihanFaqPage() {
  return (
    <SectionFaqPage
      badge="Pelatihan"
      title="Pertanyaan"
      accentWord="Umum"
      subtitle="Temukan jawaban seputar program Pelatihan BERMOELA."
      faqs={PELATIHAN_FAQS}
      theme={ORANGE_FAQ}
    />
  )
}
