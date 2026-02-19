import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

export function CategoryFaqHeader() {
  return (
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
            'text-primary-600',
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
        <span className="text-primary-600 relative">
          Umum
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
          'text-lg text-slate-500',
          'max-w-xl mx-auto font-medium',
        )}
      >
        Temukan jawaban cepat atas
        pertanyaan yang sering diajukan.
      </p>
    </div>
  )
}
