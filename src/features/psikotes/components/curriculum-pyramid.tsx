'use client'

import { useState } from 'react'
import {
  Trophy,
  Shield,
  Zap,
  Heart,
  User,
  Sparkles,
  Star,
  Circle,
  Triangle,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const LEVELS = [
  {
    level: 1,
    label: 'Self Mastery',
    tagline: 'Kenali diri secara mendalam',
    desc:
      'Fondasi utama dalam perjalanan'
      + ' pengembangan diri. Di level ini,'
      + ' kamu akan mengenali kekuatan,'
      + ' kelemahan, pola pikir, dan'
      + ' nilai-nilai yang membentuk'
      + ' siapa dirimu. Melalui asesmen'
      + ' mendalam, kamu mendapatkan peta'
      + ' diri yang jelas sebagai langkah'
      + ' awal transformasi.',
    icon: User,
    bg: 'bg-amber-500',
    glow: 'shadow-amber-500/40',
    depth:
      'border-b-[6px] border-amber-700',
    pill: cn(
      'bg-amber-500',
      'shadow-lg shadow-amber-600/30',
    ),
    iconBg: 'bg-amber-600',
    cardBg: 'bg-amber-500/10',
    cardBorder: 'border-amber-500/20',
    width: 'w-full',
  },
  {
    level: 2,
    label: 'Core Stability',
    tagline: 'Fondasi mental yang kokoh',
    desc:
      'Membangun fondasi mental dan'
      + ' emosional yang kokoh. Level ini'
      + ' fokus pada ketahanan diri,'
      + ' manajemen stres, dan kemampuan'
      + ' menghadapi tekanan. Kamu akan'
      + ' belajar menjaga keseimbangan'
      + ' di tengah tantangan hidup.',
    icon: Shield,
    bg: 'bg-red-500',
    glow: 'shadow-red-500/40',
    depth:
      'border-b-[6px] border-red-700',
    pill: cn(
      'bg-red-500',
      'shadow-lg shadow-red-600/30',
    ),
    iconBg: 'bg-red-600',
    cardBg: 'bg-red-500/10',
    cardBorder: 'border-red-500/20',
    width: 'w-[90%] md:w-[88%]',
  },
  {
    level: 3,
    label: 'Action & Habits',
    tagline:
      'Kebiasaan positif & konsisten',
    desc:
      'Mengubah pemahaman diri menjadi'
      + ' aksi nyata. Di level ini, kamu'
      + ' akan membangun kebiasaan positif'
      + ' yang konsisten, menetapkan'
      + ' tujuan terukur, dan'
      + ' mengembangkan disiplin diri'
      + ' untuk mencapai potensi maksimal.',
    icon: Zap,
    bg: 'bg-teal-500',
    glow: 'shadow-teal-500/40',
    depth:
      'border-b-[6px] border-teal-700',
    pill: cn(
      'bg-teal-500',
      'shadow-lg shadow-teal-600/30',
    ),
    iconBg: 'bg-teal-600',
    cardBg: 'bg-teal-500/10',
    cardBorder: 'border-teal-500/20',
    width: 'w-[80%] md:w-[74%]',
  },
  {
    level: 4,
    label: 'Social Intelligence',
    tagline: 'Memimpin & mempengaruhi',
    desc:
      'Mengembangkan kemampuan'
      + ' interpersonal dan kepemimpinan.'
      + ' Level ini membantu kamu memahami'
      + ' dinamika sosial, membangun'
      + ' relasi bermakna, serta'
      + ' mempengaruhi dan menginspirasi'
      + ' orang di sekitarmu.',
    icon: Heart,
    bg: 'bg-purple-500',
    glow: 'shadow-purple-500/40',
    depth:
      'border-b-[6px] border-purple-700',
    pill: cn(
      'bg-purple-500',
      'shadow-lg shadow-purple-600/30',
    ),
    iconBg: 'bg-purple-600',
    cardBg: 'bg-purple-500/10',
    cardBorder: 'border-purple-500/20',
    width: 'w-[70%] md:w-[62%]',
  },
  {
    level: 5,
    label: 'Legacy & Impact',
    tagline:
      'Dampak bermakna bagi sekitar',
    desc:
      'Puncak dari perjalanan'
      + ' pengembangan diri. Di level ini,'
      + ' kamu tidak hanya bertumbuh untuk'
      + ' diri sendiri, tetapi menciptakan'
      + ' dampak positif bagi lingkungan'
      + ' dan masyarakat. Menjadi pemimpin'
      + ' yang meninggalkan warisan'
      + ' bermakna.',
    icon: Trophy,
    bg: 'bg-slate-700',
    glow: 'shadow-slate-700/40',
    depth:
      'border-b-[6px] border-slate-900',
    pill: cn(
      'bg-slate-700',
      'shadow-lg shadow-slate-800/30',
    ),
    iconBg: 'bg-slate-800',
    cardBg: 'bg-slate-700/10',
    cardBorder: 'border-slate-500/20',
    width: 'w-[60%] md:w-[50%]',
  },
]

export function CurriculumPyramid() {
  const [active, setActive] = useState<
    number | null
  >(null)

  return (
    <div className="bg-[#faf5e4]">
      <section
        className={cn(
          'py-24 md:py-36 relative',
          'overflow-hidden bg-emerald-950',
          'text-white',
          'rounded-t-[60px]',
          'md:rounded-t-[120px]',
          'rounded-b-[60px]',
          'md:rounded-b-[120px]',
        )}
      >
        {/* Horizontal accent lines */}
        {[30, 50, 70].map((top) => (
          <div
            key={top}
            className={cn(
              'absolute h-px',
              'bg-white/5',
              'left-[5%] right-[5%]',
            )}
            style={{ top: `${top}%` }}
          />
        ))}

        {/* White triangle */}
        <div
          className={cn(
            'absolute z-[1]',
            'left-1/2 -translate-x-1/2',
            'bottom-0',
            'w-[500px] h-[480px]',
            'md:w-[660px] md:h-[580px]',
          )}
          style={{
            clipPath: cn(
              'polygon(50% 0%,',
              '100% 100%, 0% 100%)',
            ),
            background: cn(
              'linear-gradient(180deg,',
              'rgba(255,255,255,0.06) 0%,',
              'rgba(255,255,255,0.02) 100%)',
            ),
          }}
        />

        {/* Ambient Glows */}
        <div
          className={cn(
            'absolute top-0 left-0',
            'w-96 h-96 bg-emerald-800/40',
            'rounded-full blur-[100px]',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'absolute bottom-0 right-0',
            'w-96 h-96 bg-emerald-700/20',
            'rounded-full blur-[120px]',
            'translate-x-1/4',
            'translate-y-1/4',
            'pointer-events-none',
          )}
        />

        {/* Floating ornaments */}
        <Star
          className={cn(
            'absolute top-[14%]',
            'right-[8%]',
            'text-amber-400/20 w-8 h-8',
            'fill-amber-400/20',
          )}
        />
        <Sparkles
          className={cn(
            'absolute bottom-[18%]',
            'left-[6%] text-emerald-400/20',
            'w-10 h-10',
          )}
        />
        <Circle
          className={cn(
            'absolute bottom-[12%]',
            'right-[12%]',
            'text-white/5 w-12 h-12',
          )}
        />
        <Triangle
          className={cn(
            'absolute top-[35%]',
            'left-[5%]',
            'text-emerald-500/10 w-8 h-8',
            'fill-emerald-500/10',
            '-rotate-12',
          )}
        />

        <div
          className={cn(
            'max-w-3xl mx-auto px-6',
            'relative z-10',
          )}
        >
          {/* Header */}
          <div
            className={cn(
              'text-center mb-16 space-y-4',
            )}
          >
            <div
              className={cn(
                'inline-flex items-center',
                'gap-2 px-4 py-1.5',
                'rounded-full bg-white/10',
                'border border-white/10',
                'shadow-sm mb-2',
              )}
            >
              <Sparkles
                className={cn(
                  'w-3.5 h-3.5',
                  'text-amber-400',
                  'fill-amber-400',
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-black',
                  'tracking-[0.2em]',
                  'text-emerald-200',
                  'uppercase',
                )}
              >
                Growth Framework
              </span>
            </div>
            <h2
              className={cn(
                'text-3xl md:text-5xl',
                'font-black tracking-tight',
                'drop-shadow-md',
              )}
            >
              Kurikulum{' '}
              <span
                className="text-amber-400 relative"
              >
                Pertumbuhan
                <svg
                  className={cn(
                    'absolute -bottom-2 left-0',
                    'w-full h-3',
                    'text-amber-400/30',
                  )}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0, 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h2>
            <p
              className={cn(
                'text-emerald-200/70',
                'text-lg max-w-2xl mx-auto',
                'font-medium leading-relaxed',
              )}
            >
              Lima tingkatan pengembangan diri
              yang dirancang sistematis dari
              fondasi internal hingga dampak
              eksternal.
            </p>
          </div>

          {/* Pyramid */}
          <div
            className={cn(
              'flex flex-col',
              'items-center gap-3',
            )}
          >
            {LEVELS.slice()
              .reverse()
              .map((item) => {
                const Icon = item.icon
                const isActive =
                  active === item.level

                return (
                  <div
                    key={item.level}
                    className={cn(
                      'group cursor-pointer',
                      item.width,
                      'transition-all',
                      'duration-500',
                      isActive
                        ? 'scale-[1.05]'
                        : 'hover:scale-[1.03]',
                    )}
                    onClick={() =>
                      setActive(
                        isActive
                          ? null
                          : item.level,
                      )
                    }
                  >
                    <div
                      className={cn(
                        'flex items-center',
                        'gap-3',
                      )}
                    >
                      {/* 3D Block */}
                      <div
                        className={cn(
                          'flex-1 relative',
                          'overflow-hidden',
                          'rounded-xl',
                          'py-4 md:py-5',
                          'px-4 md:px-6',
                          'text-white',
                          'font-black',
                          'text-lg',
                          'md:text-2xl',
                          'tracking-tight',
                          'transition-shadow',
                          'duration-500',
                          item.bg,
                          item.depth,
                          isActive
                            ? cn(
                                'shadow-xl',
                                item.glow,
                              )
                            : 'shadow-lg',
                        )}
                      >
                        {/* Glossy */}
                        <div
                          className={cn(
                            'absolute inset-0',
                            'bg-gradient-to-br',
                            'from-white/20',
                            'via-transparent',
                            'to-black/10',
                            'pointer-events-none',
                          )}
                        />

                        <div
                          className={cn(
                            'relative flex',
                            'items-center',
                            'justify-center',
                            'gap-3',
                          )}
                        >
                          <div
                            className={cn(
                              'w-8 h-8',
                              'md:w-9 md:h-9',
                              'rounded-lg flex',
                              'items-center',
                              'justify-center',
                              'shrink-0',
                              'transition-transform',
                              'duration-500',
                              item.iconBg,
                              isActive &&
                                'rotate-12',
                            )}
                          >
                            <Icon
                              className={cn(
                                'w-4 h-4',
                                'md:w-5',
                                'md:h-5',
                                'text-white',
                              )}
                            />
                          </div>
                          <span
                            className={cn(
                              'drop-shadow',
                            )}
                          >
                            Level{' '}
                            {item.level}
                          </span>
                        </div>

                        <span
                          className={cn(
                            'block text-xs',
                            'font-bold',
                            'text-white/70',
                            'mt-1 text-center',
                            'md:hidden',
                            'relative',
                          )}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Desktop pill */}
                      <div
                        className={cn(
                          'hidden md:flex',
                          'items-center',
                          'gap-2',
                          'rounded-full',
                          'px-5 py-3',
                          'text-white',
                          'font-bold text-sm',
                          'whitespace-nowrap',
                          'transition-all',
                          'duration-500',
                          item.pill,
                          isActive &&
                            'ring-2',
                          isActive &&
                            'ring-white/30',
                        )}
                      >
                        {item.label}
                        <ChevronRight
                          className={cn(
                            'w-4 h-4',
                            'opacity-60',
                            'transition-transform',
                            'duration-300',
                            isActive &&
                              'translate-x-1',
                          )}
                        />
                      </div>
                    </div>

                    {/* Expanded detail */}
                    <div
                      className={cn(
                        'grid',
                        'transition-all',
                        'duration-500',
                        'ease-in-out',
                        isActive
                          ? 'grid-rows-[1fr]'
                            + ' opacity-100'
                            + ' mt-3'
                          : 'grid-rows-[0fr]'
                            + ' opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={cn(
                            'rounded-2xl p-5',
                            'md:p-6',
                            'backdrop-blur-md',
                            'border',
                            item.cardBg,
                            item.cardBorder,
                          )}
                        >
                          <div
                            className={cn(
                              'flex items-start',
                              'gap-4',
                            )}
                          >
                            <div
                              className={cn(
                                'w-10 h-10',
                                'rounded-xl',
                                'flex items-center',
                                'justify-center',
                                'shrink-0',
                                item.iconBg,
                              )}
                            >
                              <Icon
                                className={cn(
                                  'w-5 h-5',
                                  'text-white',
                                )}
                              />
                            </div>
                            <div
                              className="flex-1"
                            >
                              <p
                                className={cn(
                                  'font-black',
                                  'text-white',
                                  'text-sm',
                                  'uppercase',
                                  'tracking-wide',
                                  'mb-1',
                                )}
                              >
                                {item.label}
                              </p>
                              <p
                                className={cn(
                                  'text-emerald-200/60',
                                  'text-xs mb-2',
                                  'font-bold',
                                )}
                              >
                                {item.tagline}
                              </p>
                              <p
                                className={cn(
                                  'text-sm',
                                  'text-emerald-100/80',
                                  'font-medium',
                                  'leading-relaxed',
                                )}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}
