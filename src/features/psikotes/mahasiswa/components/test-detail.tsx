import { cn } from '@/lib/utils'

import { DetailHero } from './test-detail-hero'
import { FaqSection } from './test-detail-faq-section'
import { PricingCard } from './test-detail-pricing-card'
import { SectionHeading } from './test-detail-section-heading'

export interface TestDetailProps {
  title: string
  badge: string
  description: string
  duration: string
  participants: string
  aspects?: {
    heading: string
    items: { title: string; desc: string }[]
  }[]
  price: string
  originalPrice?: string
  formHref: string
}

export function TestDetail({
  title,
  badge,
  description,
  duration,
  participants,
  aspects,
  price,
  originalPrice,
  formHref,
}: TestDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <DetailHero
        title={title}
        badge={badge}
        description={description}
        duration={duration}
        participants={participants}
      />

      <DetailBody
        aspects={aspects}
        price={price}
        originalPrice={originalPrice}
        formHref={formHref}
      />
    </div>
  )
}

/* -- Body -------------------------------- */

function DetailBody({
  aspects,
  price,
  originalPrice,
  formHref,
}: Pick<
  TestDetailProps,
  | 'aspects'
  | 'price'
  | 'originalPrice'
  | 'formHref'
>) {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto px-6',
        'py-14 md:py-20',
      )}
    >
      <div
        className={cn(
          'grid grid-cols-1',
          'lg:grid-cols-3 gap-12',
        )}
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-14">
          {aspects && aspects.length > 0 && (
            <AspectsSection aspects={aspects} />
          )}
          <FaqSection />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <PricingCard
            price={price}
            originalPrice={originalPrice}
            formHref={formHref}
          />
        </div>
      </div>
    </div>
  )
}

/* -- Aspects ----------------------------- */

function AspectsSection({
  aspects,
}: {
  aspects: NonNullable<TestDetailProps['aspects']>
}) {
  return (
    <div className="space-y-8">
      <SectionHeading
        color="amber"
        label="Aspek yang Diukur"
      />

      <div className="space-y-8">
        {aspects.map((section) => (
          <div
            key={section.heading}
            className="space-y-4"
          >
            <h3
              className={cn(
                'text-xs font-black',
                'text-primary-600 uppercase',
                'tracking-[0.2em] ml-1',
              )}
            >
              {section.heading}
            </h3>
            <div
              className={cn(
                'grid grid-cols-1',
                'sm:grid-cols-2 gap-4',
              )}
            >
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    'p-6 bg-white',
                    'rounded-3xl',
                    'border border-slate-100',
                    'hover:border-primary-500',
                    'transition-all duration-500',
                    'shadow-xl',
                    'shadow-stone-200/50',
                    'hover:-translate-y-1',
                    'hover:shadow-2xl',
                    'hover:shadow-primary-900/5',
                  )}
                >
                  <p
                    className={cn(
                      'text-lg font-black',
                      'text-stone-800 mb-2',
                    )}
                  >
                    {item.title}
                  </p>
                  <p
                    className={cn(
                      'text-sm text-stone-500',
                      'leading-relaxed',
                      'font-medium',
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
