import Link from 'next/link'
import { BookOpen, MessageSquare, GraduationCap, ArrowRight } from 'lucide-react'

const DESTINATION_CARDS = [
  {
    title: 'PSIKOTES',
    subtitle: 'Tes Psikologi',
    description:
      'Kenali potensi diri melalui tes psikologi profesional untuk mahasiswa, perusahaan, dan kesehatan mental.',
    icon: BookOpen,
    href: '/psikotes',
    ctaLabel: 'Mulai Tes',
    colorScheme: {
      iconBg: 'bg-primary/10',
      iconHoverBg: 'group-hover:bg-primary',
      iconColor: 'text-primary',
      iconHoverColor: 'group-hover:text-white',
      border: 'border-primary/20',
      hoverBorder: 'hover:border-primary',
    },
  },
  {
    title: 'KONSELING',
    subtitle: 'Life Consultation',
    description:
      'Layanan profesional untuk life coaching dan konseling bersama psikolog berpengalaman.',
    icon: MessageSquare,
    href: '/konseling',
    ctaLabel: 'Mulai Konsultasi',
    colorScheme: {
      iconBg: 'bg-primary-600/10',
      iconHoverBg: 'group-hover:bg-primary-600',
      iconColor: 'text-primary-600',
      iconHoverColor: 'group-hover:text-white',
      border: 'border-primary-600/20',
      hoverBorder: 'hover:border-primary-600',
    },
  },
  {
    title: 'PELATIHAN',
    subtitle: 'Lifeskills Program',
    description:
      'Tingkatkan potensi diri melalui webinar eksklusif, kelas online, dan mentoring terstruktur.',
    icon: GraduationCap,
    href: '/pelatihan',
    ctaLabel: 'Lihat Program',
    colorScheme: {
      iconBg: 'bg-accent/10',
      iconHoverBg: 'group-hover:bg-accent',
      iconColor: 'text-accent',
      iconHoverColor: 'group-hover:text-white',
      border: 'border-accent/20',
      hoverBorder: 'hover:border-accent',
    },
  },
]

export function HomepageHero() {
  return (
    <>
      {/* Brand Header with gradient background */}
      <header className="pt-24 pb-16 px-6 text-center bg-gradient-to-b from-surface/30 to-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block">
            <span className="px-5 py-2 rounded-full border border-primary/20 bg-white text-[10px] font-bold tracking-[0.2em] text-secondary/70 shadow-sm uppercase">
              Selamat Datang Di
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-secondary tracking-tighter leading-none">
              TITIK MULA<span className="text-primary">.</span>
            </h1>
            <p className="text-xs font-bold tracking-[0.4em] text-secondary/50 uppercase">
              Indonesian Life School
            </p>
          </div>
        </div>
      </header>

      {/* "Mau kemana?" section */}
      <section className="px-6 pb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary tracking-tight">
            Mau kemana?
          </h2>
          <p className="text-secondary/60 text-lg font-medium">
            Pilih platform yang sesuai dengan kebutuhan pengembangan diri Anda hari ini.
          </p>
        </div>
      </section>

      {/* Destination Cards */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {DESTINATION_CARDS.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.title}
                className={`group bg-surface/30 border ${card.colorScheme.border} ${card.colorScheme.hoverBorder} rounded-3xl p-10 transition-all duration-300 hover:shadow-xl shadow-md hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 flex items-center justify-center ${card.colorScheme.iconBg} ${card.colorScheme.iconHoverBg} rounded-2xl transition-all duration-300`}
                  >
                    <Icon
                      className={`w-10 h-10 ${card.colorScheme.iconColor} ${card.colorScheme.iconHoverColor} transition-colors duration-300 stroke-[1.5]`}
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-secondary tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-[10px] text-secondary/50 font-bold tracking-[0.25em] uppercase">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Animated divider */}
                  <div
                    className={`w-12 h-px bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-300`}
                  />

                  {/* Description */}
                  <p className="text-sm text-secondary/70 leading-relaxed min-h-[72px]">
                    {card.description}
                  </p>

                  {/* CTA Button with accent color */}
                  <Link
                    href={card.href}
                    className="mt-4 w-full py-4 px-6 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-600 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg"
                  >
                    {card.ctaLabel}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
