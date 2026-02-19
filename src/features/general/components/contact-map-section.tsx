import { Plus, Diamond, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ContactMapSection() {
  return (
    <section
      className={cn(
        'bg-background py-16 md:py-20',
        'relative overflow-hidden',
      )}
    >
      <Plus
        className={cn(
          'absolute top-[10%] left-[8%]',
          'text-secondary/10 w-8 h-8',
          'rotate-45 pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[15%] right-[10%]',
          'text-accent-500/15 w-6 h-6',
          'rotate-12 pointer-events-none',
        )}
      />
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10 space-y-3">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-black',
              'text-secondary tracking-tight',
            )}
          >
            Lokasi{' '}
            <span className="text-accent-500">
              Kami
            </span>
          </h2>
          <p
            className={cn(
              'text-slate-500 max-w-md',
              'mx-auto',
            )}
          >
            Kunjungi kantor kami dengan janji temu
            terlebih dahulu.
          </p>
        </div>
        <div
          className={cn(
            'h-72 rounded-3xl bg-white',
            'shadow-lg shadow-stone-200/50',
            'border border-slate-100',
            'flex items-center justify-center',
          )}
        >
          <div className="text-center">
            <div
              className={cn(
                'w-14 h-14 rounded-2xl',
                'bg-secondary/10 mx-auto',
                'flex items-center',
                'justify-center mb-3',
              )}
            >
              <MapPin
                className={cn(
                  'w-7 h-7',
                  'text-secondary',
                )}
              />
            </div>
            <p
              className={cn(
                'text-slate-900 font-bold',
                'mb-1',
              )}
            >
              Jakarta, Indonesia
            </p>
            <p className="text-slate-400 text-sm">
              Peta interaktif segera hadir
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
