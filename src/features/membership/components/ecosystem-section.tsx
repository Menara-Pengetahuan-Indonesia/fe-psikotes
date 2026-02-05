import { Star, Video, Users, PlayCircle, Shield, Zap } from 'lucide-react'

const ECOSYSTEM_ITEMS = [
  {
    icon: Star,
    title: 'Akses Psikotes Premium',
    description: 'Nikmati akses gratis ke berbagai tes psikologi berbayar setiap bulannya.',
  },
  {
    icon: Video,
    title: 'Webinar Eksklusif',
    description: 'Belajar langsung dari pakar psikologi dan pengembangan diri setiap minggu.',
  },
  {
    icon: Users,
    title: 'Networking Session',
    description: 'Perluas jejaringmu dengan ribuan individu yang memiliki mindset bertumbuh.',
  },
  {
    icon: PlayCircle,
    title: 'Library Materi',
    description: 'Akses ribuan video, e-book, dan worksheet pengembangan diri.',
  },
  {
    icon: Shield,
    title: 'Konseling Diskon',
    description: 'Potongan harga khusus untuk sesi konseling dengan psikolog profesional.',
  },
  {
    icon: Zap,
    title: 'Challenge Bulanan',
    description: 'Ikuti tantangan pengembangan diri untuk membangun kebiasaan positif.',
  },
]

export function EcosystemSection() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Bukan Sekadar Komunitas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ini adalah ekosistem lengkap untuk membantumu tumbuh 1% setiap harinya melalui berbagai metode pembelajaran.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ECOSYSTEM_ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
