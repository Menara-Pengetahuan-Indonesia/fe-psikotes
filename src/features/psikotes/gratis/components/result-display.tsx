import Link from 'next/link'

import { cn } from '@/lib/utils'
import { RESULTS_MAP } from '@features/psikotes/constants'
import type { ResultData } from '@features/psikotes/constants'

import { CommunitySection } from './community-section'
import {
  MoreTestsSection,
  getSuggestedTests,
} from './more-tests-section'
import { PremiumUpsellSection } from './premium-upsell-section'
import { ResultCardSection } from './result-card-section'
import { ResultHeroSection } from './result-hero-section'

type Category =
  | 'gratis'
  | 'premium'
  | 'mahasiswa'
  | 'kesehatan-mental'
  | 'perusahaan'

interface ResultDisplayProps {
  slug?: string
  backHref?: string
  tesLainnyaHref?: string
  category?: Category
}

const DEFAULT_RESULT: ResultData = {
  code: 'N/A',
  title: 'Hasil Tes',
  subtitle: 'Berdasarkan analisa jawaban tes',
  description:
    'Hasil tes kamu telah teridentifikasi.',
}

export function ResultDisplay({
  slug = '',
  backHref = '/psikotes/gratis',
  tesLainnyaHref = '/psikotes/gratis',
  category = 'gratis',
}: ResultDisplayProps) {
  const result =
    RESULTS_MAP[slug] ?? DEFAULT_RESULT
  const suggestedTests =
    getSuggestedTests(category)

  return (
    <div className="min-h-screen bg-background pb-24">
      <ResultHeroSection
        subtitle={result.subtitle}
      />

      <main
        className={cn(
          'max-w-2xl mx-auto px-6',
          'pt-12 space-y-12',
        )}
      >
        <ResultCardSection result={result} />
        <PremiumUpsellSection />
        <CommunitySection />
        <MoreTestsSection
          suggestedTests={suggestedTests}
          category={category}
          tesLainnyaHref={tesLainnyaHref}
        />

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href={backHref}
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-bold text-stone-400',
              'hover:text-primary-700',
              'transition-colors',
            )}
          >
            Kembali ke Halaman Tes
          </Link>
        </div>
      </main>
    </div>
  )
}
