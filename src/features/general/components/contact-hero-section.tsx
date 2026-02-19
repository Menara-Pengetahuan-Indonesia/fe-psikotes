import {
  Plus,
  Hexagon,
  Diamond,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    value: 'info@bermoela.com',
    desc: 'Respon dalam 1x24 jam kerja',
    href: 'mailto:info@bermoela.com',
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+62 812-3456-7890',
    desc: 'Senin - Jumat, 09:00 - 17:00',
    href: 'tel:+6281234567890',
  },
  {
    icon: MapPin,
    title: 'Kantor',
    value: 'Jakarta, Indonesia',
    desc: 'Kunjungan dengan janji temu',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    value: 'Sen - Jum, 09:00 - 17:00',
    desc: 'Layanan online 24/7',
    href: '#',
  },
]

export function ContactHeroSection() {
  return (
    <>
      {/* Hero */}
      <section
        className={cn(
          'relative overflow-hidden py-20 md:py-36',
          'bg-linear-to-b from-secondary-900',
          'via-secondary to-secondary-300',
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
            'w-150 h-150 bg-secondary-900/30',
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
            'text-accent-200/10 w-16 h-16',
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
              'bg-secondary/60 border',
              'border-sky-400/40 shadow-lg',
              'backdrop-blur-md mb-8',
            )}
          >
            <Sparkles
              className={cn(
                'w-4 h-4 text-accent-400',
                'fill-accent-400',
              )}
            />
            <span
              className={cn(
                'text-[11px] font-black',
                'tracking-[0.2em]',
                'text-sky-50 uppercase',
              )}
            >
              Get In Touch
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
            Hubungi{' '}
            <span className="text-accent-300">
              Kami
            </span>
          </h1>
          <p
            className={cn(
              'text-xl text-sky-50 max-w-2xl',
              'mx-auto leading-relaxed',
              'font-medium opacity-90',
            )}
          >
            Kami siap membantu Anda. Jangan ragu
            untuk menghubungi tim kami.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-white pb-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className={cn(
              'grid grid-cols-2 md:grid-cols-4',
              'gap-4 -mt-6',
            )}
          >
            {CONTACT_INFO.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className={cn(
                  'bg-white rounded-3xl p-5',
                  'shadow-xl shadow-secondary/5',
                  'border border-slate-100',
                  'hover:-translate-y-1',
                  'hover:shadow-2xl',
                  'transition-all duration-300',
                  'group text-center',
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-2xl',
                    'bg-secondary/10 mx-auto',
                    'flex items-center',
                    'justify-center mb-3',
                    'group-hover:bg-secondary',
                    'transition-colors',
                    'duration-300',
                  )}
                >
                  <c.icon
                    className={cn(
                      'w-5 h-5 text-secondary',
                      'group-hover:text-white',
                      'transition-colors',
                      'duration-300',
                    )}
                  />
                </div>
                <p
                  className={cn(
                    'font-black text-sm',
                    'text-slate-900 mb-0.5',
                  )}
                >
                  {c.title}
                </p>
                <p
                  className={cn(
                    'text-xs text-secondary',
                    'font-semibold mb-1',
                  )}
                >
                  {c.value}
                </p>
                <p
                  className={cn(
                    'text-[11px] text-slate-400',
                  )}
                >
                  {c.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
