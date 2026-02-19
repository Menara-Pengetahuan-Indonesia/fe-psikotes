import {
  Hexagon,
  Diamond,
  Sparkles,
  ShieldCheck,
  Trophy,
  Lightbulb,
  Heart,
  Rocket,
  Handshake,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Profesional',
    desc: 'Standar etika profesi tertinggi.',
  },
  {
    icon: Trophy,
    title: 'Terpercaya',
    desc: 'Didukung psikolog berlisensi.',
  },
  {
    icon: Lightbulb,
    title: 'Inovatif',
    desc: 'Metode asesmen modern.',
  },
  {
    icon: Heart,
    title: 'Inklusif',
    desc: 'Untuk semua kalangan.',
  },
  {
    icon: Rocket,
    title: 'Berdampak',
    desc: 'Hasil nyata dan terukur.',
  },
  {
    icon: Handshake,
    title: 'Kolaboratif',
    desc: 'Bersama institusi & perusahaan.',
  },
] as const

export function AboutValuesSection() {
  return (
    <section
      className={cn(
        'bg-white py-20 md:py-28',
        'relative overflow-hidden',
      )}
    >
      <Hexagon
        className={cn(
          'absolute top-[10%] left-[5%]',
          'text-secondary/5 w-20 h-20',
          '-rotate-12 pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[15%] right-[10%]',
          'text-accent-400/10 w-12 h-12',
          'rotate-12 pointer-events-none',
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
              Core Values
            </span>
          </div>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-black',
              'text-secondary tracking-tight',
            )}
          >
            Nilai-Nilai{' '}
            <span className="text-accent-500">
              Kami
            </span>
          </h2>
          <p
            className={cn(
              'text-slate-600 max-w-xl',
              'mx-auto leading-relaxed',
            )}
          >
            Prinsip yang menjadi landasan setiap
            layanan dan keputusan di BERMOELA.
          </p>
        </div>
        <div
          className={cn(
            'grid sm:grid-cols-2',
            'lg:grid-cols-3 gap-5',
          )}
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              className={cn(
                'p-6 rounded-3xl bg-white',
                'border border-slate-100',
                'shadow-lg shadow-stone-200/50',
                'hover:-translate-y-1',
                'hover:shadow-xl transition-all',
                'duration-300 group',
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-2xl',
                  'bg-secondary/10',
                  'flex items-center',
                  'justify-center mb-5',
                  'group-hover:bg-secondary',
                  'transition-colors duration-300',
                )}
              >
                <v.icon
                  className={cn(
                    'w-6 h-6 text-secondary',
                    'group-hover:text-white',
                    'transition-colors duration-300',
                  )}
                />
              </div>
              <h3
                className={cn(
                  'text-lg font-black',
                  'text-slate-900 mb-2',
                )}
              >
                {v.title}
              </h3>
              <p
                className={cn(
                  'text-sm text-slate-500',
                  'leading-relaxed',
                )}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
