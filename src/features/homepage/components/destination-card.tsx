import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  THEME_STYLES,
  type DestinationCard as CardType,
} from './hero-constants'

export function DestinationCard({
  card,
}: {
  card: CardType
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
        <div className={cn(
          "flex justify-between items-start mb-6"
        )}>
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
