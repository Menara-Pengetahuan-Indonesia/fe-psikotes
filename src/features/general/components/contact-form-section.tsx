'use client'

import {
  Plus,
  Circle,
  Sparkles,
  Send,
  MessageCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function ContactFormSection() {
  return (
    <section
      className={cn(
        'bg-white pt-16 pb-20 md:pt-24',
        'md:pb-28 relative overflow-hidden',
      )}
    >
      <Plus
        className={cn(
          'absolute top-[20%] right-[8%]',
          'text-secondary/5 w-14 h-14',
          'rotate-45 pointer-events-none',
        )}
      />
      <Circle
        className={cn(
          'absolute bottom-[15%] left-[5%]',
          'text-accent-400/10 w-16 h-16',
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
                  Send Message
                </span>
              </div>
              <h2
                className={cn(
                  'text-4xl md:text-5xl',
                  'font-black text-secondary',
                  'tracking-tight',
                )}
              >
                Kirim{' '}
                <span className="text-accent-500">
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
                'p-6 rounded-3xl bg-secondary',
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
                      'text-accent-300',
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
              'shadow-xl shadow-secondary/5',
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
                  'bg-secondary',
                  'hover:bg-secondary-700',
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
  )
}
