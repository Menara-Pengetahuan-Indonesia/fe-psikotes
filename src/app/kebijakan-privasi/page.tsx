import {
  LegalPage,
  EMERALD_LEGAL,
} from '@/features/general/components'
import {
  PSIKOTES_PRIVACY,
} from '@/features/general/constants'

export default function PsikotesPrivacy() {
  return (
    <LegalPage
      badge="Psikotes"
      title="Kebijakan"
      accentWord="Privasi"
      subtitle="Perlindungan data Anda dalam layanan Psikotes Online BERMOELA. Terakhir diperbarui: 1 Januari 2026."
      sections={PSIKOTES_PRIVACY}
      theme={EMERALD_LEGAL}
    />
  )
}
