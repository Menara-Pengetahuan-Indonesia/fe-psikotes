'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  Users,
  ChevronDown,
  Sparkles,
  Plus,
  Hexagon,
  ShieldCheck,
  Check,
  HelpCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface TestDetailProps {
  title: string
  badge: string
  description: string
  duration: string
  participants: string
  aspects?: {
    heading: string
    items: { title: string; desc: string }[]
  }[]
  price: string
  originalPrice?: string
  formHref: string
}

export function TestDetail({
  title,
  badge,
  description,
  duration,
  participants,
  aspects,
  price,
  originalPrice,
  formHref,
}: TestDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <DetailHero
        title={title}
        badge={badge}
        description={description}
        duration={duration}
        participants={participants}
      />

      <DetailBody
        aspects={aspects}
        price={price}
        originalPrice={originalPrice}
        formHref={formHref}
      />
    </div>
  )
}

/* ── Hero ──────────────────────────────── */

function DetailHero({
  title,
  badge,
  description,
  duration,
  participants,
}: Pick<
  TestDetailProps,
  | 'title'
  | 'badge'
  | 'description'
  | 'duration'
  | 'participants'
>) {
  return (
    <header
      className={cn(
        'relative overflow-hidden',
        'bg-linear-to-b from-emerald-800',
        'via-emerald-700 to-emerald-500',
        'text-white',
        'pt-28 pb-16 md:pt-36 md:pb-24',
      )}
    >
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'opacity-[0.05]',
          'pointer-events-none',
          'mix-blend-overlay',
        )}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,'
            + '%3Csvg width=\'200\''
            + ' height=\'200\''
            + ' viewBox=\'0 0 200 200\''
            + ' xmlns=\'http://www.w3.org/'
            + '2000/svg\'%3E%3Cpath'
            + ' d=\'M0 100 C 20 80, 40 120,'
            + ' 60 100 S 100 80, 120 100'
            + ' S 160 120, 200 100\''
            + ' stroke=\'white\''
            + ' fill=\'transparent\''
            + ' stroke-width=\'1\'/%3E'
            + '%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[15%] left-[8%]',
          'text-emerald-400/20 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute bottom-[12%] right-[8%]',
          'text-white/5 w-24 h-24',
          '-rotate-12 pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute top-0 left-0',
          'w-96 h-96 bg-emerald-500/20',
          'rounded-full blur-[120px]',
          '-translate-x-1/2 -translate-y-1/2',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 right-0',
          'w-80 h-80 bg-amber-500/10',
          'rounded-full blur-[100px]',
          'translate-x-1/4 translate-y-1/4',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-7xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Badge */}
        <div
          className={cn(
            'inline-flex items-center gap-2',
            'px-4 py-1.5 rounded-full',
            'bg-white/10 border border-white/10',
            'backdrop-blur-md mb-6',
          )}
        >
          <Sparkles
            className={cn(
              'w-3.5 h-3.5',
              'text-amber-300 fill-amber-300',
            )}
          />
          <span
            className={cn(
              'text-[10px] font-black',
              'tracking-[0.2em]',
              'text-emerald-100 uppercase',
            )}
          >
            {badge}
          </span>
        </div>

        {/* Title */}
        <h1
          className={cn(
            'text-4xl md:text-6xl',
            'font-black leading-tight',
            'mb-4 max-w-4xl',
            'tracking-tight drop-shadow-lg',
          )}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className={cn(
            'text-lg text-emerald-100/80',
            'leading-relaxed font-medium',
            'max-w-2xl mb-8',
          )}
        >
          {description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-4">
          <div
            className={cn(
              'flex items-center gap-3',
              'bg-white/5 backdrop-blur-sm',
              'px-5 py-3 rounded-2xl',
              'border border-white/10',
            )}
          >
            <Clock
              className="w-5 h-5 text-amber-300"
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-[10px] font-black',
                  'uppercase tracking-widest',
                  'text-emerald-200/70',
                )}
              >
                Durasi
              </span>
              <span className="text-sm font-bold">
                {duration}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'flex items-center gap-3',
              'bg-white/5 backdrop-blur-sm',
              'px-5 py-3 rounded-2xl',
              'border border-white/10',
            )}
          >
            <Users
              className="w-5 h-5 text-sky-300"
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-[10px] font-black',
                  'uppercase tracking-widest',
                  'text-emerald-200/70',
                )}
              >
                Peserta
              </span>
              <span className="text-sm font-bold">
                {participants}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'flex items-center gap-3',
              'bg-emerald-800/50',
              'backdrop-blur-sm',
              'px-5 py-3 rounded-2xl',
              'border border-emerald-700/30',
            )}
          >
            <ShieldCheck
              className={cn(
                'w-5 h-5 text-emerald-400',
              )}
            />
            <span
              className={cn(
                'text-sm font-black italic',
                'uppercase tracking-tighter',
              )}
            >
              Verified Result
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ── Body ──────────────────────────────── */

