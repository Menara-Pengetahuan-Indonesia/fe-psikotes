import Link from 'next/link'
import { BookOpen, MessageSquare, GraduationCap, ArrowRight, Sparkles, Plus, Hexagon, Diamond } from 'lucide-react'
import { cn } from '@/lib/utils'

const DESTINATION_CARDS = [
  {
    title: 'PSIKOTES',
    subtitle: 'Discover Yourself',
    description: 'Tes potensi diri & asesmen karir profesional.',
    icon: BookOpen,
    href: '/psikotes',
    ctaLabel: 'Mulai Tes',
    theme: 'emerald',
  },
  {
    title: 'KONSELING',
    subtitle: 'Heal & Grow',
    description: 'Konsultasi privat dengan psikolog klinis.',
    icon: MessageSquare,
    href: '/konseling',
    ctaLabel: 'Konsultasi',
    theme: 'indigo',
  },
  {
    title: 'PELATIHAN',
    subtitle: 'Unlock Skills',
    description: 'Webinar & mentoring skill masa depan.',
    icon: GraduationCap,
    href: '/pelatihan',
    ctaLabel: 'Lihat Program',
    theme: 'orange',
  },
] as const

export function HomepageHero() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#fefce8] flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">

      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      {/* 1. Subtle Topographic Line Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='%2310b981' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}
      />
      
      {/* 2. Technical Ornaments */}
      <Plus className="absolute top-[15%] left-[10%] text-emerald-600/20 w-8 h-8 animate-pulse" />
      <Plus className="absolute bottom-[20%] left-[5%] text-slate-400/20 w-6 h-6 rotate-45" />
      <Plus className="absolute top-[40%] right-[8%] text-amber-500/20 w-10 h-10 animate-spin-slow" />
      
      <Hexagon className="absolute top-[20%] right-[25%] text-emerald-600/10 w-32 h-32 -rotate-12 animate-float-medium" />
      <Diamond className="absolute bottom-[15%] right-[30%] text-indigo-600/10 w-20 h-20 rotate-12 animate-float-slow" />

      {/* 3. Ambient Glows (Subtle for light theme) */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none" />


      {/* --- CONTENT --- */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col h-full items-center justify-center gap-6 md:gap-12">

        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4 md:space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
             <Sparkles className="w-3 h-3 text-emerald-500 fill-emerald-500" />
             <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">
                Indonesia&apos;s Life School
             </span>
          </div>

          <div className="space-y-2 md:space-y-4 max-w-4xl relative">
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] drop-shadow-sm">
              BERMOELA<span className="text-emerald-500">.</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-lg font-medium max-w-xl mx-auto leading-relaxed text-balance">
              Platform pengembangan diri terintegrasi untuk kesehatan mental, karir, dan keahlianmu.
            </p>
          </div>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 w-full">
          {DESTINATION_CARDS.map((card, idx) => {
            const Icon = card.icon
            
            // Theme Config
            const styles = {
              emerald: {
                gradient: 'from-emerald-50 to-teal-50',
                border: 'border-emerald-100 group-hover:border-emerald-300',
                iconBg: 'bg-emerald-100',
                iconColor: 'text-emerald-700',
                text: 'text-emerald-900',
                subText: 'text-emerald-600',
                blob: 'bg-emerald-200',
                wave: 'text-emerald-100',
              },
              indigo: {
                gradient: 'from-indigo-50 to-purple-50',
                border: 'border-indigo-100 group-hover:border-indigo-300',
                iconBg: 'bg-indigo-100',
                iconColor: 'text-indigo-700',
                text: 'text-indigo-900',
                subText: 'text-indigo-600',
                blob: 'bg-indigo-200',
                wave: 'text-indigo-100',
              },
              orange: {
                gradient: 'from-orange-50 to-rose-50',
                border: 'border-orange-100 group-hover:border-orange-300',
                iconBg: 'bg-orange-100',
                iconColor: 'text-orange-700',
                text: 'text-orange-900',
                subText: 'text-orange-600',
                blob: 'bg-orange-200',
                wave: 'text-orange-100',
              },
            }

            const theme = styles[card.theme as keyof typeof styles]

            return (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  "group relative flex flex-col p-6 lg:p-8 rounded-[2.5rem] border bg-primary-50 shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-300/50",
                  theme.border
                )}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                 {/* --- ORNAMENTS --- */}
                 
                 {/* 1. Gradient Background Overlay */}
                 <div className={cn("absolute inset-0 bg-linear-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-700", theme.gradient)} />
                 
                 {/* 2. Dynamic Wave SVG */}
                 <div className="absolute bottom-0 left-0 right-0 h-32 opacity-100 transition-opacity duration-500 pointer-events-none">
                    <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                        <path fill="currentColor" className={theme.wave} fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                 </div>

                 {/* 3. Glowing Blob Top Right */}
                 <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-all duration-500", theme.blob)} />

                {/* --- CONTENT --- */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon & Arrow Row */}
                    <div className="flex justify-between items-start mb-8">
                        <div className={cn("w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm border border-white/50 group-hover:scale-110 transition-transform duration-500", theme.iconBg)}>
                            <Icon className={cn("w-8 h-8 stroke-2", theme.iconColor)} />
                        </div>
                        
                        <div className={cn("px-3 py-1 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm")}>
                            <span className={cn("text-[10px] font-bold uppercase tracking-widest", theme.subText)}>
                                {card.ctaLabel}
                            </span>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="mt-auto space-y-2">
                        <p className={cn("text-xs font-bold tracking-[0.2em] uppercase opacity-80", theme.subText)}>
                            {card.subtitle}
                        </p>
                        <h3 className={cn("text-3xl font-black tracking-tight", theme.text)}>
                            {card.title}
                        </h3>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed pt-2 line-clamp-2">
                            {card.description}
                        </p>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <ArrowRight className={cn("w-6 h-6", theme.subText)} />
                    </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}