import { Sparkles, Plus, Diamond } from 'lucide-react'

import { cn } from '@/lib/utils'

import { PELATIHAN_PROCESS } from '../constants'

export function PelatihanProcess() {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'bg-white py-24 md:py-36'
      )}
    >
      {/* --- Background Ornaments --- */}
      <Plus
        className={cn(
          'absolute top-[12%] left-[8%]',
          'w-10 h-10 text-pelatihan-600/20',
          'rotate-12 animate-pulse'
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[15%] right-[10%]',
          'w-14 h-14 text-accent-500/20',
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
                'w-3 h-3',
                'text-pelatihan-600 fill-pelatihan-600'
              )}
            />
            How It Works
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl font-black',
              'text-slate-900 tracking-tight leading-tight'
            )}
          >
            Alur{' '}
            <span className="relative inline-block">
              <span className="text-pelatihan-600">
                Pelatihan
              </span>
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-3 text-pelatihan-500/30'
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
            Tiga langkah mudah untuk memulai
            program pelatihanmu.
          </p>
        </div>

        {/* --- Process Cards --- */}
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-3',
            'gap-8 relative'
          )}
        >
          {/* Connecting dashed lines (desktop) */}
          <div
            className={cn(
              'hidden md:block absolute',
              'top-1/2 left-0 right-0',
              '-translate-y-1/2 mx-auto',
              'pointer-events-none'
            )}
          >
            <div
              className={cn(
                'mx-[16.67%]',
                'border-t-2 border-dashed',
                'border-pelatihan-200'
              )}
            />
          </div>

          {PELATIHAN_PROCESS.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className={cn(
                  'relative bg-white rounded-3xl',
                  'border border-stone-100',
                  'shadow-lg p-8',
                  'flex flex-col items-start',
                  'space-y-5'
                )}
              >
                {/* Step Number */}
                <span
                  className={cn(
                    'text-5xl font-black',
                    'text-pelatihan-600/20',
                    'leading-none'
                  )}
                >
                  {step.number}
                </span>

                {/* Icon Circle */}
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl',
                    'bg-pelatihan-50 text-pelatihan-600',
                    'border border-pelatihan-100',
                    'flex items-center justify-center'
                  )}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3
                  className={cn(
                    'text-xl font-black',
                    'text-stone-800'
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