function DetailBody({
  aspects,
  price,
  originalPrice,
  formHref,
}: Pick<
  TestDetailProps,
  | 'aspects'
  | 'price'
  | 'originalPrice'
  | 'formHref'
>) {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto px-6',
        'py-14 md:py-20',
      )}
    >
      <div
        className={cn(
          'grid grid-cols-1',
          'lg:grid-cols-3 gap-12',
        )}
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-14">
          {aspects && aspects.length > 0 && (
            <AspectsSection aspects={aspects} />
          )}
          <FaqSection />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <PricingCard
            price={price}
            originalPrice={originalPrice}
            formHref={formHref}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Aspects ───────────────────────────── */

function AspectsSection({
  aspects,
}: {
  aspects: NonNullable<TestDetailProps['aspects']>
}) {
  return (
    <div className="space-y-8">
      <SectionHeading
        color="amber"
        label="Aspek yang Diukur"
      />

      <div className="space-y-8">
        {aspects.map((section) => (
          <div key={section.heading} className="space-y-4">
            <h3
              className={cn(
                'text-xs font-black',
                'text-emerald-600 uppercase',
                'tracking-[0.2em] ml-1',
              )}
            >
              {section.heading}
            </h3>
            <div
              className={cn(
                'grid grid-cols-1',
                'sm:grid-cols-2 gap-4',
              )}
            >
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    'p-6 bg-white',
                    'rounded-3xl',
                    'border border-slate-100',
                    'hover:border-emerald-500',
                    'transition-all duration-500',
                    'shadow-xl shadow-stone-200/50',
                    'hover:-translate-y-1',
                    'hover:shadow-2xl',
                    'hover:shadow-emerald-900/5',
                  )}
                >
                  <p
                    className={cn(
                      'text-lg font-black',
                      'text-stone-800 mb-2',
                    )}
                  >
                    {item.title}
                  </p>
                  <p
                    className={cn(
                      'text-sm text-stone-500',
                      'leading-relaxed font-medium',
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FAQ ───────────────────────────────── */

const FAQ_ITEMS = [
  {
    q: 'Berapa lama waktu yang diperlukan'
      + ' untuk menyelesaikan tes ini?',
    a: 'Durasi tes bervariasi tergantung'
      + ' jenis tes, umumnya berkisar antara'
      + ' 10-45 menit. Anda dapat melihat'
      + ' estimasi waktu di bagian atas.',
  },
  {
    q: 'Apakah hasil tes bisa digunakan'
      + ' untuk keperluan akademik?',
    a: 'Ya, hasil tes kami telah tervalidasi'
      + ' secara ilmiah dan dapat digunakan'
      + ' sebagai referensi untuk keperluan'
      + ' akademik maupun profesional.',
  },
  {
    q: 'Dapatkah saya mengulang tes'
      + ' setelah selesai?',
    a: 'Anda dapat mengulang tes kapan saja'
      + ' dengan melakukan pembelian ulang.'
      + ' Hasil sebelumnya tetap tersimpan'
      + ' di akun Anda.',
  },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<
    number | null
  >(null)

  return (
    <div className="space-y-6">
      <SectionHeading
        color="sky"
        label="Pertanyaan Umum"
      />

      <div className="space-y-3">
        {FAQ_ITEMS.map((faq, i) => {
          const isOpen = openIndex === i

          return (
            <div
              key={i}
              className={cn(
                'bg-white rounded-3xl',
                'border transition-all',
                'duration-500 overflow-hidden',
                isOpen
                  ? 'border-emerald-500'
                    + ' shadow-xl'
                    + ' shadow-emerald-900/5'
                  : 'border-slate-100'
                    + ' shadow-lg'
                    + ' shadow-stone-200/50'
                    + ' hover:border-slate-200',
              )}
            >
              <button
                onClick={() =>
                  setOpenIndex(
                    isOpen ? null : i,
                  )
                }
                className={cn(
                  'w-full flex items-center',
                  'justify-between p-5',
                  'text-left cursor-pointer',
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-3',
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg',
                      'flex items-center',
                      'justify-center shrink-0',
                      'transition-colors',
                      isOpen
                        ? 'bg-emerald-600'
                          + ' text-white'
                        : 'bg-slate-50'
                          + ' text-slate-400',
                    )}
                  >
                    <HelpCircle
                      className="h-4 w-4"
                    />
                  </div>
                  <span
                    className={cn(
                      'text-sm font-bold',
                      'transition-colors',
                      isOpen
                        ? 'text-slate-900'
                        : 'text-slate-700',
                    )}
                  >
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 shrink-0 ml-3',
                    'transition-transform',
                    'duration-500',
                    isOpen
                      ? 'rotate-180'
                        + ' text-emerald-600'
                      : 'text-slate-300',
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all',
                  'duration-500 ease-in-out',
                  isOpen
                    ? 'grid-rows-[1fr]'
                      + ' opacity-100'
                    : 'grid-rows-[0fr]'
                      + ' opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      'px-5 pb-5 pt-0 ml-11',
                    )}
                  >
                    <p
                      className={cn(
                        'text-sm text-slate-500',
                        'leading-relaxed',
                        'font-medium',
                      )}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Pricing Card ──────────────────────── */

function PricingCard({
  price,
  originalPrice,
  formHref,
}: {
  price: string
  originalPrice?: string
  formHref: string
}) {
  return (
    <div
      className={cn(
        'sticky top-28',
        'rounded-3xl border',
        'border-slate-200 bg-white',
        'shadow-2xl shadow-slate-900/10',
        'overflow-hidden',
      )}
    >
      {/* Card Header */}
      <div
        className={cn(
          'bg-emerald-950 text-white',
          'px-8 py-8 relative',
        )}
      >
        <div
          className={cn(
            'absolute top-0 right-0',
            'w-32 h-32 bg-emerald-800/30',
            'rounded-full blur-3xl',
          )}
        />
        <p
          className={cn(
            'text-[10px] font-black',
            'uppercase tracking-[0.2em]',
            'text-amber-300 mb-2',
            'relative z-10',
          )}
        >
          Investasi Masa Depan
        </p>
        <div
          className={cn(
            'flex items-baseline gap-3',
            'relative z-10',
          )}
        >
          <span
            className={cn(
              'text-4xl font-black',
              'tracking-tight',
            )}
          >
            {price}
          </span>
          {originalPrice && (
            <span
              className={cn(
                'text-emerald-400/50',
                'line-through text-sm',
                'font-bold',
              )}
            >
              {originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-8 space-y-8">
        <div>
          <p
            className={cn(
              'text-[10px] font-black',
              'text-slate-400 uppercase',
              'tracking-[0.2em] mb-4',
            )}
          >
            Yang Anda Dapatkan
          </p>
          <ul className="space-y-4">
            {[
              'Akses penuh ke seluruh modul tes',
              'Laporan hasil analisis mendalam',
              'Rekomendasi yang dipersonalisasi',
              'Akses seumur hidup ke hasil Anda',
            ].map((item) => (
              <li
                key={item}
                className={cn(
                  'flex items-start gap-3',
                  'text-sm text-slate-600',
                  'font-medium',
                )}
              >
                <div
                  className={cn(
                    'mt-0.5 w-5 h-5',
                    'rounded-lg bg-emerald-50',
                    'text-emerald-600',
                    'flex items-center',
                    'justify-center shrink-0',
                    'border border-emerald-200',
                  )}
                >
                  <Check
                    className={cn(
                      'w-3.5 h-3.5 stroke-3',
                    )}
                  />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-2">
          <Button
            asChild
            className={cn(
              'w-full rounded-2xl h-14',
              'text-sm font-black uppercase',
              'tracking-widest',
              'bg-emerald-600',
              'hover:bg-emerald-700',
              'text-white shadow-lg',
              'shadow-emerald-600/20',
              'transition-all border-none',
            )}
          >
            <Link
              href={formHref}
              className={cn(
                'flex items-center gap-2',
              )}
            >
              Mulai Tes Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>

          <p
            className={cn(
              'text-[10px] text-center',
              'font-bold text-slate-400',
              'uppercase tracking-tight',
            )}
          >
            *Hasil tes tersedia dalam format PDF
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Shared ─────────────────────────────── */

const HEADING_COLORS = {
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
}

function SectionHeading({
  color,
  label,
}: {
  color: keyof typeof HEADING_COLORS
  label: string
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3',
      )}
    >
      <div
        className={cn(
          'w-1.5 h-7 rounded-full',
          HEADING_COLORS[color],
        )}
      />
      <h2
        className={cn(
          'text-2xl font-black',
          'text-stone-800 tracking-tight',
        )}
      >
        {label}
      </h2>
    </div>
  )
}
