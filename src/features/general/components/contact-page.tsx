'use client'

import {
  Plus,
  Hexagon,
  Diamond,
  Circle,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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

export function ContactPage() {
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
            <span className="text-amber-300">
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
                  'shadow-xl shadow-[#143D60]/5',
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
                    'bg-[#143D60]/10 mx-auto',
                    'flex items-center',
                    'justify-center mb-3',
                    'group-hover:bg-[#143D60]',
                    'transition-colors',
                    'duration-300',
                  )}
                >
                  <c.icon
                    className={cn(
                      'w-5 h-5 text-[#143D60]',
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
                    'text-xs text-[#143D60]',
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

      {/* Form Section */}
      <section
        className={cn(
          'bg-white pt-16 pb-20 md:pt-24',
          'md:pb-28 relative overflow-hidden',
        )}
      >
        <Plus
          className={cn(
            'absolute top-[20%] right-[8%]',
            'text-[#143D60]/5 w-14 h-14',
            'rotate-45 pointer-events-none',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[15%] left-[5%]',
            'text-amber-400/10 w-16 h-16',
            'pointer-events-none',
          )}
        />
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left — Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div
                  className={cn(
                    'inline-flex items-center',
                    'gap-2 px-4 py-1.5',
                    'rounded-full bg-white border',
                    'border-slate-200 shadow-sm',
                  )}
                >
                  <Sparkles
                    className={cn(
                      'w-3.5 h-3.5 text-[#143D60]',
                      'fill-[#143D60]',
                    )}
                  />
                  <span
                    className={cn(
                      'text-[10px] font-black',
                      'tracking-[0.2em]',
                      'text-slate-500 uppercase',
                    )}
                  >
                    Send Message
                  </span>
                </div>
                <h2
                  className={cn(
                    'text-4xl md:text-5xl',
                    'font-black text-[#143D60]',
                    'tracking-tight',
                  )}
                >
                  Kirim{' '}
                  <span className="text-amber-500">
                    Pesan
                  </span>
                </h2>
                <p
                  className={cn(
                    'text-slate-500',
                    'leading-relaxed text-lg',
                  )}
                >
                  Ada pertanyaan atau butuh bantuan?
                  Isi formulir dan tim kami akan segera
                  menghubungi Anda.
                </p>
              </div>

              <div
                className={cn(
                  'p-6 rounded-3xl bg-[#143D60]',
                  'relative overflow-hidden',
                )}
              >
                <div
                  className={cn(
                    'absolute top-0 right-0',
                    'w-32 h-32 bg-white/5',
                    'rounded-full -translate-y-1/2',
                    'translate-x-1/2',
                    'pointer-events-none',
                  )}
                />
                <div
                  className={cn(
                    'flex items-center gap-4',
                    'relative z-10',
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl',
                      'bg-white/15',
                      'flex items-center',
                      'justify-center shrink-0',
                      'backdrop-blur-sm',
                    )}
                  >
                    <MessageCircle
                      className={cn(
                        'w-6 h-6',
                        'text-amber-300',
                      )}
                    />
                  </div>
                  <div>
                    <p
                      className={cn(
                        'font-black text-white',
                        'text-sm',
                      )}
                    >
                      Respon Cepat
                    </p>
                    <p
                      className={cn(
                        'text-sky-100/60',
                        'text-sm',
                      )}
                    >
                      Rata-rata waktu respon kami
                      kurang dari 6 jam di hari kerja.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div
              className={cn(
                'p-8 rounded-3xl border',
                'border-slate-100 bg-white',
                'shadow-xl shadow-[#143D60]/5',
              )}
            >
              <div className="space-y-5">
                <div
                  className={cn(
                    'grid sm:grid-cols-2',
                    'gap-5',
                  )}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nama
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subjek
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Subjek pesan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Pesan
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda..."
                    rows={5}
                  />
                </div>
                <Button
                  className={cn(
                    'w-full h-12 rounded-xl',
                    'bg-[#143D60]',
                    'hover:bg-[#0f2e4a]',
                    'text-white font-bold',
                    'transition-all group',
                  )}
                >
                  <Send
                    className={cn(
                      'w-4 h-4 mr-2',
                      'group-hover:translate-x-0.5',
                      'group-hover:-translate-y-0.5',
                      'transition-transform',
                    )}
                  />
                  Kirim Pesan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section
        className={cn(
          'bg-[#faf5e4] py-16 md:py-20',
          'relative overflow-hidden',
        )}
      >
        <Plus
          className={cn(
            'absolute top-[10%] left-[8%]',
            'text-[#143D60]/10 w-8 h-8',
            'rotate-45 pointer-events-none',
          )}
        />
        <Diamond
          className={cn(
            'absolute bottom-[15%] right-[10%]',
            'text-amber-500/15 w-6 h-6',
            'rotate-12 pointer-events-none',
          )}
        />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 space-y-3">
            <h2
              className={cn(
                'text-3xl md:text-4xl font-black',
                'text-[#143D60] tracking-tight',
              )}
            >
              Lokasi{' '}
              <span className="text-amber-500">
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
                  'bg-[#143D60]/10 mx-auto',
                  'flex items-center',
                  'justify-center mb-3',
                )}
              >
                <MapPin
                  className={cn(
                    'w-7 h-7',
                    'text-[#143D60]',
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
    </main>
  )
}
