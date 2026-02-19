import { cn } from '@/lib/utils'
import { BENEFITS } from './careers-constants'

export function CareersBenefitsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className={cn(
            'text-3xl md:text-4xl font-black',
            'text-slate-900 text-center mb-12',
          )}
        >
          Mengapa Bergabung?
        </h2>
        <div
          className={cn(
            'grid sm:grid-cols-2',
            'lg:grid-cols-4 gap-6',
          )}
        >
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className={cn(
                'p-6 rounded-2xl border',
                'border-slate-200 text-center',
                'hover:-translate-y-1',
                'hover:shadow-lg transition-all',
                'duration-300',
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl mx-auto',
                  'bg-secondary/10',
                  'flex items-center',
                  'justify-center mb-4',
                )}
              >
                <b.icon
                  className={cn(
                    'w-6 h-6',
                    'text-secondary',
                  )}
                />
              </div>
              <h3
                className={cn(
                  'font-bold text-slate-900',
                  'mb-2',
                )}
              >
                {b.title}
              </h3>
              <p
                className={cn(
                  'text-sm text-slate-500',
                  'leading-relaxed',
                )}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
