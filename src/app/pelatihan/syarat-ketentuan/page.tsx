import {
  LegalPage,
  ORANGE_LEGAL,
} from '@/features/general/components'
import {
  PELATIHAN_TERMS,
} from '@/features/general/constants'

export default function PelatihanTerms() {
  return (
    <LegalPage
      badge="Pelatihan"
      title="Syarat &"
      accentWord="Ketentuan"
      subtitle="Ketentuan program Pelatihan BERMOELA. Terakhir diperbarui: 1 Januari 2026."
      sections={PELATIHAN_TERMS}
      theme={ORANGE_LEGAL}
    />
  )
}
