import { Star, Video, Users, PlayCircle, Shield, Zap, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const ECOSYSTEM_ITEMS = [
  {
    icon: Star,
    title: 'Akses Psikotes Premium',
    description: 'Nikmati akses gratis ke berbagai tes psikologi berbayar setiap bulannya.',
    theme: 'indigo'
  },
  {
    icon: Video,
    title: 'Webinar Eksklusif',
    description: 'Belajar langsung dari pakar psikologi dan pengembangan diri setiap minggu.',
    theme: 'amber'
  },
  {
    icon: Users,
    title: 'Networking Session',
    description: 'Perluas jejaringmu dengan ribuan individu yang memiliki mindset bertumbuh.',
    theme: 'emerald'
  },
  {
    icon: PlayCircle,
    title: 'Library Materi',
    description: 'Akses ribuan video, e-book, dan worksheet pengembangan diri.',
    theme: 'sky'
  },
  {
    icon: Shield,
    title: 'Konseling Diskon',
    description: 'Potongan harga khusus untuk sesi konseling dengan psikolog profesional.',
    theme: 'rose'
  },
  {
    icon: Zap,
    title: 'Challenge Bulanan',
    description: 'Ikuti tantangan pengembangan diri untuk membangun kebiasaan positif.',
    theme: 'indigo'
  },
]

export function EcosystemSection() {
  return (
    <section className="py-24 md:py-36 bg-[#fefce8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
              Holistic Growth
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Bukan Sekadar <span className="text-indigo-600">Komunitas</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Ini adalah ekosistem lengkap untuk membantumu tumbuh 1% setiap harinya melalui berbagai metode pembelajaran yang teruji.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ECOSYSTEM_ITEMS.map((item) => {
            const Icon = item.icon
            
            const themes = {
              indigo: 'bg-indigo-50/30 border-indigo-100 hover:border-indigo-500 hover:shadow-indigo-900/5',
              amber: 'bg-amber-50/30 border-amber-100 hover:border-amber-500 hover:shadow-amber-900/5',
              emerald: 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-500 hover:shadow-emerald-900/5',
              sky: 'bg-sky-50/30 border-sky-100 hover:border-sky-500 hover:shadow-sky-900/5',
              rose: 'bg-rose-50/30 border-rose-100 hover:border-rose-500 hover:shadow-rose-900/5'
            }

            const themeClass = themes[item.theme as keyof typeof themes]

            return (
              <div
                key={item.title}
                className={cn(
                  "group relative p-8 rounded-[2.5rem] bg-white border transition-all duration-500 hover:-translate-y-1.5",
                  "shadow-xl shadow-stone-200/50 hover:shadow-2xl",
                  themeClass
                )}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-7 h-7 text-slate-900 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}