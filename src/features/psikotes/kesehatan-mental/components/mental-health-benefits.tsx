import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  MENTAL_HEALTH_BENEFITS,
} from '../../constants'

import { BenefitsBackground } from './benefits-background'
import { BenefitCard } from './benefit-card'
import { BenefitsVisual } from './benefits-visual'

export function MentalHealthBenefits() {
  return (
    <section
      className={cn(
        'py-16 md:py-20 bg-background',
        'relative overflow-hidden',
      )}
    >
      <BenefitsBackground />

      <div
        className={cn(
          'max-w-7xl mx-auto px-6',
          'relative z-10',
        )}
      >
        <div
          className={cn(
            'grid lg:grid-cols-2',
            'gap-16 items-center',
          )}
        >
          {/* Left: Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div
                className={cn(
                  'inline-flex items-center',
                  'gap-2 px-3 py-1',
                  'rounded-full bg-white',
                  'border border-stone-200',
                  'text-primary-600',
                  'text-xs font-bold',
                  'uppercase tracking-wide',
                  'shadow-sm',
                )}
              >
                <Sparkles className="h-3 w-3" />
                Kenapa Bermoela
              </div>
              <h2
                className={cn(
                  'text-4xl md:text-5xl',
                  'font-black tracking-tight',
                  'text-stone-800',
                  'leading-[1.1]',
                )}
              >
                Pendekatan yang<br />
                <span
                  className="text-primary-600 relative"
                >
                  Tepat & Aman
                  <svg
                    className={cn(
                      'absolute -bottom-2 left-0',
                      'w-full h-3',
                      'text-primary-300/50',
                    )}
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0, 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              </h2>
              <p
                className={cn(
                  'text-lg text-stone-600',
                  'max-w-md leading-relaxed',
                  'font-medium',
                )}
              >
                Kami memahami pentingnya
                kenyamanan dan keamanan dalam
                proses asesmen kesehatan mental.
              </p>
            </div>

            {/* Benefit Tiles */}
            <div
              className={cn(
                'grid sm:grid-cols-2 gap-4',
              )}
            >
              {MENTAL_HEALTH_BENEFITS.map(
                (item) => (
                  <BenefitCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ),
              )}
            </div>
          </div>

          {/* Right: Visual */}
          <BenefitsVisual />
        </div>
      </div>
    </section>
  )
}
