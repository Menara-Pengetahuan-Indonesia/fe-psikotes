import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

import { DESTINATION_CARDS } from './hero-constants'
import { HeroBackground } from './hero-background'
import { DestinationCard } from './destination-card'

export function HomepageHero() {
  return (
    <section className={cn(
      "relative h-dvh w-full overflow-hidden",
      "flex flex-col items-center justify-center",
      "p-4 md:p-8 lg:p-12"
    )}>
      <HeroBackground />

      {/* Content */}
      <div className={cn(
        "relative z-10 w-full max-w-7xl",
        "flex flex-col h-full items-center",
        "justify-center gap-6 md:gap-10"
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
              "w-3.5 h-3.5",
              "text-accent-500 fill-accent-500"
            )} />
            <span className={cn(
              "text-[10px] font-black tracking-[0.3em]",
              "text-slate-600 uppercase"
            )}>
              Indonesia&apos;s Life School
            </span>
          </div>

          <div className={cn(
            "space-y-3 md:space-y-4 max-w-4xl"
          )}>
            <h1 className={cn(
              "text-5xl md:text-7xl lg:text-8xl",
              "font-black text-slate-900",
              "tracking-tighter leading-[0.9]",
              "relative inline-block"
            )}>
              BERMOELA
              <span className="text-primary-500">.</span>
              <svg
                className={cn(
                  "absolute -bottom-2 left-0",
                  "w-full h-3 text-primary-400/30"
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
              Platform pengembangan diri terintegrasi
              untuk kesehatan mental, karir, dan
              keahlianmu.
            </p>
          </div>
        </header>

        {/* Cards Grid */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3",
          "gap-4 lg:gap-6 w-full"
        )}>
          {DESTINATION_CARDS.map((card) => (
            <DestinationCard
              key={card.title}
              card={card}
            />
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
