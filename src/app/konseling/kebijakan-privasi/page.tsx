import {
  LegalPage,
  INDIGO_LEGAL,
} from '@/features/general/components'
import {
  KONSELING_PRIVACY,
} from '@/features/general/constants'

export default function KonselingPrivacy() {
  return (
    <LegalPage
      badge="Konseling"
      title="Kebijakan"
      accentWord="Privasi"
      subtitle="Perlindungan data Anda dalam layanan Konseling BERMOELA. Terakhir diperbarui: 1 Januari 2026."
      sections={KONSELING_PRIVACY}
      theme={INDIGO_LEGAL}
    />
  )
}
