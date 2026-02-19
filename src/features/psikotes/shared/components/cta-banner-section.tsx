import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import type { CtaBannerData } from '../../types'

interface CtaBannerSectionProps {
  data: CtaBannerData
}

export function CtaBannerSection({
  data,
}: CtaBannerSectionProps) {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div
          className={cn(
            'relative group p-10 md:p-16',
            'bg-white rounded-[3rem]',
            'border border-slate-100',
            'text-center space-y-8',
            'transition-all duration-500',
            'hover:shadow-2xl',
            'hover:shadow-primary-900/5',
            'hover:-translate-y-1',
            'shadow-xl shadow-stone-200/50',
            'overflow-hidden',
          )}
        >
          {/* Corner Ornaments */}
          <div
            className={cn(
              'absolute -top-10 -right-10',
              'w-40 h-40 bg-primary-50',
              'rounded-full blur-3xl',
              'opacity-50',
              'group-hover:opacity-100',
              'transition-opacity',
            )}
          />
          <div
            className={cn(
              'absolute -bottom-10 -left-10',
              'w-40 h-40 bg-accent-50',
              'rounded-full blur-3xl',
              'opacity-50',
              'group-hover:opacity-100',
              'transition-opacity',
            )}
          />

          <div
            className={cn(
              'relative z-10 space-y-8',
            )}
          >
            {/* Badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-1.5 rounded-full',
                'bg-primary-50 text-primary-600',
                'border border-primary-100',
                'text-[10px] font-black',
                'uppercase tracking-widest',
              )}
            >
              <Sparkles className="w-3 h-3" />
              Get Started
            </div>

            {/* Title */}
            <h3
              className={cn(
                'text-3xl md:text-4xl',
                'font-black tracking-tight',
                'text-slate-900',
              )}
            >
              {data.title}{' '}
              <span className="text-primary-600">
                {data.titleAccent}
              </span>
            </h3>

            {/* Description */}
            <p
              className={cn(
                'text-lg text-slate-500',
                'max-w-xl mx-auto font-medium',
                'leading-relaxed',
              )}
            >
              {data.description}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href={data.href}
                className={cn(
                  'inline-flex items-center',
                  'gap-3 px-10 py-4',
                  'bg-primary-700 text-white',
                  'rounded-2xl text-xs',
                  'font-black uppercase',
                  'tracking-widest',
                  'hover:bg-primary-600',
                  'transition-all shadow-lg',
                  'hover:shadow-primary-200',
                )}
              >
                {data.buttonText}
                <ArrowRight
                  className="w-4 h-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
