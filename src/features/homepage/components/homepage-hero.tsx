import Link from 'next/link'
import {
  BookOpen,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Plus,
  Hexagon,
  Diamond,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const THEME_STYLES = {
  emerald: {
    gradient: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    subText: 'text-emerald-600',
    titleText: 'text-emerald-900',
    descText: 'text-emerald-700/70',
    glow: 'bg-emerald-300',
    ctaBg: 'bg-emerald-50',
    ctaBorder: 'border-emerald-200',
    hoverBorder: 'group-hover:border-emerald-300',
    hoverShadow: 'group-hover:shadow-emerald-200/40',
    wave: 'text-emerald-100',
  },
  indigo: {
    gradient: 'from-indigo-50 to-violet-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    subText: 'text-indigo-600',
    titleText: 'text-indigo-900',
    descText: 'text-indigo-700/70',
    glow: 'bg-indigo-300',
    ctaBg: 'bg-indigo-50',
    ctaBorder: 'border-indigo-200',
    hoverBorder: 'group-hover:border-indigo-300',
    hoverShadow: 'group-hover:shadow-indigo-200/40',
    wave: 'text-indigo-100',
  },
  orange: {
    gradient: 'from-orange-50 to-amber-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    subText: 'text-orange-600',
    titleText: 'text-orange-900',
    descText: 'text-orange-700/70',
    glow: 'bg-orange-300',
    ctaBg: 'bg-orange-50',
    ctaBorder: 'border-orange-200',
    hoverBorder: 'group-hover:border-orange-300',
    hoverShadow: 'group-hover:shadow-orange-200/40',
    wave: 'text-orange-100',
  },
} as const

const DESTINATION_CARDS = [
  {
    title: 'PSIKOTES',
    subtitle: 'Discover Yourself',
    description: 'Tes potensi diri & asesmen karir profesional.',
    icon: BookOpen,
    href: '/psikotes',
    ctaLabel: 'Mulai Tes',
    theme: 'emerald' as const,
  },
  {
    title: 'KONSELING',
    subtitle: 'Heal & Grow',
    description: 'Konsultasi privat dengan psikolog klinis.',
    icon: MessageSquare,
    href: '/konseling',
    ctaLabel: 'Konsultasi',
    theme: 'indigo' as const,
  },
  {
    title: 'PELATIHAN',
    subtitle: 'Unlock Skills',
    description: 'Webinar & mentoring skill masa depan.',
    icon: GraduationCap,
    href: '/pelatihan',
    ctaLabel: 'Lihat Program',
    theme: 'orange' as const,
  },
]

function BackgroundLayer() {
  return (
    <>
      {/* Base gradient */}
      <div className={cn(
        "absolute inset-0",
        "bg-linear-to-b from-white via-slate-50/80",
        "to-slate-100"
      )} />

      {/* Dot grid pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.4]",
          "pointer-events-none"
        )}
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Topographic line pattern */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.03]",
          "pointer-events-none mix-blend-multiply"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='%23334155' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ambient glows — each theme */}
      <div className={cn(
        "absolute -top-[15%] -left-[10%]",
        "w-150 h-150",
        "bg-emerald-200/40 rounded-full blur-[150px]",
        "pointer-events-none"
      )} />
      <div className={cn(
        "absolute top-[10%] -right-[10%]",
        "w-125 h-125",
        "bg-indigo-200/30 rounded-full blur-[150px]",
        "pointer-events-none"
      )} />
      <div className={cn(
        "absolute -bottom-[15%] left-[20%]",
        "w-125 h-125",
        "bg-orange-200/30 rounded-full blur-[150px]",
        "pointer-events-none"
      )} />

      {/* Technical ornaments */}
      <Plus className={cn(
        "absolute top-[12%] left-[8%]",
        "text-emerald-400/30 w-8 h-8 animate-pulse"
      )} />
      <Plus className={cn(
        "absolute bottom-[18%] left-[4%]",
        "text-indigo-400/20 w-6 h-6 rotate-45"
      )} />
      <Plus className={cn(
        "absolute top-[35%] right-[6%]",
        "text-orange-400/25 w-10 h-10 animate-spin-slow"
      )} />
      <Hexagon className={cn(
        "absolute top-[18%] right-[22%]",
        "text-slate-300/30 w-28 h-28",
        "-rotate-12 animate-float-medium"
      )} />
      <Diamond className={cn(
        "absolute bottom-[12%] right-[28%]",
        "text-slate-300/30 w-16 h-16",
        "rotate-12 animate-float-slow"
      )} />

      {/* Glass polygon shards */}
      <div className={cn(
        "absolute top-[12%] left-[40%]",
        "w-16 h-16 bg-white/60 backdrop-blur-sm",
        "rounded-tr-[2rem] rounded-bl-[1.5rem]",
        "rotate-25 border border-white/80",
        "shadow-lg pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-[18%] right-[12%]",
        "w-12 h-12 bg-white/50 backdrop-blur-sm",
        "rounded-tl-[1.5rem] rounded-br-3xl",
        "-rotate-15 border border-white/70",
        "shadow-md pointer-events-none"
      )} />

      {/* Floating colored spheres */}
      <div className={cn(
        "absolute top-[8%] right-[15%]",
        "w-20 h-20 rounded-full",
        "bg-linear-to-br from-emerald-300/20",
        "to-teal-300/10 blur-xl",
        "animate-float-slow pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-[25%] left-[8%]",
        "w-24 h-24 rounded-full",
        "bg-linear-to-br from-indigo-300/20",
        "to-violet-300/10 blur-xl",
        "animate-float-medium pointer-events-none"
      )} />
      <div className={cn(
        "absolute bottom-[8%] right-[35%]",
        "w-16 h-16 rounded-full",
        "bg-linear-to-br from-orange-300/20",
        "to-amber-300/10 blur-xl",
        "animate-float-fast pointer-events-none"
      )} />
    </>
  )
}

