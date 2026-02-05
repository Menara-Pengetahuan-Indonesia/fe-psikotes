import Link from 'next/link'
import { BookOpen, MessageSquare, GraduationCap, ArrowRight, Sparkles } from 'lucide-react'

const DESTINATION_CARDS = [
  {
    title: 'PSIKOTES',
    subtitle: 'KENALI POTENSI',
    description: 'Asesmen psikologi profesional untuk karir & pendidikan.',
    icon: BookOpen,
    href: '/psikotes',
    ctaLabel: 'Mulai Tes',
    // Green theme
    bgGradient: 'from-primary-100 to-primary-200',
    iconBg: 'bg-primary-500',
    iconColor: 'text-surface-50',
    titleColor: 'text-secondary',
    descColor: 'text-secondary-700',
    borderColor: 'border-primary-400',
    hoverBg: 'hover:from-primary-200 hover:to-primary-300',
  },
  {
    title: 'KONSELING',
    subtitle: 'TEMAN CERITA',
    description: 'Ruang aman konsultasi privat dengan psikolog ahli.',
    icon: MessageSquare,
    href: '/konseling',
    ctaLabel: 'Konsultasi',
    // Navy theme
    bgGradient: 'from-secondary-100 to-secondary-200',
    iconBg: 'bg-secondary-600',
    iconColor: 'text-primary-50',
    titleColor: 'text-secondary',
    descColor: 'text-secondary-700',
    borderColor: 'border-secondary-400',
    hoverBg: 'hover:from-secondary-200 hover:to-secondary-300',
  },
  {
    title: 'PELATIHAN',
    subtitle: 'LEVEL UP',
    description: 'Webinar & mentoring eksklusif pengembangan diri.',
    icon: GraduationCap,
    href: '/pelatihan',
    ctaLabel: 'Ikut Program',
    // Orange theme
    bgGradient: 'from-accent-100 to-accent-200',
    iconBg: 'bg-accent-500',
    iconColor: 'text-accent-50',
    titleColor: 'text-secondary',
    descColor: 'text-secondary-700',
    borderColor: 'border-accent-400',
    hoverBg: 'hover:from-accent-200 hover:to-accent-300',
  },
]

export function HomepageHero() {
  return (
    <section className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-surface via-primary-50 to-surface py-20 lg:py-32 px-4 lg:px-8 relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200 rounded-full blur-[150px] opacity-40 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-200 rounded-full blur-[150px] opacity-30 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-200 rounded-full blur-[120px] opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:gap-20">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center space-y-6 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-200 border-2 border-primary-400 shadow-lg animate-in fade-in zoom-in duration-700">
            <Sparkles className="w-4 h-4 text-accent-600 fill-accent-500" />
            <span className="text-xs font-bold tracking-wider text-secondary uppercase">
              Platform #1 Pengembangan Diri Indonesia
            </span>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-secondary tracking-tighter leading-[0.95]">
              TITIK MULA<span className="text-primary-600">.</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-600 font-semibold max-w-2xl mx-auto leading-relaxed">
              Temukan potensi terbaikmu melalui psikotes akurat, konseling profesional, dan
              pelatihan terstruktur
            </p>
          </div>
        </header>

        {/* Destination Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATION_CARDS.map((card, idx) => {
            const Icon = card.icon

            return (
              <Link
                key={card.title}
                href={card.href}
                className={`group relative flex flex-col p-8 lg:p-10 rounded-3xl border-4 ${card.borderColor} overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br ${card.bgGradient} ${card.hoverBg}`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Decorative Circle */}
                <div
                  className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20 transition-all duration-500 group-hover:scale-125 ${card.iconBg}`}
                />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col gap-6 h-full">
                  {/* Icon + Arrow */}
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-2xl ${card.iconBg} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <Icon className={`w-8 h-8 stroke-[2.5] ${card.iconColor}`} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-300 border-2 border-primary-500 flex items-center justify-center group-hover:bg-accent group-hover:border-accent-600 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-secondary group-hover:text-accent-50 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 mt-auto">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-600">
                      {card.subtitle}
                    </p>
                    <h3 className={`text-3xl lg:text-4xl font-black ${card.titleColor} tracking-tight leading-tight`}>
                      {card.title}
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed ${card.descColor}`}>
                      {card.description}
                    </p>
                  </div>

                  {/* CTA Badge */}
                  <div className="mt-4 inline-flex self-start px-5 py-2.5 rounded-full bg-accent text-accent-50 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    {card.ctaLabel}
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

