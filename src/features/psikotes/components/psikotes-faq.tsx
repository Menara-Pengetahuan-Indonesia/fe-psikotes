'use client'

import { useState } from 'react'
import {
  Sparkles,
  Plus,
  Circle,
  Diamond,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PSIKOTES_FAQS } from '../constants'
import { PsikotesFaqItem } from './psikotes-faq-item'

export function PsikotesFaq() {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(0)

  return (
    <section
      className={cn(
        'py-24 md:py-36 bg-background',
        'relative overflow-hidden',
      )}
    >
      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[8%] left-[6%]',
          'text-primary-800/20 w-10 h-10',
          'rotate-45 pointer-events-none',
        )}
      />
      <Circle
        className={cn(
          'absolute top-[15%] right-[8%]',
          'text-accent-500/20 w-14 h-14',
          'pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[10%] left-[10%]',
          'text-primary-600/20 w-8 h-8',
          'rotate-12 pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-[20%] right-[5%]',
          'w-20 h-20 rounded-full',
          'border-2 border-primary-800/15',
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
                'w-3.5 h-3.5 text-primary-600',
                'fill-primary-600',
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
            <span
              className="text-primary-600 relative"
            >
              Umum
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-3',
                  'text-primary-500/30',
                )}
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 T 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {PSIKOTES_FAQS.map((faq, i) => (
            <PsikotesFaqItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(
                  openIndex === i ? null : i,
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
