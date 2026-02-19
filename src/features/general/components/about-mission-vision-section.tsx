import {
  Plus,
  Circle,
  Sparkles,
  Eye,
  Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AboutMissionVisionSection() {
  return (
    <section
      className={cn(
        'bg-white py-20 md:py-28',
        'relative overflow-hidden',
      )}
    >
      <Plus
        className={cn(
          'absolute top-[15%] right-[8%]',
          'text-secondary/5 w-16 h-16',
          'rotate-45 pointer-events-none',
        )}
      />
      <Circle
        className={cn(
          'absolute bottom-[15%] left-[5%]',
          'text-accent-400/10 w-20 h-20',
          'pointer-events-none',
        )}
      />
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={cn(
            'text-center mb-14 space-y-4',
          )}
        >
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
                'w-3.5 h-3.5 text-secondary',
                'fill-secondary',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-black',
                'tracking-[0.2em]',
                'text-slate-500 uppercase',
              )}
            >
              Our Purpose
            </span>
          </div>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-black',
              'text-secondary tracking-tight',
            )}
          >
            Misi &{' '}
            <span className="text-accent-500">
              Visi
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div
            className={cn(
              'p-8 md:p-10 rounded-3xl',
              'bg-secondary relative',
              'overflow-hidden group',
            )}
          >
            <div
              className={cn(
                'absolute top-0 right-0',
                'w-40 h-40 bg-white/5',
                'rounded-full -translate-y-1/2',
                'translate-x-1/2',
                'pointer-events-none',
              )}
            />
            <div
              className={cn(
                'w-14 h-14 rounded-2xl',
                'bg-white/15 flex items-center',
                'justify-center mb-6',
                'backdrop-blur-sm',
              )}
            >
              <Rocket
                className="w-7 h-7 text-accent-300"
              />
            </div>
            <h2
              className={cn(
                'text-2xl md:text-3xl font-black',
                'text-white mb-4',
              )}
            >
              Misi Kami
            </h2>
            <p
              className={cn(
                'text-sky-100/80',
                'leading-relaxed text-lg',
              )}
            >
              Menyediakan layanan psikologi
              berkualitas tinggi yang mudah diakses
              oleh seluruh masyarakat Indonesia
              melalui asesmen ilmiah, konseling,
              dan pelatihan.
            </p>
          </div>
          <div
            className={cn(
              'p-8 md:p-10 rounded-3xl',
              'bg-gradient-to-br from-accent-400',
              'to-accent-500 relative overflow-hidden',
              'group',
            )}
          >
            <div
              className={cn(
                'absolute bottom-0 left-0',
                'w-40 h-40 bg-white/10',
                'rounded-full translate-y-1/2',
                '-translate-x-1/2',
                'pointer-events-none',
              )}
            />
            <div
              className={cn(
                'w-14 h-14 rounded-2xl',
                'bg-white/20 flex items-center',
                'justify-center mb-6',
                'backdrop-blur-sm',
              )}
            >
              <Eye
                className={cn(
                  'w-7 h-7',
                  'text-accent-900',
                )}
              />
            </div>
            <h2
              className={cn(
                'text-2xl md:text-3xl font-black',
                'text-accent-950 mb-4',
              )}
            >
              Visi Kami
            </h2>
            <p
              className={cn(
                'text-accent-900/80',
                'leading-relaxed text-lg',
              )}
            >
              Menjadi platform psikologi terdepan
              di Indonesia yang memberdayakan
              setiap individu mengenali potensi
              terbaiknya untuk kehidupan bermakna.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
