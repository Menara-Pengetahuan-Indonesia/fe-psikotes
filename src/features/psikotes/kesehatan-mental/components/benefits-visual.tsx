import { cn } from '@/lib/utils'

export function BenefitsVisual() {
  return (
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
              '#F0FDFA_0%,',
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
                'bg-primary-500',
                'rounded-3xl shadow-2xl',
                'shadow-primary-900/20',
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
                'bg-accent-400 rounded-2xl',
                'shadow-xl',
                'shadow-accent-900/10',
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
            'w-16 h-16 bg-accent-200',
            'rounded-full blur-xl',
            'opacity-60 animate-pulse z-0',
          )}
        />
      </div>
    </div>
  )
}
