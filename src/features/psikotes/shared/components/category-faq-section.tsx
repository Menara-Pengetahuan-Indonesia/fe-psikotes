'use client'

import { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Plus,
  Hexagon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import type { FaqItem } from '../../types'

interface CategoryFaqSectionProps {
  faqs: FaqItem[]
}

export function CategoryFaqSection({
  faqs,
}: CategoryFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(0)

  return (
    <section
      className={cn(
        'py-16 md:py-20 bg-background',
        'relative overflow-hidden',
      )}
    >
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'opacity-[0.03]',
          'pointer-events-none',
          'mix-blend-multiply',
        )}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,'
            + '%3Csvg width=\'200\''
            + ' height=\'200\''
            + ' viewBox=\'0 0 200 200\''
            + ' xmlns=\'http://www.w3.org/'
            + '2000/svg\'%3E%3Cpath'
            + ' d=\'M0 100 C 20 80, 40 120,'
            + ' 60 100 S 100 80, 120 100'
            + ' S 160 120, 200 100\''
            + ' stroke=\'%23059669\''
            + ' fill=\'transparent\''
            + ' stroke-width=\'1\'/%3E'
            + '%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[12%] left-[5%]',
          'text-emerald-600/15 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[15%] right-[6%]',
          'text-slate-400/15 w-6 h-6',
          'rotate-45 pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute top-[35%] right-[8%]',
          'text-emerald-600/[0.07]',
          'w-20 h-20 -rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-16 -right-16',
          'w-72 h-72 bg-emerald-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-20 -left-20',
          'w-64 h-64 bg-amber-100/20',
          'rounded-full blur-[80px]',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-4xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'text-center mb-12 space-y-3',
          )}
        >
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
              Help Center
            </span>
          </div>

          <h2
            className={cn(
              'text-4xl md:text-5xl',
              'font-black tracking-tight',
              'text-slate-900 leading-tight',
            )}
          >
            Pertanyaan{' '}
            <span className="text-emerald-600 relative">
              Umum
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-3',
                  'text-emerald-300/50',
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
              'text-lg text-slate-500',
              'max-w-xl mx-auto font-medium',
            )}
          >
            Temukan jawaban cepat atas
            pertanyaan yang sering diajukan.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div
                key={i}
                className={cn(
                  'bg-white rounded-3xl',
                  'border transition-all',
                  'duration-500 overflow-hidden',
                  isOpen
                    ? 'border-emerald-500'
                      + ' shadow-xl'
                      + ' shadow-emerald-900/5'
                      + ' ring-1'
                      + ' ring-emerald-500/10'
                    : 'border-slate-100'
                      + ' shadow-lg'
                      + ' shadow-stone-200/50'
                      + ' hover:border-slate-200',
                )}
              >
                <button
                  onClick={() =>
                    setOpenIndex(
                      isOpen ? null : i,
                    )
                  }
                  className={cn(
                    'w-full flex cursor-pointer',
                    'items-center justify-between',
                    'p-6 md:p-8 text-left',
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center gap-4',
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl',
                        'flex items-center',
                        'justify-center',
                        'transition-colors',
                        isOpen
                          ? 'bg-emerald-600'
                            + ' text-white'
                          : 'bg-slate-50'
                            + ' text-slate-400',
                      )}
                    >
                      <HelpCircle
                        className="h-5 w-5"
                      />
                    </div>
                    <h3
                      className={cn(
                        'font-black text-lg',
                        'transition-colors',
                        isOpen
                          ? 'text-slate-900'
                          : 'text-slate-700',
                      )}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'ml-4 shrink-0',
                      'rounded-full p-2',
                      'transition-all',
                      isOpen
                        ? 'bg-emerald-50'
                          + ' text-emerald-600'
                        : 'bg-slate-50'
                          + ' text-slate-300',
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        'h-5 w-5',
                        'transition-transform',
                        'duration-500',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </span>
                </button>

                <div
                  className={cn(
                    'grid transition-all',
                    'duration-500 ease-in-out',
                    isOpen
                      ? 'grid-rows-[1fr]'
                        + ' opacity-100'
                      : 'grid-rows-[0fr]'
                        + ' opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div
                      className={cn(
                        'px-6 md:px-8',
                        'pb-8 pt-0 ml-14',
                      )}
                    >
                      <p
                        className={cn(
                          'text-slate-500',
                          'leading-relaxed',
                          'font-medium text-base',
                        )}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
