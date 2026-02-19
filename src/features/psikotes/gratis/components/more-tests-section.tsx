import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  GRATIS_TESTS,
  PREMIUM_TESTS,
  MAHASISWA_TESTS,
  KESEHATAN_MENTAL_TESTS,
  PERUSAHAAN_TESTS,
} from '@features/psikotes/constants'

type Category =
  | 'gratis'
  | 'premium'
  | 'mahasiswa'
  | 'kesehatan-mental'
  | 'perusahaan'

interface MoreTestsSectionProps {
  suggestedTests: ReturnType<
    typeof getSuggestedTests
  >
  category: Category
  tesLainnyaHref: string
}

export function getSuggestedTests(
  category: Category,
) {
  switch (category) {
    case 'premium':
      return PREMIUM_TESTS.slice(0, 4)
    case 'mahasiswa':
      return MAHASISWA_TESTS.slice(0, 4)
    case 'kesehatan-mental':
      return KESEHATAN_MENTAL_TESTS.slice(0, 4)
    case 'perusahaan':
      return PERUSAHAAN_TESTS.slice(0, 4)
    default:
      return GRATIS_TESTS.slice(0, 4)
  }
}

function getTestHref(
  category: Category,
  slug: string,
) {
  switch (category) {
    case 'premium':
      return `/psikotes/premium/${slug}`
    case 'mahasiswa':
      return `/psikotes/mahasiswa/${slug}`
    case 'kesehatan-mental':
      return `/psikotes/kesehatan-mental/${slug}`
    case 'perusahaan':
      return `/psikotes/perusahaan/${slug}`
    default:
      return `/psikotes/gratis/${slug}`
  }
}

export function MoreTestsSection({
  suggestedTests,
  category,
  tesLainnyaHref,
}: MoreTestsSectionProps) {
  return (
    <section
      className={cn(
        'pt-8 border-t border-stone-200',
      )}
    >
      <div
        className={cn(
          'flex items-center',
          'justify-between mb-8',
        )}
      >
        <h3
          className={cn(
            'text-xl font-black',
            'text-stone-800',
          )}
        >
          Eksplorasi Tes Lainnya
        </h3>
        <Link
          href={tesLainnyaHref}
          className={cn(
            'text-xs font-bold',
            'text-stone-400',
            'hover:text-primary-700',
            'uppercase tracking-wider',
            'flex items-center gap-2',
          )}
        >
          Lihat Semua
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div
        className={cn(
          'grid grid-cols-2',
          'md:grid-cols-4 gap-4',
        )}
      >
        {suggestedTests.map((test) => {
          const Icon = test.icon
          return (
            <Link
              key={test.id}
              href={getTestHref(
                category,
                test.slug,
              )}
              className={cn(
                'bg-white p-6 rounded-2xl',
                'flex flex-col items-center',
                'text-center gap-4',
                'hover:bg-primary-50',
                'transition-colors',
                'cursor-pointer',
                'border border-stone-100',
                'hover:border-primary-200',
                'group',
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 bg-primary-50',
                  'rounded-full flex',
                  'items-center justify-center',
                  'border border-primary-200',
                  'group-hover:scale-110',
                  'transition-transform',
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5',
                    'text-primary-700',
                  )}
                />
              </div>
              <span
                className={cn(
                  'font-bold text-xs',
                  'text-stone-800 uppercase',
                  'tracking-wide',
                )}
              >
                {test.title}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
