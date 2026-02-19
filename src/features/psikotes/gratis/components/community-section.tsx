import { Users, Star, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

export function CommunitySection() {
  return (
    <section
      className={cn(
        'space-y-8 bg-white rounded-3xl',
        'p-8 border border-stone-100',
      )}
    >
      <div className="text-center space-y-4">
        <div
          className={cn(
            'w-12 h-12 bg-primary-50',
            'rounded-2xl flex items-center',
            'justify-center mx-auto',
            'text-primary-700',
            'border border-primary-100',
          )}
        >
          <Users className="w-6 h-6" />
        </div>
        <h3
          className={cn(
            'text-xl font-black',
            'text-stone-800 leading-tight',
          )}
        >
          Jangan Tumbuh Sendirian
        </h3>
        <p
          className={cn(
            'text-stone-500 text-sm',
            'max-w-md mx-auto',
          )}
        >
          Bergabunglah dengan 50.000+ member
          lainnya di Community Hub. Networking,
          event eksklusif, dan support system
          positif.
        </p>
      </div>

      <div
        className={cn(
          'flex flex-col md:flex-row gap-4',
        )}
      >
        <div
          className={cn(
            'flex-1 bg-primary-50/50',
            'rounded-2xl p-6 border',
            'border-primary-100',
            'flex items-start gap-4',
          )}
        >
          <div
            className={cn(
              'p-2 bg-white rounded-lg',
              'border border-primary-200',
            )}
          >
            <Star
              className={cn(
                'w-4 h-4 text-primary-700',
              )}
            />
          </div>
          <div>
            <h4
              className={cn(
                'font-bold text-sm',
                'text-stone-800',
              )}
            >
              Networking
            </h4>
            <p
              className={cn(
                'text-xs text-stone-500 mt-1',
              )}
            >
              Temukan partner akuntabilitas
              sefrekuensi.
            </p>
          </div>
        </div>
        <div
          className={cn(
            'flex-1 bg-primary-50/50',
            'rounded-2xl p-6 border',
            'border-primary-100',
            'flex items-start gap-4',
          )}
        >
          <div
            className={cn(
              'p-2 bg-white rounded-lg',
              'border border-primary-200',
            )}
          >
            <Sparkles
              className={cn(
                'w-4 h-4 text-primary-700',
              )}
            />
          </div>
          <div>
            <h4
              className={cn(
                'font-bold text-sm',
                'text-stone-800',
              )}
            >
              Exclusive Events
            </h4>
            <p
              className={cn(
                'text-xs text-stone-500 mt-1',
              )}
            >
              Webinar rutin dengan expert
              psikologi.
            </p>
          </div>
        </div>
      </div>

      <button
        className={cn(
          'w-full py-4 border',
          'border-primary-200 text-primary-800',
          'rounded-xl font-bold uppercase',
          'tracking-wider text-xs',
          'hover:border-primary-600',
          'hover:bg-primary-700',
          'hover:text-white transition-all',
        )}
      >
        Gabung Komunitas (Gratis)
      </button>
    </section>
  )
}
