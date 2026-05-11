import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PsikotesServices } from '@/features/psikotes/components/psikotes-layanan'
import { SERVICES_SLUGS, type ServiceSlug } from '@/features/psikotes/constants/layanan-slugs.constants'
import { KonsulasiHero, KonsulasiFeatures } from '@/features/psikotes/components/layanan-konsultasi'
import { TesPemetaanHero, TesPemetaanFeatures, TraumaHero, TraumaApproach, TraumaSupportGroup, PelatihanHero, PelatihanTracks, PelatihanInclusions, CorporateHero, CorporateApproach, CorporateInclusions } from '@/features/psikotes/components'

const SLUG_META: Record<string, { title: string; description: string }> = {
  'tes-pemetaan': {
    title: 'Tes Pemetaan, Asesmen, dan Blueprint — BERMOELA',
    description: 'Tes IQ, minat bakat, try out, dan pemetaan psikologis untuk anak, remaja, dewasa, dan perusahaan.',
  },
  'konsultasi-konseling': {
    title: 'Konsultasi, Konseling, Live Coaching — BERMOELA',
    description: 'Pendampingan personal oleh psikolog untuk kejelasan arah hidup, manajemen emosi, dan transformasi diri.',
  },
  'trauma-therapy': {
    title: 'Trauma Therapy & Support Group — BERMOELA',
    description: 'Pemrosesan trauma, stabilisasi emosi, dan dukungan komunitas untuk pemulihan yang berkelanjutan.',
  },
  'pelatihan': {
    title: 'Pelatihan — BERMOELA',
    description: 'Pelatihan mental healing individu dan calon counselor & life coach profesional.',
  },
  'solusi-perusahaan': {
    title: 'Solusi bagi Perusahaan — BERMOELA',
    description: 'Diagnosis organisasi, intervensi strategis, dan pengembangan leadership untuk perusahaan.',
  },
}

export function generateStaticParams() {
  return SERVICES_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const meta = SLUG_META[slug]
  if (!meta) return {}
  return { title: meta.title, description: meta.description }
}

export default async function LayananPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tabIndex = SERVICES_SLUGS.indexOf(slug as ServiceSlug)
  if (tabIndex === -1) notFound()

  return (
    <main className="min-h-screen bg-white">
      {slug === 'konsultasi-konseling' && (
        <>
          <KonsulasiHero />
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <PsikotesServices initialTab={tabIndex} />
            </div>
          </section>
          <KonsulasiFeatures />
        </>
      )}

      {slug === 'trauma-therapy' && (
        <>
          <TraumaHero />
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <PsikotesServices initialTab={tabIndex} />
            </div>
          </section>
          <TraumaApproach />
          <TraumaSupportGroup />
        </>
      )}

      {slug === 'pelatihan' && (
        <>
          <PelatihanHero />
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <PsikotesServices initialTab={tabIndex} />
            </div>
          </section>
          <PelatihanTracks />
          <PelatihanInclusions />
        </>
      )}

      {slug === 'solusi-perusahaan' && (
        <>
          <CorporateHero />
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <PsikotesServices initialTab={tabIndex} />
            </div>
          </section>
          <CorporateApproach />
          <CorporateInclusions />
        </>
      )}

      {slug === 'tes-pemetaan' && (
        <>
          <TesPemetaanHero />
          <section className="py-10 px-6">
            <div className="max-w-5xl mx-auto">
              <PsikotesServices initialTab={tabIndex} />
            </div>
          </section>
          <TesPemetaanFeatures />
        </>
      )}

      {slug !== 'konsultasi-konseling' && slug !== 'trauma-therapy' && slug !== 'pelatihan' && slug !== 'solusi-perusahaan' && slug !== 'tes-pemetaan' && (
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <PsikotesServices initialTab={tabIndex} />
          </div>
        </div>
      )}
    </main>
  )
}
