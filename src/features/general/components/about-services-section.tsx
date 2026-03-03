import {
  Plus,
  Diamond,
  Circle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICES_OVERVIEW } from '../constants'

export function AboutServicesSection() {
  return (
    <section
      className={cn(
        'bg-background py-20 md:py-28',
        'relative overflow-hidden',
      )}
    >
      <Plus
        className={cn(
          'absolute top-[8%] left-[6%]',
          'text-secondary/10 w-10 h-10',
          'rotate-45 pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[12%] right-[8%]',
          'text-accent-500/15 w-8 h-8',
          'rotate-12 pointer-events-none',
        )}
      />
      <Circle
        className={cn(
          'absolute top-[20%] right-[12%]',
          'text-secondary/5 w-14 h-14',
          'pointer-events-none',
        )}
      />
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'bg-white border border-slate-200',
              'shadow-sm',
            )}
          >
            <Sparkles
              className={cn(
                'w-3.5 h-3.5 text-accent-500',
                'fill-accent-500',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-black',
                'tracking-[0.2em]',
                'text-slate-500 uppercase',
              )}
            >
              Layanan Kami
            </span>
          </div>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-black',
              'text-secondary tracking-tight',
            )}
          >
            Tiga Pilar{' '}
            <span className="text-accent-500">
              Utama
            </span>
          </h2>
          <p
            className={cn(
              'text-slate-600 max-w-xl',
              'mx-auto leading-relaxed',
            )}
          >
            Solusi pengembangan diri komprehensif
            untuk setiap kebutuhan Anda.
          </p>
        </div>
        <div
          className={cn(
            'grid md:grid-cols-3 gap-6',
          )}
        >
          {SERVICES_OVERVIEW.map((s) => (
            <div
              key={s.title}
              className={cn(
                'bg-white rounded-3xl border',
                'border-slate-100 p-8',
                'shadow-lg shadow-stone-200/50',
                'hover:-translate-y-1',
                'hover:shadow-xl transition-all',
                'duration-300 group',
              )}
            >
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl',
                  'flex items-center justify-center',
                  'mb-6',
                  s.color,
                )}
              >
                <s.icon
                  className="w-7 h-7 text-white"
                />
              </div>
              <h3
                className={cn(
                  'text-xl font-black',
                  'text-slate-900 mb-3',
                )}
              >
                {s.title}
              </h3>
              <p
                className={cn(
                  'text-slate-500',
                  'leading-relaxed',
                )}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
