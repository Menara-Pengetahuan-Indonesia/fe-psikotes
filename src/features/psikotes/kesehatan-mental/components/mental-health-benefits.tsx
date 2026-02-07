import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  MENTAL_HEALTH_BENEFITS,
} from '../../constants'

export function MentalHealthBenefits() {
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
                  'text-emerald-600',
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
                  className="text-emerald-600"
                >
                  Tepat & Aman
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
                (item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      className={cn(
                        'p-6 rounded-[2.5rem]',
                        'border border-slate-100',
                        'bg-white',
                        'transition-all',
                        'duration-500',
                        'hover:-translate-y-1.5',
                        'shadow-xl',
                        'shadow-stone-200/50',
                        'hover:shadow-2xl',
                        'hover:shadow-emerald-900/5',
                        'hover:border-emerald-500',
                      )}
                    >
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl',
                          'flex items-center',
                          'justify-center mb-4',
                          'shadow-inner',
                          'bg-emerald-50',
                          'text-emerald-700',
                        )}
                      >
                        <Icon
                          className="h-6 w-6"
                        />
                      </div>
                      <h3
                        className={cn(
                          'font-black text-lg',
                          'text-slate-900 mb-2',
                          'leading-tight',
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          'text-slate-500',
                          'text-xs',
                          'leading-relaxed',
                          'font-medium',
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  )
                },
              )}
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className={cn(
              'hidden lg:block relative',
            )}
          >
            <div
              className={cn(
                'aspect-square relative',
                'max-w-md mx-auto',
              )}
            >
              {/* Back Plate */}
              <div
                className={cn(
                  'absolute inset-0',
                  'bg-white rounded-[3rem]',
                  'border border-slate-100',
                  'shadow-2xl transform',
                  'rotate-6 z-0',
                )}
              />
              {/* Front Plate */}
              <div
                className={cn(
                  'absolute inset-4',
                  'bg-white rounded-[2.5rem]',
                  'border border-slate-100',
                  'shadow-2xl flex',
                  'items-center justify-center',
                  'overflow-hidden z-10',
                )}
              >
                <div
                  className={cn(
                    'absolute inset-0',
                    'bg-[radial-gradient(',
                    'circle_at_top_right,',
                    '#faf5e4_0%,',
                    'transparent_40%)]',
                  )}
                />
                <div
                  className={cn(
                    'relative flex flex-col',
                    'items-center gap-4',
                    'transform translate-y-8',
                  )}
                >
                  <div
                    className={cn(
                      'w-32 h-32',
                      'bg-emerald-500',
                      'rounded-3xl shadow-2xl',
                      'shadow-emerald-900/20',
                      'transform -rotate-12 z-30',
                      'flex items-center',
                      'justify-center text-4xl',
                      'border-4 border-white',
                    )}
                  >
                    🧠
                  </div>
                  <div
                    className={cn(
                      'w-40 h-16',
                      'bg-amber-400 rounded-2xl',
                      'shadow-xl',
                      'shadow-amber-900/10',
                      'transform rotate-3 z-20',
                      'border-4 border-white',
                    )}
                  />
                  <div
                    className={cn(
                      'w-48 h-16',
                      'bg-slate-900 rounded-2xl',
                      'shadow-xl',
                      'shadow-slate-900/10',
                      'transform -rotate-2 z-10',
                      'border-4 border-white',
                    )}
                  />
                </div>
              </div>

              {/* Floating Element */}
              <div
                className={cn(
                  'absolute -top-4 -left-4',
                  'w-16 h-16 bg-amber-200',
                  'rounded-full blur-xl',
                  'opacity-60 animate-pulse z-0',
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
