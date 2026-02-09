import {
  LegalPage,
  ORANGE_LEGAL,
} from '@/features/general/components'
import {
  PELATIHAN_PRIVACY,
} from '@/features/general/constants'

export default function PelatihanPrivacy() {
  return (
    <LegalPage
      badge="Pelatihan"
      title="Kebijakan"
      accentWord="Privasi"
      subtitle="Perlindungan data Anda dalam program Pelatihan BERMOELA. Terakhir diperbarui: 1 Januari 2026."
      sections={PELATIHAN_PRIVACY}
      theme={ORANGE_LEGAL}
    />
  )
}
