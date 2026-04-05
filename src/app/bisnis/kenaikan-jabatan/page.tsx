import type { Metadata } from 'next'

import { TestDetail } from '@/features/psikotes/mahasiswa/components'
import { AuthGuard } from '@/features/auth/components'

export const metadata: Metadata = {
  title: 'Tes Kenaikan Jabatan — BERMOELA',
  description: 'Tes komprehensif untuk mengevaluasi kesiapan karyawan dalam promosi jabatan.',
}

export default function KenaikanJabatanPage() {
  return (
    <main>
      <AuthGuard>
      <TestDetail
        title="Tes Kenaikan Jabatan"
        badge="Perusahaan"
        description="Bantu perusahaan menilai kesiapan karyawan sebelum memberikan tanggung jawab yang lebih besar. Melalui asesmen ini, perusahaan dapat melihat potensi kepemimpinan, cara mengambil keputusan, serta kemampuan manajerial karyawan."
        duration="30 menit"
        participants="5.400+"
        aspects={[
          {
            heading: 'Kemampuan Analitkal & Kompleksitas Berpikir',
            items: [
              { title: 'CFIT (Fluid Intelligence)', desc: 'Mengukur kemampuan berpikir multi-tasking dan adaptasi terhadap perubahan.' },
              { title: 'IST Potensi (Bakat)', desc: 'Mengukur kemampuan berpikir mendalam dan potensi bakat.' },
            ],
          },
          {
            heading: 'Kepribadian Kerja & Relasi Interpersonal',
            items: [
              { title: 'Hogan Personality Inventory (HPI)', desc: 'Memprediksi efektivitas kerja, cara berhubungan dengan orang lain, dan potensi kepemimpinan.' },
              { title: 'NEO-PI', desc: 'Mengukur kecenderungan sosial dan kepribadian dalam konteks kerja.' },
            ],
          },
          {
            heading: 'Risiko Perilaku di Bawah Stres & Tekanan',
            items: [
              { title: 'Perceived Stress Scale (PSS)', desc: 'Mengukur persepsi individu terhadap tingkat stres kerja saat ini.' },
              { title: 'Hogan Development Survey (HDS)', desc: 'Mengidentifikasi kecenderungan perilaku disfungsional yang muncul saat stres meningkat.' },
              { title: 'DAS', desc: 'Mengukur tingkat stres secara klinis.' },
            ],
          },
          {
            heading: 'Kemampuan Komunikasi & Perbendaharaan Kata',
            items: [
              { title: 'Verbal Reasoning Test', desc: 'Mengukur kemampuan memahami teks, memilih kata tepat, dan menarik kesimpulan untuk komunikasi strategis.' },
              { title: 'Communication Style Inventory (CSI)', desc: 'Mengidentifikasi gaya komunikasi dominan individu.' },
            ],
          },
          {
            heading: 'Gaya Memimpin & Nilai Kerja',
            items: [
              { title: 'Leadership Style Questionnaire', desc: 'Mengukur gaya kepemimpinan yang dominan dan efektif.' },
              { title: 'MVPI (Hogan)', desc: 'Menilai kecocokan nilai kandidat dengan tuntutan jabatan dan budaya organisasi.' },
            ],
          },
          {
            heading: 'Pengambilan Keputusan dalam Situasi Kompleks',
            items: [
              { title: 'Situational Judgment Test (SJT)', desc: 'Menilai kualitas judgment, prioritisasi, dan keputusan dalam konteks kerja nyata.' },
              { title: 'DMS – Decision Making Style', desc: 'Mengukur kecenderungan gaya individu dalam mengambil keputusan, termasuk pengolahan informasi dan ketegasan tindakan.' },
            ],
          },
          {
            heading: 'Kesiapan untuk Kenaikan Jabatan',
            items: [
              { title: 'General Self Efficacy', desc: 'Mengukur keyakinan umum individu terhadap kemampuannya menghadapi berbagai situasi.' },
              { title: 'Talent Gallup', desc: 'Mengidentifikasi bakat alami dan kekuatan dominan individu.' },
              { title: 'Goal Orientation', desc: 'Mengukur orientasi tujuan dan motivasi berprestasi.' },
              { title: 'CCLI – Creative Climate', desc: 'Mengukur iklim kreativitas dan inovasi individu dalam lingkungan kerja.' },
            ],
          },
        ]}
        price="Rp 55.000"
        originalPrice="Rp 110.000"
        selectable
        formHref="/bisnis/kenaikan-jabatan/asesmen"
      />
      </AuthGuard>
    </main>
  )
}
