import Link from 'next/link'
import { BookOpen, MessageSquare, GraduationCap, ArrowRight } from 'lucide-react'

const DESTINATION_CARDS = [
  {
    title: 'TITIK MULA.',
    subtitle: 'Indonesian Life School',
    description:
      'Akses Blog, Tes Psikologi, Karir, dan Informasi Kerja Sama dalam satu platform terpadu.',
    icon: BookOpen,
    href: '/platform',
    ctaLabel: 'Kunjungi Platform',
  },
  {
    title: 'LIFE CONSULTATION',
    subtitle: 'Indonesia',
    description:
      'Layanan profesional untuk Life Coaching dan Konseling bersama pakar berpengalaman.',
    icon: MessageSquare,
    href: '/konseling',
    ctaLabel: 'Mulai Konsultasi',
  },
  {
    title: 'LIFESKILLS',
    subtitle: 'Program',
    description:
      'Tingkatkan potensi diri melalui Webinar eksklusif dan Kelas Online terstruktur.',
    icon: GraduationCap,
    href: '/training',
    ctaLabel: 'Lihat Program',
  },
]

export function HomepageHero() {
  return (
    <>
      {/* Brand Header */}
      <header className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block">
            <span className="px-5 py-2 rounded-full border border-gray-100 bg-white text-[10px] font-bold tracking-[0.2em] text-gray-400 shadow-sm uppercase">
              Selamat Datang Di
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-none">
              TITIK MULA<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-xs font-bold tracking-[0.4em] text-gray-400 uppercase">
              Indonesian Life School
            </p>
          </div>
        </div>
      </header>

      {/* "Mau kemana?" + destination cards */}
      <section className="px-6 pb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Mau kemana?</h2>
          <p className="text-gray-500 text-lg font-medium">
            Pilih platform yang sesuai dengan kebutuhan pengembangan diri Anda hari ini.
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {DESTINATION_CARDS.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.title}
                className="group bg-white border border-gray-200 rounded-3xl p-10 hover:border-gray-300 transition-all duration-300 hover:shadow-xl shadow-md"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icon */}
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-2xl group-hover:bg-gray-900 transition-all duration-300">
                    <Icon className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{card.title}</h3>
                    <p className="text-[10px] text-gray-400 font-bold tracking-[0.25em] uppercase">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Animated divider */}
                  <div className="w-12 h-px bg-gray-200 group-hover:w-20 group-hover:bg-gray-900 transition-all duration-300" />

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed min-h-[72px]">{card.description}</p>

                  {/* CTA */}
                  <Link
                    href={card.href}
                    className="mt-4 w-full py-4 px-6 bg-gray-900 text-white font-semibold text-sm rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-sm"
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
