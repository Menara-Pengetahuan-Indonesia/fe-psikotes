import { Plus, Diamond, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

import { KONSELING_PROCESS } from '../constants'

export function KonselingProcess() {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'bg-white py-24 md:py-36'
      )}
    >
      {/* --- Ornaments --- */}
      <Plus
        className={cn(
          'absolute top-[12%] right-[8%]',
          'w-10 h-10 text-indigo-600/20',
          'rotate-12 animate-pulse'
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[10%] left-[6%]',
          'w-14 h-14 text-amber-500/20',
          '-rotate-6 animate-float-medium'
        )}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- Section Header --- */}
        <div className="text-center mb-20 space-y-4">
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-2 rounded-full',
              'bg-white border border-stone-200',
              'text-stone-600 text-[10px]',
              'font-black uppercase tracking-[0.2em]',
              'shadow-sm'
            )}
          >
            <Sparkles
              className={cn(
                'w-3.5 h-3.5',
                'text-indigo-600 fill-indigo-600'
              )}
            />
            How It Works
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl font-black',
              'text-stone-900 tracking-tight leading-tight'
            )}
          >
            Alur{' '}
            <span className="relative inline-block">
              <span className="text-indigo-600">
                Konseling
              </span>
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-3 text-indigo-500/30'
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
              'text-lg text-stone-500',
              'max-w-2xl mx-auto font-medium'
            )}
          >
            Tiga langkah mudah untuk memulai sesi
            konselingmu.
          </p>
        </div>

        {/* --- Process Cards --- */}
        <div
          className={cn(
            'relative',
            'grid grid-cols-1 md:grid-cols-3 gap-8'
          )}
        >
          {/* Connecting dashed lines (desktop only) */}
          <div
            className={cn(
              'hidden md:block absolute',
              'top-1/2 left-0 right-0',
              '-translate-y-1/2 z-0',
              'mx-[16.67%]',
              'border-t-2 border-dashed',
              'border-indigo-200'
            )}
            aria-hidden="true"
          />

          {KONSELING_PROCESS.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className={cn(
                  'relative z-10',
                  'flex flex-col items-start',
                  'bg-white rounded-3xl',
                  'border border-stone-100',
                  'shadow-lg p-8'
                )}
              >
                {/* Step Number */}
                <span
                  className={cn(
                    'text-5xl font-black',
                    'text-indigo-600/20',
                    'leading-none mb-4'
                  )}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl',
                    'bg-indigo-50 text-indigo-600',
                    'border border-indigo-100',
                    'flex items-center justify-center',
                    'mb-6'
                  )}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    'text-xl font-black',
                    'text-stone-800 mb-2'
                  )}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={cn(
                    'text-sm text-stone-500',
                    'font-medium leading-relaxed'
                  )}
                >
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