function DestinationCard({
  card,
}: {
  card: (typeof DESTINATION_CARDS)[number]
}) {
  const Icon = card.icon
  const t = THEME_STYLES[card.theme]

  return (
    <Link
      href={card.href}
      className={cn(
        "group relative flex flex-col",
        "p-6 lg:p-7 rounded-[2rem] overflow-hidden",
        "bg-white/70 backdrop-blur-sm",
        "border border-slate-200/80 shadow-sm",
        "transition-all duration-500",
        "hover:-translate-y-3 hover:shadow-2xl",
        t.hoverBorder,
        t.hoverShadow
      )}
    >
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-linear-to-br opacity-0",
        "group-hover:opacity-60 transition-opacity",
        "duration-700",
        t.gradient
      )} />

      {/* Wave SVG bottom */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-24",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-500",
        "pointer-events-none"
      )}>
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className={t.wave}
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,176C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* Glow blob */}
      <div className={cn(
        "absolute -top-8 -right-8",
        "w-28 h-28 rounded-full blur-[50px]",
        "opacity-30 group-hover:opacity-60",
        "transition-all duration-500",
        t.glow
      )} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon & CTA Row */}
        <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-14 h-14 flex items-center",
            "justify-center rounded-2xl",
            "border border-white/50 shadow-sm",
            "group-hover:scale-110",
            "transition-transform duration-500",
            t.iconBg
          )}>
            <Icon className={cn(
              "w-7 h-7 stroke-2", t.iconColor
            )} />
          </div>

          <div className={cn(
            "px-3 py-1 rounded-full border",
            t.ctaBg, t.ctaBorder
          )}>
            <span className={cn(
              "text-[10px] font-bold",
              "uppercase tracking-widest",
              t.subText
            )}>
              {card.ctaLabel}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="mt-auto space-y-1.5">
          <p className={cn(
            "text-[11px] font-bold tracking-[0.2em]",
            "uppercase", t.subText
          )}>
            {card.subtitle}
          </p>
          <h3 className={cn(
            "text-2xl lg:text-3xl font-black",
            "tracking-tight", t.titleText
          )}>
            {card.title}
          </h3>
          <p className={cn(
            "text-sm font-medium leading-relaxed",
            "pt-1", t.descText
          )}>
            {card.description}
          </p>
        </div>

        {/* Hover arrow */}
        <div className={cn(
          "absolute bottom-6 right-6",
          "opacity-0 group-hover:opacity-100",
          "translate-x-4 group-hover:translate-x-0",
          "transition-all duration-300"
        )}>
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center",
            "justify-center", t.ctaBg
          )}>
            <ArrowRight className={cn(
              "w-5 h-5", t.subText
            )} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function HomepageHero() {
  return (
    <section className={cn(
      "relative h-dvh w-full overflow-hidden",
      "flex flex-col items-center justify-center",
      "p-4 md:p-8 lg:p-12"
    )}>
      <BackgroundLayer />

      {/* Content */}
      <div className={cn(
        "relative z-10 w-full max-w-7xl",
        "flex flex-col h-full items-center justify-center",
        "gap-6 md:gap-10"
      )}>
        {/* Header */}
        <header className={cn(
          "flex flex-col items-center text-center",
          "space-y-4 md:space-y-5"
        )}>
          <div className={cn(
            "inline-flex items-center gap-2",
            "px-5 py-2 rounded-full",
            "bg-white/80 backdrop-blur-sm",
            "border border-slate-200 shadow-md"
          )}>
            <Sparkles className={cn(
              "w-3.5 h-3.5 text-amber-500 fill-amber-500"
            )} />
            <span className={cn(
              "text-[10px] font-black tracking-[0.3em]",
              "text-slate-600 uppercase"
            )}>
              Indonesia&apos;s Life School
            </span>
          </div>

          <div className="space-y-3 md:space-y-4 max-w-4xl">
            <h1 className={cn(
              "text-5xl md:text-7xl lg:text-8xl",
              "font-black text-slate-900 tracking-tighter",
              "leading-[0.9] relative inline-block"
            )}>
              BERMOELA
              <span className="text-emerald-500">.</span>
              <svg
                className={cn(
                  "absolute -bottom-2 left-0 w-full h-3",
                  "text-emerald-400/30"
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
            </h1>
            <p className={cn(
              "text-slate-500 text-sm md:text-lg",
              "font-medium max-w-2xl mx-auto",
              "leading-relaxed text-balance"
            )}>
              Platform pengembangan diri terintegrasi untuk
              kesehatan mental, karir, dan keahlianmu.
            </p>
          </div>
        </header>

        {/* Cards Grid */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3",
          "gap-4 lg:gap-6 w-full"
        )}>
          {DESTINATION_CARDS.map((card) => (
            <DestinationCard key={card.title} card={card} />
          ))}
        </div>

        {/* Bottom hint */}
        <p className={cn(
          "text-slate-400 text-xs",
          "font-medium tracking-widest uppercase",
          "animate-pulse"
        )}>
          Mulai perjalananmu
        </p>
      </div>
    </section>
  )
}
