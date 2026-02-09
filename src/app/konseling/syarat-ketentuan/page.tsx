import {
  LegalPage,
  INDIGO_LEGAL,
} from '@/features/general/components'
import {
  KONSELING_TERMS,
} from '@/features/general/constants'

export default function KonselingTerms() {
  return (
    <LegalPage
      badge="Konseling"
      title="Syarat &"
      accentWord="Ketentuan"
      subtitle="Ketentuan layanan Konseling BERMOELA. Terakhir diperbarui: 1 Januari 2026."
      sections={KONSELING_TERMS}
      theme={INDIGO_LEGAL}
    />
  )
}
