import { Download, Share2, Brain } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { ResultData } from '@features/psikotes/constants'

interface ResultCardSectionProps {
  result: ResultData
}

export function ResultCardSection({
  result,
}: ResultCardSectionProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-4',
        'border border-stone-200',
        'shadow-xl shadow-stone-300/30',
      )}
    >
      <div
        className={cn(
          'relative bg-primary-800',
          'rounded-2xl',
          'overflow-hidden flex flex-col',
          'items-center justify-center',
          'text-center py-12 px-8',
          'text-white',
        )}
      >
        {/* Decorative blobs */}
        <div
          className={cn(
            'absolute top-0 right-0',
            'w-80 h-80 bg-primary-600',
            'rounded-full blur-[120px]',
            'opacity-40 -translate-y-1/2',
            'translate-x-1/2',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0',
            'w-80 h-80 bg-primary-500',
            'rounded-full blur-[120px]',
            'opacity-20 translate-y-1/2',
            '-translate-x-1/2',
          )}
        />

        <div
          className={cn(
            'relative z-10 space-y-5',
          )}
        >
          <div
            className={cn(
              'inline-block px-4 py-2',
              'rounded-full border',
              'border-white/10 bg-white/5',
              'backdrop-blur-sm text-[10px]',
              'font-bold uppercase',
              'tracking-[0.2em]',
              'text-primary-200',
            )}
          >
            Personality Type
          </div>

          <div className="space-y-2">
            <h2
              className={cn(
                'text-5xl md:text-6xl',
                'font-black text-white',
                'tracking-tighter',
              )}
            >
              {result.code}
            </h2>
            <h3
              className={cn(
                'text-xl md:text-2xl',
                'font-bold text-primary-200',
                'tracking-tight',
              )}
            >
              {result.title}
            </h3>
          </div>

          {/* Abstract visualization rings */}
          <div
            className={cn(
              'w-24 h-24 mx-auto relative',
            )}
          >
            <div
              className={cn(
                'absolute inset-0 border-2',
                'border-white/20 rounded-full',
              )}
            />
            <div
              className={cn(
                'absolute inset-3 border',
                'border-white/10 rounded-full',
              )}
            />
            <div
              className={cn(
                'absolute inset-0 flex',
                'items-center justify-center',
              )}
            >
              <Brain
                className={cn(
                  'w-10 h-10 text-white',
                  'opacity-90',
                )}
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'p-6 text-center space-y-4',
        )}
      >
        <p
          className={cn(
            'text-sm text-stone-500',
            'max-w-md mx-auto leading-relaxed',
          )}
        >
          {result.description}
        </p>
        <div className="flex flex-col gap-3">
          <button
            className={cn(
              'w-full py-4 bg-primary-700',
              'text-white rounded-xl font-bold',
              'uppercase tracking-widest text-xs',
              'hover:bg-primary-800',
              'transition-all flex items-center',
              'justify-center gap-2 shadow-lg',
              'shadow-primary-200',
            )}
          >
            <Download className="w-4 h-4" />
            Download Laporan Lengkap (PDF)
          </button>
          <button
            className={cn(
              'w-full py-4 bg-white border',
              'border-stone-200 text-stone-800',
              'rounded-xl font-bold uppercase',
              'tracking-widest text-xs',
              'hover:border-primary-500',
              'transition-all flex items-center',
              'justify-center gap-2',
            )}
          >
            <Share2 className="w-4 h-4" />
            Bagikan Hasil
          </button>
        </div>
      </div>
    </div>
  )
}
