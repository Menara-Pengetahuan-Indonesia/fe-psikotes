import Link from 'next/link'
import {
  ArrowRight,
  MapPin,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { POSITIONS } from './careers-constants'

export function CareersPositionsSection() {
  return (
    <section
      className="bg-background py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className={cn(
            'text-3xl md:text-4xl font-black',
            'text-slate-900 text-center mb-12',
          )}
        >
          Posisi Terbuka
        </h2>
        <div className="space-y-4">
          {POSITIONS.map((pos) => (
            <Link
              key={pos.title}
              href="#"
              className={cn(
                'block p-6 rounded-2xl',
                'bg-white border',
                'border-slate-200',
                'hover:border-secondary/30',
                'hover:shadow-lg transition-all',
                'duration-300 group',
              )}
            >
              <div
                className={cn(
                  'flex flex-col sm:flex-row',
                  'sm:items-center',
                  'justify-between gap-3',
                )}
              >
                <div>
                  <h3
                    className={cn(
                      'font-bold text-lg',
                      'text-slate-900',
                      'group-hover:text-secondary',
                      'transition-colors',
                    )}
                  >
                    {pos.title}
                  </h3>
                  <div
                    className={cn(
                      'flex items-center gap-3',
                      'text-sm text-slate-500',
                      'mt-1',
                    )}
                  >
                    <span
                      className={cn(
                        'flex items-center',
                        'gap-1',
                      )}
                    >
                      <Briefcase
                        className="w-3.5 h-3.5"
                      />
                      {pos.dept}
                    </span>
                    <span
                      className={cn(
                        'flex items-center',
                        'gap-1',
                      )}
                    >
                      <MapPin
                        className="w-3.5 h-3.5"
                      />
                      {pos.location}
                    </span>
                    <span>{pos.type}</span>
                  </div>
                </div>
                <ArrowRight
                  className={cn(
                    'w-5 h-5 text-slate-300',
                    'group-hover:text-secondary',
                    'group-hover:translate-x-1',
                    'transition-all shrink-0',
                  )}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
