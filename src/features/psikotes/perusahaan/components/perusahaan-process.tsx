import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import { PERUSAHAAN_PROCESS } from '../../constants'

export function PerusahaanProcess() {
  return (
    <section
      className={cn(
        'py-24 md:py-36 bg-[#faf5e4]',
        'relative overflow-hidden',
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'bg-white border border-slate-200',
              'shadow-sm mb-2',
            )}
          >
            <Sparkles
              className={cn(
                'w-3.5 h-3.5',
                'text-emerald-600',
                'fill-emerald-600',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-black',
                'tracking-[0.2em]',
                'text-slate-500 uppercase',
              )}
            >
              Our Process
            </span>
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl',
              'font-black tracking-tight',
              'text-slate-900 leading-tight',
            )}
          >
            Bagaimana{' '}
            <span className="text-emerald-600">
              Kami Bekerja?
            </span>
          </h2>
        </div>

        {/* Horizontal Process */}
        <div
          className={cn(
            'grid grid-cols-1',
            'md:grid-cols-4 gap-6',
          )}
        >
          {PERUSAHAAN_PROCESS.map((item, i) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="relative flex flex-col"
              >
                <div
                  className={cn(
                    'group bg-white p-8',
                    'rounded-[2rem]',
                    'border border-slate-100',
                    'transition-all duration-500',
                    'hover:-translate-y-2',
                    'hover:shadow-2xl',
                    'hover:shadow-emerald-900/5',
                    'hover:border-emerald-500',
                    'shadow-xl',
                    'shadow-stone-200/50 h-full',
                  )}
                >
                  {/* Number + Icon */}
                  <div
                    className={cn(
                      'flex items-center',
                      'justify-between mb-6',
                    )}
                  >
                    <span
                      className={cn(
                        'text-5xl font-black',
                        'text-emerald-100',
                        'leading-none',
                      )}
                    >
                      {String(i + 1)
                        .padStart(2, '0')}
                    </span>
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl',
                        'bg-emerald-50',
                        'text-emerald-600',
                        'flex items-center',
                        'justify-center',
                        'group-hover:bg-emerald-600',
                        'group-hover:text-white',
                        'transition-colors',
                        'duration-500',
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3
                    className={cn(
                      'text-lg font-black',
                      'text-slate-900 mb-2',
                      'tracking-tight',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'text-slate-500',
                      'text-sm leading-relaxed',
                      'font-medium',
                    )}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                {i < PERUSAHAAN_PROCESS.length
                  - 1 && (
                  <ArrowRight
                    className={cn(
                      'hidden md:block',
                      'absolute -right-4',
                      'top-1/2 -translate-y-1/2',
                      'w-5 h-5',
                      'text-emerald-300 z-10',
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
