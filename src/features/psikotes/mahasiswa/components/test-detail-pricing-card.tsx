import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  price: string
  originalPrice?: string
  formHref: string
}

export function PricingCard({
  price,
  originalPrice,
  formHref,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'sticky top-28',
        'rounded-3xl border',
        'border-slate-200 bg-white',
        'shadow-2xl shadow-slate-900/10',
        'overflow-hidden',
      )}
    >
      {/* Card Header */}
      <div
        className={cn(
          'bg-primary-950 text-white',
          'px-8 py-8 relative',
        )}
      >
        <div
          className={cn(
            'absolute top-0 right-0',
            'w-32 h-32 bg-primary-800/30',
            'rounded-full blur-3xl',
          )}
        />
        <p
          className={cn(
            'text-[10px] font-black',
            'uppercase tracking-[0.2em]',
            'text-accent-300 mb-2',
            'relative z-10',
          )}
        >
          Investasi Masa Depan
        </p>
        <div
          className={cn(
            'flex items-baseline gap-3',
            'relative z-10',
          )}
        >
          <span
            className={cn(
              'text-4xl font-black',
              'tracking-tight',
            )}
          >
            {price}
          </span>
          {originalPrice && (
            <span
              className={cn(
                'text-primary-400/50',
                'line-through text-sm',
                'font-bold',
              )}
            >
              {originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-8 space-y-8">
        <div>
          <p
            className={cn(
              'text-[10px] font-black',
              'text-slate-400 uppercase',
              'tracking-[0.2em] mb-4',
            )}
          >
            Yang Anda Dapatkan
          </p>
          <ul className="space-y-4">
            {[
              'Akses penuh ke seluruh modul tes',
              'Laporan hasil analisis mendalam',
              'Rekomendasi yang dipersonalisasi',
              'Akses seumur hidup ke hasil Anda',
            ].map((item) => (
              <li
                key={item}
                className={cn(
                  'flex items-start gap-3',
                  'text-sm text-slate-600',
                  'font-medium',
                )}
              >
                <div
                  className={cn(
                    'mt-0.5 w-5 h-5',
                    'rounded-lg bg-primary-50',
                    'text-primary-600',
                    'flex items-center',
                    'justify-center shrink-0',
                    'border border-primary-200',
                  )}
                >
                  <Check
                    className={cn(
                      'w-3.5 h-3.5 stroke-3',
                    )}
                  />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-2">
          <Button
            asChild
            className={cn(
              'w-full rounded-2xl h-14',
              'text-sm font-black uppercase',
              'tracking-widest',
              'bg-primary-600',
              'hover:bg-primary-700',
              'text-white shadow-lg',
              'shadow-primary-600/20',
              'transition-all border-none',
            )}
          >
            <Link
              href={formHref}
              className={cn(
                'flex items-center gap-2',
              )}
            >
              Mulai Tes Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <p
            className={cn(
              'text-[10px] text-center',
              'font-bold text-slate-400',
              'uppercase tracking-tight',
            )}
          >
            *Hasil tes tersedia dalam format PDF
          </p>
        </div>
      </div>
    </div>
  )
}
