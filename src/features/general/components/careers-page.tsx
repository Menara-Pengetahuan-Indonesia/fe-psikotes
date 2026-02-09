import Link from 'next/link'
import {
  Plus,
  Hexagon,
  Diamond,
  Sparkles,
  Heart,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  MapPin,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const BENEFITS = [
  {
    icon: Heart,
    title: 'Dampak Positif',
    desc:
      'Berkontribusi pada kesehatan mental'
      + ' masyarakat Indonesia.',
  },
  {
    icon: Users,
    title: 'Tim Profesional',
    desc:
      'Bekerja bersama psikolog dan'
      + ' tech experts terbaik.',
  },
  {
    icon: Clock,
    title: 'Fleksibel',
    desc:
      'Remote-first culture dengan jam'
      + ' kerja yang fleksibel.',
  },
  {
    icon: TrendingUp,
    title: 'Berkembang',
    desc:
      'Kesempatan belajar dan berkembang'
      + ' tanpa batas.',
  },
]

const POSITIONS = [
  {
    title: 'Frontend Developer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Psikolog Klinis',
    dept: 'Clinical',
    location: 'Jakarta',
    type: 'Full-time',
  },
  {
    title: 'Content Writer',
    dept: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Designer',
    dept: 'Design',
    location: 'Remote',
    type: 'Full-time',
  },
]

export function CareersPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className={cn(
          'relative overflow-hidden py-20 md:py-36',
          'bg-linear-to-b from-[#0a1f33]',
          'via-[#143D60] to-[#1d5a8a]',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 opacity-[0.07]',
            'pointer-events-none mix-blend-overlay',
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
          }}
        />
        <div
          className={cn(
            'absolute top-[-10%] left-[-10%]',
            'w-150 h-150 bg-[#0a1f33]/30',
            'rounded-full blur-[120px]',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-[-10%] right-[-5%]',
            'w-125 h-125 bg-sky-300/15',
            'rounded-full blur-[120px]',
            'pointer-events-none',
          )}
        />
        <Plus
          className={cn(
            'absolute top-[10%] left-[15%]',
            'text-sky-300/30 w-8 h-8',
            'animate-pulse',
          )}
        />
        <Hexagon
          className={cn(
            'absolute top-[20%] right-[25%]',
            'text-white/10 w-24 h-24',
            '-rotate-12 animate-float-medium',
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[20%] right-[40%]',
            'text-amber-200/10 w-16 h-16',
            'rotate-12 animate-float-slow',
          )}
        />

        <div
          className={cn(
            'max-w-5xl mx-auto px-6',
            'relative z-10 text-center',
          )}
        >
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-2 rounded-full',
              'bg-[#143D60]/60 border',
              'border-sky-400/40 shadow-lg',
              'backdrop-blur-md mb-8',
            )}
          >
            <Sparkles
              className={cn(
                'w-4 h-4 text-amber-400',
                'fill-amber-400',
              )}
            />
            <span
              className={cn(
                'text-[11px] font-black',
                'tracking-[0.2em]',
                'text-sky-50 uppercase',
              )}
            >
              Join Our Team
            </span>
          </div>
          <h1
            className={cn(
              'text-5xl md:text-6xl lg:text-7xl',
              'font-black text-white',
              'tracking-tighter leading-none',
              'drop-shadow-lg mb-6',
            )}
          >
            Karir di{' '}
            <span className="text-amber-300">
              BERMOELA
            </span>
          </h1>
          <p
            className={cn(
              'text-xl text-sky-50 max-w-2xl',
              'mx-auto leading-relaxed',
              'font-medium opacity-90',
            )}
          >
            Bergabung bersama kami membangun platform
            pengembangan diri terbaik di Indonesia.
          </p>
        </div>
      </section>

      {/* Why Join */}
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
                    'bg-[#143D60]/10',
                    'flex items-center',
                    'justify-center mb-4',
                  )}
                >
                  <b.icon
                    className={cn(
                      'w-6 h-6',
                      'text-[#143D60]',
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

      {/* Open Positions */}
      <section
        className="bg-[#faf5e4] py-16 md:py-24"
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
                  'hover:border-[#143D60]/30',
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
                        'group-hover:text-[#143D60]',
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
                        <Briefcase className="w-3.5 h-3.5" />
                        {pos.dept}
                      </span>
                      <span
                        className={cn(
                          'flex items-center',
                          'gap-1',
                        )}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {pos.location}
                      </span>
                      <span>{pos.type}</span>
                    </div>
                  </div>
                  <ArrowRight
                    className={cn(
                      'w-5 h-5 text-slate-300',
                      'group-hover:text-[#143D60]',
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
    </main>
  )
}
