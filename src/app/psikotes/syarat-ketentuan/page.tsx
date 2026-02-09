import {
  LegalPage,
  EMERALD_LEGAL,
} from '@/features/general/components'
import {
  PSIKOTES_TERMS,
} from '@/features/general/constants'

export default function PsikotesTerms() {
  return (
    <LegalPage
      badge="Psikotes"
      title="Syarat &"
      accentWord="Ketentuan"
      subtitle="Ketentuan layanan Psikotes Online BERMOELA. Terakhir diperbarui: 1 Januari 2026."
      sections={PSIKOTES_TERMS}
      theme={EMERALD_LEGAL}
    />
  )
}
